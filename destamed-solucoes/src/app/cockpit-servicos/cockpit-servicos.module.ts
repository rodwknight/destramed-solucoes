import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../components/header/header.module';
import { CockpitServicosPage } from './cockpit-servicos.page';
import { CockpitServicosPageRoutingModule } from './cockpit-servicos-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, HeaderModule, CockpitServicosPageRoutingModule],
  declarations: [CockpitServicosPage],
})
export class CockpitServicosPageModule {}
