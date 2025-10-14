import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { AUTH_API_URL, USERS_API_URL } from '../api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = { auth: AUTH_API_URL, users: USERS_API_URL };
  private current: User | null = null;
  constructor(private http: HttpClient) { }

  getToken(): string | null {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));

    if (!token) { return null }
    return token
      .split('=')[1]
      .split('&')[0];
  }

  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.url.auth}/login`,
      credentials
    ).pipe(tap((response: any) =>
      response.token && (
        document.cookie = `token=${response.token};`
      )
    ))
  }

  register(user: any): Observable<any> {
    return this.http.post(
      `${this.url.auth}/register`,
      user
    );
  }

  logout() {
    this.current = null;
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  getMe(): Observable<User | null> {
    const token = this.getToken();
    const name = 'Authorization';
    const value = `Bearer ${token}`;
    const headers = new HttpHeaders().set(name, value);

    if (!token) { return of(null); }
    return this.http.get<User>(
      `${this.url.users}/me`,
      { headers }
    ).pipe(tap((user: User) => {
      this.current = user;
      user && user.id && (
        document.cookie
        = `token=${token}&user=${user.id};`
      );
    }));

  }

  getId(): string | null {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));

    if (!token) { return null; }
    return token
      .split('&')[1]
      .split('=')[1]
      || null;
  }

  getCurrent(): User | null { return this.current; }
  isLogged(): boolean { return !!this.getToken(); }
}