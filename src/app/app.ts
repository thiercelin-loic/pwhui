import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Start } from './start/start';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { InitService } from './init.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Start,
    RouterLink
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected showStart$: Observable<boolean>;

  constructor(private initService: InitService, http: HttpClient) {
    this.showStart$ = this.initService.isInitialized$.pipe(map(isInitialized => !isInitialized));
  }
}