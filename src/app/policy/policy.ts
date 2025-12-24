import { Component, AfterViewInit, inject } from '@angular/core';
import { PolicyService } from './policy.service';
import { CookieService } from '@shared/services/cookie.service';
import { COOKIE_CONSTANTS } from '@shared/constants';

declare const bootstrap: { Modal: new (arg0: HTMLElement | null, arg1?: object) => { show: () => void; }; };

@Component({
  selector: 'app-policy',
  templateUrl: './policy.html',
  styleUrl: './policy.css',
})
export class Policy implements AfterViewInit {
  private policyService = inject(PolicyService);
  private cookieService = inject(CookieService);

  constructor() {
    this.policyService.modal$.subscribe(() => this.showPolicyModal());
  }

  ngAfterViewInit(): void {
    if (!this.cookieService.hasConsent()) {
      this.showPolicyModalWithDelay();
    }
  }

  private showPolicyModal(): void {
    const element = document.getElementById('policy');

    if (element) {
      const modal = new bootstrap.Modal(element);
      modal.show();
    }
  }

  private showPolicyModalWithDelay(): void {
    setTimeout(() => this.showPolicyModal(), COOKIE_CONSTANTS.POLICY_MODAL_DELAY);
  }

  public consent(): void {
    this.cookieService.setConsent();
  }
}