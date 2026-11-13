import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalheContratoPage } from './detalhe-contrato.page';

const routes: Routes = [{ path: '', component: DetalheContratoPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheContratoPageRoutingModule {}
