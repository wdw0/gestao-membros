export interface Member {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  active: boolean;
}

export interface MemberRequest {
  name: string;
  cpf: string;
  birthDate: string;
  active: boolean;
}
