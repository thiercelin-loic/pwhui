export interface Booking {
  id?: number;
  customerName: string;
  customerEmail: string;
  serviceType: string;
  bookingDate: string;
  bookingTime: string;
  status: string;
  notes?: string;
  user?: string;
  listing?: number;
  email?: string;
  arrival?: string;
  departure?: string;
  confirmation?: string;
}