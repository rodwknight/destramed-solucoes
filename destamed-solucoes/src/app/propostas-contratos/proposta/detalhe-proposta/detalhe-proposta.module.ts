import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { DetalhePropostaPageRoutingModule } from './detalhe-proposta-routing.module';
import { DetalhePropostaPage } from './detalhe-proposta.page';

import { HeaderModule } from '../../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, DetalhePropostaPageRoutingModule, HeaderModule], declarations: [DetalhePropostaPage],
})
export class DetalhePropostaPageModule {}
