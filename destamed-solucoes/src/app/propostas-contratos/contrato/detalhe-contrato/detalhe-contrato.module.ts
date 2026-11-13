import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../../../components/header/header.module';
import { DetalheContratoPageRoutingModule } from './detalhe-contrato-routing.module';
import { DetalheContratoPage } from './detalhe-contrato.page';

@NgModule({
  imports: [CommonModule, IonicModule, HeaderModule, DetalheContratoPageRoutingModule],
  declarations: [DetalheContratoPage],
})
export class DetalheContratoPageModule {}
