package com.membros.api.repository;

import com.membros.api.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByCpf(String cpf);
    Optional<Member> findByCpf(String cpf);
}
