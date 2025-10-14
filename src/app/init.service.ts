import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  initialize(): void {
    this.initializationError.next(null);
    const observables = [
      this.authService.getMe().pipe(catchError(() => of(null))),
      this.bookingService.getListings().pipe(catchError(() => of(null)))
    ];

    forkJoin(observables).subscribe({
      next: () => {
        this.isInitialized.next(true);
      },
      error: (error) => {
        console.error('Initialization failed', error);
        this.initializationError.next('Failed to load initial data.');
      }
    });
  }
}
