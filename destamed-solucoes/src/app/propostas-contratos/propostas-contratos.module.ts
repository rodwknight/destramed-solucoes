import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../components/header/header.module';
import { ContratoPage } from './contrato/contrato.page';
import { PropostasContratosPageRoutingModule } from './propostas-contratos-routing.module';
import { PropostasContratosPage } from './propostas-contratos.page';

@NgModule({
  imports: [CommonModule, IonicModule, HeaderModule, PropostasContratosPageRoutingModule],
  declarations: [ContratoPage, PropostasContratosPage],
})
export class PropostasContratosPageModule {}
