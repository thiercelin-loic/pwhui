import { APP_CONFIG } from '@env/app.config';

export interface LanguageConfig {
  code: string;
  name: string;
  flag?: string;
}

/**
 * Language configuration
 * Note: The default language and available languages can be customized in app.config.ts
 * This configuration includes additional metadata for each language (name, flag)
 */
export const LANGUAGE_CONFIG = {
  defaultLanguage: APP_CONFIG.ui.defaultLanguage,
  availableLanguages: [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'ru', name: 'Русский' }
  ].filter(lang => (APP_CONFIG.ui.availableLanguages as readonly string[]).includes(lang.code)) as LanguageConfig[],
  storageKey: 'preferred-language',
  useBrowserLanguage: true
};