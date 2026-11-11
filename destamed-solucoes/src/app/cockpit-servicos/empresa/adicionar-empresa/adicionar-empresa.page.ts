import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from '../../interfaces/empresa';
import { LocalStorageService } from '../../services/local-storage.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-adicionar-empresa',
  templateUrl: './adicionar-empresa.page.html',
  styleUrls: ['./adicionar-empresa.page.scss'],
  standalone: false,
})
export class AdicionarEmpresaPage implements OnInit {
  empresaForm: FormGroup;
  private localStorage = new LocalStorageService();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private empresaService: EmpresaService,
  ) {
    this.empresaForm = this.fb.group({
      nome: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.empresaForm.invalid) {
      this.empresaForm.markAllAsTouched();
      return;
    }

    const payload = this.empresaForm.value as Empresa;
    this.empresaService.create(payload).subscribe(() => {
      this.router.navigate(['/cockpit-servicos/empresa']);
    });
  }
}
