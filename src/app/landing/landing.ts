import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BookingService } from '../booking/booking.service';
import { BOOKING_API_URL } from '../api';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule],
  templateUrl: 'landing.html',
  styleUrl: 'landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing implements OnInit {
  title = 'ParisWorkHub';
  search = ''
  suggestions: any[] = [];
  showSuggestions = false;
  isNavVisible = true;
  showWorkspaces = true; // Already set to true by default
  workspacesAnimating = false;
  firstname = '';
  loading = true;
  error: string | null = null;
  allSpaces: any[] = [];

  // Authentication and modal states
  showPublishModal = false;
  publishForm = {
    name: '',
    description: '',
    location: '',
    district: '',
    pricing: 0,
    amenities: '',
    photo: '',
    availability: '',
  };
  showBookingModal = false;
  bookingForm = {
    listing: 0,
    user: '',
    date: '',
    arrival: '',
    departure: '',
    confirmation: '0'
  };
  currentWorkspace: any = null;

  // Booking data
  upcomingBookings: any[] = [];

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef, public authService: AuthService, private bookingService: BookingService) { }

  ngOnInit() {
    this.fetchListings();
    this.fetchUpcomingBookings();
    // Ensure workspaces are visible on startup
    this.showWorkspaces = true;
  }

  fetchListings() {
    this.loading = true;
    this.error = null;
    this.bookingService.getListings().subscribe({
      next: (data) => {
        this.allSpaces = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = 'Failed to load listings.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleNav() {
    this.isNavVisible = !this.isNavVisible;
  }

  // Get  landscape based on current time
  getLandscape(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      // Morning (5 AM - 12 PM): Sunrise/Morning light
      return 'https://images.pexels.com/photos/13398532/pexels-photo-13398532.jpeg'; //  morning
    } else if (currentHour >= 12 && currentHour < 17) {
      // Afternoon (12 PM - 5 PM): Bright daylight
      return 'https://images.pexels.com/photos/6514862/pexels-photo-6514862.jpeg'; //  afternoon
    } else if (currentHour >= 17 && currentHour < 21) {
      // Evening (5 PM - 9 PM): Golden hour/Sunset
      return 'https://images.pexels.com/photos/2389273/pexels-photo-2389273.jpeg';
    } else {
      // Night (9 PM - 5 AM): City lights
      return 'https://images.pexels.com/photos/19798792/pexels-photo-19798792.jpeg'; //  night
    }
  }

  // Get time of day for CSS class
  getTimeOfDay(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'afternoon';
    } else if (currentHour >= 17 && currentHour < 21) {
      return 'evening';
    } else {
      return 'night';
    }
  }


  get availableSpaces() {
    const now = new Date();
    const available = this.allSpaces.filter(space => {
      const availabilityDate = new Date(space.availability);
      return availabilityDate >= now;
    });
    return available;
  }

  filters = { date: '', time: 0, duration: 0 }
  date = ''
  time = 0
  duration = 0
  filteredSpaces: any[] = [];
  isFiltered = false;

  day = new Date().getDate()
  month = new Date().getMonth() + 1 < 10
    ? '0' + (new Date().getMonth() + 1)
    : new Date().getMonth() + 1

  calendar = [
    this.day + '/' + this.month,
    (this.day + 1) + '/' + this.month,
    (this.day + 2) + '/' + this.month,
    (this.day + 3) + '/' + this.month,
    (this.day + 4) + '/' + this.month,
    (this.day + 5) + '/' + this.month,
    (this.day + 6) + '/' + this.month,
    (this.day + 7) + '/' + this.month
  ]

  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  durations = [15, 30, 45, 60, 75, 90, 105, 120]

  setSearch(value: string) {
    this.search = value;

    if (this.search.length > 0) {
      // Get the data source (filtered spaces if filters are applied, otherwise all spaces)
      const dataSource = this.isFiltered ? this.filteredSpaces : this.allSpaces;

      // Show suggestions based on search and current filters
      this.suggestions = dataSource.filter(space =>
        space.name.toLowerCase().includes(this.search.toLowerCase()) ||
        space.location.toLowerCase().includes(this.search.toLowerCase())
      ).slice(0, 7); // Increased to 7 suggestions (2 cards + 5 dropdown)
      this.showSuggestions = true;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  getCardSuggestions() {
    return this.suggestions.slice(0, 2); // First 2 suggestions as cards
  }

  getDropdownSuggestions() {
    return this.suggestions.slice(2); // Remaining suggestions as dropdown items (now 5 instead of 3)
  }

  selectSuggestion(suggestion: any) {
    // Reload page for future feature implementation
    window.location.reload();
  }

  hideSuggestions() {
    // Delay hiding to allow click events on suggestions
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  setDate(value: string) {
    this.date = value
  }

  setTime(value: string) {
    this.time = Number(value);
  }

  setDuration(value: string) {
    this.duration = Number(value);
  }

  setFilters() {
    this.filters = {
      date: this.date,
      time: this.time,
      duration: this.duration
    }
    this.applyFilters();
  }

  applyFilters() {
    // Start with all spaces
    let results = [...this.allSpaces];

    // Apply date filter if selected
    if (this.filters.date && this.filters.date !== 'Pick a date') {
      // For demo purposes, we'll filter based on availability
      // In a real app, this would check actual availability dates
      results = results.filter(space => {
        // Simple availability check - you can enhance this logic
        return space.availability !== 'Limited Seats';
      });
    }

    // Apply time filter if selected
    if (this.filters.time && this.filters.time > 0) {
      // Filter based on time preferences (demo logic)
      if (this.filters.time <= 12) {
        // Morning preference - prefer certain locations
        results = results.filter(space =>
          space.location.includes('1st Arr') ||
          space.location.includes('2nd Arr') ||
          space.location.includes('3rd Arr') ||
          space.availability !== 'Limited Seats'
        );
      }
    }

    // Apply duration filter if selected
    if (this.filters.duration && this.filters.duration > 0) {
      // Filter based on duration (demo logic)
      if (this.filters.duration >= 120) {
        // Longer sessions - prefer spaces with more amenities
        results = results.filter(space =>
          space.amenities.includes('Meeting rooms') ||
          space.amenities.includes('Printer') ||
          space.pricing <= 30
        );
      }
    }

    this.filteredSpaces = results;
    this.isFiltered = !!(this.filters.date && this.filters.date !== 'Pick a date') ||
      this.filters.time > 0 ||
      this.filters.duration > 0;

    // Update search suggestions if search is active
    if (this.search.length > 0) {
      this.setSearch(this.search);
    }
  }

  clearFilters() {
    this.date = '';
    this.time = 0;
    this.duration = 0;
    this.filters = { date: '', time: 0, duration: 0 };
    this.filteredSpaces = [];
    this.isFiltered = false;

    // Update search suggestions if search is active
    if (this.search.length > 0) {
      this.setSearch(this.search);
    }
  }

  toggleWorkspaces() {
    if (this.showWorkspaces) {
      // Reduced animation time for faster response
      this.workspacesAnimating = true;
      setTimeout(() => {
        this.showWorkspaces = false;
        this.workspacesAnimating = false;
      }, 200); // Reduced from 300ms
    } else {
      this.showWorkspaces = true;
      this.workspacesAnimating = true;
      setTimeout(() => {
        this.workspacesAnimating = false;
      }, 200); // Reduced from 300ms
    }
  }

  publishWorkspace() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }

    this.showPublishModal = true;
    this.resetPublishForm();
  }

  bookWorkspace(space: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.currentWorkspace = space;
    this.showBookingModal = true;
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.currentWorkspace = null;
    this.bookingForm = {
      listing: 0,
      user: '',
      date: '',
      arrival: '',
      departure: '',
      confirmation: '0'
    };
  }

  submitBooking() {
    if (!this.currentWorkspace) {
      return;
    }
    const user = this.authService.getCurrentUser();
    this.bookingForm.listing = this.currentWorkspace.id;
    this.bookingForm.user = user ? user.username : 'guest';
    const bookingPayload = {
      ...this.bookingForm,
      arrival: this.bookingForm.date ? `${this.bookingForm.date}T${this.bookingForm.arrival}` : this.bookingForm.arrival
    };
    this.http.post(`${BOOKING_API_URL}/bookings`, bookingPayload)
      .subscribe({
        next: (response: any) => {
          alert('Booking successful!');
          this.closeBookingModal();
        },
        error: () => {
          alert('Failed to book workspace. Please try again.');
          // console.log('Booking payload:', bookingPayload);
        }
      });
  }

  closePublishModal() {
    this.showPublishModal = false;
    this.resetPublishForm();
  }

  submitWorkspace() {
    if (!this.publishForm.name || !this.publishForm.location || !this.publishForm.district || !this.publishForm.pricing) {
      alert('Please fill in all required fields');
      return;
    }
    const workspaceData = {
      name: this.publishForm.name,
      description: this.publishForm.description,
      location: this.publishForm.location,
      amenities: this.publishForm.amenities,
      photo: this.publishForm.photo,
      availability: this.publishForm.availability,
      pricing: this.publishForm.pricing
    }
    this.http.post(`${BOOKING_API_URL}/listings`, workspaceData)
      .subscribe({
        next: () => {
          alert('Workspace published successfully!');
          this.closePublishModal();
        },
        error: () => {
          alert('Failed to publish workspace. Please try again.');
        }
      });
  }

  resetPublishForm() {
    this.publishForm = {
      name: '',
      description: '',
      location: '',
      district: '',
      pricing: 0,
      amenities: '',
      photo: '',
      availability: '',
    };
  }

  getDisplayedSpaces() {
    return this.isFiltered ? this.filteredSpaces : this.allSpaces;
  }

  getCheaperWorkspaces() {
    return [...this.allSpaces]
      .sort((a, b) => a.pricing - b.pricing)
      .slice(0, 3);
  }

  getTopRatedWorkspaces() {
    // Assuming top rated are the most expensive for now
    return [...this.allSpaces]
      .sort((a, b) => b.pricing - a.pricing)
      .slice(0, 3);
  }



  // Calculate dynamic availability status
  getAvailabilityStatus(space: any): { text: string, class: string } {
    const today = new Date('2025-09-11'); // Current date
    const availabilityDate = new Date(space.availability);
    const timeDiff = availabilityDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Check if space is currently open/closed
    if (daysDiff === 0) { // Today
      if (space.isOpen) {
        if (space.spotsLeft !== undefined) {
          if (space.spotsLeft <= 1) {
            return { text: 'Last Spot!', class: 'urgent' };
          } else if (space.spotsLeft <= 3) {
            return { text: `${space.spotsLeft} Spots Left`, class: 'limited' };
          }
        }
        return { text: 'Open', class: 'available' };
      } else {
        const openTime = space.openingTime || '09:00';
        return { text: `Closed`, class: 'closed' };
      }
    }

    // Future availability
    if (daysDiff > 0) {
      if (daysDiff === 1) {
        return { text: 'Open Tomorrow', class: 'upcoming' };
      } else if (daysDiff <= 7) {
        return { text: `Open in ${daysDiff} days`, class: 'upcoming' };
      } else {
        return { text: `Available ${space.availability}`, class: 'future' };
      }
    }

    // Past availability
    if (daysDiff < 0) {
      const absDays = Math.abs(daysDiff);
      if (absDays === 1) {
        return { text: 'Closed Yesterday', class: 'closed' };
      } else if (absDays <= 7) {
        return { text: `Closed ${absDays} days ago`, class: 'closed' };
      } else {
        return { text: 'Currently Closed', class: 'closed' };
      }
    }

    return { text: 'Check Availability', class: 'neutral' };
  }

  // Get status for popular workspaces
  getPopularSpaceStatus(space: any): { text: string, class: string } {
    // Always show availability status, not category labels
    return this.getAvailabilityStatus(space);
  }

  // Track by functions for better performance
  trackBySpaceId(index: number, space: any): number {
    return space.id;
  }

  trackByBookingId(index: number, booking: any): number {
    return booking.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  goToAuth() {
    this.router.navigate(['/auth']);
  }

  goToProfile() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  // Booking-related methods
  fetchUpcomingBookings() {
    if (!this.authService.isLoggedIn()) {
      return;
    }
    this.http.get<any[]>(`${BOOKING_API_URL}/bookings`).subscribe({
      next: (bookings) => {
        const now = new Date();
        const futureBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.arrival);
          return bookingDate > now;
        });
        this.upcomingBookings = futureBookings
          .sort((a, b) => {
            const dateA = new Date(a.arrival);
            const dateB = new Date(b.arrival);
            return dateA.getTime() - dateB.getTime();
          })
          .slice(0, 3);
        this.upcomingBookings.forEach(booking => {
          this.fetchWorkspaceForBooking(booking);
        });
        this.cdr.detectChanges();
      },
      error: () => {
      }
    });
  }

  fetchWorkspaceForBooking(booking: any) {
    this.http.get<any>(`${BOOKING_API_URL}/listings/${booking.listing}`).subscribe({
      next: (workspace) => {
        booking.workspace = workspace;
        this.cdr.detectChanges();
      },
      error: () => {
        booking.workspace = {
          name: 'Workspace',
          location: 'Paris',
          photo: 'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg'
        };
        this.cdr.detectChanges();
      }
    });
  }

  getUpcomingBookings() {
    return this.upcomingBookings;
  }

  getBookingStatusClass(status: string): string {
    switch (status) {
      case '1':
        return 'booking-status-confirmed';
      case '0':
        return 'booking-status-pending';
      default:
        return 'booking-status-cancelled';
    }
  }

  formatBookingDate(dateString: string): string {
    if (!dateString) {
      return 'Invalid date';
    }
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      // Format as "Day, Month Date" (e.g., "Tue, Sep 24")
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  }

  calculateDuration(arrival: string, departure: string): string {
    const arrivalTime = new Date('1970-01-01T' + arrival + ':00');
    const departureTime = new Date('1970-01-01T' + departure + ':00');
    const diffMs = departureTime.getTime() - arrivalTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0 && diffMinutes > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else {
      return `${diffMinutes}m`;
    }
  }

  viewBookingDetails(booking: any) {
    // Navigate to booking management page with specific booking
    this.router.navigate(['/booking'], {
      queryParams: { id: booking.id }
    });
  }

  goToBookings(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.authService.getCurrentUser()?.id
      ? this.router.navigate(['/booking'])
      : this.router.navigate(['/auth']);
  }

}

