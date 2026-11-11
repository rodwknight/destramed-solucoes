import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormCliente } from '../interfaces';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: false,
})
export class ClientePage implements OnInit {
  public clientes: FormCliente[] = [];
  private localStorage = new LocalStorageService<FormCliente[]>();

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.clientes = await this.buscaLista();
  }

  public adicionarCliente = (): void => {
    this.router.navigate(['/cliente/adicionar-cliente']);
  };

  public async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const data = this.localStorage.getItem('clientes') ?? [];
    const term = (searchValue ?? '').trim().toLowerCase();

    if (!term) {
      this.clientes = data as FormCliente[];
      return;
    }

    this.clientes = (data as FormCliente[]).filter((cliente) =>
      (cliente.nomeFantasia ?? '').toLowerCase().includes(term) ||
      (cliente.representante ?? '').toLowerCase().includes(term) ||
      (cliente.codCliente ?? '').toLowerCase().includes(term),
    );
  }

  private async buscaLista(): Promise<FormCliente[]> {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando clientes...',
    });

    await loading.present();

    const clientes = (this.localStorage.getItem('clientes') ?? []) as FormCliente[];

    if (!clientes.length) {
      const defaultClientes: FormCliente[] = [
        {
          cnpj: '11.222.333/0001-44',
          razaoSocial: 'Alpha Construções Ltda',
          nomeFantasia: 'Alpha Construções',
          representante: 'Ana Souza',
          rg: '10.101.010',
          cpf: '111.222.333-44',
          rua: 'Avenida Brasil',
          numero: '120',
          complemento: '',
          pais: 'Brasil',
          estado: 'SP',
          cidade: 'São Paulo',
          cep: '01000-000',
          bairro: 'Centro',
          telefone: '(11) 3333-4444',
          celular: '(11) 98888-1111',
          email: 'contato@alphaconstrucoes.com',
          codCliente: 'CLI-001',
          status: 1,
          funcionarios: 18,
          createdAt: new Date(),
        },
        {
          cnpj: '22.333.444/0001-55',
          razaoSocial: 'Blue Logística S.A.',
          nomeFantasia: 'Blue Logística',
          representante: 'Carlos Almeida',
          rg: '20.202.020',
          cpf: '222.333.444-55',
          rua: 'Rua das Flores',
          numero: '220',
          complemento: 'Bloco B',
          pais: 'Brasil',
          estado: 'PR',
          cidade: 'Curitiba',
          cep: '80000-000',
          bairro: 'Centro Cívico',
          telefone: '(41) 3333-5555',
          celular: '(41) 98888-4444',
          email: 'contato@bluelogistica.com',
          codCliente: 'CLI-002',
          status: 1,
          funcionarios: 32,
          createdAt: new Date(),
        },
      ];

      this.localStorage.setItem('clientes', defaultClientes);
      await loading.dismiss();
      return defaultClientes;
    }

    await loading.dismiss();
    return clientes;
  }
}
