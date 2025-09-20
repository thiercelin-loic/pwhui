import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: '../auth.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HttpClientModule]
})
export class Login implements OnInit {
  constructor(private builder: FormBuilder, private router: Router, private authService: AuthService) { }
  
  form!: FormGroup;
  email = [Validators.required, Validators.email];
  password = [Validators.required, Validators.minLength(6)];
  controls = { email: ['', this.email], password: ['', this.password] };

  ngOnInit(): void {
    this.form = this.builder.group(this.controls);
  }

  send = (): any => this.authService.login(this.form.value)
    .subscribe({
      next: (response) => {
        document.cookie = `token=${(response as any).access_token}; path=/`;
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Login failed');
      }
    });

  denied = (): void => console.log('Form is invalid');

  submit = (): void => this.form.valid
    ? this.send()
    : this.denied();
}
