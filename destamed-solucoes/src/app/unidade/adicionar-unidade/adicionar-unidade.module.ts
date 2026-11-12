import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdicionarUnidadePage } from './adicionar-unidade.page';
import { AdicionarUnidadePageRoutingModule } from './adicionar-unidade-routing.module';

import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, AdicionarUnidadePageRoutingModule, HeaderModule], declarations: [AdicionarUnidadePage],
})
export class AdicionarUnidadePageModule {}
