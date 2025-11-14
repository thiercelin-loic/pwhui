import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ToastService } from './toast/toast.service';
import { Bookings, Listings } from './landing/landing.model';
import { path } from '../server';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private listings: Listings[] = [];

  constructor() {
    this.auth.getMe().pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<Listings[]>(`${path.booking}/listings`);
        }
        return of([]);
      }),
      switchMap(listings => {
        this.listings = listings;
        if (this.auth.current?.id) {
          return this.http.get<Bookings[]>(`${path.booking}/bookings`);
        }
        return of([]);
      })
    ).subscribe(bookings => {
      if (this.auth.current?.id) {
        const now = new Date();
        const userBookings = bookings
          .filter(booking => booking.user === this.auth.current?.id && new Date(booking.arrival) > now)
          .sort((a, b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime());
        userBookings.forEach(booking => this.getStatus(booking));
      }
    });
  }

  private getStatus(booking: Bookings): void {
    const now = new Date();
    const confirmation = booking.confirmation;
    const arrival = new Date(booking.arrival);

    if (confirmation) {
      this.toast.show({ message: `Your booking at ${this.listings.find(l => l.id === booking.listing)?.name} is confirmed` });
    }

    if (now.toDateString() === arrival.toDateString() && now.getTime() < arrival.getTime()) {
      this.toast.show({ message: `It's time to work at ${this.listings.find(l => l.id === booking.listing)?.name}` });
    }
  }
}
