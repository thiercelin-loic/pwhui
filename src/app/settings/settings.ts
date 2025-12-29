import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '@app/policy/policy.service';
import { ToastService } from '@app/toast/toast.service';
import { AuthService } from '@app/auth/auth.service';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@app/shared/language.service';
import { 
  DateFormatterService,
  TypingAnimationService,
  SearchService 
} from '@shared/services';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit, OnDestroy {
  private policyService = inject(PolicyService);
  private dateFormatter = inject(DateFormatterService);
  private typingAnimation = inject(TypingAnimationService);
  private searchService = inject(SearchService);
  private translate = inject(TranslateService);
  
  toast = inject(ToastService);
  auth = inject(AuthService);
  languageService = inject(LanguageService);

  public date: Date = this.dateFormatter.getCurrentDate();
  public today = this.dateFormatter.getToday();
  public month = this.dateFormatter.getMonth();
  public year = this.dateFormatter.getYear();

  public placeholder = '';
  public query = '';
  public suggestions: string[] = [];

  ngOnInit(): void {
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    this.typingAnimation.stopAnimation();
  }

  private startTypingAnimation(): void {
    const searchTips = this.translate.instant('COMMON.SEARCH_TIPS.SETTINGS') as string[];
    this.typingAnimation.startAnimation(
      searchTips,
      (text) => { this.placeholder = text; }
    );
  }

  public openPolicy(): void {
    this.policyService.open();
  }

  public onSearch(): void {
    const searchTips = this.translate.instant('COMMON.SEARCH_TIPS.SETTINGS') as string[];
    this.suggestions = this.searchService.filterItems(
      searchTips,
      this.query,
      (tip) => tip
    );
  }

  public selectSuggestion(suggestion: string): void {
    const element = document.getElementById(suggestion.toLowerCase().replace(/ /g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.query = '';
    this.suggestions = [];
  }
}
