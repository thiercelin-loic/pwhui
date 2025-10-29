import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { path } from '../server';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: User | null = null;
  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));

    if (!token) { return null }
    return token
      .split('=')[1]
      .split('&')[0];
  }

  public login(credentials: any): Observable<any> {
    return this.http.post(
      `${path.auth}/login`,
      credentials
    ).pipe(tap((response: any) =>
      response.token && (
        document.cookie = `token=${response.token};`
      )
    ))
  }

  public register(user: any): Observable<any> {
    return this.http.post(
      `${path.auth}/register`,
      user
    );
  }

  public logout() {
    this.user = null;
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  public getMe(): Observable<User | null> {
    const token = this.getToken();
    const name = 'Authorization';
    const value = `Bearer ${token}`;
    const headers = new HttpHeaders().set(name, value);

    if (!token) { return of(null); }
    return this.http.get<User>(
      `${path.users}/me`,
      { headers }
    ).pipe(tap((user: User) => {
      this.user = user;
      user && user.id && (
        document.cookie
        = `token=${token}&id=${user.id}&user=${user.first_name};`
      );
    }));
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

  public get current(): User | null { return this.user; }
  public isLogged(): boolean { return !!this.getToken(); }
}