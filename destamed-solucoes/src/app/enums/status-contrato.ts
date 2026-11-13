import { Status } from '../interfaces/common';

export enum StatusContrato {
  EM_ANALISE = 1,
  APROVADO = 2,
  REJEITADO = 3,
}

export const listaStatusContrato = new Map<StatusContrato, Status>([
  [StatusContrato.EM_ANALISE, { label: 'Em análise', type: 'warning' }],
  [StatusContrato.APROVADO, { label: 'Aprovado', type: 'success' }],
  [StatusContrato.REJEITADO, { label: 'Rejeitado', type: 'danger' }],
]);
