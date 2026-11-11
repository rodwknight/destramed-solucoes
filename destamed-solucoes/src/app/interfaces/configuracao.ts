import { Protocolo } from './common';

export interface Configuracao {
  ip: string;
  porta: number;
  protocolo: Protocolo;
  url: string;
}