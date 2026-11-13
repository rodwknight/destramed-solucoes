import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DetalheContrato, ListaContrato } from '../interfaces/contrato';
import { StatusContrato } from '../enums/status-contrato';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  private readonly localStorage = new LocalStorageService<ListaContrato[]>();
  private readonly storageKey = 'contratos';

  list(filter: string | undefined = undefined): Observable<{ contratos: ListaContrato[] }> {
    const contratos = this.getContratos();
    const normalized = (filter ?? '').trim().toLowerCase();
    const lista = normalized
      ? contratos.filter((contrato) =>
          (contrato.codContrato ?? '').toLowerCase().includes(normalized) ||
          (contrato.cliente?.nomeFantasia ?? '').toLowerCase().includes(normalized) ||
          (contrato.unidade?.nomeFantasia ?? '').toLowerCase().includes(normalized),
        )
      : contratos;

    return of({ contratos: lista });
  }

  detalhe(id: string): Observable<{ contrato?: DetalheContrato; success: boolean; message: string }> {
    const contratos = this.getContratos();
    const item = contratos.find((contrato) => contrato.id === id || contrato.codContrato === id);

    if (!item) {
      return of({ success: false, message: 'Contrato não encontrado.' });
    }

    const contrato: DetalheContrato = {
      ...item,
      funcionarios: item.funcionarios ?? 0,
      deslocamento: item.deslocamento ?? false,
      valorDeslocamento: item.valorDeslocamento ?? 0,
      total: item.total ?? 0,
      idProposta: item.idProposta ?? '',
      codProposta: item.codProposta ?? '',
      statusProposta: item.statusProposta ?? StatusContrato.APROVADO,
      servicos: item.servicos ?? [],
    };

    return of({ contrato, success: true, message: 'Contrato localizado.' });
  }

  update(contrato: ListaContrato, status: number): Observable<{ contratos: ListaContrato[]; success: boolean; message: string }> {
    const contratos = this.getContratos();
    const index = contratos.findIndex((item) => item.id === contrato.id || item.codContrato === contrato.codContrato);

    if (index >= 0) {
      contratos[index] = { ...contratos[index], ...contrato, status };
      this.localStorage.setItem(this.storageKey, contratos);
      return of({ contratos, success: true, message: 'Contrato atualizado com sucesso.' });
    }

    return of({ contratos, success: false, message: 'Contrato não encontrado.' });
  }

  private getContratos(): ListaContrato[] {
    const contratos = this.localStorage.getItem(this.storageKey);

    if (contratos) {
      return contratos;
    }

    const defaults = this.buildDefaults();
    this.localStorage.setItem(this.storageKey, defaults);
    return defaults;
  }

  private buildDefaults(): ListaContrato[] {
    return [
      {
        id: 'CT-001',
        codContrato: 'CT-001',
        status: StatusContrato.EM_ANALISE,
        cliente: { codCliente: 'CLI-001', nomeFantasia: 'Alpha Construções' },
        unidade: { codUnidade: 'UN-001', nomeFantasia: 'Destramed' },
        usuario: { nome: 'Administrador' },
        createdAt: new Date(),
        funcionarios: 18,
        deslocamento: true,
        valorDeslocamento: 250,
        total: 2750,
        idProposta: '1',
        codProposta: 'PROP-001',
        statusProposta: StatusContrato.APROVADO,
        servicos: [
          {
            valor: 2500,
            servicos: {
              codServico: 'SRV-001',
              nome: 'Consultoria de segurança',
              descricao: 'Diagnóstico completo de segurança da operação.',
            },
          },
        ],
      },
      {
        id: 'CT-002',
        codContrato: 'CT-002',
        status: StatusContrato.APROVADO,
        cliente: { codCliente: 'CLI-002', nomeFantasia: 'Blue Logística' },
        unidade: { codUnidade: 'UN-002', nomeFantasia: 'Nova Infra' },
        usuario: { nome: 'João da Silva' },
        createdAt: new Date(),
        funcionarios: 32,
        deslocamento: false,
        valorDeslocamento: 0,
        total: 1800,
        idProposta: '2',
        codProposta: 'PROP-002',
        statusProposta: StatusContrato.APROVADO,
        servicos: [
          {
            valor: 1800,
            servicos: {
              codServico: 'SRV-002',
              nome: 'Monitoramento remoto',
              descricao: 'Monitoramento e suporte remoto por 30 dias.',
            },
          },
        ],
      },
    ];
  }
}
