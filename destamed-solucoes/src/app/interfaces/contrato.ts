import { PropostasServicos } from './servico';

export interface ListaContrato extends Record<string, any> {
  id: string;
  codContrato: string;
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
  funcionarios?: number;
  deslocamento?: boolean;
  valorDeslocamento?: number;
  total?: number;
  idProposta?: string;
  codProposta?: string;
  statusProposta?: number;
  servicos?: PropostasServicos[];
}

export interface DetalheContrato extends ListaContrato {
  funcionarios: number;
  deslocamento: boolean;
  valorDeslocamento: number;
  idProposta: string;
  codProposta: string;
  statusProposta: number;
  total: number;
  servicos: PropostasServicos[];
}

export interface MockContrato {
  id: number;
  codigo: string;
  cliente: string;
  status: 'Ativo' | 'Em revisão' | 'Vencendo';
  valor: string;
}
