import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ServicoPage } from './servico.page';
import { ServicoPageRoutingModule } from './servico-routing.module';

import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ServicoPageRoutingModule, HeaderModule], declarations: [ServicoPage],
})
export class ServicoPageModule {}
