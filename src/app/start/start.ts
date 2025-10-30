import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitService } from '../init.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrl: './start.css',
  standalone: true,
  imports: [CommonModule]
})
export class Start {
  constructor(private init: InitService) {
    this.current = this.pull();
    this.error = this.init.initializationError$;
  }

  private tips: string[] = [
    'To maximize your chances of finding availability, make bookings in advance',
    'Popular workspaces fill up quickly - book early for the best spots',
    'Check out our filter options to find workspaces that match your needs',
    'Many workspaces offer special amenities like meeting rooms and printing services',
    'Consider booking during off-peak hours for better availability and rates',
    'Don\'t forget to cancel bookings you won\'t use in order to help other members',
    'Explore different neighborhoods to discover new favorite workspaces',
    'Some workspaces offer day passes and monthly memberships for frequent users'
  ];

  private pull(): string {
    const index = Math.floor(Math.random() * this.tips.length);
    return this.tips[index];
  }

  public current: string;
  public error: Observable<string | null>;
  public retry(): void { this.init.initialize(); }
}