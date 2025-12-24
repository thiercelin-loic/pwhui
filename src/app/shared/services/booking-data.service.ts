import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../constants';
import { Bookings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {
  private http = inject(HttpClient);

  getBookings(): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(API_ENDPOINTS.BOOKINGS);
  }

  getUserBookings(userId: string): Observable<Bookings[]> {
    return this.getBookings().pipe(
      map(bookings => bookings.filter(booking => booking.user === userId))
    );
  }

  getUserUpcomingBookings(userId: string): Observable<Bookings[]> {
    const now = new Date();
    return this.getUserBookings(userId).pipe(
      map(bookings => 
        bookings
          .filter(booking => new Date(booking.arrival) > now)
          .sort((a, b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime())
      )
    );
  }

  createBooking(booking: Partial<Bookings>): Observable<Bookings> {
    return this.http.post<Bookings>(API_ENDPOINTS.BOOKINGS, booking);
  }
}
