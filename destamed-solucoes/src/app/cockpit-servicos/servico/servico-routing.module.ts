import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicoPage } from './servico.page';

const routes: Routes = [
  {
    path: '',
    component: ServicoPage,
  },
  {
    path: 'criar-servico',
    loadChildren: () => import('./criar-servico/criar-servico.module').then((m) => m.CriarServicoPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicoPageRoutingModule {}
