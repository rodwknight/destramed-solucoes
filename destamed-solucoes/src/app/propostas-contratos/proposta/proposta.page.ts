import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { listaStatusProposta } from '../../enums/status-proposta';
import { ListaProposta } from '../../interfaces/proposta';
import { LocalStorageService } from '../../services/local-storage.service';
import { PropostaService } from '../../services/proposta.service';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.page.html',
  styleUrls: ['./proposta.page.scss'],
  standalone: false,
})
export class PropostaPage implements OnInit {
  public propostas: ListaProposta[] = [];
  private readonly localStorage = new LocalStorageService();
  private loading?: HTMLIonLoadingElement;
  private toast?: HTMLIonToastElement;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private propostaService: PropostaService,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {}

  async ionViewWillEnter(): Promise<void> {
    this.propostas = await this.buscaLista();
  }

  criarProposta(): void {
    this.router.navigate(['/propostas-contratos/proposta/criar-proposta']);
  }

  labelStatus(status: number): string {
    return listaStatusProposta.get(status)?.label ?? 'Em análise';
  }

  typeStatus(status: number): string {
    return listaStatusProposta.get(status)?.type ?? 'medium';
  }

  detalheProposta(proposta: ListaProposta): void {
    this.router.navigate(['/propostas-contratos/proposta/detalhe-proposta'], {
      state: { proposta },
    });
  }

  async aprovar(propostaSelecionada: ListaProposta): Promise<void> {
    await this.resolveLoading();
    this.loading?.present();

    const { propostas, success, message } = await firstValueFrom(this.propostaService.update(propostaSelecionada, 2));
    this.loading?.dismiss();

    if (success) {
      this.propostas = propostas;
      await this.resolveToast('Proposta aprovada com sucesso!', 'success');
      await this.toast?.present();
    } else {
      await this.resolveToast(message, 'danger');
      await this.toast?.present();
    }
  }

  async reprovar(propostaSelecionada: ListaProposta): Promise<void> {
    await this.resolveLoading();
    this.loading?.present();

    const { propostas, success, message } = await firstValueFrom(this.propostaService.update(propostaSelecionada, 3));
    this.loading?.dismiss();

    if (success) {
      this.propostas = propostas;
      await this.resolveToast('Proposta reprovada com sucesso!', 'success');
      await this.toast?.present();
    } else {
      await this.resolveToast(message, 'danger');
      await this.toast?.present();
    }
  }

  private async buscaLista(): Promise<ListaProposta[]> {
    await this.resolveLoading();
    this.loading?.present();

    const { propostas } = await firstValueFrom(this.propostaService.list());
    this.loading?.dismiss();

    return propostas ?? [];
  }

  private async resolveLoading(): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: 'Buscando propostas...',
    });
  }

  private async resolveToast(message: string, color: string): Promise<void> {
    this.toast = await this.toastCtrl.create({
      message,
      color,
      duration: 5000,
      position: 'bottom',
    });
  }
}
