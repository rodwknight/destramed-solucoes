import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { PwaInstallService } from '../services/pwa-install.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  private localStorageService = new LocalStorageService();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    public pwaInstallService: PwaInstallService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.localStorageService.exists('accesskey')) {
      this.router.navigate(['/home']);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      const toast = await this.toastController.create({
        message: 'Preencha usuário e senha.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const { username, password } = this.loginForm.value;

    const response = await firstValueFrom(this.authService.login(username, password));

    if (!response.success) {
      const toast = await this.toastController.create({
        message: response.message || 'Erro ao autenticar.',
        duration: 2500,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    this.localStorageService.setItem('accesskey', response.token);
    this.localStorageService.setItem('usuario', {
      nome: response.nome,
      usuarioId: response.usuarioId,
    });

    this.router.navigate(['/home']);
  }

  async installPwa(): Promise<void> {
    const result = await this.pwaInstallService.install();
    const message =
      result === 'ios-instructions'
        ? 'Toque em Compartilhar e depois em Adicionar à Tela de Início para instalar o aplicativo.'
        : result === 'unavailable'
          ? 'A instalação não está disponível neste navegador ou o aplicativo já está instalado.'
          : null;

    if (message) {
      const toast = await this.toastController.create({
        message,
        duration: 4000,
        color: 'medium',
      });
      await toast.present();
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
