import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../views/terms.html',
  styleUrls: ['../styles/terms.css']
})
export class Terms {
  currentDate = new Date();
}
