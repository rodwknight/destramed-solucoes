import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CriarPropostaPageRoutingModule } from './criar-proposta-routing.module';
import { CriarPropostaPage } from './criar-proposta.page';

import { HeaderModule } from '../../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, CriarPropostaPageRoutingModule, HeaderModule], declarations: [CriarPropostaPage],
})
export class CriarPropostaPageModule {}
