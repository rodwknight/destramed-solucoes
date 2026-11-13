import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContratoPage } from './contrato.page';

const routes: Routes = [
  {
    path: '',
    component: ContratoPage,
    pathMatch: 'full',
  },
  {
    path: 'detalhe-contrato/:id',
    loadChildren: () =>
      import('./detalhe-contrato/detalhe-contrato.module').then((m) => m.DetalheContratoPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratoPageRoutingModule {}
