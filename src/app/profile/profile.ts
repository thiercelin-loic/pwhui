import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['../auth/auth.css', './profile.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  bookings: any[] = [];
  defaultProfilePicture = 'https://static.vecteezy.com/system/resources/previews/006/390/348/non_2x/simple-flat-isolated-people-icon-free-vector.jpg';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: (data: any) => {
        this.user = data;
        this.fetchBookings();
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['/login']);
      }
    });
  }

  fetchBookings(): void {
    this.http.get<any[]>('http://157.245.43.197:3002/bookings').subscribe({
      next: (data: any) => {
        this.bookings = data;
      },
      error: (err: any) => {
        console.error('Failed to fetch bookings', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
