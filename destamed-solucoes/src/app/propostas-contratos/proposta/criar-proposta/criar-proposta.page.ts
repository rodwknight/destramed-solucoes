import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, SelectCustomEvent, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { FormCliente, FormUnidade } from '../../../interfaces';
import { FormProposta } from '../../../interfaces/proposta';
import { FormServico } from '../../../interfaces/servico';
import { LocalStorageService } from '../../../services/local-storage.service';
import { PropostaService } from '../../../services/proposta.service';
import { UsuarioLogado } from '../../../interfaces/common';

@Component({
  selector: 'app-criar-proposta',
  templateUrl: './criar-proposta.page.html',
  styleUrls: ['./criar-proposta.page.scss'],
  standalone: false,
})
export class CriarPropostaPage implements OnInit {
  form: FormGroup;
  total = 0;
  totalServicos = 0;
  funcionarios = 0;
  unidades: FormUnidade[] = [];
  clientes: FormCliente[] = [];
  servicos: FormServico[] = [];
  unidadeSelecionada: FormUnidade = {} as FormUnidade;
  clienteSelecionado: FormCliente = {} as FormCliente;
  servicoSelecionado: FormServico = {} as FormServico;
  listaServicosAdicionados: FormServico[] = [];
  private localStorage = new LocalStorageService();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private propostaService: PropostaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    this.form = this.fb.group({
      unidade: ['', Validators.required],
      cliente: ['', Validators.required],
      servico: ['', Validators.required],
      funcionarios: [this.funcionarios, Validators.required],
      deslocamento: [false],
      valorDeslocamento: [{ value: '', disabled: true }],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.cargaInicial();
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue() as FormProposta & { servico?: FormServico };
    const usuario = this.localStorage.getItem('usuario') as UsuarioLogado | null;
    const selectedCliente = formValues['cliente'] as FormCliente | undefined;
    const selectedUnidade = formValues['unidade'] as FormUnidade | undefined;
    const valorDeslocamento = this.parseValorMoeda(formValues.valorDeslocamento);

    const payload: FormProposta = {
      idCliente: this.clienteSelecionado.codCliente ?? selectedCliente?.codCliente ?? '',
      idUnidade: this.unidadeSelecionada.codUnidade ?? selectedUnidade?.codUnidade ?? '',
      idUsuario: usuario?.usuarioId,
      funcionarios: Number(this.funcionarios || formValues.funcionarios || 0),
      deslocamento: !!formValues.deslocamento,
      valorDeslocamento: valorDeslocamento,
      total: this.total,
      servicos: this.listaServicosAdicionados.map((servico) => ({
        codServico: servico.codServico ?? '',
        nome: servico.nome ?? '',
        valor: servico.valor ?? 0,
      })),
      responsavel: usuario?.nome ?? 'Não informado',
      observacao: '',
      createdAt: new Date(),
    };

    const loading = await this.loadingCtrl.create({ message: 'Salvando proposta...' });
    await loading.present();

    try {
      const response = await firstValueFrom(this.propostaService.create(payload));
      await loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: response.message,
        color: response.success ? 'success' : 'danger',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();

      if (response.success) {
        this.router.navigate(['/propostas-contratos/proposta']);
      }
    } catch {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Não foi possível salvar a proposta.',
        color: 'danger',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  alterarUnidade(event: SelectCustomEvent): void {
    this.unidadeSelecionada = event.detail.value as FormUnidade;
  }

  alterarCliente(event: SelectCustomEvent): void {
    this.clienteSelecionado = event.detail.value as FormCliente;
    this.funcionarios = this.clienteSelecionado.funcionarios ?? 0;
    this.form.patchValue({ funcionarios: this.funcionarios }, { emitEvent: false });
  }

  alterarDeslocamento(event: CustomEvent): void {
    const valorDeslocamento = this.form.get('valorDeslocamento');
    const checked = !!event.detail.checked;

    if (checked) {
      valorDeslocamento?.enable();
      valorDeslocamento?.setValidators([Validators.required]);
    } else {
      valorDeslocamento?.disable();
      valorDeslocamento?.clearValidators();
      valorDeslocamento?.setValue('');
    }

    valorDeslocamento?.updateValueAndValidity();
    this.resolveValorTotal();
  }

  formatarValorDeslocamento(event: CustomEvent<{ value?: string | number | null }>): void {
    const value = String(event.detail.value ?? '');
    const digits = value.replace(/\D/g, '');
    const formattedValue = digits
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(digits) / 100)
      : '';

    this.form.get('valorDeslocamento')?.setValue(formattedValue, { emitEvent: false });
    this.resolveValorTotal();
  }

  alterarServico(event: SelectCustomEvent): void {
    this.servicoSelecionado = event.detail.value as FormServico;
  }

  adicionarServico(): void {
    if (this.servicoSelecionado?.codServico) {
      const alreadyExists = this.listaServicosAdicionados.some(
        (servico) => servico.codServico === this.servicoSelecionado.codServico,
      );

      if (!alreadyExists) {
        this.listaServicosAdicionados = [...this.listaServicosAdicionados, this.servicoSelecionado];
      }

      this.somaTotalServicos();
    }
  }

  removeServico(servicoRemovido: FormServico): void {
    this.listaServicosAdicionados = this.listaServicosAdicionados.filter(
      (servico) => servico.codServico !== servicoRemovido.codServico,
    );
    this.somaTotalServicos();
  }

  somaDeslocamento(): void {
    this.resolveValorTotal();
  }

  private async cargaInicial(): Promise<void> {
    const loading = await this.loadingCtrl.create({ message: 'Carregando...' });
    await loading.present();

    try {
      const storedUnidades = this.localStorage.getItem('unidades') ?? [];
      const storedClientes = this.localStorage.getItem('clientes') ?? [];
      const storedServicos = this.localStorage.getItem('servicos') ?? [];

      this.unidades = Array.isArray(storedUnidades) ? (storedUnidades as FormUnidade[]) : [];
      this.clientes = Array.isArray(storedClientes) ? (storedClientes as FormCliente[]) : [];
      this.servicos = Array.isArray(storedServicos) ? (storedServicos as FormServico[]) : [];

      if (!this.unidades.length) {
        this.unidades = [
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
            funcionarios: 12,
          },
        ];
        this.localStorage.setItem('unidades', this.unidades);
      }

      if (!this.clientes.length) {
        this.clientes = [
          {
            cnpj: '11.222.333/0001-44',
            razaoSocial: 'Alpha Construções Ltda',
            nomeFantasia: 'Alpha Construções',
            representante: 'Ana Souza',
            rg: '10.101.010',
            cpf: '111.222.333-44',
            rua: 'Avenida Brasil',
            numero: '120',
            complemento: '',
            pais: 'Brasil',
            estado: 'SP',
            cidade: 'São Paulo',
            cep: '01000-000',
            bairro: 'Centro',
            telefone: '(11) 3333-4444',
            celular: '(11) 98888-1111',
            email: 'contato@alphaconstrucoes.com',
            codCliente: 'CLI-001',
            status: 1,
            funcionarios: 18,
          },
        ];
        this.localStorage.setItem('clientes', this.clientes);
      }

      if (!this.servicos.length) {
        this.servicos = [
          {
            codServico: 'SRV-001',
            nome: 'Consultoria de segurança',
            descricao: 'Assessoria técnica e diagnósticos de segurança.',
            descricaoProposta: 'Diagnóstico completo de segurança da operação.',
            valor: 2500,
          },
          {
            codServico: 'SRV-002',
            nome: 'Monitoramento remoto',
            descricao: 'Acompanhamento contínuo de indicadores e alertas.',
            descricaoProposta: 'Monitoramento e suporte remoto por 30 dias.',
            valor: 1800,
          },
        ];
        this.localStorage.setItem('servicos', this.servicos);
      }
    } finally {
      await loading.dismiss();
    }
  }

  private resolveValorTotal(): void {
    const deslocamento = this.parseValorMoeda(this.form.get('valorDeslocamento')?.value);
    const total = this.totalServicos + deslocamento;
    this.total = Number(total.toFixed(2));
  }

  private parseValorMoeda(value: unknown): number {
    const normalized = String(value ?? '')
      .replace(/[^\d,.-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  private somaTotalServicos(): void {
    this.totalServicos = this.listaServicosAdicionados.reduce((sum, servico) => {
      const valor = Number(String(servico.valor).replace('.', '').replace(',', '.')) || 0;
      return sum + valor;
    }, 0);

    this.resolveValorTotal();
  }
}
