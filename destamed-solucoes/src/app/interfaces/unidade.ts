export interface FormUnidade extends Record<string, any> {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  representante: string;
  rg: string;
  cpf: string;
  rua: string;
  numero: string;
  complemento: string;
  pais: string;
  estado: string;
  cidade: string;
  cep: string;
  bairro: string;
  telefone: string;
  celular: string;
  email: string;
  codUnidade?: string;
  status?: number;
  createdAt?: Date;
}

export interface ListaUnidade {
  codUnidade: string;
  nomeFantasia: string;
}
