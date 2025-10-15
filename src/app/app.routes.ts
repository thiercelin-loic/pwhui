import { Routes } from '@angular/router';
import { Contract } from './contract/contract';
import { App } from './app';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  { path: 'contract', component: Contract },
  { path: '**', redirectTo: '' }
];
