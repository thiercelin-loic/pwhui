import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Splash } from './scripts/splash';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Splash,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('pwhui');
  protected showSplash = true;

  constructor() {
    setTimeout(() => {
      this.showSplash = false;
    }, 3000); // Simulate a 3-second loading time
  }
}