import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UsuarioPage } from './usuario.page';
import { UsuarioPageRoutingModule } from './usuario-routing.module';

import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, UsuarioPageRoutingModule, HeaderModule], declarations: [UsuarioPage],
})
export class UsuarioPageModule {}
