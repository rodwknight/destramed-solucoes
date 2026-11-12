import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../components/header/header.module';
import { OrdemPageRoutingModule } from './ordem-routing.module';
import { OrdemPage } from './ordem.page';

@NgModule({
  imports: [CommonModule, IonicModule, HeaderModule, OrdemPageRoutingModule],
  declarations: [OrdemPage],
})
export class OrdemPageModule {}
