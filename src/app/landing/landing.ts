import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@app/auth/auth.service';
import { ToastService } from '@app/toast/toast.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Bookings, Listings } from './landing.model';
import { TruncateWordsPipe } from '@app/shared/pipes/truncate-words.pipe';
import { 
  ListingService, 
  BookingDataService, 
  ConversationService,
  DateFormatterService,
  TypingAnimationService,
  SearchService
} from '@shared/services';
import { ERROR_MESSAGES, MAPS_CONSTANTS, SUCCESS_MESSAGES } from '@shared/constants';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule, TranslateModule, RouterLink, TruncateWordsPipe],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit, OnDestroy {
  private listingService = inject(ListingService);
  private bookingDataService = inject(BookingDataService);
  private conversationService = inject(ConversationService);
  private dateFormatter = inject(DateFormatterService);
  private typingAnimation = inject(TypingAnimationService);
  private searchService = inject(SearchService);
  private translate = inject(TranslateService);
  
  private sanitizer = inject(DomSanitizer);
  public auth = inject(AuthService);
  public toast = inject(ToastService);

  public mapsUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps/embed/v1/place?key=${MAPS_CONSTANTS.API_KEY}&q=${MAPS_CONSTANTS.LOCATION}`
  );

  public today = this.dateFormatter.getToday();
  public month = this.dateFormatter.getMonth();
  public year = this.dateFormatter.getYear();

  listings: Listings[] = [];
  bookings: Bookings[] = [];
  public featuredListing: Listings | null = null;
  public selection: Listings | null = null;
  public arrival!: Date;
  public departure!: Date;
  public query = '';
  public suggestions: Listings[] = [];
  public placeholder = '';
  public averagePrice = 0;
  public topAmenities: { name: string; count: number }[] = [];
  public animatedListingsCount = 0;
  public animatedAveragePrice = 0;
  private animationInterval: ReturnType<typeof setInterval> | undefined;
  public isFading = false;

  private readonly FADE_OUT_DURATION = 1000;
  private readonly ANIMATION_INTERVAL = 10000;

  public ngOnInit(): void {
    this.startTypingAnimation();
    this.loadListings();
    this.loadUserBookings();
    this.animationInterval = setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.animateFigures();
        this.isFading = false;
      }, this.FADE_OUT_DURATION); // Wait for fade-out to complete
    }, this.ANIMATION_INTERVAL);
  }

  public ngOnDestroy(): void {
    this.typingAnimation.stopAnimation();
    clearInterval(this.animationInterval);
  }

  private startTypingAnimation(): void {
    const searchTips = this.translate.instant('COMMON.SEARCH_TIPS.LANDING') as string[];
    this.typingAnimation.startAnimation(
      searchTips,
      (text) => { this.placeholder = text; }
    );
  }

  private updateMapsUrl(): void {
    if (!this.listings.length) return;
    const random = this.listings[Math.floor(Math.random() * this.listings.length)];
    this.featuredListing = random;
    const query = encodeURIComponent(random.location);
    this.mapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?key=${MAPS_CONSTANTS.API_KEY}&q=${query}`
    );
  }

  private loadListings(): void {
    this.listingService.getListings().subscribe({
      next: (data) => { 
        this.listings = this.shuffleArray(data);
        this.updateMapsUrl();
        this.calculateAveragePrice();
        this.calculateTopAmenities();
        this.animateFigures();
      },
      error: (error) => {
        console.error(ERROR_MESSAGES.LOAD_LISTINGS_FAILED, error);
        this.toast.show({ 
          message: ERROR_MESSAGES.LOAD_LISTINGS_FAILED, 
          classname: 'bg-danger text-light' 
        });
      }
    });
  }

  private calculateAveragePrice(): void {
    if (this.listings.length === 0) {
      this.averagePrice = 0;
      return;
    }
    const total = this.listings.reduce((acc, listing) => acc + Number(listing.pricing), 0);
    this.averagePrice = total / this.listings.length;
  }

  private animateFigures(): void {
    this.animateValue('animatedListingsCount', 0, this.listings.length, 1000);
    this.animateValue('animatedAveragePrice', 0, this.averagePrice, 1000);
  }

  private animateValue(property: 'animatedListingsCount' | 'animatedAveragePrice', start: number, end: number, duration: number): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      this[property] = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  private calculateTopAmenities(): void {
    const amenityCounts = new Map<string, number>();
    this.listings.forEach(listing => {
      const amenities = listing.amenities.split(',');
      amenities.forEach((amenity: string) => {
        const trimmedAmenity = amenity.trim();
        if (trimmedAmenity) {
          amenityCounts.set(trimmedAmenity, (amenityCounts.get(trimmedAmenity) || 0) + 1);
        }
      });
    });

    this.topAmenities = Array.from(amenityCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 1);
  }

  private loadUserBookings(): void {
    this.auth.getMe().pipe(
      switchMap(() => {
        const userId = this.auth.current?.id;
        return userId
          ? this.bookingDataService.getUserUpcomingBookings(userId)
          : of([]);
      })
    ).subscribe({
      next: (data) => { this.bookings = data; },
      error: (error) => { console.error(ERROR_MESSAGES.LOAD_BOOKINGS_FAILED, error); }
    });
  }

  public selectListing(listing: Listings): void {
    this.selection = listing;
    this.query = '';
    this.suggestions = [];
  }

  public book(): void {
    if (!this.validateBooking()) {
      return;
    }

    const booking = this.createBookingPayload();

    this.bookingDataService.createBooking(booking).subscribe({
      next: () => {
        this.loadUserBookings();
        this.createConversationForBooking(this.selection!.id, this.selection!.name);
        this.toast.show({ message: SUCCESS_MESSAGES.BOOKING_SUCCESS });
      },
      error: (error) => {
        console.error(ERROR_MESSAGES.BOOKING_FAILED, error);
        this.toast.show({ 
          message: ERROR_MESSAGES.BOOKING_FAILED, 
          classname: 'bg-danger text-light' 
        });
      }
    });
  }

  private validateBooking(): boolean {
    if (!this.auth.current?.id) {
      this.toast.show({ 
        message: ERROR_MESSAGES.LOGIN_REQUIRED, 
        classname: 'bg-danger text-light' 
      });
      return false;
    }

    if (!this.arrival || !this.departure || !this.selection?.id) {
      this.toast.show({ 
        message: ERROR_MESSAGES.BOOKING_INCOMPLETE, 
        classname: 'bg-danger text-light' 
      });
      return false;
    }

    return true;
  }

  private createBookingPayload(): Partial<Bookings> {
    return {
      listing: this.selection!.id,
      user: this.auth.current?.id,
      arrival: this.arrival.toString(),
      departure: this.departure.toString(),
      confirmation: false
    };
  }

  private createConversationForBooking(listingId: number, listingName: string): void {
    const userId = this.auth.current?.id;
    if (!userId) return;

    const newConversation = {
      listing: listingId.toString(),
      participants: [userId],
      subject: `Booking at ${listingName}`
    };

    const newMessage = {
      messages: [{
        sender: userId,
        content: `Hi! I just made a booking at ${listingName}. Looking forward to it!`,
        timestamp: new Date()
      }]
    };

    this.conversationService.createConversation(newConversation).pipe(
      switchMap((conversation) =>
        this.conversationService.sendMessage(conversation.id, newMessage)
      )
    ).subscribe({
      error: (err) => {
        console.error(ERROR_MESSAGES.CONVERSATION_CREATION_FAILED, err);
      }
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public getListingById(id: number): Listings | undefined {
    return this.listingService.getListingById(this.listings, id);
  }

  public onSearch(): void {
    this.suggestions = this.searchService.filterItems(
      this.listings,
      this.query,
      (listing) => listing.name
    );
  }
}
