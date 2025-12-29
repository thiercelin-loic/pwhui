export interface LanguageConfig {
  code: string;
  name: string;
  flag?: string;
}

export const LANGUAGE_CONFIG = {
  defaultLanguage: 'en',
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
  ] as LanguageConfig[],
  storageKey: 'preferred-language',
  useBrowserLanguage: true
};