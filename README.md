# PWHUI

A modern Angular application built with Angular 20, featuring authentication, cart management, policy handling, and more.

## 🚀 Features

- **Authentication System**: Complete login and registration flow with route guards
- **Shopping Cart**: Cart management functionality
- **Contract Management**: Contract viewing and handling
- **Policy Management**: Policy service with dedicated interface
- **Settings**: User settings configuration
- **Toast Notifications**: Global notification system
- **Responsive Navigation**: Modern navigation component

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thiercelin-loic/pwhui.git
   cd pwhui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 Development

Start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 🧪 Testing

Run unit tests:

```bash
npm test
```

This executes the unit tests via [Karma](https://karma-runner.github.io).

## 🏗️ Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🐳 Docker

The project includes Docker support with both development and production configurations.

### Development:
```bash
./docker/developement.sh
```

### Production:
```bash
./docker/production.sh
```

## 🎨 Code Quality

Run linting:

```bash
npm run lint
```

The project uses ESLint with Angular-specific rules and Prettier for code formatting.

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/           # Authentication module (login, register)
│   ├── cart/           # Shopping cart functionality
│   ├── contract/       # Contract management
│   ├── landing/        # Landing page
│   ├── navigation/     # Navigation component
│   ├── policy/         # Policy management
│   ├── settings/       # User settings
│   ├── start/          # Start/home page
│   └── toast/          # Toast notification system
├── server/             # Server-related code
├── fonts/              # Custom fonts
├── icons/              # Icon assets
├── index.html          # Main HTML file
├── main.ts             # Application entry point
└── styles.css          # Global styles
```

## 🔧 Technologies

- **Framework**: Angular 20.2.0
- **Language**: TypeScript 5.9.2
- **Testing**: Jasmine & Karma
- **Linting**: ESLint with Angular ESLint
- **Code Formatting**: Prettier
- **Server**: Nginx (for production deployment)

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run watch` | Build in watch mode |
| `npm run lint` | Run ESLint |

## 🔐 Authentication

The application includes a complete authentication system with:
- Login and registration pages
- Auth guards for protected routes
- Auth service for managing user sessions
- Custom auth models

## 🌐 Deployment

The project includes:
- Dockerfile for containerization
- Nginx configuration for production deployment
- Separate development and production Docker scripts

## 📄 License

CC BY-NC 4.0

## 👤 Author

**thiercelin-loic**

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ using Angular
