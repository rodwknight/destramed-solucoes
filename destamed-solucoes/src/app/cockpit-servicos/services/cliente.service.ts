import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormCliente } from '../interfaces/cliente';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly localStorage = new LocalStorageService<FormCliente[]>();
  private readonly storageKey = 'clientes';

  create(dados: FormCliente): Observable<{ clientes: FormCliente[]; success: boolean; message: string }> {
    const clientes = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const nextItem: FormCliente = {
      ...dados,
      codCliente: dados.codCliente ?? `CLI-${String(clientes.length + 1).padStart(3, '0')}`,
      status: dados.status ?? 1,
      createdAt: new Date(),
    };

    const nextList = [nextItem, ...clientes];
    this.localStorage.setItem(this.storageKey, nextList);

    return of({
      clientes: nextList,
      success: true,
      message: 'Cliente salvo com sucesso.',
    });
  }

  list(filter: string | undefined = undefined): Observable<{ clientes: FormCliente[] }> {
    const clientes = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const normalized = (filter ?? '').trim().toLowerCase();
    const lista = normalized
      ? clientes.filter((cliente) =>
          (cliente.nomeFantasia ?? '').toLowerCase().includes(normalized) ||
          (cliente.representante ?? '').toLowerCase().includes(normalized) ||
          (cliente.codCliente ?? '').toLowerCase().includes(normalized),
        )
      : clientes;

    this.localStorage.setItem(this.storageKey, clientes);

    return of({ clientes: lista });
  }

  update(cliente: FormCliente, status: number): Observable<{ clientes: FormCliente[]; success: boolean; message: string }> {
    const clientes = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const index = clientes.findIndex((item) => item.codCliente === cliente.codCliente);

    if (index >= 0) {
      clientes[index] = { ...clientes[index], ...cliente, status };
      this.localStorage.setItem(this.storageKey, clientes);
      return of({ clientes, success: true, message: 'Cliente atualizado com sucesso.' });
    }

    return of({ clientes, success: false, message: 'Cliente não encontrado.' });
  }

  private buildDefaults(): FormCliente[] {
    return [
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
  }
}
