import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ListaUsuarios } from '../interfaces/lista-usuarios';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: false,
})
export class UsuarioPage implements OnInit {
  protected usuarios: ListaUsuarios[] = [];
  private localStorage = new LocalStorageService<ListaUsuarios[]>();

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.usuarios = await this.buscaLista();
  }

  public adicionarUsuario = (): void => {
    this.router.navigate(['/usuario/adicionar-usuario']);
  };

  public async onSearchChange(searchValue: string | null | undefined): Promise<void> {
    const data = this.localStorage.getItem('usuarios') ?? [];
    const term = (searchValue ?? '').trim().toLowerCase();

    if (!term) {
      this.usuarios = data as ListaUsuarios[];
      return;
    }

    this.usuarios = (data as ListaUsuarios[]).filter((usuario) =>
      (usuario.nome ?? '').toLowerCase().includes(term) ||
      (usuario.email ?? '').toLowerCase().includes(term) ||
      (usuario.perfil ?? '').toLowerCase().includes(term),
    );
  }

  private async buscaLista(): Promise<ListaUsuarios[]> {
    const loading = await this.loadingCtrl.create({ message: 'Buscando usuários...' });
    await loading.present();

    const usuarios = (this.localStorage.getItem('usuarios') ?? []) as ListaUsuarios[];

    if (!usuarios.length) {
      const defaultUsuarios: ListaUsuarios[] = [
        {
          id: 1,
          nome: 'Administrador',
          email: 'admin@destramed.com',
          perfil: 'Administrador',
          createdAt: new Date(),
        },
        {
          id: 2,
          nome: 'João da Silva',
          email: 'joao@destramed.com',
          perfil: 'Operador',
          createdAt: new Date(),
        },
      ];

      this.localStorage.setItem('usuarios', defaultUsuarios);
      await loading.dismiss();
      return defaultUsuarios;
    }

    await loading.dismiss();
    return usuarios;
  }
}
