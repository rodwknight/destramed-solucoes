import { Status } from '../interfaces/common';

export enum StatusOrdem {
  NAO_INICIADO = 1,
  INICIADO = 2,
  FINALIZADO = 3,
  CANCELADO = 4,
}

export const listaStatusOrdem = new Map<StatusOrdem, Status>([
  [StatusOrdem.NAO_INICIADO, { label: 'Não Iniciado', type: 'warning' }],
  [StatusOrdem.INICIADO, { label: 'Iniciado', type: 'success' }],
  [StatusOrdem.FINALIZADO, { label: 'Finalizado', type: 'tertiary' }],
  [StatusOrdem.CANCELADO, { label: 'Cancelado', type: 'danger' }],
]);
