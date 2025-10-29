import { Component, AfterViewInit } from '@angular/core';
import { PolicyService } from './policy.service';

declare var bootstrap: any;

@Component({
  selector: 'app-policy',
  templateUrl: './policy.html',
  styleUrl: './policy.css',
})
export class Policy implements AfterViewInit {
  cookie: boolean = false;

  constructor(private policyService: PolicyService) {
    this.policyService.openModal$.subscribe(() => {
      this.advertise();
    });
  }

  advertise() {
    const element = document.getElementById('policy');

    if (element) {
      const modal = new bootstrap.Modal(element);
      modal.show();
    }

    console.log('Advertising our policy...');
  }

  discover() {
    setTimeout(() => this.advertise(), 3000);
  }

  ngAfterViewInit(): void {
    if (document.cookie.includes('consent=true')) {
      this.cookie = true;
    } else {
      this.discover();
    }
  }

  consent() {
    this.cookie = true;
    document.cookie = 'consent=true; max-age=31536000';
  }
}