import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { path } from '../server';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  private option = { month: 'long' } as const;
  public date: Date = new Date();
  public today: number = this.date.getDate();
  public month: string = this.date.toLocaleString('default', this.option);
  public year: number = this.date.getFullYear();
  public bookings: any[] = [];
  public listings: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getMe().subscribe(() => {
      this.getBookings();
    });
    this.getListings();
  }

  private getListings() {
    this.http.get<any[]>(`${path.booking}/listings`).subscribe(data => {
      this.listings = data;
    });
  }

  private getBookings() {
    const userId = this.authService.current?.id;
    if (userId) {
      this.http.get<any[]>(`${path.booking}/bookings`).subscribe(data => {
        this.bookings = data.filter(booking => booking.user === userId);
      });
    } else {
      this.bookings = [];
    }
  }

  public getListingById(id: number) {
    return this.listings.find(listing => listing.id === id);
  }
}
