import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: '../auth.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class Login implements OnInit {
  private builder = inject(FormBuilder);
  private service = inject(AuthService);

  form!: FormGroup;
  email = [Validators.required, Validators.email];
  password = [Validators.required, Validators.minLength(6)];
  controls = { email: ['', this.email], password: ['', this.password] };
  error: string | null = null;

  ngOnInit(): void {
    this.form = this.builder.group(this.controls);
  }

  next = (response: { access_token: string }) => {
    document.cookie = `token=${response.access_token}; path=/`;
    window.location.href = '/';
  }

  again = (error: Error) => this.error
    = error?.message
    || 'An unexpected error occurred. Please try again later.';

  observers = { next: this.next, error: this.again }

  send = (): Subscription => this.service
    .login(this.form.value)
    .subscribe(this.observers);

  denied = (): void => {
    console.log('Form is invalid')
  };
  
  submit = (): void => {
    this.error = null;
    if (this.form.valid) {
      this.send()
    } else {
      this.denied();
    }
  }
}