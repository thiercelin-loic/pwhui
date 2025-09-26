import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { BookingService } from './booking/booking.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private isInitialized = new BehaviorSubject<boolean>(false);
  isInitialized$ = this.isInitialized.asObservable();
  private initializationError = new BehaviorSubject<string | null>(null);
  initializationError$ = this.initializationError.asObservable();

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) { }

  initializeApp(): void {
    this.initializationError.next(null);
    const observables = [
      this.authService.getMe(),
      this.bookingService.getListings()
    ];

    forkJoin(observables).subscribe({
      next: () => {
        this.isInitialized.next(true);
      },
      error: () => {
        this.initializationError.next('Failed to load listings.');
      }
    });
  }
}
