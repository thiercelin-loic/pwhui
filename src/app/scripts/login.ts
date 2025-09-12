import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.html',
  styleUrl: '../styles/login.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HttpClientModule]
})
export class Login implements OnInit {
  constructor(private builder: FormBuilder, private http: HttpClient) { }

  form!: FormGroup;
  email = [Validators.required, Validators.email];
  password = [Validators.required, Validators.minLength(6)];
  controls = { email: ['', this.email], password: ['', this.password] };

  ngOnInit(): void {
    this.form = this.builder.group(this.controls);
  }

  send = (): any => this.http
    .post('/api/login', this.form.value)
    .subscribe();

  denied = (): void => console.log('Form is invalid');

  submit = (): void => this.form.valid
    ? this.send()
    : this.denied();
}
