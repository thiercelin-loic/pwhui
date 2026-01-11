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
  name: 'AgoraUI',
  title: 'AgoraUI',
  description: 'Customizable market platform',
  
  /**
   * Project context and identification
   * Used for licensing, attribution, and analytics
   */
  project: {
    name: 'AgoraUI',
    displayName: 'AgoraUI',
    domain: 'example.com',
    url: 'https://example.com',
  },
  
  /**
   * Backend API configuration
   * Defines endpoints for each microservice
   */
  api: {
    auth: {
      host: 'localhost',
      port: 3001,
      protocol: 'http',
    },
    booking: {
      host: 'localhost',
      port: 3002,
      protocol: 'http',
    },
    messaging: {
      host: 'localhost',
      port: 3003,
      protocol: 'http',
    },
  },
  
  /**
   * Feature flags
   * Enable/disable major application features
   */
  features: {
    auth: true,
    booking: true,
    messaging: true,
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
export function getApiUrl(service: 'auth' | 'booking' | 'messaging'): string {
  const config = APP_CONFIG.api[service];
  return `${config.protocol}://${config.host}:${config.port}`;
}

/**
 * Export computed values for easy access
 */
export const API_BASE_URLS = {
  AUTH: getApiUrl('auth'),
  BOOKING: getApiUrl('booking'),
  MESSAGING: getApiUrl('messaging'),
} as const;
