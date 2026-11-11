import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdicionarUsuarioPage } from './adicionar-usuario.page';
import { AdicionarUsuarioPageRoutingModule } from './adicionar-usuario-routing.module';

import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, AdicionarUsuarioPageRoutingModule, HeaderModule], declarations: [AdicionarUsuarioPage],
})
export class AdicionarUsuarioPageModule {}
