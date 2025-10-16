import { Component, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-preferences',
  imports: [NgIf],
  templateUrl: './preferences.html',
  styleUrl: './preferences.css',
})
export class Preferences implements AfterViewInit {
  cookie: boolean = false;

  advertise() {
    const element = document.getElementById('cookie');

    if (element) {
      const modal = new bootstrap.Modal(element);
      modal.show();
    }
  }

  discover(advertise: () => void) {
    setTimeout(advertise, 3000)
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

  close() {
    const backdrop = document.querySelector('.modal-backdrop');
    const element = document.getElementById('cookie');
    const modal = bootstrap.Modal.getInstance(element);

    if (element && modal && backdrop) {
      modal.hide();
      backdrop.remove();
    }
  }

  consent() {
    this.close();
    this.cookie = true;
    document.cookie = 'consent=true; max-age=31536000';
  }
}