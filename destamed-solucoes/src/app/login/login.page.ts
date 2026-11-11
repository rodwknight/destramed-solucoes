import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  empresas = [
    { id: 1, nome: 'Destamed Soluções' },
    { id: 2, nome: 'Grupo Destamed' },
  ];

  private localStorageService = new LocalStorageService();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      empresa: ['', Validators.required],
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
        message: 'Preencha usuário, senha e empresa.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const { username, password, empresa } = this.loginForm.value;

    const response = await firstValueFrom(this.authService.login(username, password, empresa?.nome || empresa));

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

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
