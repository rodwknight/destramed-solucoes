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
    const nextCode = `OS-${String(ordens.length + 1).padStart(3, '0')}`;
    const nextItem: ListaOrdem = {
      id: nextCode,
      codOrdem: nextCode,
      status: 1,
      cliente: dados.cliente ?? {
        codCliente: dados.idCliente,
        nomeFantasia: dados.idCliente || 'Cliente não informado',
      },
      unidade: dados.unidade ?? {
        codUnidade: dados.idUnidade,
        nomeFantasia: dados.idUnidade || 'Unidade não informada',
      },
      usuario: dados.usuario ?? { nome: 'Administrador' },
      funcionarios: dados.funcionarios,
      deslocamento: dados.deslocamento,
      valorDeslocamento: dados.valorDeslocamento,
      total: dados.total ?? 0,
      ordemServicos: (dados.servicos ?? []).map((servico) => ({
        valor: Number(servico.valor) || 0,
        servicos: {
          codServico: servico.codServico ?? '',
          descricao: servico.descricaoProposta || servico.descricao || servico.nome || '',
        },
      })),
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
        funcionarios: 18,
        deslocamento: false,
        valorDeslocamento: 0,
        total: 2500,
        ordemServicos: [
          {
            valor: 2500,
            servicos: { codServico: 'SRV-001', descricao: 'Diagnóstico completo de segurança da operação.' },
          },
        ],
        cliente: { codCliente: 'CLI-001', nomeFantasia: 'Alpha Construções' },
        unidade: { codUnidade: 'UN-001', nomeFantasia: 'Destramed' },
        usuario: { nome: 'Administrador' },
        createdAt: new Date(),
      },
      {
        id: 'OS-002',
        codOrdem: 'OS-002',
        status: 2,
        funcionarios: 32,
        deslocamento: true,
        valorDeslocamento: 300,
        total: 2100,
        ordemServicos: [
          {
            valor: 1800,
            servicos: { codServico: 'SRV-002', descricao: 'Monitoramento remoto por 30 dias.' },
          },
        ],
        cliente: { codCliente: 'CLI-002', nomeFantasia: 'Blue Logística' },
        unidade: { codUnidade: 'UN-002', nomeFantasia: 'Nova Infra' },
        usuario: { nome: 'João da Silva' },
        createdAt: new Date(),
      },
    ];
  }
}
