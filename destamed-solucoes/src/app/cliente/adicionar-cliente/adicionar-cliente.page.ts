import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { FormCliente } from '../../interfaces';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.page.html',
  styleUrls: ['./adicionar-cliente.page.scss'],
  standalone: false,
})
export class AdicionarClientePage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly clienteService = inject(ClienteService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);

  readonly clienteForm = this.fb.group({
    cnpj: ['', Validators.required],
    razaoSocial: ['', Validators.required],
    nomeFantasia: ['', Validators.required],
    funcionarios: [0, [Validators.required, Validators.min(0)]],
    representante: ['', Validators.required],
    cpf: ['', Validators.required],
    rg: ['', Validators.required],
    rua: ['', Validators.required],
    numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    complemento: [''],
    pais: ['Brasil', Validators.required],
    estado: ['', [Validators.required, Validators.maxLength(2)]],
    cidade: ['', Validators.required],
    cep: ['', Validators.required],
    bairro: ['', Validators.required],
    telefone: ['', Validators.required],
    celular: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  isFieldInvalid(field: string): boolean {
    const control = this.clienteForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  voltar(): void {
    void this.router.navigate(['/cliente']);
  }

  async onSubmit(): Promise<void> {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const formData = this.clienteForm.getRawValue() as FormCliente;
    formData.funcionarios = Number(formData.funcionarios);
    formData.estado = formData.estado.toUpperCase();

    const loading = await this.loadingCtrl.create({ message: 'Salvando cliente...' });
    await loading.present();
    try {
      const result = await firstValueFrom(this.clienteService.create(formData));
      const toast = await this.toastCtrl.create({
        message: result.message,
        color: result.success ? 'success' : 'danger',
        duration: 4000,
        position: 'bottom',
      });
      await toast.present();

      if (result.success) {
        await this.router.navigate(['/cliente']);
      }
    } finally {
      await loading.dismiss();
    }
  }
}
