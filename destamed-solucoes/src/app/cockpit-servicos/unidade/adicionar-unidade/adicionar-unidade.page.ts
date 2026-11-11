import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUnidade } from '../../interfaces';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-adicionar-unidade',
  templateUrl: './adicionar-unidade.page.html',
  styleUrls: ['./adicionar-unidade.page.scss'],
  standalone: false,
})
export class AdicionarUnidadePage implements OnInit {
  unidadeForm: FormGroup;
  private localStorage = new LocalStorageService<FormUnidade[]>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.unidadeForm = this.fb.group({
      nomeFantasia: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
      representante: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.unidadeForm.invalid) {
      this.unidadeForm.markAllAsTouched();
      return;
    }

    const current = this.localStorage.getItem('unidades') ?? [];
    const data = this.unidadeForm.value as Partial<FormUnidade>;
    const nextItem: FormUnidade = {
      cnpj: data.cnpj ?? '',
      razaoSocial: data.razaoSocial ?? '',
      nomeFantasia: data.nomeFantasia ?? '',
      representante: data.representante ?? '',
      rg: '',
      cpf: '',
      rua: '',
      numero: '',
      complemento: '',
      pais: 'Brasil',
      estado: data.estado ?? '',
      cidade: data.cidade ?? '',
      cep: '',
      bairro: '',
      telefone: data.telefone ?? '',
      celular: '',
      email: data.email ?? '',
      codUnidade: `UN-${String((current as FormUnidade[]).length + 1).padStart(3, '0')}`,
      status: 1,
      funcionarios: 0,
      createdAt: new Date(),
    };

    this.localStorage.setItem('unidades', [...(current as FormUnidade[]), nextItem]);
    this.router.navigate(['/cockpit-servicos/unidade']);
  }
}
