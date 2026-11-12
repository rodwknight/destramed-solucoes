import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { listaStatusProposta } from '../../../enums/status-proposta';
import { ListaProposta } from '../../../interfaces/proposta';

@Component({
  selector: 'app-detalhe-proposta',
  templateUrl: './detalhe-proposta.page.html',
  styleUrls: ['./detalhe-proposta.page.scss'],
  standalone: false,
})
export class DetalhePropostaPage {
  proposta: ListaProposta & {
    dataEnvio?: string;
    validade?: string;
    responsavel?: string;
    observacao?: string;
  };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const routeData = navigation?.extras.state?.['proposta'] as (ListaProposta & {
      dataEnvio?: string;
      validade?: string;
      responsavel?: string;
      observacao?: string;
    }) | undefined;

    this.proposta = routeData ?? {
      id: '1',
      codProposta: 'PROP-2040',
      cliente: { codCliente: 'CLI-001', nomeFantasia: 'Alpha Construções' },
      unidade: { codUnidade: 'UN-001', nomeFantasia: 'Destramed' },
      usuario: { nome: 'Vendas' },
      status: 1,
      createdAt: new Date(),
      dataEnvio: '18/11/2026',
      validade: '30 dias',
      responsavel: 'Vendas',
      observacao: 'Proposta aguardando aprovação da diretoria e do cliente.',
    };
  }

  labelStatus(status: number): string {
    return listaStatusProposta.get(status)?.label ?? 'Em análise';
  }

  typeStatus(status: number): string {
    return listaStatusProposta.get(status)?.type ?? 'medium';
  }

  aprovar(): void {
    this.proposta.status = 2;
  }

  rejeitar(): void {
    this.proposta.status = 3;
  }

  enviar(): void {
    this.proposta.status = 1;
  }
}
