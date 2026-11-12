export interface FormOrdem extends Record<string, any> {
  codOrdem?: string;
  idUnidade: string;
  idCliente: string;
  idUsuario?: number;
  funcionarios: number;
  deslocamento: boolean;
  valorDeslocamento: number;
  total?: number;
  servicos?: Array<{
    codServico?: string;
    nome?: string;
    descricao?: string;
    descricaoProposta?: string;
    valor: string | number;
  }>;
  unidade?: {
    codUnidade: string;
    nomeFantasia: string;
  };
  cliente?: {
    codCliente: string;
    nomeFantasia: string;
  };
  usuario?: {
    nome: string;
  };
  createdAt?: Date;
}

export interface ListaOrdem extends Record<string, any> {
  id: string;
  codOrdem: string;
  unidade: {
    codUnidade: string;
    nomeFantasia: string;
  };
  cliente: {
    codCliente: string;
    nomeFantasia: string;
  };
  usuario: {
    nome: string;
  };
  funcionarios?: number;
  deslocamento?: boolean;
  valorDeslocamento?: number;
  total?: number;
  ordemServicos?: Array<{
    valor: number;
    servicos: {
      codServico: string;
      descricao: string;
    };
  }>;
  contratos?: Array<{ codContrato: string }>;
  status: number;
  createdAt?: Date;
}

interface ContratoDetalhe {
  codContrato: string;
}

export interface DetalheOrdem {
  id: string;
  codOrdem: string;
  status: number;
  funcionarios: number;
  deslocamento: boolean;
  valorDeslocamento: number;
  total: number;
  dataInicial?: Date;
  dataFinal?: Date;
  contratos?: ContratoDetalhe[];
  ordemServicos: any[];
  codUnidade: string;
  nomeUnidade: string;
  codCliente: string;
  nomeCliente: string;
  nomeUsuario: string;
  createdAt?: Date;
}

export interface MockOrdem {
  id: number;
  codigo: string;
  cliente: string;
  status: 'Em execução' | 'Pendente' | 'Concluída';
}
