import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { BOOKING_API_URL } from '../api';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;
  const baseUrl = BOOKING_API_URL;

  const mockBooking: Booking = {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    serviceType: 'Consultation',
    bookingDate: '2024-01-15',
    bookingTime: '10:00',
    status: 'confirmed',
    notes: 'Initial consultation'
  };

  const mockBookings: Booking[] = [mockBooking];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });
    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllBookings', () => {
    it('should return an array of bookings', () => {
      service.getAllBookings().subscribe(bookings => {
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBookings);
    });

    it('should handle array response', () => {
      service.getAllBookings().subscribe(bookings => {
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings`);
      req.flush(mockBookings);
    });

    it('should handle nested data response', () => {
      const response = { data: mockBookings };
      
      service.getAllBookings().subscribe(bookings => {
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings`);
      req.flush(response);
    });

    it('should handle error', () => {
      service.getAllBookings().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings`);
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getBookingById', () => {
    it('should return a single booking', () => {
      service.getBookingById('1').subscribe(booking => {
        expect(booking).toEqual(mockBooking);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBooking);
    });
  });

  describe('createBooking', () => {
    it('should create a new booking', () => {
      const newBooking: Partial<Booking> = {
        customerName: 'Jane Doe',
        customerEmail: 'jane@example.com',
        serviceType: 'Service A',
        bookingDate: '2024-01-20',
        bookingTime: '14:30',
        status: 'pending'
      };

      const createdBooking: Booking = { ...newBooking, id: '2' } as Booking;

      service.createBooking(newBooking as Booking).subscribe(booking => {
        expect(booking).toEqual(createdBooking);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(jasmine.objectContaining({
        customerName: newBooking.customerName,
        customerEmail: newBooking.customerEmail
      }));
      req.flush(createdBooking);
    });

    it('should sanitize booking data before sending', () => {
      const bookingWithEmptyFields: Partial<Booking> = {
        customerName: 'Test User',
        customerEmail: 'test@example.com',
        serviceType: 'Consultation',
        bookingDate: '2024-01-15',
        bookingTime: '10:00',
        status: 'pending',
        notes: '', // empty field
        id: undefined // undefined field
      };

      service.createBooking(bookingWithEmptyFields as Booking).subscribe();

      const req = httpMock.expectOne(`${baseUrl}/bookings`);
      expect(req.request.body.id).toBeUndefined();
      expect(req.request.body.notes).toBeUndefined();
      req.flush({ ...bookingWithEmptyFields, id: '1' });
    });
  });

  describe('updateBooking', () => {
    it('should update an existing booking', () => {
      const updatedBooking: Booking = { ...mockBooking, customerName: 'Updated Name' };

      service.updateBooking('1', updatedBooking).subscribe(booking => {
        expect(booking).toEqual(updatedBooking);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedBooking);
    });
  });

  describe('deleteBooking', () => {
    it('should delete a booking', () => {
      service.deleteBooking('1').subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('getBookingsByStatus', () => {
    it('should return bookings filtered by status', () => {
      service.getBookingsByStatus('confirmed').subscribe(bookings => {
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings?status=confirmed`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBookings);
    });
  });

  describe('getBookingsByDateRange', () => {
    it('should return bookings within date range', () => {
      const startDate = '2024-01-01';
      const endDate = '2024-01-31';

      service.getBookingsByDateRange(startDate, endDate).subscribe(bookings => {
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings?startDate=${startDate}&endDate=${endDate}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBookings);
    });
  });

  describe('searchBookings', () => {
    it('should search bookings by query', () => {
      const query = 'John Doe';

      service.searchBookings(query).subscribe(bookings => {
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings/search?q=${encodeURIComponent(query)}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBookings);
    });
  });

  describe('getAvailableTimeSlots', () => {
    it('should return available time slots for a date', () => {
      const date = '2024-01-15';
      const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00'];

      service.getAvailableTimeSlots(date).subscribe(slots => {
        expect(slots).toEqual(timeSlots);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings/available-slots?date=${date}`);
      expect(req.request.method).toBe('GET');
      req.flush(timeSlots);
    });
  });

  describe('validateBooking', () => {
    it('should validate booking and return validation result', () => {
      const validationResult = { valid: true };

      service.validateBooking(mockBooking).subscribe(result => {
        expect(result).toEqual(validationResult);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings/validate`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(jasmine.objectContaining({
        customerName: mockBooking.customerName
      }));
      req.flush(validationResult);
    });

    it('should return conflicts when booking is invalid', () => {
      const validationResult = { 
        valid: false, 
        conflicts: ['Time slot already booked', 'Service not available'] 
      };

      service.validateBooking(mockBooking).subscribe(result => {
        expect(result).toEqual(validationResult);
      });

      const req = httpMock.expectOne(`${baseUrl}/bookings/validate`);
      req.flush(validationResult);
    });
  });
});