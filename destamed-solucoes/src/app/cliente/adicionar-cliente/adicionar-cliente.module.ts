import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../../components/header/header.module';
import { AdicionarClientePageRoutingModule } from './adicionar-cliente-routing.module';
import { AdicionarClientePage } from './adicionar-cliente.page';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, HeaderModule, AdicionarClientePageRoutingModule],
  declarations: [AdicionarClientePage],
})
export class AdicionarClientePageModule {}
