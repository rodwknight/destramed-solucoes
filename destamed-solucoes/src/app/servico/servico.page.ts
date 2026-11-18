import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { FormServico } from '../interfaces';
import { ServicoService } from '../services/servico.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
  standalone: false,
})
export class ServicoPage {
  private readonly router = inject(Router);
  private readonly servicoService = inject(ServicoService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly localStorage = inject(LocalStorageService);
  servicos: FormServico[] = [];

  constructor() {
    if (!this.localStorage.exists('accesskey')) {
      void this.router.navigate(['/login']);
    }
  }

  async ionViewWillEnter(): Promise<void> {
    await this.buscaLista();
  }

  adicionarServico(): void {
    this.router.navigate(['/servico/criar-servico']);
  }

  async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const { servicos } = await firstValueFrom(this.servicoService.list(searchValue ?? undefined));
    this.servicos = servicos;
  }

  private async buscaLista(): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando serviços...' });
    await loading.present();

    try {
      const { servicos } = await firstValueFrom(this.servicoService.list());
      this.servicos = servicos;
    } finally {
      await loading.dismiss();
    }
  }
}
