import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../components/header/header.module';
import { ContratoPage } from './contrato/contrato.page';
import { CockpitServicosPage } from './cockpit-servicos.page';
import { CockpitServicosPageRoutingModule } from './cockpit-servicos-routing.module';
import { OrdemPage } from './ordem/ordem.page';

@NgModule({
  imports: [CommonModule, IonicModule, HeaderModule, CockpitServicosPageRoutingModule],
  declarations: [CockpitServicosPage, ContratoPage, OrdemPage],
})
export class CockpitServicosPageModule {}
