import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnidadePage } from './unidade.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadePage,
  },
  {
    path: 'adicionar-unidade',
    loadChildren: () => import('./adicionar-unidade/adicionar-unidade.module').then((m) => m.AdicionarUnidadePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadePageRoutingModule {}
