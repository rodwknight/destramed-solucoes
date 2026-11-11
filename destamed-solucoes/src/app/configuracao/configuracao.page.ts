import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Configuracao } from '../interfaces';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
  standalone: false,
})
export class ConfiguracaoPage implements OnInit {
  public configuracaoForm: FormGroup;
  private localStorage = new LocalStorageService<Configuracao>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.configuracaoForm = this.fb.group({
      ip: ['', Validators.required],
      porta: [4200, [Validators.required, Validators.min(1)]],
      protocolo: ['https', Validators.required],
    });
  }

  ngOnInit(): void {
    const config = this.localStorage.getItem('config') as Configuracao | null;

    if (config) {
      this.configuracaoForm.patchValue({
        ip: config.ip,
        porta: config.porta,
        protocolo: config.protocolo?.value ?? 'https',
      });
    }
  }

  salvar(): void {
    if (this.configuracaoForm.invalid) {
      this.configuracaoForm.markAllAsTouched();
      return;
    }

    const values = this.configuracaoForm.value;
    const config: Configuracao = {
      ip: values.ip,
      porta: Number(values.porta),
      protocolo: {
        id: values.protocolo === 'https' ? 1 : 2,
        label: values.protocolo === 'https' ? 'Https' : 'Http',
        value: values.protocolo,
      },
      url: `${values.protocolo}://${values.ip}:${Number(values.porta)}`,
    };

    this.localStorage.setItem('config', config);
    this.router.navigate(['/home']);
  }
}
