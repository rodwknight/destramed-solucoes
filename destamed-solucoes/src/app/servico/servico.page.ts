import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServico } from '../interfaces';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
  standalone: false,
})
export class ServicoPage implements OnInit {
  private localStorage = new LocalStorageService<FormServico[]>();
  servicos: FormServico[] = [];

  constructor(private router: Router) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.loadServicos();
  }

  adicionarServico(): void {
    this.router.navigate(['/servico/criar-servico']);
  }

  onSearchChange(searchValue: string | null | undefined): void {
    const data = this.localStorage.getItem('servicos') ?? [];
    const term = (searchValue ?? '').trim().toLowerCase();

    if (!term) {
      this.servicos = data as FormServico[];
      return;
    }

    this.servicos = (data as FormServico[]).filter((servico) =>
      servico.nome.toLowerCase().includes(term) || servico.descricao.toLowerCase().includes(term),
    );
  }

  private loadServicos(): void {
    const stored = this.localStorage.getItem('servicos') as FormServico[] | null;

    if (stored && stored.length) {
      this.servicos = stored;
      return;
    }

    const defaults: FormServico[] = [
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

    this.localStorage.setItem('servicos', defaults);
    this.servicos = defaults;
  }
}
