import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpresaPage } from './empresa.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaPage,
  },
  {
    path: 'adicionar-empresa',
    loadChildren: () => import('./adicionar-empresa/adicionar-empresa.module').then((m) => m.AdicionarEmpresaPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaPageRoutingModule {}
