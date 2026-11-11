import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ListaContrato } from '../interfaces/contrato';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
  standalone: false,
})
export class ContratoPage implements OnInit {
  private localStorage = new LocalStorageService<ListaContrato[]>();
  contratos: ListaContrato[] = [];

  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.contratos = await this.buscaLista();
  }

  public async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const data = this.localStorage.getItem('contratos') ?? [];
    const term = (searchValue ?? '').trim().toLowerCase();

    if (!term) {
      this.contratos = data as ListaContrato[];
      return;
    }

    this.contratos = (data as ListaContrato[]).filter((contrato) =>
      (contrato.codContrato ?? '').toLowerCase().includes(term) ||
      (contrato.cliente?.nomeFantasia ?? '').toLowerCase().includes(term) ||
      (contrato.unidade?.nomeFantasia ?? '').toLowerCase().includes(term),
    );
  }

  private async buscaLista(): Promise<ListaContrato[]> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando contratos...' });
    await loading.present();

    const contratos = (this.localStorage.getItem('contratos') ?? []) as ListaContrato[];

    if (!contratos.length) {
      const defaultContratos: ListaContrato[] = [
        {
          id: 'CT-001',
          codContrato: 'CT-001',
          status: 1,
          propostas: [],
          cliente: { codCliente: 'CLI-001', nomeFantasia: 'Alpha Construções' },
          unidade: { codUnidade: 'UN-001', nomeFantasia: 'Destramed' },
          usuario: { nome: 'Administrador' },
          createdAt: new Date(),
        },
      ];

      this.localStorage.setItem('contratos', defaultContratos);
      await loading.dismiss();
      return defaultContratos;
    }

    await loading.dismiss();
    return contratos;
  }
}
