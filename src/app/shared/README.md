# Shared Module

This folder contains shared utilities, services, constants, and models used throughout the PWHUI application.

## Structure

```
shared/
├── constants/          # Application-wide constants
│   ├── animation.constants.ts
│   ├── api.constants.ts
│   ├── cookie.constants.ts
│   ├── date.constants.ts
│   ├── messages.constants.ts
│   ├── storage.constants.ts
│   └── index.ts
├── models/            # Shared type definitions
│   └── index.ts
├── services/          # Reusable services
│   ├── booking-data.service.ts
│   ├── conversation.service.ts
│   ├── cookie.service.ts
│   ├── date-formatter.service.ts
│   ├── listing.service.ts
│   ├── search.service.ts
│   ├── typing-animation.service.ts
│   └── index.ts
└── index.ts           # Barrel export
```

## Constants

### Animation Constants
- `TYPING_SPEED`: Speed of typing animation (ms)
- `ERASING_SPEED`: Speed of erasing animation (ms)
- `DELAY_BETWEEN_TEXTS`: Delay between text cycles (ms)

### API Constants
Centralized API endpoint definitions to avoid hardcoded URLs throughout the application.

### Cookie Constants
Constants related to cookie management and consent.

### Date Constants
Date formatting options used across components.

### Message Constants
Success and error messages for consistent user communication.

### Storage Constants
Keys and prefixes for browser storage operations.

## Services

### BookingDataService
Handles all booking-related data operations including:
- Fetching bookings
- Filtering user-specific bookings
- Getting upcoming bookings
- Creating new bookings

### ConversationService
Manages conversation and messaging operations:
- Fetching conversations
- Creating new conversations
- Sending and updating messages

### CookieService
Centralized cookie management:
- Token storage and retrieval
- User ID management
- Consent tracking

### DateFormatterService
Provides consistent date formatting:
- Current date retrieval
- Month/year formatting
- Date utilities

### ListingService
Manages workspace listing operations:
- Fetching listings
- Finding listings by ID

### SearchService
Generic search and filtering functionality:
- Filter items based on search query
- Supports custom search text extraction

### TypingAnimationService
Reusable typing animation effect:
- Configurable typing/erasing speeds
- Multiple text rotation
- Automatic cleanup

## Usage Examples

### Importing Constants
```typescript
import { API_ENDPOINTS, ERROR_MESSAGES } from '@app/shared/constants';
```

### Using Services
```typescript
import { DateFormatterService, ListingService } from '@app/shared/services';

export class MyComponent {
  private dateFormatter = inject(DateFormatterService);
  private listingService = inject(ListingService);
  
  month = this.dateFormatter.getMonth();
}
```

### Importing Models
```typescript
import { User, Bookings, Listings } from '@app/shared/models';
```

## Benefits

1. **Single Responsibility**: Each service has one clear purpose
2. **DRY Principle**: No code duplication across components
3. **Testability**: Services can be easily mocked and tested
4. **Maintainability**: Changes in one place affect all consumers
5. **Type Safety**: Centralized type definitions
6. **Consistency**: Standardized patterns across the application
