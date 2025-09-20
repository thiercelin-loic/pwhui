import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = { name: 'John Doe', email: 'john.doe@example.com' };
  private apiUrl = 'http://localhost:3002/auth';
  private usersUrl = 'http://localhost:3002/users';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    return token || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout() {
    // In a real app, this would clear the cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  getMe(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.usersUrl}/me`, { headers });
  }

  getCurrentUser() {
    return this.isLoggedIn() ? this.user : null;
  }
}
