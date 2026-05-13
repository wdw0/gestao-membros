package com.membros.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class MemberDTO {

    public record Request(
            @NotBlank(message = "Nome é obrigatório")
            String name,

            @NotBlank(message = "CPF é obrigatório")
            String cpf,

            @NotNull(message = "Data de nascimento é obrigatória")
            LocalDate birthDate,

            boolean active
    ) {}

    public record Response(
            Long id,
            String name,
            String cpf,
            LocalDate birthDate,
            boolean active
    ) {}
}
