import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaUsuarios } from '../../interfaces';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.page.html',
  styleUrls: ['./adicionar-usuario.page.scss'],
  standalone: false,
})
export class AdicionarUsuarioPage implements OnInit {
  usuarioForm: FormGroup;
  private localStorage = new LocalStorageService<ListaUsuarios[]>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      perfil: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const current = this.localStorage.getItem('usuarios') ?? [];
    const data = this.usuarioForm.value as { nome: string; email: string; perfil: string };

    const nextItem: ListaUsuarios = {
      nome: data.nome,
      createdAt: new Date(),
    };

    this.localStorage.setItem('usuarios', [...(current as ListaUsuarios[]), nextItem]);
    this.router.navigate(['/usuario']);
  }
}
