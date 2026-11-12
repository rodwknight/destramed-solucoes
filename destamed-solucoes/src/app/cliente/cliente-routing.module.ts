import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientePage } from './cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePage,
  },
  {
    path: 'adicionar-cliente',
    loadChildren: () =>
      import('./adicionar-cliente/adicionar-cliente.module').then((m) => m.AdicionarClientePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
