import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Splash } from './splash/splash';
import { CommonModule } from '@angular/common';
import { InitService } from './init.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Splash,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected showSplash$: Observable<boolean>;

  constructor(private initService: InitService) {
    this.showSplash$ = this.initService.isInitialized$.pipe(map(isInitialized => !isInitialized));
  }

  ngOnInit() {}
}