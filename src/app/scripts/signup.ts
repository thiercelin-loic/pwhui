import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: '../views/signup.html',
  styleUrls: ['../styles/signup.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HttpClientModule]
})
export class Signup implements OnInit {
  constructor(private builder: FormBuilder, private http: HttpClient) { }
  form!: FormGroup;

  firstname = [Validators.required, Validators.minLength(2)];
  lastname = [Validators.required, Validators.minLength(2)];
  email = [Validators.required, Validators.email];
  phone = [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)];
  password = [Validators.required, Validators.minLength(8)];
  confirm = [Validators.required];
  birth = [Validators.required, this.majority];
  accept = [Validators.requiredTrue];

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

  options = { validators: this.match };

  ngOnInit(): void {
    this.form = this.builder.group(this.controls, this.options);
  }

  strength(control: AbstractControl): ValidationErrors | null {
    !control.value && null;

    const uppercase = /[A-Z]/.test(control.value);
    const lowercase = /[a-z]/.test(control.value);
    const numeric = /[0-9]/.test(control.value);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

    const strength = uppercase
      && lowercase
      && numeric
      && special;

    !strength && { pattern: true };
    return null;
  }

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

  match(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;

    return password === confirm
      ? null
      : { mismatch: true };
  }

  denied = (): void => console.log('Form is invalid');

  send = (): any => this.http
    .post('/api/signup', this.form.value)
    .subscribe();

  submit = (): void => this.form.valid
    ? this.send()
    : this.denied();
}