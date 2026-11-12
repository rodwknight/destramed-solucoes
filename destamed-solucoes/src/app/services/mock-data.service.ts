import { Injectable } from '@angular/core';
import { MockCliente, MockContrato, MockOrdem, MockProposta } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private readonly ordensStorageKey = 'mock_ordens';
  private readonly propostasStorageKey = 'mock_propostas';

  private readStoredData<T>(key: string, fallback: T[]): T[] {
    const stored = localStorage.getItem(key);

    if (!stored) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }

    try {
      return JSON.parse(stored) as T[];
    } catch {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
  }

  private writeStoredData<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getClientes(): MockCliente[] {
    return [
      { id: 1, nome: 'Alpha Construções', contato: 'Ana Souza', status: 'Ativo' },
      { id: 2, nome: 'Blue Logística', contato: 'Carlos Almeida', status: 'Em revisão' },
      { id: 3, nome: 'Nova Infra', contato: 'Marina Silva', status: 'Ativo' },
      { id: 4, nome: 'Lumen Sistemas', contato: 'Pedro Costa', status: 'Inativo' },
    ];
  }

  getContratos(): MockContrato[] {
    return [
      { id: 1, codigo: 'CT-2024-001', cliente: 'Alpha Construções', status: 'Ativo', valor: 'R$ 18.500,00' },
      { id: 2, codigo: 'CT-2024-017', cliente: 'Blue Logística', status: 'Em revisão', valor: 'R$ 9.400,00' },
      { id: 3, codigo: 'CT-2024-032', cliente: 'Nova Infra', status: 'Vencendo', valor: 'R$ 12.900,00' },
      { id: 4, codigo: 'CT-2024-045', cliente: 'Lumen Sistemas', status: 'Ativo', valor: 'R$ 22.000,00' },
    ];
  }

  getOrdens(): MockOrdem[] {
    const defaultOrdens: MockOrdem[] = [
      { id: 1, codigo: 'OS-1045', cliente: 'Alpha Construções', status: 'Em execução' },
      { id: 2, codigo: 'OS-1049', cliente: 'Nova Infra', status: 'Pendente' },
      { id: 3, codigo: 'OS-1052', cliente: 'Blue Logística', status: 'Concluída' },
    ];

    return this.readStoredData(this.ordensStorageKey, defaultOrdens);
  }

  createOrdem(cliente: string, status: MockOrdem['status'] = 'Pendente'): MockOrdem {
    const ordens = this.getOrdens();
    const lastId = ordens.reduce((max, item) => Math.max(max, item.id), 0);
    const novaOrdem: MockOrdem = {
      id: lastId + 1,
      codigo: `OS-${String(lastId + 1).padStart(4, '0')}`,
      cliente,
      status,
    };

    ordens.push(novaOrdem);
    this.writeStoredData(this.ordensStorageKey, ordens);
    return novaOrdem;
  }

  getPropostas(): MockProposta[] {
    const defaultPropostas: MockProposta[] = [
      { id: 1, codigo: 'PR-100', cliente: 'Blue Logística', status: 'Aguardando aprovação' },
      { id: 2, codigo: 'PR-102', cliente: 'Nova Infra', status: 'Aprovada' },
      { id: 3, codigo: 'PR-110', cliente: 'Alpha Construções', status: 'Reprovada' },
    ];

    return this.readStoredData(this.propostasStorageKey, defaultPropostas);
  }

  createProposta(cliente: string, status: MockProposta['status'] = 'Aguardando aprovação'): MockProposta {
    const propostas = this.getPropostas();
    const lastId = propostas.reduce((max, item) => Math.max(max, item.id), 0);
    const novaProposta: MockProposta = {
      id: lastId + 1,
      codigo: `PR-${String(lastId + 1).padStart(3, '0')}`,
      cliente,
      status,
    };

    propostas.push(novaProposta);
    this.writeStoredData(this.propostasStorageKey, propostas);
    return novaProposta;
  }
}

export { MockCliente, MockContrato, MockOrdem, MockProposta };
