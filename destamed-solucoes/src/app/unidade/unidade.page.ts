import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormUnidade } from '../interfaces';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.page.html',
  styleUrls: ['./unidade.page.scss'],
  standalone: false,
})
export class UnidadePage implements OnInit {
  public unidades: FormUnidade[] = [];
  private localStorage = new LocalStorageService<FormUnidade[]>();

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.unidades = await this.buscaLista();
  }

  public adicionarUnidade = (): void => {
    this.router.navigate(['/unidade/adicionar-unidade']);
  };

  public async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const data = this.localStorage.getItem('unidades') ?? [];
    const term = (searchValue ?? '').trim().toLowerCase();

    if (!term) {
      this.unidades = data as FormUnidade[];
      return;
    }

    this.unidades = (data as FormUnidade[]).filter((unidade) =>
      (unidade.nomeFantasia ?? '').toLowerCase().includes(term) ||
      (unidade.representante ?? '').toLowerCase().includes(term) ||
      (unidade.codUnidade ?? '').toLowerCase().includes(term),
    );
  }

  private async buscaLista(): Promise<FormUnidade[]> {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando unidades...',
    });

    await loading.present();

    const unidades = (this.localStorage.getItem('unidades') ?? []) as FormUnidade[];

    if (!unidades.length) {
      const defaultUnidades: FormUnidade[] = [
        {
          cnpj: '11.222.333/0001-44',
          razaoSocial: 'Destramed Operações Ltda',
          nomeFantasia: 'Destramed',
          representante: 'Maria Silva',
          rg: '12.345.678',
          cpf: '123.456.789-09',
          rua: 'Rua das Flores',
          numero: '248',
          complemento: 'Sala 1',
          pais: 'Brasil',
          estado: 'SC',
          cidade: 'Florianópolis',
          cep: '88000-000',
          bairro: 'Centro',
          telefone: '(48) 3333-4444',
          celular: '(48) 99999-4444',
          email: 'contato@destramed.com.br',
          codUnidade: 'UN-001',
          status: 1,
          createdAt: new Date(),
        },
      ];

      this.localStorage.setItem('unidades', defaultUnidades);
      await loading.dismiss();
      return defaultUnidades;
    }

    await loading.dismiss();
    return unidades;
  }
}
