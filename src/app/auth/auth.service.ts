import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login, User } from './auth.model';
import { CookieService } from '@shared/services/cookie.service';
import { API_ENDPOINTS, STORAGE_CONSTANTS } from '@shared/constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private user: User | null = null;

  login(credentials: Login): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      API_ENDPOINTS.LOGIN,
      credentials
    ).pipe(
      tap((response: { access_token: string }) => {
        if (response.access_token) {
          this.cookieService.setToken(response.access_token);
        }
      })
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_ENDPOINTS.REGISTER, user);
  }

  logout(): void {
    this.user = null;
    this.cookieService.clearToken();
  }

  getMe(): Observable<User | null> {
    const token = this.cookieService.getToken();

    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `${STORAGE_CONSTANTS.TOKEN_PREFIX}${token}`
    );
    
    return this.http.get<User>(API_ENDPOINTS.ME, { headers }).pipe(
      tap((user: User) => {
        this.user = user;
        if (user?.id) {
          this.cookieService.setTokenWithUser(token, user.id, user.first_name);
        }
      })
    );
  }

  getId(): string | null {
    return this.cookieService.getUserId();
  }

  get current(): User | null {
    return this.user;
  }

  isLogged(): boolean {
    return !!this.cookieService.getToken();
  }
}