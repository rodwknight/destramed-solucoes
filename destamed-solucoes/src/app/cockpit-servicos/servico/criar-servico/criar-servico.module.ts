import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CriarServicoPage } from './criar-servico.page';
import { CriarServicoPageRoutingModule } from './criar-servico-routing.module';

import { HeaderModule } from '../../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, CriarServicoPageRoutingModule, HeaderModule], declarations: [CriarServicoPage],
})
export class CriarServicoPageModule {}
