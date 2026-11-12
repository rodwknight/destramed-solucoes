import { Status } from '../interfaces/common';

export enum StatusProposta {
  EM_ANALISE = 1,
  APROVADO = 2,
  REJEITADO = 3,
}

export const listaStatusProposta = new Map<StatusProposta, Status>([
  [StatusProposta.EM_ANALISE, { label: 'Em análise', type: 'warning' }],
  [StatusProposta.APROVADO, { label: 'Aprovado', type: 'success' }],
  [StatusProposta.REJEITADO, { label: 'Rejeitado', type: 'danger' }],
]);
