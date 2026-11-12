import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormProposta, ListaProposta } from '../interfaces/proposta';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  private readonly localStorage = new LocalStorageService<ListaProposta[]>();
  private readonly storageKey = 'propostas';

  create(dados: FormProposta): Observable<{ proposta?: ListaProposta; success: boolean; message: string }> {
    const propostas = this.localStorage.getItem(this.storageKey) ?? this.buildDefaultPropostas();
    const nextId = `${Date.now()}`;
    const responsavel = String((dados as Record<string, unknown>)['responsavel'] ?? 'Não informado');
    const observacao = (dados as Record<string, unknown>)['observacao'] ?? '';

    const nextProposta: ListaProposta = {
      id: nextId,
      codProposta: `PROP-${String(propostas.length + 1).padStart(3, '0')}`,
      unidade: {
        codUnidade: dados.idUnidade,
        nomeFantasia: dados.idUnidade || 'Unidade não informada',
      },
      cliente: {
        codCliente: dados.idCliente,
        nomeFantasia: dados.idCliente || 'Cliente não informado',
      },
      usuario: {
        nome: responsavel,
      },
      status: 1,
      createdAt: new Date(),
      observacao,
      total: dados.total ?? 0,
      servicos: dados.servicos ?? [],
    };

    propostas.unshift(nextProposta);
    this.localStorage.setItem(this.storageKey, propostas);

    return of({
      proposta: nextProposta,
      success: true,
      message: 'Proposta criada com sucesso!',
    });
  }

  list(): Observable<{ propostas: ListaProposta[] }> {
    const stored = this.localStorage.getItem(this.storageKey);
    const propostas = stored && stored.length ? stored : this.buildDefaultPropostas();

    if (!stored || stored.length === 0) {
      this.localStorage.setItem(this.storageKey, propostas);
    }

    return of({ propostas });
  }

  update(
    proposta: ListaProposta,
    status: number,
  ): Observable<{ propostas: ListaProposta[]; success: boolean; message: string }> {
    const propostas = this.localStorage.getItem(this.storageKey) ?? this.buildDefaultPropostas();
    const index = propostas.findIndex((item) => item.id === proposta.id);

    if (index >= 0) {
      propostas[index] = {
        ...propostas[index],
        status,
      };
      this.localStorage.setItem(this.storageKey, propostas);
    }

    const success = index >= 0;
    const message = success ? 'Operação realizada com sucesso.' : 'Proposta não encontrada.';

    return of({ propostas, success, message });
  }

  private buildDefaultPropostas(): ListaProposta[] {
    const date = new Date();

    return [
      {
        id: '1',
        codProposta: 'PROP-001',
        unidade: {
          codUnidade: 'UN-001',
          nomeFantasia: 'Destramed',
        },
        cliente: {
          codCliente: 'CLI-001',
          nomeFantasia: 'Alpha Construções',
        },
        usuario: {
          nome: 'Maria Santos',
        },
        status: 1,
        createdAt: new Date(date.getTime() - 86400000),
      },
      {
        id: '2',
        codProposta: 'PROP-002',
        unidade: {
          codUnidade: 'UN-002',
          nomeFantasia: 'Nova Infra',
        },
        cliente: {
          codCliente: 'CLI-002',
          nomeFantasia: 'Blue Logística',
        },
        usuario: {
          nome: 'Pedro Rocha',
        },
        status: 2,
        createdAt: new Date(date.getTime() - 172800000),
      },
      {
        id: '3',
        codProposta: 'PROP-003',
        unidade: {
          codUnidade: 'UN-003',
          nomeFantasia: 'Lumen Sistemas',
        },
        cliente: {
          codCliente: 'CLI-003',
          nomeFantasia: 'Nova Infra',
        },
        usuario: {
          nome: 'Joana Souza',
        },
        status: 3,
        createdAt: new Date(date.getTime() - 259200000),
      },
    ];
  }
}
