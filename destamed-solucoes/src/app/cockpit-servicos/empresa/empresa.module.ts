import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { EmpresaPage } from './empresa.page';
import { EmpresaPageRoutingModule } from './empresa-routing.module';

import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, EmpresaPageRoutingModule, HeaderModule], declarations: [EmpresaPage],
})
export class EmpresaPageModule {}
