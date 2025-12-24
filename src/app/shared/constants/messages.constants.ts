export const ERROR_MESSAGES = {
  LOGIN_REQUIRED: 'Please log in to make a booking.',
  BOOKING_INCOMPLETE: 'Please select a listing and specify both start and end dates.',
  SEND_MESSAGE_LOGGED_OUT: 'You must be logged in to send messages',
  INITIALIZATION_FAILED: 'Failed to load initial data.',
  MESSAGE_SEND_FAILED: 'Failed to send message',
  CONVERSATION_CREATION_FAILED: 'Failed to create conversation'
} as const;

export const SUCCESS_MESSAGES = {
  BOOKING_SUCCESS: 'Booking successful!',
  MESSAGE_SENT: 'Message sent successfully'
} as const;
