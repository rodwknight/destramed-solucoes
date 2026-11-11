import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListaContrato } from '../interfaces/contrato';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  private readonly localStorage = new LocalStorageService<ListaContrato[]>();
  private readonly storageKey = 'contratos';

  list(filter: string | undefined = undefined): Observable<{ contratos: ListaContrato[] }> {
    const contratos = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const normalized = (filter ?? '').trim().toLowerCase();
    const lista = normalized
      ? contratos.filter((contrato) =>
          (contrato.codContrato ?? '').toLowerCase().includes(normalized) ||
          (contrato.cliente?.nomeFantasia ?? '').toLowerCase().includes(normalized) ||
          (contrato.unidade?.nomeFantasia ?? '').toLowerCase().includes(normalized),
        )
      : contratos;

    this.localStorage.setItem(this.storageKey, contratos);

    return of({ contratos: lista });
  }

  detalhe(id: string): Observable<{ contrato?: ListaContrato; success: boolean; message: string }> {
    const contratos = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const contrato = contratos.find((item) => item.id === id || item.codContrato === id);

    if (!contrato) {
      return of({ success: false, message: 'Contrato não encontrado.' });
    }

    return of({ contrato, success: true, message: 'Contrato localizado.' });
  }

  update(contrato: ListaContrato, status: number): Observable<{ contratos: ListaContrato[]; success: boolean; message: string }> {
    const contratos = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const index = contratos.findIndex((item) => item.id === contrato.id || item.codContrato === contrato.codContrato);

    if (index >= 0) {
      contratos[index] = { ...contratos[index], ...contrato, status };
      this.localStorage.setItem(this.storageKey, contratos);
      return of({ contratos, success: true, message: 'Contrato atualizado com sucesso.' });
    }

    return of({ contratos, success: false, message: 'Contrato não encontrado.' });
  }

  private buildDefaults(): ListaContrato[] {
    return [
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
      {
        id: 'CT-002',
        codContrato: 'CT-002',
        status: 2,
        propostas: [],
        cliente: { codCliente: 'CLI-002', nomeFantasia: 'Blue Logística' },
        unidade: { codUnidade: 'UN-002', nomeFantasia: 'Nova Infra' },
        usuario: { nome: 'João da Silva' },
        createdAt: new Date(),
      },
    ];
  }
}
