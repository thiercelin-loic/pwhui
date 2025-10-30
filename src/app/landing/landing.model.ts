export interface Listings {
    id: number;
    name: string;
    description: string;
    location: string;
    amenities: string;
    photo: string;
    pricing: number;
}

export interface Bookings {
    id: number;
    listing: number;
    user: string;
    arrival: string;
    departure: string;
    confirmation: string;
}