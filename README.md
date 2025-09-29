# Pwhui

This project is an Angular application for a property rental platform. It allows users to browse, book, and manage property rentals.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Project Structure

The project is organized into the following main directories:

- `src/app`: Contains the main application logic, including components, services, and routing.
- `src/app/auth`: Handles user authentication, including login and registration.
- `src/app/booking`: Manages the booking process for properties.
- `src/app/contract`: Displays contract information for rentals.
- `src/app/landing`: The main landing page of the application.
- `src/app/profile`: User profile management.
- `src/app/splash`: The initial splash screen.
- `public`: Contains static assets like `favicon.ico`.

## Key Components

- `app.ts`: The root component of the application.
- `landing.ts`: The main landing page component.
- `login.ts`: The user login component.
- `register.ts`: The user registration component.
- `booking.ts`: The property booking component.
- `profile.ts`: The user profile component.

## Services

- `auth.service.ts`: Manages user authentication and session.
- `booking.service.ts`: Handles the logic for booking properties.
- `init.service.ts`: Initializes the application.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
