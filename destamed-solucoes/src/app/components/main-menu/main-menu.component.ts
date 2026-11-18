import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { mainMenuItems } from './main-menu-items';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  standalone: false,
})
export class MainMenuComponent {
  readonly menuItems = mainMenuItems;
  private readonly menuCtrl = inject(MenuController);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  async navigateTo(route: string): Promise<void> {
    await this.menuCtrl.close('main-menu');
    await this.router.navigateByUrl(route);
  }

  async logout(): Promise<void> {
    await this.menuCtrl.close('main-menu');
    this.authService.logout();
    await this.router.navigateByUrl('/login');
  }
}
