import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/auth/auth.service';
import { ToastService } from '@app/toast/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { Bookings, Listings } from '@app/landing/landing.model';
import { 
  DateFormatterService,
  ListingService,
  BookingDataService 
} from '@shared/services';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, TranslateModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit {
  private dateFormatter = inject(DateFormatterService);
  private listingService = inject(ListingService);
  private bookingDataService = inject(BookingDataService);
  private auth = inject(AuthService);
  
  toast = inject(ToastService);

  public date: Date = this.dateFormatter.getCurrentDate();
  public today: number = this.dateFormatter.getToday();
  public month: string = this.dateFormatter.getMonth();
  public year: number = this.dateFormatter.getYear();
  public bookings: Bookings[] = [];
  public listings: Listings[] = [];

  ngOnInit(): void {
    this.auth.getMe().subscribe(() => {
      this.loadBookings();
    });
    this.loadListings();
  }

  private loadListings(): void {
    this.listingService.getListings().subscribe({
      next: (data) => { this.listings = data; },
      error: (error) => {
        console.error('Failed to load listings', error);
        this.toast.show({ 
          message: 'Failed to load listings', 
          classname: 'bg-danger text-light' 
        });
      }
    });
  }

  private loadBookings(): void {
    const userId = this.auth.current?.id;
    if (userId) {
      this.bookingDataService.getUserBookings(userId).subscribe({
        next: (data) => { this.bookings = data; },
        error: (error) => {
          console.error('Failed to load bookings', error);
          this.toast.show({ 
            message: 'Failed to load bookings', 
            classname: 'bg-danger text-light' 
          });
        }
      });
    }
  }

  public getListingById(id: number): Listings | undefined {
    return this.listingService.getListingById(this.listings, id);
  }
}
