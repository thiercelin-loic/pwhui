import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * A route guard that checks if a user is logged in before allowing access to a route.
 * If the user is not logged in, they are redirected to the login page.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determines if a route can be activated.
   * @returns `true` if the user is logged in, `false` otherwise.
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
