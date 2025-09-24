import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { BookingComponent, Booking } from './booking';
import { BookingService } from './booking.service';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockBookingService: jasmine.SpyObj<BookingService>;

  const mockBookings: Booking[] = [
    {
      id: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      serviceType: 'Consultation',
      bookingDate: '2024-01-15',
      bookingTime: '10:00',
      status: 'confirmed',
      notes: 'Initial consultation',
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      serviceType: 'Service A',
      bookingDate: '2024-01-20',
      bookingTime: '14:30',
      status: 'pending',
      createdAt: '2024-01-12T14:00:00Z'
    }
  ];

  beforeEach(async () => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', [
      'getAllBookings',
      'getBookingById',
      'createBooking',
      'updateBooking',
      'deleteBooking'
    ]);

    await TestBed.configureTestingModule({
      imports: [BookingComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: BookingService, useValue: bookingServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    mockBookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
  });

  beforeEach(() => {
    mockBookingService.getAllBookings.and.returnValue(of(mockBookings));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default form values', () => {
    expect(component.bookingForm.get('status')?.value).toBe('pending');
    expect(component.isEditing).toBeFalse();
    expect(component.editingBookingId).toBeNull();
  });

  it('should load bookings on init', () => {
    expect(mockBookingService.getAllBookings).toHaveBeenCalled();
    expect(component.bookings).toEqual(mockBookings);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading bookings fails', () => {
    mockBookingService.getAllBookings.and.returnValue(throwError(() => new Error('API Error')));
    component.loadBookings();
    
    expect(component.error).toBe('Failed to load bookings. Please try again.');
    expect(component.loading).toBeFalse();
  });

  it('should create a new booking when form is valid', () => {
    const newBooking: Booking = {
      customerName: 'Test User',
      customerEmail: 'test@example.com',
      serviceType: 'Consultation',
      bookingDate: '2024-02-01',
      bookingTime: '09:00',
      status: 'pending',
      notes: 'Test booking'
    };

    const createdBooking: Booking = { ...newBooking, id: '3', createdAt: '2024-01-15T09:00:00Z' };
    mockBookingService.createBooking.and.returnValue(of(createdBooking));

    component.bookingForm.patchValue(newBooking);
    component.onSubmit();

    expect(mockBookingService.createBooking).toHaveBeenCalledWith(newBooking);
    expect(component.bookings[0]).toEqual(createdBooking);
  });

  it('should update booking when in editing mode', () => {
    const bookingToUpdate: Booking = mockBookings[0];
    const updatedBooking: Booking = { ...bookingToUpdate, customerName: 'Updated Name' };
    
    mockBookingService.updateBooking.and.returnValue(of(updatedBooking));
    
    component.editBooking(bookingToUpdate);
    component.bookingForm.patchValue({ customerName: 'Updated Name' });
    component.onSubmit();

    expect(mockBookingService.updateBooking).toHaveBeenCalledWith('1', jasmine.any(Object));
    expect(component.bookings[0].customerName).toBe('Updated Name');
  });

  it('should delete booking when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockBookingService.deleteBooking.and.returnValue(of(undefined));
    
    component.deleteBooking('1');
    
    expect(mockBookingService.deleteBooking).toHaveBeenCalledWith('1');
    expect(component.bookings.length).toBe(1);
    expect(component.bookings[0].id).toBe('2');
  });

  it('should not delete booking when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.deleteBooking('1');
    
    expect(mockBookingService.deleteBooking).not.toHaveBeenCalled();
    expect(component.bookings.length).toBe(2);
  });

  it('should validate required fields', () => {
    component.bookingForm.patchValue({
      customerName: '',
      customerEmail: '',
      serviceType: '',
      bookingDate: '',
      bookingTime: ''
    });
    
    component.onSubmit();
    
    expect(component.getFieldError('customerName')).toContain('required');
    expect(component.getFieldError('customerEmail')).toContain('required');
    expect(component.getFieldError('serviceType')).toContain('required');
  });

  it('should validate email format', () => {
    component.bookingForm.patchValue({ customerEmail: 'invalid-email' });
    component.bookingForm.get('customerEmail')?.markAsTouched();
    
    expect(component.getFieldError('customerEmail')).toContain('valid email');
  });

  it('should reset form correctly', () => {
    component.isEditing = true;
    component.editingBookingId = '1';
    component.bookingForm.patchValue({ customerName: 'Test' });
    
    component.resetForm();
    
    expect(component.isEditing).toBeFalse();
    expect(component.editingBookingId).toBeNull();
    expect(component.bookingForm.get('status')?.value).toBe('pending');
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('pending')).toBe('status-pending');
    expect(component.getStatusClass('confirmed')).toBe('status-confirmed');
    expect(component.getStatusClass('cancelled')).toBe('status-cancelled');
    expect(component.getStatusClass('completed')).toBe('status-completed');
    expect(component.getStatusClass('unknown')).toBe('');
  });

  it('should enter editing mode when editBooking is called', () => {
    const booking = mockBookings[0];
    
    component.editBooking(booking);
    
    expect(component.isEditing).toBeTrue();
    expect(component.editingBookingId).toBe('1');
    expect(component.bookingForm.get('customerName')?.value).toBe('John Doe');
  });
});