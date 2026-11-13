import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { listaStatusProposta, StatusProposta } from '../../../enums/status-proposta';
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

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
  ) {
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

  async aprovar(): Promise<void> {
    if (this.proposta.status !== StatusProposta.EM_ANALISE) {
      return;
    }

    const alert = await this.alertCtrl.create({
      message: 'A proposta foi enviada para o cliente e aprovada?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.proposta.status = StatusProposta.APROVADO;
          },
        },
      ],
    });

    await alert.present();
  }

  rejeitar(): void {
    if (this.proposta.status !== StatusProposta.EM_ANALISE) {
      return;
    }

    this.proposta.status = StatusProposta.REJEITADO;
  }

  enviar(): void {
    if (this.proposta.status !== StatusProposta.EM_ANALISE) {
      return;
    }

    this.proposta.status = StatusProposta.EM_ANALISE;
  }
}
