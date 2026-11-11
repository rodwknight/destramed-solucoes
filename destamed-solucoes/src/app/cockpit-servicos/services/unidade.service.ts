import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormUnidade } from '../interfaces/unidade';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UnidadeService {
  private readonly localStorage = new LocalStorageService<FormUnidade[]>();
  private readonly storageKey = 'unidades';

  create(dados: FormUnidade): Observable<{ unidades: FormUnidade[]; success: boolean; message: string }> {
    const unidades = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const nextItem: FormUnidade = {
      ...dados,
      codUnidade: dados.codUnidade ?? `UN-${String(unidades.length + 1).padStart(3, '0')}`,
      status: dados.status ?? 1,
      createdAt: new Date(),
    };

    const nextList = [nextItem, ...unidades];
    this.localStorage.setItem(this.storageKey, nextList);

    return of({
      unidades: nextList,
      success: true,
      message: 'Unidade salva com sucesso.',
    });
  }

  list(filter: string | undefined = undefined): Observable<{ unidades: FormUnidade[] }> {
    const unidades = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const normalized = (filter ?? '').trim().toLowerCase();
    const lista = normalized
      ? unidades.filter((unidade) =>
          (unidade.nomeFantasia ?? '').toLowerCase().includes(normalized) ||
          (unidade.representante ?? '').toLowerCase().includes(normalized) ||
          (unidade.codUnidade ?? '').toLowerCase().includes(normalized),
        )
      : unidades;

    this.localStorage.setItem(this.storageKey, unidades);

    return of({ unidades: lista });
  }

  update(unidade: FormUnidade, status: number): Observable<{ unidades: FormUnidade[]; success: boolean; message: string }> {
    const unidades = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const index = unidades.findIndex((item) => item.codUnidade === unidade.codUnidade);

    if (index >= 0) {
      unidades[index] = { ...unidades[index], ...unidade, status };
      this.localStorage.setItem(this.storageKey, unidades);
      return of({ unidades, success: true, message: 'Unidade atualizada com sucesso.' });
    }

    return of({ unidades, success: false, message: 'Unidade não encontrada.' });
  }

  private buildDefaults(): FormUnidade[] {
    return [
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
  }
}
