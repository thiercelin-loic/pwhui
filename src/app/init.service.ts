import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { BOOKING_API_URL } from './server';

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
    private http: HttpClient
  ) { }

  initialize(): void {
    this.initializationError.next(null);
    const observables = [
      this.http.get(`${BOOKING_API_URL}/listings`)
    ];

    forkJoin(observables).subscribe({
      next: () => this.isInitialized.next(true),
      error: (error) => {
        console.error('Initialization failed', error);
        this.initializationError.next('Failed to load initial data.');
      }
    });
  }
}
