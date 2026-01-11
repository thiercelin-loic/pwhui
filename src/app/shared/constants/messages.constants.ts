export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred',
  AUTHENTICATION_FAILED: 'Authentication failed',
  INVALID_INPUT: 'Invalid input provided',
  SERVER_ERROR: 'Server error occurred',
  NOT_FOUND: 'Resource not found',
  CONVERSATION_CREATION_FAILED: 'Failed to create conversation',
  MESSAGE_SEND_FAILED: 'Failed to send message',
  SEND_MESSAGE_LOGGED_OUT: 'You must be logged in to send messages',
  LOGIN_REQUIRED: 'Please log in to continue',
  BOOKING_INCOMPLETE: 'Please complete all required fields'
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  MESSAGE_SENT: 'Message sent successfully',
  BOOKING_SUCCESS: 'Booking completed successfully!'
} as const;
