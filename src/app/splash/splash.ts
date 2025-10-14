import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitService } from '../init.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.html',
  styleUrl: './splash.css',
  standalone: true,
  imports: [CommonModule]
})
export class Splash implements OnInit {

  tips = [
    'To maximize your chances of finding availability, make bookings in advance',
    'Popular workspaces fill up quickly - book early for the best spots',
    'Check out our filter options to find workspaces that match your needs',
    'Many workspaces offer special amenities like meeting rooms and printing services',
    'Consider booking during off-peak hours for better availability and rates',
    'Don\'t forget to cancel bookings you won\'t use in order to help other members',
    'Explore different neighborhoods to discover new favorite workspaces',
    'Some workspaces offer day passes and monthly memberships for frequent users'
  ];

  currentTip: string;
  errorMessage$: Observable<string | null>;

  constructor(private initService: InitService) { 
    // Select a random tip when the component is created
    this.currentTip = this.getRandomTip();
    this.errorMessage$ = this.initService.initializationError$;
  }

  ngOnInit(): void {
    // No need for tip rotation anymore
  }

  getRandomTip(): string {
    const randomIndex = Math.floor(Math.random() * this.tips.length);
    return this.tips[randomIndex];
  }

  retryInitialization(): void {
    this.initService.initialize();
  }

}
