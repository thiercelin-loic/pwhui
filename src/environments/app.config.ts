/**
 * Application Configuration
 * 
 * This file contains all project-specific configuration values.
 * Modify these values to adapt the application for different contexts.
 */

export const APP_CONFIG = {
  /**
   * Application branding and metadata
   */
  name: 'Booker',
  title: 'ParisWorkHub',
  description: 'Customizable market platform',
  
  /**
   * Project context and identification
   * Used for licensing, attribution, and analytics
   */
  project: {
    name: 'Booker',
    displayName: 'ParisWorkHub',
    domain: 'parisworkhub.eu',
    url: 'https://parisworkhub.eu',
  },
  
  /**
   * Backend API configuration
   * Defines endpoints for each microservice
   */
  api: {
    core: {
      host: 'localhost',
      port: 3000,
      protocol: 'http',
    },
  },
  
  /**
   * Feature flags
   * Enable/disable major application features
   */
  features: {
    core: true,
    i18n: true,
    policies: true,
  },
  
  /**
   * UI/UX preferences
   */
  ui: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'fr', 'es', 'de', 'zh', 'ar', 'pt', 'it', 'ja', 'ru'],
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
  },
  
  /**
   * License information
   */
  license: 'CC BY-NC 4.0',
} as const;

/**
 * Helper function to construct full API URLs
 */
export function getApiUrl(service: 'core'): string {
  const config = APP_CONFIG.api[service];
  return `${config.protocol}://${config.host}:${config.port}`;
}

/**
 * Export computed values for easy access
 */
export const API_BASE_URLS = {
  AUTH: getApiUrl('core'),
  BOOKING: getApiUrl('core'),
  MESSAGING: getApiUrl('core'),
} as const;
