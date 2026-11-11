import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ListaOrdem } from '../interfaces/ordem';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.page.html',
  styleUrls: ['./ordem.page.scss'],
  standalone: false,
})
export class OrdemPage implements OnInit {
  private localStorage = new LocalStorageService<ListaOrdem[]>();
  ordens: ListaOrdem[] = [];

  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.ordens = await this.buscaLista();
  }

  public async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const data = this.localStorage.getItem('ordens') ?? [];
    const term = (searchValue ?? '').trim().toLowerCase();

    if (!term) {
      this.ordens = data as ListaOrdem[];
      return;
    }

    this.ordens = (data as ListaOrdem[]).filter((ordem) =>
      (ordem.codOrdem ?? '').toLowerCase().includes(term) ||
      (ordem.cliente?.nomeFantasia ?? '').toLowerCase().includes(term) ||
      (ordem.unidade?.nomeFantasia ?? '').toLowerCase().includes(term),
    );
  }

  private async buscaLista(): Promise<ListaOrdem[]> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando ordens...' });
    await loading.present();

    const ordens = (this.localStorage.getItem('ordens') ?? []) as ListaOrdem[];

    if (!ordens.length) {
      const defaultOrdens: ListaOrdem[] = [
        {
          id: 'OS-001',
          codOrdem: 'OS-001',
          status: 1,
          cliente: { codCliente: 'CLI-001', nomeFantasia: 'Alpha Construções' },
          unidade: { codUnidade: 'UN-001', nomeFantasia: 'Destramed' },
          usuario: { nome: 'Administrador' },
          createdAt: new Date(),
        },
      ];

      this.localStorage.setItem('ordens', defaultOrdens);
      await loading.dismiss();
      return defaultOrdens;
    }

    await loading.dismiss();
    return ordens;
  }
}
