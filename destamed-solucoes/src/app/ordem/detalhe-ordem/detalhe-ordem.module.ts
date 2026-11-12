import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../../components/header/header.module';
import { DetalheOrdemPageRoutingModule } from './detalhe-ordem-routing.module';
import { DetalheOrdemPage } from './detalhe-ordem.page';

@NgModule({
  imports: [CommonModule, IonicModule, HeaderModule, DetalheOrdemPageRoutingModule],
  declarations: [DetalheOrdemPage],
})
export class DetalheOrdemPageModule {}
