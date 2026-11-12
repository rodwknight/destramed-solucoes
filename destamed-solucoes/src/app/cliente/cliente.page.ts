import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormCliente } from '../interfaces';
import { ClienteService } from '../services/cliente.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: false,
})
export class ClientePage {
  private readonly router = inject(Router);
  private readonly clienteService = inject(ClienteService);
  private readonly localStorage = inject(LocalStorageService);
  public clientes: FormCliente[] = [];

  constructor() {
    if (!this.localStorage.exists('accesskey')) {
      void this.router.navigate(['/login']);
    }
  }

  async ionViewWillEnter(): Promise<void> {
    await this.buscaLista();
  }

  public adicionarCliente = (): void => {
    this.router.navigate(['/cliente/adicionar-cliente']);
  };

  public async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const { clientes } = await firstValueFrom(this.clienteService.list(searchValue ?? undefined));
    this.clientes = clientes;
  }

  private async buscaLista(): Promise<void> {
    const { clientes } = await firstValueFrom(this.clienteService.list());
    this.clientes = clientes;
  }
}
