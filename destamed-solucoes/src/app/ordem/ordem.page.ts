import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { listaStatusOrdem, StatusOrdem } from '../enums/status-ordem';
import { ListaOrdem } from '../interfaces/ordem';
import { OrdemService } from '../services/ordem.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.page.html',
  styleUrls: ['./ordem.page.scss'],
  standalone: false,
})
export class OrdemPage {
  ordens: ListaOrdem[] = [];
  private readonly router = inject(Router);
  private readonly ordemService = inject(OrdemService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);
  private readonly localStorage = inject(LocalStorageService);

  constructor() {
    if (!this.localStorage.exists('accesskey')) {
      void this.router.navigate(['/login']);
    }
  }

  async ionViewWillEnter(): Promise<void> {
    await this.buscaLista();
  }

  labelStatus(status: number): string {
    return listaStatusOrdem.get(status as StatusOrdem)?.label ?? 'Desconhecido';
  }

  typeStatus(status: number): string {
    return listaStatusOrdem.get(status as StatusOrdem)?.type ?? 'medium';
  }

  adicionarOrdem(): void {
    this.router.navigate(['/ordem/criar-ordem']);
  }

  detalheOrdem(ordem: ListaOrdem): void {
    this.router.navigate(['/ordem/detalhe-ordem', ordem.id], {
      state: { ordem },
    });
  }

  async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const { ordens } = await firstValueFrom(this.ordemService.list(searchValue ?? undefined));
    this.ordens = ordens;
  }

  iniciar(ordem: ListaOrdem): Promise<void> {
    return this.updateStatus(ordem, StatusOrdem.INICIADO, 'Ordem iniciada com sucesso!');
  }

  finalizar(ordem: ListaOrdem): Promise<void> {
    return this.updateStatus(ordem, StatusOrdem.FINALIZADO, 'Ordem finalizada com sucesso!');
  }

  cancelar(ordem: ListaOrdem): Promise<void> {
    return this.updateStatus(ordem, StatusOrdem.CANCELADO, 'Ordem cancelada com sucesso!');
  }

  private async buscaLista(): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando ordens...' });
    await loading.present();

    try {
      const { ordens } = await firstValueFrom(this.ordemService.list());
      this.ordens = ordens;
    } finally {
      await loading.dismiss();
    }
  }

  private async updateStatus(ordem: ListaOrdem, status: StatusOrdem, successMessage: string): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Atualizando ordem...' });
    await loading.present();

    try {
      const result = await firstValueFrom(this.ordemService.update(ordem, status));
      if (result.success) {
        this.ordens = result.ordens;
      }

      const toast = await this.toastCtrl.create({
        message: result.success ? successMessage : result.message,
        color: result.success ? 'success' : 'danger',
        duration: 5000,
        position: 'bottom',
      });
      await toast.present();
    } finally {
      await loading.dismiss();
    }
  }
}
