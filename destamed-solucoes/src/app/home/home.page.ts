import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { mainMenuItems } from '../components/main-menu/main-menu-items';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  private readonly localStorage = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly menuCtrl = inject(MenuController);
  cards = mainMenuItems;

  constructor() {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  ionViewDidEnter(): void {
    this.menuCtrl.close();
  }

  irPara(route: string): void {
    this.router.navigateByUrl(route);
  }
}
