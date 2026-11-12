export interface FormProposta extends Record<string, any> {
  codProposta?: string;
  idUnidade: string;
  idCliente: string;
  idUsuario?: number;
  funcionarios: number;
  deslocamento: boolean;
  valorDeslocamento: number;
  total?: number;
  servicos?: Array<{
    codServico: string;
    nome: string;
    valor: string | number;
  }>;
  responsavel?: string;
  observacao?: string;
  createdAt?: Date;
}

export interface ListaProposta extends Record<string, any> {
  id: string;
  codProposta: string;
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
  status: number;
  createdAt?: Date;
}

interface PropostaServicoDetalhe {
  valor: number;
  servicos: {
    codServico: string;
    nome: string;
    descricao: string;
  };
}

interface UsuarioDetalhe {
  nome: string;
}

interface ClienteDetalhe {
  codCliente: string;
  nomeFantasia: string;
}

interface UnidadeDetalhe {
  codUnidade: string;
  nomeFantasia: string;
}

export interface DetalheProposta {
  id: string;
  codProposta: string;
  funcionarios: number;
  deslocamento: boolean;
  valorDeslocamento: number;
  total: number;
  createdAt: Date;
  propostaServicos: PropostaServicoDetalhe[];
  status: number;
  usuario: UsuarioDetalhe;
  cliente: ClienteDetalhe;
  unidade: UnidadeDetalhe;
}

export interface MockProposta {
  id: number;
  codigo: string;
  cliente: string;
  status: 'Aguardando aprovação' | 'Aprovada' | 'Reprovada';
}
