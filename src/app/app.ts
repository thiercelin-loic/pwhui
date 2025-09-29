import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Splash } from './splash/splash';
import { CommonModule } from '@angular/common';
import { InitService } from './init.service';
import { Observable, map } from 'rxjs';

/**
 * The root component of the application.
 * It handles the display of the splash screen during initialization.
 */
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
export class App implements OnInit {
  /**
   * An observable that controls the visibility of the splash screen.
   * The splash screen is shown until the application is initialized.
   */
  protected showSplash$: Observable<boolean>;

  constructor(private initService: InitService) {
    this.showSplash$ = this.initService.isInitialized$.pipe(map(isInitialized => !isInitialized));
  }

  ngOnInit() {}
}