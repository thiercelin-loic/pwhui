import { Injectable } from '@angular/core';
import { STORAGE_CONSTANTS, COOKIE_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private getCookieValue(key: string): string | null {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${key}=`));

    if (!cookie) {
      return null;
    }

    return cookie.split('=')[1];
  }

  hasCookie(key: string): boolean {
    return document.cookie.split('; ').some(row => row.startsWith(`${key}=`));
  }

  getToken(): string | null {
    const tokenCookie = this.getCookieValue(STORAGE_CONSTANTS.COOKIE_TOKEN_KEY);
    
    if (!tokenCookie) {
      return null;
    }

    return tokenCookie.split(STORAGE_CONSTANTS.COOKIE_SEPARATOR)[0];
  }

  getUserId(): string | null {
    const tokenCookie = this.getCookieValue(STORAGE_CONSTANTS.COOKIE_TOKEN_KEY);
    
    if (!tokenCookie) {
      return null;
    }

    const parts = tokenCookie.split(STORAGE_CONSTANTS.COOKIE_SEPARATOR);
    if (parts.length < 2) {
      return null;
    }

    const idPart = parts[1];
    return idPart.split('=')[1] || null;
  }

  setToken(token: string): void {
    document.cookie = `${STORAGE_CONSTANTS.COOKIE_TOKEN_KEY}=${token};`;
  }

  setTokenWithUser(token: string, userId: string, firstName: string): void {
    document.cookie = `${STORAGE_CONSTANTS.COOKIE_TOKEN_KEY}=${token}${STORAGE_CONSTANTS.COOKIE_SEPARATOR}id=${userId}${STORAGE_CONSTANTS.COOKIE_SEPARATOR}user=${firstName};`;
  }

  clearToken(): void {
    document.cookie = `${STORAGE_CONSTANTS.COOKIE_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  setConsent(): void {
    document.cookie = `${COOKIE_CONSTANTS.CONSENT_KEY}=${COOKIE_CONSTANTS.CONSENT_VALUE}; max-age=${COOKIE_CONSTANTS.CONSENT_MAX_AGE}`;
  }

  hasConsent(): boolean {
    return this.hasCookie(COOKIE_CONSTANTS.CONSENT_KEY) && 
           this.getCookieValue(COOKIE_CONSTANTS.CONSENT_KEY) === COOKIE_CONSTANTS.CONSENT_VALUE;
  }
}
