# Gestão de Membros

Sistema para cadastro e gerenciamento de membros, com validação de CPF, restrição de idade e controle de status ativo/inativo.

Backend desenvolvido com Java e Spring Boot, frontend com React e TypeScript. Os dados são persistidos em banco H2 em memória.

---

## Requisitos

- Java 21 (JDK, não apenas JRE)
- Maven 3.9+
- Node.js 18+

---

## Rodando o backend

```bash
cd backend
mvn spring-boot:run
```

A API sobe em `http://localhost:8080`.

O console do H2 fica disponível em `http://localhost:8080/h2-console` com as seguintes configurações:

- JDBC URL: `jdbc:h2:mem:membrosdb`
- User: `sa`
- Password: *(deixar em branco)*

---

## Rodando o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

O backend precisa estar rodando para o frontend funcionar.

---

## Observações sobre o ambiente

Se o Maven estiver usando um Java antigo (erro `release version not supported`), instale o JDK completo e aponte o `JAVA_HOME`:

```bash
sudo apt install openjdk-21-jdk -y
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

---

## Funcionalidades

- Cadastro, edição e exclusão de membros
- Validação de CPF pelo algoritmo dos dígitos verificadores
- Bloqueio de cadastro para menores de 18 anos
- Impedimento de CPFs duplicados
- CPF armazenado no banco somente como dígitos
- Controle de status ativo/inativo por membro