import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string, empresa: string): Observable<any> {
    const normalizedUser = (username || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();

    if (!normalizedUser || !normalizedPassword || !empresa) {
      return of({ success: false, message: 'Informe usuário, senha e empresa.' });
    }

    if (normalizedUser === 'admin' && normalizedPassword === '123') {
      return of({
        success: true,
        token: 'mock-token-destamed',
        nome: 'Administrador',
        usuarioId: 1,
      });
    }

    return of({
      success: false,
      message: 'Credenciais inválidas. Tente usuário: admin / senha: 123',
    });
  }

  logout(): void {
    localStorage.removeItem('accesskey');
    localStorage.removeItem('usuario');
  }
}