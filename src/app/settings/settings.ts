import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../policy/policy.service';
import { ToastService } from '../toast/toast.service';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit, OnDestroy {
  private policyService = inject(PolicyService);
  toast = inject(ToastService);
  auth = inject(AuthService);

  private option = { month: 'long' } as const;
  public date: Date = new Date();
  public today = this.date.getDate();
  public month = this.date.toLocaleString('default', this.option);
  public year = this.date.getFullYear();

  private text = 0;
  private char = 0;

  private typing = 50;
  private erasing = 50;
  private delay = 2000;
  private interval: number | undefined;
  public placeholder = '';
  public query = '';
  public suggestions: string[] = [];
  private tips: string[] = [
    'Privacy Policy',
    'Account',
    'Terms and Conditions',
    'Contract',
    'Disconnect'
  ];

  private erase(): void {
    this.interval = setInterval(() => {
      if (this.placeholder.length > 0) {
        this.placeholder = this.placeholder.slice(0, -1);
      } else {
        clearInterval(this.interval);
        this.text = (this.text + 1) % this.tips.length;
        this.char = 0;
        this.write();
      }
    }, this.erasing);
  }

  private type(): void {
    const current = this.tips[this.text];

    if (this.char < current.length) {
      this.placeholder += current.charAt(this.char);
      this.char++;
    } else {
      clearInterval(this.interval);
      setTimeout(() => this.erase(), this.delay);
    }
  }

  private write(): void {
    this.interval = setInterval(() =>
      this.type(),
      this.typing
    );
  }

  public ngOnInit(): void {
    this.write();
  }

  public ngOnDestroy(): void { clearInterval(this.interval); }
  public openPolicy(): void { this.policyService.open(); }

  public onSearch(): void {
    if (this.query.length > 2) {
      this.suggestions = this.tips.filter(tip =>
        tip.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.suggestions = [];
    }
  }

  public selectSuggestion(suggestion: string): void {
    const element = document.getElementById(suggestion.toLowerCase().replace(/ /g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.query = '';
    this.suggestions = [];
  }

  
  public disconnect(): void {
    try {
      this.auth.logout();
      this.toast.show({ message: 'You have been disconnected', classname: 'bg-warning text-dark', delay: 3000 });
    } finally {
      
      window.location.href = '/';
    }
  }
}
