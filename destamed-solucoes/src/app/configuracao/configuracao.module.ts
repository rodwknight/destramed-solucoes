import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConfiguracaoPage } from './configuracao.page';
import { ConfiguracaoPageRoutingModule } from './configuracao-routing.module';

import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, ConfiguracaoPageRoutingModule, HeaderModule], declarations: [ConfiguracaoPage],
})
export class ConfiguracaoPageModule {}
