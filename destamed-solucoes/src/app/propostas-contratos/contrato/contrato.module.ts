import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../../components/header/header.module';
import { ContratoPageRoutingModule } from './contrato-routing.module';
import { ContratoPage } from './contrato.page';

@NgModule({
  imports: [CommonModule, IonicModule, HeaderModule, ContratoPageRoutingModule],
  declarations: [ContratoPage],
})
export class ContratoPageModule {}
