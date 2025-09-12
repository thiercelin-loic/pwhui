import { Routes } from '@angular/router';
import { Landing } from './scripts/landing';
import { Login } from './scripts/login';
import { Signup } from './scripts/signup';
import { Terms } from './scripts/terms';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'terms', component: Terms },
  { path: '**', redirectTo: '' }
];
