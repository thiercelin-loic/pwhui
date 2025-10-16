import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { InitService } from './init.service';
import { HttpClient } from '@angular/common/http';
import { Start } from './start/start';
import { Preferences } from './preferences/preferences';
import {Store} from './store/store'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    Start,
    Preferences,
    Store
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected showStart$: Observable<boolean>;

  constructor(private initService: InitService) {
    this.showStart$ = this.initService.isInitialized$.pipe(map(isInitialized => !isInitialized));
  }
}