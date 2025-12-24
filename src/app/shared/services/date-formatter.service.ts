import { Injectable } from '@angular/core';
import { DATE_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {
  private readonly monthFormatOptions = DATE_CONSTANTS.MONTH_FORMAT_OPTIONS;

  getCurrentDate(): Date {
    return new Date();
  }

  getToday(): number {
    return this.getCurrentDate().getDate();
  }

  getMonth(): string {
    return this.getCurrentDate().toLocaleString('default', this.monthFormatOptions);
  }

  getYear(): number {
    return this.getCurrentDate().getFullYear();
  }

  formatMonth(date: Date): string {
    return date.toLocaleString('default', this.monthFormatOptions);
  }
}
