import { Routes } from '@angular/router';
import { Contract } from './contract/contract';
import { Landing } from './landing/landing';
import { Settings } from './settings/settings';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  { path: 'contract', component: Contract },
  {path: 'settings', component: Settings}
];