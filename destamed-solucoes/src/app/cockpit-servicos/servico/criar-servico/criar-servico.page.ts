import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormServico } from '../../interfaces';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-criar-servico',
  templateUrl: './criar-servico.page.html',
  styleUrls: ['./criar-servico.page.scss'],
  standalone: false,
})
export class CriarServicoPage implements OnInit {
  servicoForm: FormGroup;
  private localStorage = new LocalStorageService<FormServico[]>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.servicoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      descricaoProposta: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.servicoForm.invalid) {
      this.servicoForm.markAllAsTouched();
      return;
    }

    const current = this.localStorage.getItem('servicos') ?? [];
    const data = this.servicoForm.value as Partial<FormServico>;
    const nextItem: FormServico = {
      codServico: `SRV-${String((current as FormServico[]).length + 1).padStart(3, '0')}`,
      nome: data.nome ?? '',
      descricao: data.descricao ?? '',
      descricaoProposta: data.descricaoProposta ?? '',
      valor: Number(String(data.valor).replace(/[R$\s.]/g, '').replace(',', '.')) || 0,
      createdAt: new Date(),
    };

    this.localStorage.setItem('servicos', [...(current as FormServico[]), nextItem]);
    this.router.navigate(['/cockpit-servicos/servico']);
  }
}
