import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UnidadePage } from './unidade.page';
import { UnidadePageRoutingModule } from './unidade-routing.module';

import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, UnidadePageRoutingModule, HeaderModule], declarations: [UnidadePage],
})
export class UnidadePageModule {}
