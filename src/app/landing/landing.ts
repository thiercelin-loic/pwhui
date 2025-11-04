import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';
import { Bookings, Listings } from './landing.model';
import { path } from '../../server';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  auth = inject(AuthService);
  toast = inject(ToastService);

  private option = { month: 'long' } as const;

  public date: Date = new Date();
  public today = this.date.getDate();
  public month = this.date.toLocaleString('default', this.option);
  public year = this.date.getFullYear();

  public listings: Listings[] = [];
  public bookings: Bookings[] = [];
  public selection: Listings = {} as Listings;
  public arrival!: Date;
  public departure!: Date;
  public query = '';
  public suggestions: Listings[] = [];

  public placeholder = '';
  private text = 0;
  private char = 0;
  private typing = 50;
  private erasing = 50;
  private delay = 2000;
  private interval = 0;
  private tips: string[] = [
    'Coworking near Eiffel Tower',
    'Quiet workspace in Le Marais',
    'Meeting room for 6 people near Gare du Nord',
    'Flexible desk / hotdesk in La Défense',
    'Studio with fast Wi‑Fi near Canal Saint‑Martin',
    'Salle de réunion proche du Louvre'
  ];

  private erase(): void {
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

  private type(): void {
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

  private getListings(): void {
    this.http.get<Listings[]>(`${path.booking}/listings`)
      .subscribe(data => { this.listings = data; });
  }

  private getBookings(): void {
    const userId = this.auth.current?.id;
    if (userId) {
      this.http.get<Bookings[]>(`${path.booking}/bookings`).subscribe(data => {
        const now = new Date();
        this.bookings = data
          .filter(booking => booking.user === userId && new Date(booking.arrival) > now)
          .sort((a, b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime());
      });
    } else {
      this.bookings = [];
    }
  }

  public selectListing(listing: Listings): void {
    this.selection = listing;
    this.query = '';
    this.suggestions = [];
  }
  

  public book(): void {
    const booking = {
      listing: this.selection.id,
      user: this.auth.current?.id,
      arrival: this.arrival,
      departure: this.departure,
      confirmation: false
    };

    if (this.arrival && this.departure && this.selection) {
      if (this.auth.current?.id) {
        this.http.post<Bookings>(`${path.booking}/bookings`, booking).subscribe(() => {
          this.getBookings();
          this.toast.show({ message: 'Booking successful!' });
        });
      } else {
  this.toast.show({ message: 'Please log in to make a booking.', classname: 'bg-danger text-light' });
      }
    } else {
  this.toast.show({ message: 'Please select a listing and specify both start and end dates.', classname: 'bg-danger text-light' });
    }
  }

  public getListingById(id: number): Listings | undefined {
    return this.listings.find(listing => listing.id === id);
  }

  public onSearch(): void {
    if (this.query.length > 2) {
      this.suggestions = this.listings.filter(listing =>
        listing.name.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.suggestions = [];
    }
  }

  public ngOnInit(): void {
    this.write();
    this.getListings();
    this.auth.getMe().subscribe(() => {
      this.getBookings();
    });
  }

  public ngOnDestroy(): void { clearInterval(this.interval); }
}
