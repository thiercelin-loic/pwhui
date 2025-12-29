import { Routes } from '@angular/router';
import { Contract } from './contract/contract';
import { Landing } from './landing/landing';
import { AuthGuard } from './auth/auth.guard';
import { Profil } from './profil/profil';
import { Chat } from './chat/chat';
import { Settings } from './settings/settings';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  { path: 'contract', component: Contract },
  { path: 'profil', component: Profil, canActivate: [AuthGuard] },
  {path: 'chat', component: Chat, canActivate: [AuthGuard]},
  { path: 'settings', component: Settings }
];