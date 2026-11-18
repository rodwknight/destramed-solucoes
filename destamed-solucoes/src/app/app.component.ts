import { Component } from '@angular/core';
import { PwaInstallService } from './services/pwa-install.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(pwaInstallService: PwaInstallService) {
    pwaInstallService.initialize();
  }
}
