import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Empresa } from '../interfaces/empresa';
import { LocalStorageService } from '../services/local-storage.service';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
  standalone: false,
})
export class EmpresaPage implements OnInit {
  public empresas: Empresa[] = [];
  private localStorage = new LocalStorageService();

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private empresaService: EmpresaService,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.empresas = await this.buscaLista();
  }

  public adicionarEmpresa(): void {
    this.router.navigate(['/cockpit-servicos/empresa/adicionar-empresa']);
  }

  public async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const term = (searchValue ?? '').trim().toLowerCase();
    const { empresas } = await firstValueFrom(this.empresaService.list(term));
    this.empresas = empresas;
  }

  private async buscaLista(): Promise<Empresa[]> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando empresas...' });
    await loading.present();

    const { empresas } = await firstValueFrom(this.empresaService.list());

    await loading.dismiss();
    return empresas ?? [];
  }
}
