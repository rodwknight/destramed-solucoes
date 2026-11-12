import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormServico } from '../interfaces/servico';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private readonly localStorage = new LocalStorageService<FormServico[]>();
  private readonly storageKey = 'servicos';

  create(dados: FormServico): Observable<{ servicos: FormServico[]; success: boolean; message: string }> {
    const servicos = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const valor = Number(String(dados.valor).replace('.', '').replace(',', '.')) || 0;
    const nextItem: FormServico = {
      ...dados,
      codServico: dados.codServico ?? `SRV-${String(servicos.length + 1).padStart(3, '0')}`,
      valor,
      createdAt: new Date(),
    };

    const nextList = [nextItem, ...servicos];
    this.localStorage.setItem(this.storageKey, nextList);

    return of({
      servicos: nextList,
      success: true,
      message: 'Serviço salvo com sucesso.',
    });
  }

  list(filter: string | undefined = undefined): Observable<{ servicos: FormServico[] }> {
    const servicos = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const normalized = (filter ?? '').trim().toLowerCase();
    const lista = normalized
      ? servicos.filter((servico) =>
          (servico.nome ?? '').toLowerCase().includes(normalized) ||
          (servico.descricao ?? '').toLowerCase().includes(normalized) ||
          (servico.codServico ?? '').toLowerCase().includes(normalized),
        )
      : servicos;

    this.localStorage.setItem(this.storageKey, servicos);

    return of({ servicos: lista });
  }

  update(servico: FormServico): Observable<{ servicos: FormServico[]; success: boolean; message: string }> {
    const servicos = this.localStorage.getItem(this.storageKey) ?? this.buildDefaults();
    const index = servicos.findIndex((item) => item.codServico === servico.codServico);

    if (index >= 0) {
      servicos[index] = {
        ...servicos[index],
        ...servico,
        valor: Number(String(servico.valor).replace('.', '').replace(',', '.')) || 0,
      };
      this.localStorage.setItem(this.storageKey, servicos);
      return of({ servicos, success: true, message: 'Serviço atualizado com sucesso.' });
    }

    return of({ servicos, success: false, message: 'Serviço não encontrado.' });
  }

  private buildDefaults(): FormServico[] {
    return [
      {
        codServico: 'SRV-001',
        nome: 'Consultoria de segurança',
        descricao: 'Assessoria técnica e diagnósticos de segurança.',
        descricaoProposta: 'Diagnóstico completo de segurança da operação.',
        valor: 2500,
        createdAt: new Date(),
      },
      {
        codServico: 'SRV-002',
        nome: 'Monitoramento remoto',
        descricao: 'Acompanhamento contínuo de indicadores e alertas.',
        descricaoProposta: 'Monitoramento e suporte remoto por 30 dias.',
        valor: 1800,
        createdAt: new Date(),
      },
      {
        codServico: 'SRV-003',
        nome: 'Implementação de processos',
        descricao: 'Padronização e implantação de rotinas operacionais.',
        descricaoProposta: 'Implantação de processos e treinamento inicial.',
        valor: 3200,
        createdAt: new Date(),
      },
    ];
  }
}
