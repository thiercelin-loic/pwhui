import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { AUTH_API_URL, USERS_API_URL } from '../api';

/**
 * A service that handles user authentication and session management.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = AUTH_API_URL;
  private usersUrl = USERS_API_URL;
  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the authentication token from the browser cookies.
   * @returns The authentication token, or `null` if not found.
   */
  getToken(): string | null {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!tokenCookie) {
      return null;
    }
    const cookieValue = tokenCookie.split('=')[1];
    return cookieValue.split('&')[0];
  }

  /**
   * Checks if the user is currently logged in.
   * @returns `true` if the user is logged in, `false` otherwise.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Logs in a user with the provided credentials.
   * @param credentials The user's login credentials.
   * @returns An observable that emits the server's response.
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          document.cookie = `token=${response.token};`;
        }
      })
    );
  }

  /**
   * Registers a new user with the provided data.
   * @param userData The new user's data.
   * @returns An observable that emits the server's response.
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Logs out the current user.
   */
  logout() {
    this.currentUser = null;
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }

  /**
   * Fetches the current user's data from the server.
   * @returns An observable that emits the current user's data, or `null` if not logged in.
   */
  getMe(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.usersUrl}/me`, { headers }).pipe(
      tap((user: User) => {
        this.currentUser = user;
        if (user && user.id) {
          document.cookie = `token=${token}&user=${user.id};`;
        }
      })
    );
  }

  /**
   * Gets the currently logged-in user.
   * @returns The current user, or `null` if not logged in.
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Gets the ID of the currently logged-in user.
   * @returns The user ID, or `null` if not logged in.
   */
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
