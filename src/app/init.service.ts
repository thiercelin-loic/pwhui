import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { API_ENDPOINTS } from '@shared/constants';
import { LANGUAGE_CONFIG } from '@shared/language.config';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  private isInitialized = new BehaviorSubject<boolean>(false);
  isInitialized$ = this.isInitialized.asObservable();

  initialize(): Promise<void> {
    return new Promise((resolve) => {
      // Initialize translations first
      const languageCodes = LANGUAGE_CONFIG.availableLanguages.map(lang => lang.code);
      this.translate.addLangs(languageCodes);
      this.translate.setDefaultLang(LANGUAGE_CONFIG.defaultLanguage);

      const savedLanguage = localStorage.getItem(LANGUAGE_CONFIG.storageKey);
      let langToUse: string = LANGUAGE_CONFIG.defaultLanguage;

      if (savedLanguage && languageCodes.includes(savedLanguage)) {
        langToUse = savedLanguage;
      } else if (LANGUAGE_CONFIG.useBrowserLanguage) {
        const browserLang = this.translate.getBrowserLang();
        if (browserLang && languageCodes.includes(browserLang)) {
          langToUse = browserLang;
        }
      }

      // Load translation and then initialize other services
      this.translate.use(langToUse).subscribe(() => {
        const observables = [
          this.http.get(API_ENDPOINTS.LISTINGS),
        ];

        forkJoin(observables).subscribe({
          next: () => {
            this.isInitialized.next(true);
            resolve();
          },
          error: (error) => {
            console.error('Initialization failed', error);
            resolve();
          }
        });
      });
    });
  }
}
