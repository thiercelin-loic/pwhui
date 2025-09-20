import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Contract } from './contract/contract';
import { ProfileComponent } from './profile/profile';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  { path: 'contract', component: Contract },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
