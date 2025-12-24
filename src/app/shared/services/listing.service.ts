import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants';
import { Listings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private http = inject(HttpClient);

  getListings(): Observable<Listings[]> {
    return this.http.get<Listings[]>(API_ENDPOINTS.LISTINGS);
  }

  getListingById(listings: Listings[], id: number | string): Listings | undefined {
    return listings.find(listing => listing.id === Number(id));
  }
}
