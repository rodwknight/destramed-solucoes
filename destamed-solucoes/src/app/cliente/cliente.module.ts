import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ClientePage } from './cliente.page';
import { ClientePageRoutingModule } from './cliente-routing.module';

import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ClientePageRoutingModule, HeaderModule], declarations: [ClientePage],
})
export class ClientePageModule {}
