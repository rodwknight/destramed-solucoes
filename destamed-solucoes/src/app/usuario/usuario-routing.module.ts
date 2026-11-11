import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioPage } from './usuario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage,
  },
  {
    path: 'adicionar-usuario',
    loadChildren: () => import('./adicionar-usuario/adicionar-usuario.module').then((m) => m.AdicionarUsuarioPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
