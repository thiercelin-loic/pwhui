import { Routes } from '@angular/router';
import { Contract } from './contract/contract';
import { Landing } from './landing/landing';
import { AuthGuard } from './auth/auth.guard';
import { Cart } from './cart/cart';
import { Chat } from './chat/chat';
import { Settings } from './settings/settings';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  { path: 'contract', component: Contract },
  { path: 'cart', component: Cart, canActivate: [AuthGuard] },
  {path: 'chat', component: Chat, canActivate: [AuthGuard]},
  { path: 'settings', component: Settings }
];