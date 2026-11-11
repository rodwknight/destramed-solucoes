import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdicionarEmpresaPage } from './adicionar-empresa.page';
import { AdicionarEmpresaPageRoutingModule } from './adicionar-empresa-routing.module';

import { HeaderModule } from '../../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, AdicionarEmpresaPageRoutingModule, HeaderModule], declarations: [AdicionarEmpresaPage],
})
export class AdicionarEmpresaPageModule {}
