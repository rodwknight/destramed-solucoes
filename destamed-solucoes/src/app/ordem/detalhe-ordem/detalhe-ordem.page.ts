import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { listaStatusOrdem, StatusOrdem } from '../../enums/status-ordem';
import { ListaOrdem } from '../../interfaces/ordem';
import { OrdemService } from '../../services/ordem.service';

@Component({
  selector: 'app-detalhe-ordem',
  templateUrl: './detalhe-ordem.page.html',
  styleUrls: ['./detalhe-ordem.page.scss'],
  standalone: false,
})
export class DetalheOrdemPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ordemService = inject(OrdemService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);

  ordem: ListaOrdem = {} as ListaOrdem;

  async ngOnInit(): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando ordem...' });
    await loading.present();
    try {
      const ordemId = this.route.snapshot.paramMap.get('id');
      if (ordemId) {
        const result = await firstValueFrom(this.ordemService.detalhe(ordemId));
        if (result.ordem) {
          this.ordem = result.ordem;
          return;
        }
      }

      await this.showToast('Ordem não encontrada.', 'danger');
      await this.router.navigate(['/ordem']);
    } finally {
      await loading.dismiss();
    }
  }

  labelStatus(status: number): string {
    return listaStatusOrdem.get(status as StatusOrdem)?.label ?? 'Desconhecido';
  }

  typeStatus(status: number): string {
    return listaStatusOrdem.get(status as StatusOrdem)?.type ?? 'medium';
  }

  iniciar(): Promise<void> {
    return this.updateStatus(StatusOrdem.INICIADO, 'Ordem iniciada com sucesso!');
  }

  finalizar(): Promise<void> {
    return this.updateStatus(StatusOrdem.FINALIZADO, 'Ordem finalizada com sucesso!');
  }

  cancelar(): Promise<void> {
    return this.updateStatus(StatusOrdem.CANCELADO, 'Ordem cancelada com sucesso!');
  }

  private async updateStatus(status: StatusOrdem, successMessage: string): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Atualizando ordem...' });
    await loading.present();
    try {
      const result = await firstValueFrom(this.ordemService.update(this.ordem, status));
      if (result.success) {
        this.ordem = result.ordens.find((item) => item.id === this.ordem.id) ?? {
          ...this.ordem,
          status,
        };
      }

      await this.showToast(
        result.success ? successMessage : result.message,
        result.success ? 'success' : 'danger',
      );
    } finally {
      await loading.dismiss();
    }
  }

  private async showToast(message: string, color: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, color, duration: 5000, position: 'bottom' });
    await toast.present();
  }
}
