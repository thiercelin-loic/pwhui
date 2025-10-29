import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { path } from '../server';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit, OnDestroy {
  constructor(private http: HttpClient, public authService: AuthService) { }

  private option = { month: 'long' } as const;
  public date: Date = new Date();
  public today: number = this.date.getDate();
  public month: string = this.date.toLocaleString('default', this.option);
  public year: number = this.date.getFullYear();
  public listings: any[] = [];
  public bookings: any[] = [];
  public selection: any;
  public arrival!: Date;
  public departure!: Date;

  private text: number = 0;
  private char: number = 0;

  private typing: number = 50;
  private erasing: number = 50;
  private delay: number = 2000;
  private interval: any;
  public placeholder: string = '';
  private tips: string[] = [
    'Coworking near Eiffel Tower',
    'Quiet workspace in Le Marais',
    'Meeting room for 6 people near Gare du Nord',
    'Flexible desk / hotdesk in La Défense',
    'Studio with fast Wi‑Fi near Canal Saint‑Martin',
    'Salle de réunion proche du Louvre'
  ];

  private erase() {
    this.interval = setInterval(() => {
      if (this.placeholder.length > 0) {
        this.placeholder = this.placeholder.slice(0, -1);
      } else {
        clearInterval(this.interval);
        this.text = (this.text + 1) % this.tips.length;
        this.char = 0;
        this.write();
      }
    }, this.erasing);
  }

  private type() {
    const current = this.tips[this.text];

    if (this.char < current.length) {
      this.placeholder += current.charAt(this.char);
      this.char++;
    } else {
      clearInterval(this.interval);
      setTimeout(() => this.erase(), this.delay);
    }
  }

  private write(): void {
    this.interval = setInterval(() =>
      this.type(),
      this.typing
    );
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

  public selectListing(listing: any) {
    this.selection = listing;
  }

  public book() {
    const booking = {
      listing: this.selection.id,
      user: this.authService.current?.id,
      arrival: this.arrival,
      departure: this.departure,
      confirmation: false
    };
    
    if (this.arrival && this.departure && this.selection) {
      if (this.authService.current?.id) {
        this.http.post(`${path.booking}/bookings`, booking).subscribe(() => { });
        this.getBookings();
      } else {
        alert('Please log in to make a booking.');
      }
    } else {
      alert('Please select a listing and specify both start and end dates.');
    }
  }

  public getListingById(id: number) {
    return this.listings.find(listing => listing.id === id);
  }

  public ngOnInit() {
    this.write();
    this.getListings();
    this.authService.getMe().subscribe(() => {
      this.getBookings();
    });
  }

  public ngOnDestroy() { clearInterval(this.interval); }
}
