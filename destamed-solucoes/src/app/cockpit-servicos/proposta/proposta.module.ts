import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PropostaPage } from './proposta.page';
import { PropostaPageRoutingModule } from './proposta-routing.module';

import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, PropostaPageRoutingModule, HeaderModule], declarations: [PropostaPage],
})
export class PropostaPageModule {}
