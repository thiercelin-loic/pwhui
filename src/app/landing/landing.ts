import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth/auth.service';
import { ToastService } from '@app/toast/toast.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Bookings, Listings } from './landing.model';
import { 
  ListingService, 
  BookingDataService, 
  ConversationService,
  DateFormatterService,
  TypingAnimationService,
  SearchService
} from '@shared/services';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@shared/constants';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule, TranslateModule],
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
  
  auth = inject(AuthService);
  toast = inject(ToastService);

  public date: Date = this.dateFormatter.getCurrentDate();
  public today = this.dateFormatter.getToday();
  public month = this.dateFormatter.getMonth();
  public year = this.dateFormatter.getYear();

  public listings: Listings[] = [];
  public bookings: Bookings[] = [];
  public selection: Listings = {} as Listings;
  public arrival!: Date;
  public departure!: Date;
  public query = '';
  public suggestions: Listings[] = [];
  public placeholder = '';

  ngOnInit(): void {
    this.startTypingAnimation();
    this.loadListings();
    this.loadUserBookings();
  }

  ngOnDestroy(): void {
    this.typingAnimation.stopAnimation();
  }

  private startTypingAnimation(): void {
    const searchTips = this.translate.instant('COMMON.SEARCH_TIPS.LANDING') as string[];
    this.typingAnimation.startAnimation(
      searchTips,
      (text) => { this.placeholder = text; }
    );
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

  private loadUserBookings(): void {
    this.auth.getMe().subscribe(() => {
      const userId = this.auth.current?.id;
      if (userId) {
        this.bookingDataService.getUserUpcomingBookings(userId).subscribe({
          next: (data) => { this.bookings = data; },
          error: (error) => {
            console.error('Failed to load bookings', error);
          }
        });
      } else {
        this.bookings = [];
      }
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
        this.createConversationForBooking(this.selection.id, this.selection.name);
        this.toast.show({ message: SUCCESS_MESSAGES.BOOKING_SUCCESS });
      },
      error: (error) => {
        console.error('Booking failed', error);
        this.toast.show({ 
          message: 'Booking failed. Please try again.', 
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

    if (!this.arrival || !this.departure || !this.selection.id) {
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
      listing: this.selection.id,
      user: this.auth.current?.id,
      arrival: this.arrival.toString(),
      departure: this.departure.toString(),
      confirmation: '' as string
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

    this.conversationService.createConversation(newConversation).subscribe({
      next: (conversation) => {
        this.conversationService.sendMessage(conversation.id, newMessage).subscribe({
          next: () => {
            console.log('Conversation and initial message created successfully');
          },
          error: (err) => {
            console.error(ERROR_MESSAGES.CONVERSATION_CREATION_FAILED, err);
          }
        });
      },
      error: (err) => {
        console.error(ERROR_MESSAGES.CONVERSATION_CREATION_FAILED, err);
      }
    });
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
