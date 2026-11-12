import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../../components/header/header.module';
import { CriarOrdemPageRoutingModule } from './criar-ordem-routing.module';
import { CriarOrdemPage } from './criar-ordem.page';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, HeaderModule, CriarOrdemPageRoutingModule],
  declarations: [CriarOrdemPage],
})
export class CriarOrdemPageModule {}
