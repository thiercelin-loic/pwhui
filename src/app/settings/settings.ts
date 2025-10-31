import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../policy/policy.service';
import { ToastService } from '../toast/toast.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  constructor(
    private policyService: PolicyService,
    public toast: ToastService,
    private auth: AuthService
  ) { }
  private option = { month: 'long' } as const;
  public date: Date = new Date();
  public today: number = this.date.getDate();
  public month: string = this.date.toLocaleString('default', this.option);
  public year: number = this.date.getFullYear();

  private text: number = 0;
  private char: number = 0;

  private typing: number = 50;
  private erasing: number = 50;
  private delay: number = 2000;
  private interval: any;
  public placeholder: string = '';
  private tips: string[] = [
    'Two-Factor Authentication ',
    'Change Password ',
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

  // Disconnect the current user by clearing auth state and returning to home
  public disconnect(): void {
    try {
      this.auth.logout();
      this.toast.show({ message: 'You have been disconnected', classname: 'bg-warning text-dark', delay: 3000 });
    } finally {
      // Use a hard redirect to ensure full app state reset
      window.location.href = '/';
    }
  }
}
