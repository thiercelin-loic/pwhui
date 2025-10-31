import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { path } from './server';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private isInitialized = new BehaviorSubject<boolean>(false);
  isInitialized$ = this.isInitialized.asObservable();
  private initializationError = new BehaviorSubject<string | null>(null);
  initializationError$ = this.initializationError.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  initialize(): void {
    const observables = [
      this.http.get(`${path.booking}/listings`),
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
