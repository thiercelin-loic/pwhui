import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private modal = new Subject<void>();
  modal$ = this.modal.asObservable();
  open() {
    this.modal.next();
  }
}
