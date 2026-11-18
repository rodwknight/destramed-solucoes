import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface DeferredInstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaInstallService {
  private readonly canInstallSubject = new BehaviorSubject(false);
  readonly canInstall$ = this.canInstallSubject.asObservable();

  private deferredPrompt: DeferredInstallPrompt | null = null;
  private initialized = false;
  isIosDevice = false;

  initialize(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.isIosDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    this.canInstallSubject.next(this.isIosDevice && !isStandalone);
    window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt);
    window.addEventListener('appinstalled', this.onAppInstalled);
  }

  async install(): Promise<'accepted' | 'dismissed' | 'ios-instructions' | 'unavailable'> {
    if (this.isIosDevice) {
      return 'ios-instructions';
    }

    if (!this.deferredPrompt) {
      return 'unavailable';
    }

    const prompt = this.deferredPrompt;
    this.deferredPrompt = null;
    this.canInstallSubject.next(false);

    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    return outcome;
  }

  private readonly onBeforeInstallPrompt = (event: Event): void => {
    event.preventDefault();
    this.deferredPrompt = event as DeferredInstallPrompt;
    this.canInstallSubject.next(true);
  };

  private readonly onAppInstalled = (): void => {
    this.deferredPrompt = null;
    this.canInstallSubject.next(false);
  };
}
