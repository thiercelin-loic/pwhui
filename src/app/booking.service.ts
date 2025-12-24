import { inject, Injectable } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { ToastService } from '@app/toast/toast.service';
import { ListingService } from '@shared/services/listing.service';
import { BookingDataService } from '@shared/services/booking-data.service';
import { Bookings, Listings } from '@shared/models';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private listingService = inject(ListingService);
  private bookingDataService = inject(BookingDataService);
  
  private listings: Listings[] = [];

  constructor() {
    this.initializeBookingNotifications();
  }

  private initializeBookingNotifications(): void {
    this.auth.getMe().pipe(
      switchMap(user => {
        if (user) {
          return this.listingService.getListings();
        }
        return of([]);
      }),
      switchMap(listings => {
        this.listings = listings;
        const userId = this.auth.current?.id;
        if (userId) {
          return this.bookingDataService.getUserUpcomingBookings(userId);
        }
        return of([]);
      })
    ).subscribe(bookings => {
      bookings.forEach(booking => this.checkBookingStatus(booking));
    });
  }

  private checkBookingStatus(booking: Bookings): void {
    const now = new Date();
    const arrival = new Date(booking.arrival);
    const listingName = this.listings.find(l => l.id === booking.listing)?.name;

    if (booking.confirmation && listingName) {
      this.toast.show({ 
        message: `Your booking at ${listingName} is confirmed` 
      });
    }

    if (now.toDateString() === arrival.toDateString() && now.getTime() < arrival.getTime()) {
      if (listingName) {
        this.toast.show({ 
          message: `It's time to work at ${listingName}` 
        });
      }
    }
  }
}
