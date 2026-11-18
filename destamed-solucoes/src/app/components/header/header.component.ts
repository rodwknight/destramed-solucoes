import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  private readonly localStorage = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  @Input() title = 'Destamed Soluções';
  @Input() color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark' = 'secondary';
  @Input() showBackButton = true;

  @Output() configClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  isAuthenticated(): boolean {
    return this.localStorage.exists('accesskey');
  }

  onBackClick(): void {
    const currentPath = this.router.url.split(/[?#]/, 1)[0].replace(/\/+$/, '');
    const segments = currentPath.split('/').filter(Boolean);

    if (segments.length >= 2 && segments[segments.length - 2].startsWith('detalhe-')) {
      segments.splice(-2);
    } else {
      segments.pop();
    }

    const parentPath = segments.length ? `/${segments.join('/')}` : '/home';
    void this.router.navigateByUrl(parentPath);
  }

  onConfigClick(): void {
    this.configClick.emit();
    this.router.navigate(['/configuracao']);
  }

  onLogoutClick(): void {
    this.logoutClick.emit();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
