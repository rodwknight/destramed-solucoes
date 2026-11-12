import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  private localStorage = new LocalStorageService();

  cards = [
    {
      title: 'Propostas e Contratos',
      value: '02',
      icon: 'folder-open',
      route: '/propostas-contratos',
      color: 'secondary',
    },
    { title: 'Unidades', value: '05', icon: 'business', route: '/unidade', color: 'secondary' },
    { title: 'Ordens', value: '09', icon: 'file-tray-full', route: '/ordem', color: 'secondary' },
    { title: 'Clientes', value: '18', icon: 'people', route: '/cliente', color: 'secondary' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.menuCtrl.close();
  }

  irPara(route: string): void {
    this.router.navigateByUrl(route);
  }

  abrirConfiguracao(): void {
    this.router.navigate(['/configuracao']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
