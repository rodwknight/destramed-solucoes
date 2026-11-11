export interface ListaContrato extends Record<string, any> {
  id: string;
  codContrato: string;
  propostas: any[];
  status: number;
  cliente: {
    codCliente: string;
    nomeFantasia: string;
  };
  unidade: {
    codUnidade: string;
    nomeFantasia: string;
  };
  usuario: {
    nome: string;
  };
  createdAt?: Date;
}

export interface DetalheContrato {
  id: string;
  codContrato: string;
  funcionarios: number;
  deslocamento: boolean;
  valorDeslocamento: number;
  total: number;
  createdAt: Date;
  status: number;
  idProposta: string;
  codProposta: string;
  statusProposta: number;
  servicos: any[];
  codUnidade: string;
  nomeUnidade: string;
  codCliente: string;
  nomeCliente: string;
  nomeUsuario: string;
}

export interface MockContrato {
  id: number;
  codigo: string;
  cliente: string;
  status: 'Ativo' | 'Em revisão' | 'Vencendo';
  valor: string;
}
