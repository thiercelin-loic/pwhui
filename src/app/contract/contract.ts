import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract.html',
  styleUrl: './contract.css'
})
export class Contract {
  currentDate = new Date();
}
