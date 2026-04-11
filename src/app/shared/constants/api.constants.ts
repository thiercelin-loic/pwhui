const API_BASE_PATH = '/api' as const;

const AUTH_PATH = `${API_BASE_PATH}/auth` as const;
const USERS_PATH = `${API_BASE_PATH}/users` as const;
const BOOKINGS_PATH = `${API_BASE_PATH}/bookings` as const;
const LISTINGS_PATH = `${API_BASE_PATH}/listings` as const;
const INBOX_PATH = `${API_BASE_PATH}/inbox` as const;
const MESSAGES_PATH = `${API_BASE_PATH}/messages` as const;

export const API_ENDPOINTS = {
  AUTH: AUTH_PATH,
  USERS: USERS_PATH,
  BOOKING: BOOKINGS_PATH,
  CHAT: MESSAGES_PATH,

  LOGIN: `${AUTH_PATH}/login`,
  REGISTER: `${AUTH_PATH}/register`,
  ME: `${USERS_PATH}/me`,
  LISTINGS: LISTINGS_PATH,
  BOOKINGS: BOOKINGS_PATH,
  INBOX: INBOX_PATH,
  MESSAGES: MESSAGES_PATH,
} as const;
