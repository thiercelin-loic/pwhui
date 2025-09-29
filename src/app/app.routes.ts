import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Contract } from './contract/contract';
import { ProfileComponent } from './profile/profile';
import { BookingComponent } from './booking/booking';
import { AuthGuard } from './auth/auth.guard';

/**
 * The main application routes.
 */
export const routes: Routes = [
  /** The default route, which displays the landing page. */
  { path: '', component: Landing },
  /** The authentication routes, which are lazy-loaded. */
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  /** The contract page route. */
  { path: 'contract', component: Contract },
  /** The booking page route, which is protected by the authentication guard. */
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  /** The user profile page route, which is protected by the authentication guard. */
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  /** A wildcard route that redirects to the landing page for any unknown paths. */
  { path: '**', redirectTo: '' }
];
