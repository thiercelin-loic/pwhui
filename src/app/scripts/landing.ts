import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule],
  templateUrl: '../views/landing.html',
  styleUrl: '../styles/landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {
  name = 'John'
  search = ''
  suggestions: any[] = [];
  showSuggestions = false;
  isNavVisible = true;
  showFilters = false;
  filtersAnimating = false;
  
  // Authentication and modal states
  isUserConnected = false; // Set to true when user is logged in
  showPublishModal = false;
  publishForm = {
    name: '',
    description: '',
    location: '',
    district: '',
    pricing: 0,
    amenities: '',
    photo: '',
    openingTime: '09:00',
    closingTime: '18:00',
    capacity: 1
  };

  constructor(private router: Router) {}

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

  allSpaces = [
    {
      id: 1,
      name: 'Station F Coworking',
      description: 'A nice place',
      location: '13th Arr',
      amenities: 'WiFi, Coffee',
      photo: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
      availability: '2025-09-11',
      pricing: 25,
      isOpen: true,
      openingTime: '08:00',
      closingTime: '20:00',
      spotsLeft: 8
    },
    {
      id: 2,
      name: 'WeWork La Fayette',
      description: 'A nice place',
      location: '9th Arr',
      amenities: 'WiFi, Coffee',
      photo: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg',
      availability: '2025-09-12',
      pricing: 30,
      isOpen: false,
      openingTime: '09:00',
      closingTime: '18:00',
      spotsLeft: 2
    },
    {
      id: 3,
      name: 'Morning Coworking',
      description: 'A nice place',
      location: '2nd Arr',
      amenities: 'WiFi, Coffee',
      photo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      availability: '2025-09-13',
      pricing: 28,
      isOpen: true,
      openingTime: '07:00',
      closingTime: '21:00',
      spotsLeft: 5
    },
    {
      id: 4,
      name: 'Anticafé Louvre',
      description: 'A nice place',
      location: '1st Arr',
      amenities: 'WiFi, Coffee',
      photo: 'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg',
      availability: '2025-09-11',
      pricing: 22,
      isOpen: true,
      openingTime: '10:00',
      closingTime: '22:00',
      spotsLeft: 1
    },
    {
      id: 5,
      name: 'Numa Coworking',
      description: 'A nice place',
      location: '10th Arr',
      amenities: 'WiFi, Coffee',
      photo: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
      availability: '2025-09-14',
      pricing: 26,
      isOpen: false,
      openingTime: '08:30',
      closingTime: '19:00',
      spotsLeft: 12
    },
    {
      id: 6,
      name: 'Kwerk Bienfaisance',
      description: 'A nice place',
      location: '8th Arr',
      amenities: 'WiFi, Coffee',
      photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
      availability: '2025-09-10',
      pricing: 35,
      isOpen: false,
      openingTime: '09:00',
      closingTime: '18:00',
      spotsLeft: 3
    }
  ];

  popularSpaces = [
    {
      id: 7,
      name: 'The Loft Coworking',
      description: 'Creative space in the heart of Montmartre',
      location: '18th Arr',
      amenities: 'WiFi, Coffee, Printer',
      photo: 'https://images.pexels.com/photos/8477444/pexels-photo-8477444.jpeg',
      availability: '2025-09-12',
      pricing: 32,
      isOpen: true,
      openingTime: '08:00',
      closingTime: '20:00'
    },
    {
      id: 8,
      name: 'Innovation Hub',
      description: 'Modern workspace with tech amenities',
      location: '3rd Arr',
      amenities: 'WiFi, Coffee, Meeting rooms',
      photo: 'https://images.pexels.com/photos/12934594/pexels-photo-12934594.jpeg',
      availability: '2025-09-13',
      pricing: 28,
      isOpen: false,
      openingTime: '09:00',
      closingTime: '18:00'
    },
    {
      id: 9,
      name: 'Creative Studio',
      description: 'Inspiring environment for creative minds',
      location: '11th Arr',
      amenities: 'WiFi, Coffee, Design tools',
      photo: 'https://images.pexels.com/photos/7511753/pexels-photo-7511753.jpeg',
      availability: '2025-09-11',
      pricing: 30,
      isOpen: true,
      openingTime: '07:00',
      closingTime: '22:00'
    }
  ];

  availableSpaces = [
    {
      id: 10,
      name: 'Station F Coworking',
      description: 'The world\'s largest startup campus, offering a vibrant and innovative environment.',
      location: '13th Arr',
      amenities: 'WiFi, Coffee, Meeting rooms, Printer',
      photo: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
      availability: '2025-09-11',
      pricing: 25,
      status: 'available',
      isOpen: true,
      openingTime: '08:00',
      closingTime: '20:00',
      spotsLeft: 15
    },
    {
      id: 11,
      name: 'WeWork La Fayette',
      description: 'A beautifully designed workspace with a lively community and premium amenities.',
      location: '9th Arr',
      amenities: 'WiFi, Coffee, Meeting rooms, Phone booths',
      photo: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg',
      availability: '2025-09-14',
      pricing: 30,
      status: 'spots-left',
      isOpen: true,
      openingTime: '07:00',
      closingTime: '21:00',
      spotsLeft: 2
    },
    {
      id: 12,
      name: 'Morning Coworking',
      description: 'A cozy and inspiring space that fosters creativity and collaboration.',
      location: '2nd Arr',
      amenities: 'WiFi, Coffee, Quiet zones, Library',
      photo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      availability: '2025-09-15',
      pricing: 28,
      status: 'limited-seats',
      isOpen: false,
      openingTime: '09:00',
      closingTime: '18:00',
      spotsLeft: 1
    }
  ];

  upcomingBookings = [
    {
      id: 13,
      name: 'Anticafé Louvre',
      description: 'Unique concept mixing café and coworking',
      location: '1st Arr',
      amenities: 'WiFi, Coffee, Games, Books',
      photo: 'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg',
      dateTime: 'Tomorrow, 9:00 AM - 1:00 PM',
      confirmation: 'BK2873',
      pricing: 22
    },
    {
      id: 14,
      name: 'Numa Coworking',
      description: 'Dynamic workspace in a vibrant neighborhood',
      location: '10th Arr',
      amenities: 'WiFi, Coffee, Events, Networking',
      photo: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
      dateTime: 'Friday, 2:00 PM - 6:00 PM',
      confirmation: 'BK3142',
      pricing: 26
    }
  ];

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

    // Apply filters to all spaces
    this.applyFilters();
    
    console.log('Filters applied:', this.filters);
    console.log('Filtered results:', this.filteredSpaces.length, 'spaces found');
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
    this.showFilters = false; // Hide filters when cleared

    // Update search suggestions if search is active
    if (this.search.length > 0) {
      this.setSearch(this.search);
    }
  }

  toggleFilters() {
    if (this.showFilters) {
      // Reduced animation time for faster response
      this.filtersAnimating = true;
      setTimeout(() => {
        this.showFilters = false;
        this.filtersAnimating = false;
      }, 200); // Reduced from 300ms
    } else {
      this.showFilters = true;
      this.filtersAnimating = true;
      setTimeout(() => {
        this.filtersAnimating = false;
      }, 200); // Reduced from 300ms
    }
  }

  publishWorkspace() {
    if (!this.isUserConnected) {
      // Redirect to authentication page
      this.router.navigate(['/login']);
    } else {
      // Show publish modal
      this.showPublishModal = true;
    }
  }

  closePublishModal() {
    this.showPublishModal = false;
    this.resetPublishForm();
  }

  submitWorkspace() {
    // Validate form
    if (!this.publishForm.name || !this.publishForm.location || !this.publishForm.district || !this.publishForm.pricing) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend API
    console.log('Publishing workspace:', this.publishForm);
    
    // For demo purposes, add to allSpaces array
    const newWorkspace = {
      id: Date.now(), // Simple ID generation
      name: this.publishForm.name,
      description: this.publishForm.description,
      location: `${this.publishForm.district}, ${this.publishForm.location}`,
      amenities: this.publishForm.amenities,
      photo: this.publishForm.photo || 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
      availability: new Date().toISOString().split('T')[0],
      pricing: this.publishForm.pricing,
      isOpen: true,
      openingTime: this.publishForm.openingTime,
      closingTime: this.publishForm.closingTime,
      spotsLeft: this.publishForm.capacity
    };

    this.allSpaces.push(newWorkspace);
    
    alert('Workspace published successfully!');
    this.closePublishModal();
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
      openingTime: '09:00',
      closingTime: '18:00',
      capacity: 1
    };
  }

  getDisplayedSpaces() {
    return this.isFiltered ? this.filteredSpaces : this.allSpaces;
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
}
