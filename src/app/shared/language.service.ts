import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_CONFIG, LanguageConfig } from './language.config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);
  public readonly config = LANGUAGE_CONFIG;

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.defaultLang || this.config.defaultLanguage;
  }

  getAvailableLanguages(): LanguageConfig[] {
    return this.config.availableLanguages;
  }

  getAvailableLanguageCodes(): readonly string[] {
    return this.translate.getLangs();
  }

  setLanguage(lang: string): void {
    const languageCodes = this.config.availableLanguages.map(l => l.code);
    if (languageCodes.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.config.storageKey, lang);
    }
  }

  getTranslation(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}
