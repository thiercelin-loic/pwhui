import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@app/shared/language.service';
import { Policy } from '@app/policy/policy';
import { Navigation } from '@app/navigation/navigation';
import { ToastComponent } from '@app/toast/toast';
import { BookingService } from '@app/booking.service';
import { APP_CONFIG } from '@env/app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Policy,
    Navigation,
    ToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private booking = inject(BookingService);
  private titleService = inject(Title);
  readonly languageService = inject(LanguageService);

  constructor() {
    // Set application title from configuration
    this.titleService.setTitle(APP_CONFIG.title);
  }
}