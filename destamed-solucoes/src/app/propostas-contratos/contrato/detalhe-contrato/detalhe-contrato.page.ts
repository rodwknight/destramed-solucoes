import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { StatusContrato, listaStatusContrato } from '../../../enums/status-contrato';
import { DetalheContrato } from '../../../interfaces/contrato';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-detalhe-contrato',
  templateUrl: './detalhe-contrato.page.html',
  styleUrls: ['./detalhe-contrato.page.scss'],
  standalone: false,
})
export class DetalheContratoPage implements OnInit {
  contrato?: DetalheContrato;
  private readonly localStorage = new LocalStorageService();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController,
    private readonly contratoService: ContratoService,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      await this.router.navigate(['/propostas-contratos/contrato']);
      return;
    }

    await this.carregarContrato(id);
  }

  labelStatus(status: number): string {
    return listaStatusContrato.get(status)?.label ?? 'Em análise';
  }

  typeStatus(status: number): string {
    return listaStatusContrato.get(status)?.type ?? 'medium';
  }

  aprovar(): Promise<void> {
    return this.atualizarStatus(StatusContrato.APROVADO, 'Contrato aprovado com sucesso!');
  }

  rejeitar(): Promise<void> {
    return this.atualizarStatus(StatusContrato.REJEITADO, 'Contrato rejeitado com sucesso!');
  }

  private async carregarContrato(id: string): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando contrato...' });
    await loading.present();

    try {
      const result = await firstValueFrom(this.contratoService.detalhe(id));
      if (!result.success || !result.contrato) {
        await this.mostrarMensagem(result.message, 'danger');
        await this.router.navigate(['/propostas-contratos/contrato']);
        return;
      }

      this.contrato = result.contrato;
    } finally {
      await loading.dismiss();
    }
  }

  private async atualizarStatus(status: StatusContrato, successMessage: string): Promise<void> {
    const contrato = this.contrato;
    if (!contrato || contrato.status !== StatusContrato.EM_ANALISE) {
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Atualizando contrato...' });
    await loading.present();

    try {
      const result = await firstValueFrom(this.contratoService.update(contrato, status));
      if (result.success) {
        const updated = result.contratos.find((item) => item.id === contrato.id);
        this.contrato = { ...contrato, ...updated, status };
      }

      await this.mostrarMensagem(
        result.success ? successMessage : result.message,
        result.success ? 'success' : 'danger',
      );
    } finally {
      await loading.dismiss();
    }
  }

  private async mostrarMensagem(message: string, color: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 4000,
      position: 'bottom',
    });
    await toast.present();
  }
}
