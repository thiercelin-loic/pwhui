import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  constructor(
    private builder: FormBuilder,
    private service: AuthService
  ) { }

  form!: FormGroup;
  email = [Validators.required, Validators.email];
  password = [Validators.required, Validators.minLength(6)];
  controls = { email: ['', this.email], password: ['', this.password] };
  error: string | null = null;

  ngOnInit(): void {
    this.form = this.builder.group(this.controls);
  }

  next = (response: any) => {
    document.cookie = `token=${(response).access_token}; path=/`;
    window.location.href = '/';
  }

  again = (error: any) => this.error
    = error?.message
    || 'An unexpected error occurred. Please try again later.';

  observers = { next: this.next, error: this.again }

  send = (): Subscription => this.service
    .login(this.form.value)
    .subscribe(this.observers);

  denied = (): void => console.log('Form is invalid');
  submit = (): void => {
    this.error = null;
    this.form.valid
      ? this.send()
      : this.denied();
  }
}