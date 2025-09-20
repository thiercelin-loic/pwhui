import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Splash } from './splash/splash';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Splash,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('pwhui');
  protected showSplash = true;

  constructor() {
    setTimeout(() => {
      this.showSplash = false;
    }, 3000); // Simulate a 3-second loading time
  }

  ngOnInit() {}

  ngOnDestroy() {}
}