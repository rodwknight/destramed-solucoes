import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() title = 'Destamed Soluções';
  @Input() color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark' = 'secondary';
  @Input() showBackButton = true;

  @Output() configClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onBackClick(): void {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    this.router.navigate(['/home']);
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
