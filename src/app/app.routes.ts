import { Routes } from '@angular/router';
import { Contract } from './contract/contract';
import { Store } from './store/store';

export const routes: Routes = [
  { path: '', component: Store },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  { path: 'contract', component: Contract },
  { path: '**', redirectTo: '' }
];
