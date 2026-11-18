import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-criar-servico',
  templateUrl: './criar-servico.page.html',
  styleUrls: ['./criar-servico.page.scss'],
  standalone: false,
})
export class CriarServicoPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly servicoService = inject(ServicoService);
  private readonly toastCtrl = inject(ToastController);

  servicoForm: FormGroup<{
    nome: FormControl<string>;
    descricao: FormControl<string>;
    descricaoProposta: FormControl<string>;
    valor: FormControl<string>;
  }> = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    descricaoProposta: ['', Validators.required],
    valor: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.servicoForm.invalid) {
      this.servicoForm.markAllAsTouched();
      return;
    }

    const result = await firstValueFrom(this.servicoService.create(this.servicoForm.getRawValue()));
    const toast = await this.toastCtrl.create({
      message: result.message,
      color: result.success ? 'success' : 'danger',
      duration: 5000,
      position: 'bottom',
    });
    await toast.present();

    if (result.success) {
      await this.router.navigate(['/servico']);
    }
  }

  formatarValor(event: CustomEvent<{ value?: string | number | null }>): void {
    const digits = String(event.detail.value ?? '').replace(/\D/g, '');
    const formattedValue = digits
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(digits) / 100)
      : '';

    this.servicoForm.controls.valor.setValue(formattedValue, { emitEvent: false });
  }

  voltar(): void {
    this.router.navigate(['/servico']);
  }

  isFieldInvalid(field: keyof CriarServicoPage['servicoForm']['controls']): boolean {
    const control = this.servicoForm.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }
}
