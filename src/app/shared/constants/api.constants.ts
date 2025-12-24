export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  BOOKING: '/booking',
  CHAT: '/tell',
  
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/users/me',
  LISTINGS: '/booking/listings',
  BOOKINGS: '/booking/bookings',
  INBOX: '/tell/inbox',
  MESSAGES: '/tell/messages'
} as const;
