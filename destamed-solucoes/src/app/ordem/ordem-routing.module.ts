import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdemPage } from './ordem.page';

const routes: Routes = [
  {
    path: '',
    component: OrdemPage,
  },
  {
    path: 'criar-ordem',
    loadChildren: () =>
      import('./criar-ordem/criar-ordem.module').then((m) => m.CriarOrdemPageModule),
  },
  {
    path: 'detalhe-ordem/:id',
    loadChildren: () =>
      import('./detalhe-ordem/detalhe-ordem.module').then((m) => m.DetalheOrdemPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemPageRoutingModule {}
