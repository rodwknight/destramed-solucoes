import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdicionarEmpresaPage } from './adicionar-empresa.page';

const routes: Routes = [{ path: '', component: AdicionarEmpresaPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarEmpresaPageRoutingModule {}
