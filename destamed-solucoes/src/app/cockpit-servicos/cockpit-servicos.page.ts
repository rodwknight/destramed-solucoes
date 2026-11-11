import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cockpit-servicos',
  templateUrl: './cockpit-servicos.page.html',
  styleUrls: ['./cockpit-servicos.page.scss'],
  standalone: false,
})
export class CockpitServicosPage {
  isChildRoute = false;

  cards = [
    { title: 'Contratos', value: '24', icon: 'briefcase', route: '/cockpit-servicos/contrato', color: 'secondary' },
    { title: 'Empresas', value: '04', icon: 'business', route: '/cockpit-servicos/empresa', color: 'secondary' },
    { title: 'Ordens', value: '09', icon: 'file-tray-full', route: '/cockpit-servicos/ordem', color: 'secondary' },
    { title: 'Propostas', value: '12', icon: 'create', route: '/cockpit-servicos/proposta', color: 'secondary' },
    { title: 'Serviços', value: '07', icon: 'construct', route: '/cockpit-servicos/servico', color: 'secondary' },
    { title: 'Unidades', value: '05', icon: 'business', route: '/cockpit-servicos/unidade', color: 'secondary' },
    { title: 'Usuários', value: '04', icon: 'person', route: '/cockpit-servicos/usuario', color: 'secondary' },
  ];

  constructor(private router: Router) {
    this.updateRouteState(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.updateRouteState(event.urlAfterRedirects));
  }

  private updateRouteState(url: string): void {
    this.isChildRoute = url.startsWith('/cockpit-servicos/') && url !== '/cockpit-servicos';
  }

  irPara(route: string): void {
    this.router.navigate([route]);
  }
}
