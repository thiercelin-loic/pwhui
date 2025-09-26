import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth';
  private usersUrl = 'http://localhost:3001/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!tokenCookie) {
      return null;
    }
    const cookieValue = tokenCookie.split('=')[1];
    return cookieValue.split('&')[0];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          document.cookie = `token=${response.token};`;
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout() {
    this.currentUser = null;
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }

  getMe(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.usersUrl}/me`, { headers }).pipe(
      tap(user => {
        this.currentUser = user;
        if (user && user.id) {
          document.cookie = `token=${token}&user=${user.id};`;
        }
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUserId(): string | null {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!tokenCookie) {
      return null;
    }

    const userIdPart = tokenCookie
      .split('&')[1]
      .split('=')[1];

    return userIdPart || null;
  }
}
