import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login, User } from './auth.model';
import { path } from '../server';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private user: User | null = null;

  private getToken(): string | null {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));

    if (!token) { return null }
    return token
      .split('=')[1]
      .split('&')[0];
  }

  public login(credentials: Login): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${path.auth}/login`,
      credentials
    ).pipe(tap((response: { access_token: string }) => {
      if (response.access_token) {
        document.cookie = `token=${response.access_token};`;
      }
    }))
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(
      `${path.auth}/register`,
      user
    );
  }

  public logout(): void {
    this.user = null;
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  public getMe(): Observable<User | null> {
    const token = this.getToken();
    const name = 'Authorization';
    const value = `Bearer ${token}`;
    const headers = new HttpHeaders().set(name, value);

    if (!token) { return of(null); }
    
    return this.http.get<User>(`${path.users}/me`, { headers }).pipe(
      tap((user: User) => {
        this.user = user;
        if (user && user.id) {
          document.cookie
          = `token=${token}&id=${user.id}&user=${user.first_name};`
        }
      })
    );
  }

  public getId(): string | null {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));

    if (!token) { return null; }
    return token
      .split('&')[1]
      .split('=')[1]
      || null;
  }

  public get current(): User | null { return this.user }
  public isLogged(): boolean { return !!this.getToken(); }
}