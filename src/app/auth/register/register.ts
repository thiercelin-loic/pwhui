import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * The register component.
 * Handles the user registration form and new user creation.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: '../auth.css',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HttpClientModule]
})
export class Register implements OnInit {
  constructor(
    private builder: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) { }
  
  /** The registration form. */
  form!: FormGroup;
  /** Indicates if the registration request is in progress. */
  isLoading = false;
  /** Error message to display to the user. */
  errorMessage: string | null = null;

  /** Validation rules for the firstname field. */
  firstname = [Validators.required, Validators.minLength(2)];
  /** Validation rules for the lastname field. */
  lastname = [Validators.required, Validators.minLength(2)];
  /** Validation rules for the email field. */
  email = [Validators.required, Validators.email];
  /** Validation rules for the phone field. */
  phone = [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)];
  /** Validation rules for the password field. */
  password = [Validators.required, Validators.minLength(8)];
  /** Validation rules for the password confirmation field. */
  confirm = [Validators.required];
  /** Validation rules for the birth date field. */
  birth = [Validators.required, this.majority];
  /** Validation rules for the terms acceptance checkbox. */
  accept = [Validators.requiredTrue];

  /** Form controls configuration. */
  controls = {
    firstname: ['', this.firstname],
    lastname: ['', this.lastname],
    email: ['', this.email],
    phone: ['', this.phone],
    password: ['', this.password],
    confirm: ['', this.confirm],
    birth: ['', this.birth],
    accept: [false, this.accept]
  };

  /** Form options, including custom validators. */
  options = { validators: this.match };

  ngOnInit(): void {
    this.form = this.builder.group(this.controls, this.options);
  }



  /**
   * Custom validator to check if the user is at least 18 years old.
   * @param control The form control to validate.
   * @returns A validation error if the user is underage, otherwise `null`.
   */
  majority(control: AbstractControl): ValidationErrors | null {
    !control.value && null;

    const today = new Date();
    const birth = new Date(control.value);

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    month < 0 || (
      month === 0
      && today.getDate()
      < birth.getDate()
    ) && age--;

    return age >= 18
      ? null
      : { majority: true };
  }

  /**
   * Custom validator to check if the password and confirmation fields match.
   * @param group The form group to validate.
   * @returns A validation error if the fields do not match, otherwise `null`.
   */
  match(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;

    return password === confirm
      ? null
      : { mismatch: true };
  }

  /**
   * Handles the case where the form is invalid.
   */
  denied = (): void => console.log('Form is invalid');

  /**
   * Sends the registration request to the authentication service.
   */
  send = (): any => {
    this.isLoading = true;
    this.authService
      .register({
        email: this.form.value.email,
        first_name: this.form.value.firstname,
        last_name: this.form.value.lastname,
        password: this.form.value.password
      }).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/auth']);
          alert('Registration successful! Please log in.');

        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  /**
   * Submits the registration form.
   */
  submit = (): void => {
    this.errorMessage = null;
    this.form.valid
      ? this.send()
      : this.denied();
  }
}