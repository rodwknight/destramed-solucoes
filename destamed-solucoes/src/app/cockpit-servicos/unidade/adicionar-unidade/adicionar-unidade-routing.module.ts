import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdicionarUnidadePage } from './adicionar-unidade.page';

const routes: Routes = [{ path: '', component: AdicionarUnidadePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarUnidadePageRoutingModule {}
