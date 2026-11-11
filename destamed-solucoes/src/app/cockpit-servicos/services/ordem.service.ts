import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormOrdem, ListaOrdem } from '../interfaces/ordem';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrdemService {
  private readonly localStorage = new LocalStorageService<ListaOrdem[]>();
  private readonly storageKey = 'ordens';

  create(dados: FormOrdem): Observable<{ ordens: ListaOrdem[]; success: boolean; message: string }> {
    const ordens = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const nextItem: ListaOrdem = {
      id: `OS-${String(ordens.length + 1).padStart(3, '0')}`,
      codOrdem: `OS-${String(ordens.length + 1).padStart(3, '0')}`,
      status: 1,
      cliente: { codCliente: dados.idCliente, nomeFantasia: dados.idCliente || 'Cliente não informado' },
      unidade: { codUnidade: dados.idUnidade, nomeFantasia: dados.idUnidade || 'Unidade não informada' },
      usuario: { nome: 'Administrador' },
      createdAt: new Date(),
    };

    const nextList = [nextItem, ...ordens];
    this.localStorage.setItem(this.storageKey, nextList);

    return of({
      ordens: nextList,
      success: true,
      message: 'Ordem salva com sucesso.',
    });
  }

  list(filter: string | undefined = undefined): Observable<{ ordens: ListaOrdem[] }> {
    const ordens = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const normalized = (filter ?? '').trim().toLowerCase();
    const lista = normalized
      ? ordens.filter((ordem) =>
          (ordem.codOrdem ?? '').toLowerCase().includes(normalized) ||
          (ordem.cliente?.nomeFantasia ?? '').toLowerCase().includes(normalized) ||
          (ordem.unidade?.nomeFantasia ?? '').toLowerCase().includes(normalized),
        )
      : ordens;

    this.localStorage.setItem(this.storageKey, ordens);

    return of({ ordens: lista });
  }

  detalhe(id: string): Observable<{ ordem?: ListaOrdem; success: boolean; message: string }> {
    const ordens = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const ordem = ordens.find((item) => item.id === id || item.codOrdem === id);

    if (!ordem) {
      return of({ success: false, message: 'Ordem não encontrada.' });
    }

    return of({ ordem, success: true, message: 'Ordem localizada.' });
  }

  update(ordem: Partial<ListaOrdem>, status: number): Observable<{ ordens: ListaOrdem[]; success: boolean; message: string }> {
    const ordens = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const index = ordens.findIndex((item) => item.id === ordem.id || item.codOrdem === ordem.codOrdem);

    if (index >= 0) {
      ordens[index] = { ...ordens[index], ...ordem, status };
      this.localStorage.setItem(this.storageKey, ordens);
      return of({ ordens, success: true, message: 'Ordem atualizada com sucesso.' });
    }

    return of({ ordens, success: false, message: 'Ordem não encontrada.' });
  }

  private buildDefaults(): ListaOrdem[] {
    return [
      {
        id: 'OS-001',
        codOrdem: 'OS-001',
        status: 1,
        cliente: { codCliente: 'CLI-001', nomeFantasia: 'Alpha Construções' },
        unidade: { codUnidade: 'UN-001', nomeFantasia: 'Destramed' },
        usuario: { nome: 'Administrador' },
        createdAt: new Date(),
      },
      {
        id: 'OS-002',
        codOrdem: 'OS-002',
        status: 2,
        cliente: { codCliente: 'CLI-002', nomeFantasia: 'Blue Logística' },
        unidade: { codUnidade: 'UN-002', nomeFantasia: 'Nova Infra' },
        usuario: { nome: 'João da Silva' },
        createdAt: new Date(),
      },
    ];
  }
}
