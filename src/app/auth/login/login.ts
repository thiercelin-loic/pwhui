import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

/**
 * The login component.
 * Handles the user login form and authentication.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: '../auth.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HttpClientModule]
})
export class Login implements OnInit {
  constructor(private builder: FormBuilder, private router: Router, private authService: AuthService) { }
  
  /** The login form. */
  form!: FormGroup;
  /** Validation rules for the email field. */
  email = [Validators.required, Validators.email];
  /** Validation rules for the password field. */
  password = [Validators.required, Validators.minLength(6)];
  /** Form controls configuration. */
  controls = { email: ['', this.email], password: ['', this.password] };
  /** Error message to display to the user. */
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.form = this.builder.group(this.controls);
  }

  /**
   * Sends the login request to the authentication service.
   */
  send = (): any => this.authService.login(this.form.value)
    .subscribe({
      next: (response) => {
        document.cookie = `token=${(response as any).access_token}; path=/`;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'An unexpected error occurred. Please try again later.';
      }
    });

  /**
   * Handles the case where the form is invalid.
   */
  denied = (): void => console.log('Form is invalid');

  /**
   * Submits the login form.
   */
  submit = (): void => {
    this.errorMessage = null;
    this.form.valid
      ? this.send()
      : this.denied();
  }
}
