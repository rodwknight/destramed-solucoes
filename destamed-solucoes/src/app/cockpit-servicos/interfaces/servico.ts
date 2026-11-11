export interface FormServico extends Record<string, any> {
  codServico?: string;
  nome: string;
  descricao: string;
  descricaoProposta: string;
  valor: string | number;
  createdAt?: Date;
}

export interface Servicos {
  codServico: string;
  descricao: string;
  descricaoProposta?: string;
  nome: string;
}

export interface PropostasServicos extends Record<string, any> {
  valor: number;
  servicos: Servicos;
}
