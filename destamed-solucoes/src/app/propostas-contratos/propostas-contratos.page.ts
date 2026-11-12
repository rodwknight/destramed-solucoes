import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propostas-contratos',
  templateUrl: './propostas-contratos.page.html',
  styleUrls: ['./propostas-contratos.page.scss'],
  standalone: false,
})
export class PropostasContratosPage {
  cards = [
    {
      title: 'Propostas',
      value: '12',
      icon: 'create',
      route: '/propostas-contratos/proposta',
      color: 'secondary',
    },
    {
      title: 'Contratos',
      value: '24',
      icon: 'briefcase',
      route: '/propostas-contratos/contrato',
      color: 'secondary',
    },
  ];

  constructor(private router: Router) {}

  irPara(route: string): void {
    this.router.navigate([route]);
  }
}
