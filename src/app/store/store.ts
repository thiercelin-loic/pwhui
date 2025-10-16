import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  imports: [],
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store {
  date = new Date();
  today = this.date.getDate();
  month = this.date.toLocaleString('default', { month: 'long' });
  year = this.date.getFullYear();

  hour = this.date.getHours();
  minute = this.date.getMinutes()
}
