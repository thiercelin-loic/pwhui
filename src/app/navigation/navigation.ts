import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  private auth = inject(AuthService);
  
  get isLogged(): boolean {
    return this.auth.isLogged();
  }
}