import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, SelectCustomEvent, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { FormCliente, FormServico, FormUnidade } from '../../interfaces';
import { FormOrdem } from '../../interfaces/ordem';
import { UsuarioLogado } from '../../interfaces/common';
import { ClienteService } from '../../services/cliente.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { OrdemService } from '../../services/ordem.service';
import { ServicoService } from '../../services/servico.service';
import { UnidadeService } from '../../services/unidade.service';

@Component({
  selector: 'app-criar-ordem',
  templateUrl: './criar-ordem.page.html',
  styleUrls: ['./criar-ordem.page.scss'],
  standalone: false,
})
export class CriarOrdemPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly unidadeService = inject(UnidadeService);
  private readonly clienteService = inject(ClienteService);
  private readonly servicoService = inject(ServicoService);
  private readonly ordemService = inject(OrdemService);
  private readonly localStorage = inject(LocalStorageService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);

  form: FormGroup;
  unidades: FormUnidade[] = [];
  clientes: FormCliente[] = [];
  servicos: FormServico[] = [];
  unidadeSelecionada?: FormUnidade;
  clienteSelecionado?: FormCliente;
  servicoSelecionado?: FormServico;
  servicosAdicionados: FormServico[] = [];
  totalServicos = 0;
  total = 0;

  constructor() {
    this.form = this.fb.group({
      unidade: ['', Validators.required],
      cliente: ['', Validators.required],
      servico: ['', Validators.required],
      funcionarios: [0, [Validators.required, Validators.min(0)]],
      deslocamento: [false],
      valorDeslocamento: [{ value: '', disabled: true }],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.cargaInicial();
  }

  alterarUnidade(event: SelectCustomEvent): void {
    this.unidadeSelecionada = event.detail.value as FormUnidade;
  }

  alterarCliente(event: SelectCustomEvent): void {
    this.clienteSelecionado = event.detail.value as FormCliente;
    this.form.patchValue({ funcionarios: this.clienteSelecionado.funcionarios ?? 0 });
  }

  alterarServico(event: SelectCustomEvent): void {
    this.servicoSelecionado = event.detail.value as FormServico;
  }

  adicionarServico(): void {
    const servico = this.servicoSelecionado;
    if (!servico?.codServico || this.servicosAdicionados.some((item) => item.codServico === servico.codServico)) {
      return;
    }

    this.servicosAdicionados = [...this.servicosAdicionados, servico];
    this.calcularTotais();
  }

  removerServico(servico: FormServico): void {
    this.servicosAdicionados = this.servicosAdicionados.filter(
      (item) => item.codServico !== servico.codServico,
    );
    this.calcularTotais();
  }

  alterarDeslocamento(event: CustomEvent<{ checked: boolean }>): void {
    const control = this.form.get('valorDeslocamento');
    if (event.detail.checked) {
      control?.enable();
      control?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      control?.disable();
      control?.clearValidators();
      control?.setValue('');
    }
    control?.updateValueAndValidity();
    this.calcularTotais();
  }

  async submit(): Promise<void> {
    if (this.form.invalid || !this.servicosAdicionados.length) {
      this.form.markAllAsTouched();
      if (!this.servicosAdicionados.length) {
        await this.showToast('Adicione ao menos um serviço à ordem.', 'warning');
      }
      return;
    }

    const values = this.form.getRawValue();
    const valorDeslocamento = this.toNumber(values.valorDeslocamento);
    const usuario = this.localStorage.getItem('usuario') as UsuarioLogado | null;
    const payload: FormOrdem = {
      idUnidade: this.unidadeSelecionada?.codUnidade ?? '',
      idCliente: this.clienteSelecionado?.codCliente ?? '',
      idUsuario: usuario?.usuarioId,
      funcionarios: Number(values.funcionarios) || 0,
      deslocamento: Boolean(values.deslocamento),
      valorDeslocamento,
      total: this.total,
      servicos: this.servicosAdicionados,
      unidade: {
        codUnidade: this.unidadeSelecionada?.codUnidade ?? '',
        nomeFantasia: this.unidadeSelecionada?.nomeFantasia ?? '',
      },
      cliente: {
        codCliente: this.clienteSelecionado?.codCliente ?? '',
        nomeFantasia: this.clienteSelecionado?.nomeFantasia ?? '',
      },
      usuario: { nome: usuario?.nome ?? 'Administrador' },
    };

    const loading = await this.loadingCtrl.create({ message: 'Salvando ordem...' });
    await loading.present();
    try {
      const result = await firstValueFrom(this.ordemService.create(payload));
      await this.showToast(result.message, result.success ? 'success' : 'danger');
      if (result.success) {
        await this.router.navigate(['/ordem']);
      }
    } finally {
      await loading.dismiss();
    }
  }

  private async cargaInicial(): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Carregando dados...' });
    await loading.present();
    try {
      const [unidades, clientes, servicos] = await Promise.all([
        firstValueFrom(this.unidadeService.list()),
        firstValueFrom(this.clienteService.list()),
        firstValueFrom(this.servicoService.list()),
      ]);
      this.unidades = unidades.unidades;
      this.clientes = clientes.clientes;
      this.servicos = servicos.servicos;
    } finally {
      await loading.dismiss();
    }
  }

  calcularTotais(): void {
    this.totalServicos = this.servicosAdicionados.reduce(
      (total, servico) => total + this.toNumber(servico.valor),
      0,
    );
    const deslocamento = this.form.get('deslocamento')?.value
      ? this.toNumber(this.form.get('valorDeslocamento')?.value)
      : 0;
    this.total = Number((this.totalServicos + deslocamento).toFixed(2));
  }

  private toNumber(value: unknown): number {
    const normalized = String(value ?? '0').trim().replace(/[R$\s]/g, '');
    const parsed = normalized.includes(',')
      ? Number(normalized.replace(/\./g, '').replace(',', '.'))
      : Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private async showToast(message: string, color: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, color, duration: 4000, position: 'bottom' });
    await toast.present();
  }
}
