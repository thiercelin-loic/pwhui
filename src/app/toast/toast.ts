import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { Toast } from './toast.model';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  private toastService = inject(ToastService);

  toasts: Toast[] = [];
  private subscription: Subscription = Subscription.EMPTY;
  history$!: Observable<Toast[]>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.history$ = this.toastService.history$;
  }

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear(): void {
    this.toastService.clearHistory();
  }
}
