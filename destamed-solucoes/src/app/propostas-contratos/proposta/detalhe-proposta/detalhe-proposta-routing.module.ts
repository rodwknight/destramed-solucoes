import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalhePropostaPage } from './detalhe-proposta.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhePropostaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhePropostaPageRoutingModule {}
