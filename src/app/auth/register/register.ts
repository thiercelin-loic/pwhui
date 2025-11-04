import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: '../auth.css',
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class Register implements OnInit {
  private builder = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  form!: FormGroup;
  isLoading = false;
  error: string | null = null;
  registered = false;

  firstname = [Validators.required, Validators.minLength(2)];
  lastname = [Validators.required, Validators.minLength(2)];
  email = [Validators.required, Validators.email];
  phone = [Validators.required, Validators.pattern(/^[+]?[1-9][\d]{0,15}$/)];
  password = [Validators.required, Validators.minLength(8)];
  confirm = [Validators.required];
  birth = [Validators.required, this.majority];
  accept = [Validators.requiredTrue];

  ngOnInit(): void {
    this.form = this.builder.group({
      firstname: ['', this.firstname],
      lastname: ['', this.lastname],
      email: ['', this.email],
      phone: ['', this.phone],
      password: ['', this.password],
      confirm: ['', this.confirm],
      birth: ['', this.birth],
      accept: [false, this.accept]
    }, { validators: this.match });
  }

  majority(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const today = new Date();
    const birth = new Date(control.value);

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18
      ? null
      : { majority: true };
  }

  match(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return password === confirm
      ? null
      : { mismatch: true };
  }

  next = () => {
    this.registered = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/auth']);
    }, 3000);
  }

  again = (error: { error?: { message?: string } }) => {
    this.error = error?.error?.message
    || 'An unexpected error occurred. Please try again later.';
    this.isLoading = false;
  }

  denied = (): void => {
    console.log('Form is invalid');
  }

  observable = { next: this.next, error: this.again };

  send() {
    this.isLoading = true;
    this.auth
      .register({
        email: this.form.value.email,
        first_name: this.form.value.firstname,
        last_name: this.form.value.lastname,
        password: this.form.value.password
      }).subscribe(this.observable);
  }

  submit() {
    this.error = null;
    if (this.form.valid) {
      this.send();
    } else {
      this.denied();
    }
  }
}