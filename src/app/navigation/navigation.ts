import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  
  get isLogged(): boolean {
    try {
      return document.cookie
        .split('; ')
        .some((row) => row.startsWith('token='));
    } catch {
      return false;
    }
  }
}