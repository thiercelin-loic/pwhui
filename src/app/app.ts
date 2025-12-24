import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { InitService } from '@app/init.service';
import { Start } from '@app/start/start';
import { Policy } from '@app/policy/policy';
import { Navigation } from '@app/navigation/navigation';
import { ToastComponent } from '@app/toast/toast';
import { BookingService } from '@app/booking.service'

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