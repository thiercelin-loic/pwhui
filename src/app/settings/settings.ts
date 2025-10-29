import { Component } from '@angular/core';
import { PolicyService } from '../policy/policy.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  constructor(private policyService: PolicyService) { }
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

  private erase() {
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

  private type() {
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

  public ngOnInit() {
    this.write();
  }

  public ngOnDestroy() { clearInterval(this.interval); }

  public openPolicy() {this.policyService.open();}
}
