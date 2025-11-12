import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { InitService } from './init.service';
import { Start } from './start/start';
import { Policy } from './policy/policy';
import { Navigation } from "./navigation/navigation";
import { ToastComponent } from "./toast/toast";
import { BookingService } from './booking.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Start,
    Policy,
    Navigation,
    Policy,
    ToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private initService = inject(InitService);
  private booking = inject(BookingService);

  protected showStart$: Observable<boolean>;

  constructor() {
    this.showStart$ = this.initService.isInitialized$.pipe(map(isInitialized => !isInitialized));
  }
}