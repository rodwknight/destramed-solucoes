import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Empresa } from '../interfaces/empresa';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private readonly localStorage = new LocalStorageService<Empresa[]>();
  private readonly storageKey = 'empresas';

  list(filter: string | undefined = undefined): Observable<{ empresas: Empresa[] }> {
    const empresas = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const normalized = (filter ?? '').trim().toLowerCase();
    const lista = normalized
      ? empresas.filter((empresa) =>
          (empresa.nome ?? '').toLowerCase().includes(normalized) ||
          (empresa.razaoSocial ?? '').toLowerCase().includes(normalized),
        )
      : empresas;

    this.localStorage.setItem(this.storageKey, empresas);
    return of({ empresas: lista });
  }

  create(dados: Empresa): Observable<{ empresas: Empresa[]; success: boolean; message: string }> {
    const empresas = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const nextItem: Empresa = {
      ...dados,
      id: dados.id ?? `EMP-${String(empresas.length + 1).padStart(3, '0')}`,
      status: dados.status ?? 1,
      createdAt: new Date(),
    };

    const nextList = [nextItem, ...empresas];
    this.localStorage.setItem(this.storageKey, nextList);
    return of({ empresas: nextList, success: true, message: 'Empresa salva com sucesso.' });
  }

  private buildDefaults(): Empresa[] {
    return [
      { id: 'EMP-001', nome: 'Destramed Soluções', razaoSocial: 'Destramed Soluções Ltda', cnpj: '11.222.333/0001-44', status: 1, createdAt: new Date() },
      { id: 'EMP-002', nome: 'Padrao Operações', razaoSocial: 'Padrao Operações S.A.', cnpj: '22.333.444/0001-55', status: 1, createdAt: new Date() },
    ];
  }
}
