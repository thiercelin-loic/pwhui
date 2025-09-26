import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Booking } from './booking.model';
import { Listing } from './listing.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService implements OnInit {
  private baseUrl = 'http://localhost:3002';
  private listings$!: Observable<Listing[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
  this.authService.getMe().subscribe();
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getListings(): Observable<Listing[]> {
    if (!this.listings$) {
      this.listings$ = this.http.get<any>(`${this.baseUrl}/listings`, this.getHttpOptions())
        .pipe(
          map(response => {
            return Array.isArray(response) ? response : response.data || response.listings || [];
          }),
          shareReplay(1),
          catchError(this.handleError)
        );
    }
    return this.listings$;
  }

  /**
   * Get all bookings
   * API: GET https://www.postman.com/lunar-eclipse-514860/booking/request/ulnapq5/get-all-bookings
   */
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<any>(`${this.baseUrl}/bookings`, this.getHttpOptions())
      .pipe(
        map(response => {
          return Array.isArray(response) ? response : response.data || response.bookings || [];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get booking by ID
   * API: GET https://www.postman.com/lunar-eclipse-514860/booking/request/m8k7t42/get-booking-by-id
   */
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<any>(`${this.baseUrl}/bookings/${id}`, this.getHttpOptions())
      .pipe(
        map(response => {
          return response.data || response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Create a new booking
   * API: POST https://www.postman.com/lunar-eclipse-514860/booking/request/7skmdrj/create-booking
   */
  createBooking(booking: Booking): Observable<Booking> {
    const bookingData = this.sanitizeBookingData(booking);
    const userId = this.authService.getUserId();
    if (userId) {
      bookingData.user = userId;
    }
    return this.http.post<any>(`${this.baseUrl}/bookings`, bookingData, this.getHttpOptions())
      .pipe(
        map(response => {
          return response.data || response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing booking
   * API: PUT https://www.postman.com/lunar-eclipse-514860/booking/request/mxx9fae/update-booking
   */
  updateBooking(id: number, booking: Booking): Observable<Booking> {
    const bookingData = this.sanitizeBookingData(booking);
    return this.http.put<any>(`${this.baseUrl}/bookings/${id}`, bookingData, this.getHttpOptions())
      .pipe(
        map(response => {
          return response.data || response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Delete a booking
   * API: DELETE https://www.postman.com/lunar-eclipse-514860/booking/request/wz1p9a/delete-booking
   */
  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/bookings/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get bookings by status
   */
  getBookingsByStatus(status: string): Observable<Booking[]> {
    return this.http.get<any>(`${this.baseUrl}/bookings?status=${status}`, this.getHttpOptions())
      .pipe(
        map(response => {
          return Array.isArray(response) ? response : response.data || response.bookings || [];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get bookings by date range
   */
  getBookingsByDateRange(startDate: string, endDate: string): Observable<Booking[]> {
    const params = `startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any>(`${this.baseUrl}/bookings?${params}`, this.getHttpOptions())
      .pipe(
        map(response => {
          return Array.isArray(response) ? response : response.data || response.bookings || [];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Search bookings by customer name or email
   */
  searchBookings(query: string): Observable<Booking[]> {
    return this.http.get<any>(`${this.baseUrl}/bookings/search?q=${encodeURIComponent(query)}`, this.getHttpOptions())
      .pipe(
        map(response => {
          return Array.isArray(response) ? response : response.data || response.bookings || [];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Sanitize booking data before sending to API
   */
  private sanitizeBookingData(booking: Booking): any {
    const sanitized: any = {};
    Object.keys(booking).forEach(key => {
      const value = (booking as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        sanitized[key] = value;
      }
    });
    if (!sanitized.id) {
      delete sanitized.id;
    }
    if (sanitized.bookingDate) {
      const date = new Date(sanitized.bookingDate);
      if (!isNaN(date.getTime())) {
        sanitized.bookingDate = date.toISOString().split('T')[0];
      }
    }
    return sanitized;
  }

  /**
   * Get available time slots for a specific date
   */
  getAvailableTimeSlots(date: string): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}/bookings/available-slots?date=${date}`, this.getHttpOptions())
      .pipe(
        map(response => {
          return Array.isArray(response) ? response : response.data || response.slots || [];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Validate booking conflicts
   */
  validateBooking(booking: Booking): Observable<{ valid: boolean; conflicts?: string[] }> {
    return this.http.post<any>(`${this.baseUrl}/bookings/validate`, booking, this.getHttpOptions())
      .pipe(
        map(response => {
          return response.data || response;
        }),
        catchError(this.handleError)
      );
  }
}