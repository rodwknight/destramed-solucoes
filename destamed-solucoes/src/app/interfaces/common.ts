export interface Protocolo {
  id: number;
  label: string;
  value: string;
}

export interface Status {
  label: string;
  type: string;
}

export interface UsuarioLogado {
  usuarioId: number;
  nome: string;
}

export interface ListaEmpresa {
  id: string;
  nome: string;
}

export interface ListaUsuario {
  nome: string;
}

export interface IonSelect {
  id: number;
  name: string;
}

export interface TipoMatricula {
  id: number;
  name: string;
  mask: string;
  label: string;
}