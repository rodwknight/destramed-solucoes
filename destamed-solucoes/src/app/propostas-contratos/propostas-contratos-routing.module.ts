import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContratoPage } from './contrato/contrato.page';
import { PropostasContratosPage } from './propostas-contratos.page';

const routes: Routes = [
  {
    path: '',
    component: PropostasContratosPage,
    pathMatch: 'full',
  },
  {
    path: 'contrato',
    component: ContratoPage,
  },
  {
    path: 'proposta',
    loadChildren: () =>
      import('./proposta/proposta.module').then((m) => m.PropostaPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropostasContratosPageRoutingModule {}
