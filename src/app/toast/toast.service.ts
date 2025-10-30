import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Toast } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private subject = new Subject<Toast>();
  public readonly toast$ = this.subject.asObservable();
  private history: Toast[] = [];
  private historySubject = new BehaviorSubject<Toast[]>([]);
  public readonly history$ = this.historySubject.asObservable();

  show(toast: Toast): void {
    this.history.push(toast);
    this.historySubject.next([...this.history]);
    this.subject.next(toast);
  }

  getHistory(): Toast[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
    this.historySubject.next([]);
  }
}
