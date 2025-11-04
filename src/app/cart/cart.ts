import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';
import { Bookings, Listings } from '../landing/landing.model';
import { path } from '../server';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  toast = inject(ToastService);

  private option = { month: 'long' } as const;
  public date: Date = new Date();
  public today: number = this.date.getDate();
  public month: string = this.date.toLocaleString('default', this.option);
  public year: number = this.date.getFullYear();
  public bookings: Bookings[] = [] ;
  public listings: Listings[] = [];

  ngOnInit(): void {
    this.auth.getMe().subscribe(() => {
      this.getBookings();
    });
    this.getListings();
  }

  private getListings(): void {
    this.http.get<Listings[]>(`${path.booking}/listings`).subscribe(data => {
      this.listings = data;
    });
  }

  private getBookings(): void {
    const id = this.auth.current?.id;
    if (id) {
      this.http.get<Bookings[]>(`${path.booking}/bookings`).subscribe(data => {
        this.bookings = data.filter(booking => booking.user === id);
      });
    }
  }

  public getListingById(id: number): Listings | undefined {
    return this.listings.find(listing => listing.id === id);
  }
}
