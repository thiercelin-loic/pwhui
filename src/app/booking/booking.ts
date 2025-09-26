import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';
import { Listing } from './listing.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  listings: Listing[] = [];
  bookingForm: FormGroup;
  isEditing = false;
  editingBookingId: number | null = null;
  loading = false;
  error: string | null = null;
  showDeleteModal = false;
  bookingToDeleteId: number | null = null;

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({
      user: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      listing: ['', [Validators.required]],
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
      confirmation: ['0', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBookings();
    this.loadListings();
    this.authService.getMe().subscribe();
    this.bookingForm.patchValue({
      user: this.authService.getUserId(),
      email: 'x@x.com'
    });
  }

  loadListings(): void {
    this.bookingService.getListings().subscribe({
      next: (listings) => {
        this.listings = listings;
      },
      error: (error) => {
        this.error = 'Failed to load listings. Please try again.';
        console.error('Error loading listings:', error);
      }
    });
  }

  loadBookings(): void {
    this.loading = true;
    this.error = null;

    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load bookings. Please try again.';
        this.loading = false;
        console.error('Error loading bookings:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData: Booking = this.bookingForm.getRawValue();

      if (this.isEditing && this.editingBookingId) {
        this.updateBooking(this.editingBookingId, bookingData);
      } else {
        this.createBooking(bookingData);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  createBooking(booking: Booking): void {
    this.loading = true;
    this.bookingService.createBooking(booking).subscribe({
      next: (newBooking) => {
        this.bookings.unshift(newBooking);
        this.resetForm();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to create booking. Please try again.';
        this.loading = false;
        console.error('Error creating booking:', error);
      }
    });
  }

  updateBooking(id: number, booking: Booking): void {
    this.loading = true;
    this.error = null;

    this.bookingService.updateBooking(id, booking).subscribe({
      next: (updatedBooking) => {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index !== -1) {
          this.bookings[index] = updatedBooking;
        }
        this.resetForm();
        this.loading = false;
      },
      error: (error) => {
        this.error = `Failed to update booking: ${error.message}`;
        this.loading = false;
        console.error('Error updating booking:', error);
      }
    });
  }

  editBooking(booking: Booking): void {
    this.isEditing = true;
    this.editingBookingId = booking.id;
    this.bookingForm.patchValue({
      user: booking.user,
      listing: booking.listing,
      arrival: booking.arrival,
      departure: booking.departure,
      confirmation: booking.confirmation
    });
    // Assuming email is part of the booking object, otherwise it needs to be fetched
  }

  openDeleteModal(id: number): void {
    this.bookingToDeleteId = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.bookingToDeleteId = null;
  }

  confirmDelete(): void {
    if (this.bookingToDeleteId) {
      this.deleteBooking(this.bookingToDeleteId);
      this.closeDeleteModal();
    }
  }

  deleteBooking(id: number): void {
    this.loading = true;
    this.bookingService.deleteBooking(id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b.id !== id);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to delete booking. Please try again.';
        this.loading = false;
        console.error('Error deleting booking:', error);
      }
    });
  }

  resetForm(): void {
    this.bookingForm.reset();
    this.bookingForm.patchValue({ confirmation: '0' });
    this.isEditing = false;
    this.editingBookingId = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.bookingForm.controls).forEach(key => {
      const control = this.bookingForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.bookingForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['email']) {
        return `Please enter a valid email address`;
      }
    }
    return '';
  }

  getListingName(id: number): string {
    const listing = this.listings.find(l => l.id === +id);
    return listing ? listing.name : 'N/A';
  }
}