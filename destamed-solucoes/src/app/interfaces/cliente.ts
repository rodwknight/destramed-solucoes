export interface FormCliente {
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
  codCliente?: string;
  status?: number;
  funcionarios: number;
  createdAt?: Date;
}

export interface ListaCliente {
  codCliente: string;
  nomeFantasia: string;
}

export interface MockCliente {
  id: number;
  nome: string;
  contato: string;
  status: 'Ativo' | 'Em revisão' | 'Inativo';
}