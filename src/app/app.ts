import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { InitService } from './init.service';
import { Start } from './start/start';
import { Policy } from './policy/policy';
import {Navigation} from "./navigation/navigation";
import {ToastComponent} from "./toast/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Start,
    Policy,
    Navigation,
    Policy,
    ToastComponent
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