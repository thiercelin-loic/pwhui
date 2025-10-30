import { Component, AfterViewInit } from '@angular/core';
import { PolicyService } from './policy.service';

declare var bootstrap: any;

@Component({
  selector: 'app-policy',
  templateUrl: './policy.html',
  styleUrl: './policy.css',
})
export class Policy implements AfterViewInit {
  constructor(private policy: PolicyService) {
    this.policy.modal$.subscribe(() => this.advertise());
  }

  private advertise(): void {
    const element = document.getElementById('policy');

    if (element) {
      const modal = new bootstrap.Modal(element);
      modal.show();
    }
  }

  private discover(): void {
    setTimeout(() => this.advertise(), 3000);
  }

  public ngAfterViewInit(): void {
    if (!document.cookie.includes('consent=true')) {
      this.discover();
    }
  }

  public consent(): void {
    document.cookie = 'consent=true; max-age=31536000';
  }
}