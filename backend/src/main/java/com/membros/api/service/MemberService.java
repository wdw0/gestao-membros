package com.membros.api.service;

import com.membros.api.dto.MemberDTO;
import com.membros.api.exception.BusinessException;
import com.membros.api.model.Member;
import com.membros.api.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class MemberService {

    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public List<MemberDTO.Response> findAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public MemberDTO.Response findById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new BusinessException("Membro não encontrado"));
    }

    public MemberDTO.Response create(MemberDTO.Request request) {
        validateAge(request.birthDate());
        String cpfDigits = validateAndExtractCpf(request.cpf());
        checkDuplicateCpf(cpfDigits);

        Member member = new Member();
        member.setName(request.name().trim());
        member.setCpf(cpfDigits);
        member.setBirthDate(request.birthDate());
        member.setActive(request.active());

        return toResponse(repository.save(member));
    }

    public MemberDTO.Response update(Long id, MemberDTO.Request request) {
        Member member = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Membro não encontrado"));

        validateAge(request.birthDate());
        String cpfDigits = validateAndExtractCpf(request.cpf());

        if (!cpfDigits.equals(member.getCpf()) && repository.existsByCpf(cpfDigits)) {
            throw new BusinessException("CPF já cadastrado");
        }

        member.setName(request.name().trim());
        member.setCpf(cpfDigits);
        member.setBirthDate(request.birthDate());
        member.setActive(request.active());

        return toResponse(repository.save(member));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException("Membro não encontrado");
        }
        repository.deleteById(id);
    }

    private void validateAge(LocalDate birthDate) {
        if (Period.between(birthDate, LocalDate.now()).getYears() < 18) {
            throw new BusinessException("Apenas maiores de 18 anos podem ser cadastrados");
        }
    }

    private String validateAndExtractCpf(String cpf) {
        if (!CpfValidator.isValid(cpf)) {
            throw new BusinessException("CPF inválido");
        }
        return CpfValidator.onlyDigits(cpf);
    }

    private void checkDuplicateCpf(String cpfDigits) {
        if (repository.existsByCpf(cpfDigits)) {
            throw new BusinessException("CPF já cadastrado");
        }
    }

    private MemberDTO.Response toResponse(Member member) {
        return new MemberDTO.Response(
                member.getId(),
                member.getName(),
                member.getCpf(),
                member.getBirthDate(),
                member.isActive()
        );
    }
}
