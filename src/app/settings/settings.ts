import { Component } from '@angular/core';
import { PolicyService } from '../policy/policy.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  constructor(private policyService: PolicyService) {}

  openPolicy() {
    this.policyService.open();
  }
}
