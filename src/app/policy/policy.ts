import { Component, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PolicyService } from './policy.service';

declare var bootstrap: any;

@Component({
  selector: 'app-policy',
  imports: [NgIf],
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
  }

  discover(advertise: () => void) {
    setTimeout(advertise, 3000);
  }

  check(value: string) {
    const target = 'consent=true';

    if (value.includes(target)) {
      this.cookie = true;
    } else {
      this.discover(this.advertise);
    }
  }

  ngAfterViewInit(): void {
    const cookies = document.cookie;
    const values = cookies.split(';');
    values.forEach((value) => this.check(value.trim()));
  }

  consent() {
    this.cookie = true;
    document.cookie = 'consent=true; max-age=31536000';
  }
}