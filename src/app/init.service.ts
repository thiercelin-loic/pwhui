import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { BookingService } from './booking/booking.service';

/**
 * A service that handles the application initialization process.
 * It ensures that essential data is loaded before the application is displayed.
 */
@Injectable({
  providedIn: 'root'
})
export class InitService {
  private isInitialized = new BehaviorSubject<boolean>(false);
  /** An observable that emits `true` when the application is initialized. */
  isInitialized$ = this.isInitialized.asObservable();
  private initializationError = new BehaviorSubject<string | null>(null);
  /** An observable that emits an error message if initialization fails. */
  initializationError$ = this.initializationError.asObservable();

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) { }

  /**
   * Initializes the application by fetching essential data.
   */
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
