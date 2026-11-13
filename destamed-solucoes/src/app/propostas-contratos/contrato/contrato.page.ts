import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { StatusContrato, listaStatusContrato } from '../../enums/status-contrato';
import { ListaContrato } from '../../interfaces/contrato';
import { LocalStorageService } from '../../services/local-storage.service';
import { ContratoService } from '../../services/contrato.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
  standalone: false,
})
export class ContratoPage {
  contratos: ListaContrato[] = [];
  private readonly localStorage = new LocalStorageService();

  constructor(
    private readonly router: Router,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController,
    private readonly contratoService: ContratoService,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ionViewWillEnter(): Promise<void> {
    this.contratos = await this.buscaLista();
  }

  async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const { contratos } = await firstValueFrom(this.contratoService.list(searchValue ?? undefined));
    this.contratos = contratos;
  }

  labelStatus(status: number): string {
    return listaStatusContrato.get(status)?.label ?? 'Em análise';
  }

  typeStatus(status: number): string {
    return listaStatusContrato.get(status)?.type ?? 'medium';
  }

  detalheContrato(contrato: ListaContrato): void {
    this.router.navigate(['/propostas-contratos/contrato/detalhe-contrato', contrato.id]);
  }

  aprovar(contrato: ListaContrato): Promise<void> {
    return this.atualizarStatus(contrato, StatusContrato.APROVADO, 'Contrato aprovado com sucesso!');
  }

  reprovar(contrato: ListaContrato): Promise<void> {
    return this.atualizarStatus(contrato, StatusContrato.REJEITADO, 'Contrato reprovado com sucesso!');
  }

  private async buscaLista(): Promise<ListaContrato[]> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando contratos...' });
    await loading.present();

    try {
      const { contratos } = await firstValueFrom(this.contratoService.list());
      return contratos;
    } finally {
      await loading.dismiss();
    }
  }

  private async atualizarStatus(contrato: ListaContrato, status: StatusContrato, successMessage: string): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Atualizando contrato...' });
    await loading.present();

    try {
      const result = await firstValueFrom(this.contratoService.update(contrato, status));
      if (result.success) {
        this.contratos = result.contratos;
      }

      const toast = await this.toastCtrl.create({
        message: result.success ? successMessage : result.message,
        color: result.success ? 'success' : 'danger',
        duration: 4000,
        position: 'bottom',
      });
      await toast.present();
    } finally {
      await loading.dismiss();
    }
  }
}
