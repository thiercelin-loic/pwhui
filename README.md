<img src="./public/favicon.ico" alt="Home" width="100" />

# Booker - Customizable Booking Platform

[![Angular](https://img.shields.io/badge/Angular-20-dd0031?style=flat&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.7+-3776AB?style=flat&logo=python)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![Cross--Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen?style=flat)](https://github.com/thiercelin-loic/booker)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc/4.0/)

## 📚 Table of Contents
- [What is Booker?](#what-is-booker)
- [Quick Start](#-quick-start)
- [Screenshots](#-screenshots)
- [Key Features](#-key-features)
- [Technical Stack](#-technical-stack)
- [Documentation](#-documentation)
- [Project Structure](#-project-structure)
- [CLI Commands](#-cli-commands)
- [Credits](#-credits--acknowledgements)

> **📖 New to Booker?** Check out our [comprehensive documentation](./docs/README.md) organized by topic!

---

## 🎯 What is Booker?

A **complete, production-ready web application template** for building booking and marketplace platforms. Built with Angular 20, TypeScript, and microservices architecture.

**Perfect for:** Coworking spaces, vacation rentals, meeting room booking, equipment rental, service marketplaces, and more.

### Why Booker?

✅ **Complete Features** - Authentication, booking, real-time chat, i18n  
✅ **Modern Stack** - Angular 20, TypeScript 5.9, NestJS microservices  
✅ **Easy Customization** - Centralized config, CLI tools, comprehensive docs  
✅ **Production Ready** - Docker deployment, SSL/HTTPS, security built-in  
✅ **Learning Resource** - Perfect for studying modern web development  

### Who Is It For?

- **Beginners** - Learn by exploring a real application → [Beginner's Guide](./docs/beginners-guide.md)
- **Students** - Build portfolio projects quickly
- **Freelancers** - Fast client project delivery
- **Startups** - Validate marketplace ideas fast
- **Developers** - Learn Angular/microservices → [Installation](./docs/installation.md)

---

## 🚀 Quick Start

Get Booker running in under 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/thiercelin-loic/booker.git
cd booker

# 2. Install dependencies
npm install

# 3. Link CLI (optional but recommended)
npm link

# 4. Configure (interactive wizard)
booker init

# 5. Start development server
booker serve
```

> **💻 Cross-Platform:** Booker works on Windows, macOS, and Linux thanks to Python-based scripts.

🎉 **Done!** Your browser opens to `http://localhost:4200`

> **Detailed guide:** See the complete [Installation Guide](./docs/installation.md)  
> **First time?** Start with the [Beginner's Guide](./docs/beginners-guide.md)  
> **Problems?** Check [Troubleshooting](./docs/troubleshooting.md) or [FAQ](./docs/faq.md)

---

## 📸 Screenshots

| **Home & Search** | **Booking Flow** | **Real-time Chat** |
|:---:|:---:|:---:|
| ![Home](./screenshots/home.png) | ![Booking](./screenshots/booking.png) | ![Chat](./screenshots/chat.png) |

*(Screenshots are stored in the /screenshots folder)*

---

## � Quick Glossary

**New to web development?** Here are the key terms you'll see in this documentation:

| Term | Simple Explanation | Technical Definition |
|------|-------------------|---------------------|
| **Frontend** | The part users see and interact with (like this website's buttons and pages) | Client-side application built with Angular |
| **Backend** | The "behind-the-scenes" server that stores data and processes requests | Server-side APIs built with NestJS |
| **API** | A way for the frontend to request data from the backend | Application Programming Interface - RESTful endpoints |
| **Microservices** | Breaking a large application into smaller, independent pieces | Architecture pattern with separate services for auth, booking, messaging |
| **Docker** | A tool that packages software so it runs the same everywhere | Containerization platform for consistent environments |
| **CLI** | A text-based tool you type commands into | Command Line Interface - the `booker` command |
| **JWT** | A secure way to keep users logged in | JSON Web Token for authentication |
| **TypeScript** | JavaScript with extra features that catch errors early | Statically typed superset of JavaScript |
| **Component** | A reusable piece of UI (like a navigation bar or button) | Self-contained Angular building block |
| **Repository (Repo)** | A project's code storage on GitHub | Git version control repository |
| **Node.js** | JavaScript runtime that lets you run JavaScript outside browsers | Server-side JavaScript environment |
| **npm** | A tool to install code libraries (packages) | Node Package Manager |
| **Endpoint** | A specific URL the backend uses to receive requests | API route (e.g., `/api/auth/login`) |
| **Port** | A number that identifies a specific service on a computer | Network port (e.g., 3000, 4200) |
| **Environment** | Settings that change based on where your app runs (development vs production) | Configuration files for different deployment contexts |
| **SSL/HTTPS** | Technology that secures data sent between browser and server | Secure Sockets Layer / HTTP Secure protocol |
| **i18n** | Making your app work in multiple languages | Internationalization |

> **💡 Tip:** Bookmark this section! As you go through the documentation, refer back here when you encounter unfamiliar terms.

---

## 🚀 Key Features

### Core Functionality

- **Authentication System**: Secure user login and registration
  - *For Beginners:* Users can create accounts and log in securely. The app remembers who you are using secure tokens.
  - *Technical:* JWT-based authentication with route guards, session management, and secure token storage.

- **Dynamic Booking System**: Reserve spaces or services with date selection
  - *For Beginners:* Like booking a hotel room - pick dates, see available options, and confirm your reservation.
  - *Technical:* Complete CRUD operations, profile management, date validation, conflict detection, and booking lifecycle management.

- **Real-Time Messaging**: Chat with other users instantly
  - *For Beginners:* Send and receive messages instantly (like WhatsApp) without refreshing the page.
  - *Technical:* WebSocket-based chat interface powered by Redis pub/sub for real-time communication.

- **Internationalization (i18n)**: Works in 10+ languages
  - *For Beginners:* Users can switch the entire website to their preferred language.
  - *Technical:* ngx-translate integration with dynamic language loading, RTL support, and centralized translation management.

- **Policy & Contracts**: Legal document management
  - *For Beginners:* Terms of service, privacy policies, and user agreements - all in one place.
  - *Technical:* Dedicated views for legal documents with cookie consent management and versioning support.

- **Responsive Design**: Works on all devices
  - *For Beginners:* Looks great on phones, tablets, and computers - automatically adjusts.
  - *Technical:* Mobile-first CSS architecture with flexbox/grid, custom breakpoints, and touch-optimized interactions.

- **Toast Notifications**: User-friendly alerts
  - *For Beginners:* Small pop-up messages that confirm your actions ("Booking successful!").
  - *Technical:* Non-intrusive notification system with configurable duration, positioning, and message types.

---

## 🧠 Engineering Highlights

Beyond standard features, this project implements advanced patterns:

* **Clean Code Architecture:** Comprehensive refactoring following SOLID principles with shared services, centralized constants, and TypeScript path aliases (`@app/*`, `@shared/*`).
* **Cross-Platform Automation:** Python-based CLI and scripts ensure seamless development on Windows, macOS, and Linux without bash dependencies.
* **Optimized Data Fetching:** Implementation of RxJS `shareReplay` operator to cache API responses and reduce server load.
* **Strict Code Quality:** Enforced linting rules using **ESLint** with specific Angular configurations to maintain clean architecture.
* **Smart UX Patterns:** Debounced search inputs and skeleton loaders for smoother user interactions.
* **Zero Duplication:** Eliminated ~410 lines of duplicate code through service extraction and centralized utilities.

---

## 🛠️ Frontend Technical Stack
- **Framework**: Angular 20 (Standalone Components)
- **Language**: TypeScript 5.9
- **Automation**: Python 3.7+ (Cross-platform CLI)
- **i18n**: ngx-translate with centralized configuration
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router with Guards
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI
- **Styling**: Modern CSS with Custom Properties

---

## � Project Architecture

The project follows a modular architecture based on Feature Modules and Standalone Components with clean code principles.

    booker/
    ├── src/
    │   ├── app/
    │   │   ├── auth/           # Authentication strategies & Guards
    │   │   ├── profil/         # Booking workflow & State management
    │   │   ├── chat/           # Real-time messaging interface
    │   │   ├── contract/       # Legal data handling
    │   │   ├── landing/        # Home page & Search interface
    │   │   ├── navigation/     # Top navigation & Menu components
    │   │   ├── policy/         # Business rules & Policy service
    │   │   ├── settings/       # User settings & Profile management
    │   │   ├── shared/         # Reusable services, constants & models
    │   │   │   ├── constants/  # API endpoints, dates, messages, etc.
    │   │   │   ├── services/   # Cookie, date, search, animation services
    │   │   │   ├── models/     # TypeScript interfaces
    │   │   │   ├── language.service.ts    # Language management
    │   │   │   ├── language.config.ts     # i18n configuration
    │   │   │   └── translate-loader.ts    # Translation file loader
    │   │   ├── app.config.ts   # Application configuration
    │   │   ├── app.routes.ts   # Route definitions
    │   │   ├── app.ts          # Root component
    │   │   ├── booking.service.ts  # Booking logic & API integration
    │   │   └── init.service.ts     # Application initialization
    │   ├── languages/          # Translation files (en.json, fr.json)
    │   ├── fonts/              # Custom typography assets
    │   ├── icons/              # Optimized SVG icons
    │   ├── server/             # Server-side rendering utilities
    │   ├── index.html          # HTML entry point
    │   ├── main.ts             # Application bootstrapping
    │   └── styles.css          # Global styles
    ├── bin/
    │   ├── booker.py            # Main CLI tool (Python)
    │   └── booker.bat           # Windows launcher
    ├── conf/
    │   ├── modules/            # Modular configuration components
    │   │   ├── ui_helpers.py       # User interaction & display utilities
    │   │   ├── config_prompts.py   # Configuration collection prompts
    │   │   ├── file_updaters.py    # File generation & update functions
    │   │   └── defaults.py         # Default configuration values
    │   ├── setup.py            # Interactive configuration wizard
    │   └── default.py          # Restore default configuration
    ├── docker/
    │   ├── dependencies.py     # Automated dependency setup & management
    │   ├── entrypoint.py       # Container startup script
    │   ├── down.py             # Service shutdown script
    │   └── production.py       # Production deployment automation
    ├── public/                 # Static assets
    ├── screenshots/            # Documentation images
    ├── angular.json            # Angular workspace configuration
    ├── Dockerfile              # Container build instructions
    ├── nginx.conf              # Web server configuration
    ├── proxy.conf.json         # Development API proxy
    └── package.json            # Dependencies & Scripts

---

## 📦 Prerequisites Explained

**What you need installed before starting:**

### Essential (You Must Have These)

#### 1. **Node.js (LTS version)**
   - **What is it?** The software that runs JavaScript on your computer (not just in browsers)
   - **Why?** Booker is built with JavaScript/TypeScript and needs Node.js to work
   - **How to install:**
     - Go to [nodejs.org](https://nodejs.org/)
     - Download the LTS (Long Term Support) version
     - Run the installer
     - Verify: Open terminal/command prompt and type `node --version`
   - **Expected output:** `v18.x.x` or higher

#### 2. **npm (comes with Node.js)**
   - **What is it?** Node Package Manager - installs code libraries
   - **Why?** Downloads and manages all the code packages Booker needs
   - **How to check:** Type `npm --version` in terminal
   - **Expected output:** `9.x.x` or higher
   - **Alternative:** You can use `yarn` instead (optional)

#### 3. **Git**
   - **What is it?** Version control system for tracking code changes
   - **Why?** Downloads the Booker code from GitHub
   - **How to install:**
     - Go to [git-scm.com](https://git-scm.com/)
     - Download for your OS (Windows/Mac/Linux)
     - Run the installer
     - Verify: Type `git --version` in terminal
   - **Expected output:** `git version 2.x.x` or higher

#### 4. **Python 3.7+**
   - **What is it?** Programming language used for cross-platform CLI tools
   - **Why?** The Booker CLI and setup scripts are written in Python for Windows/Mac/Linux compatibility
   - **How to install:**
     - Go to [python.org](https://www.python.org/downloads/)
     - Download Python 3.7 or higher
     - **Windows:** Check "Add Python to PATH" during installation
     - **Mac:** Use `brew install python3` or download from python.org
     - **Linux:** Usually pre-installed, or use `sudo apt install python3`
     - Verify: Type `python --version` or `python3 --version` in terminal
   - **Expected output:** `Python 3.7.x` or higher

### Recommended (Makes Development Easier)

#### 5. **Code Editor (VS Code recommended)**
   - **What is it?** Where you'll view and edit the code
   - **Why?** Makes coding easier with syntax highlighting and helpful features
   - **How to install:**
     - Go to [code.visualstudio.com](https://code.visualstudio.com/)
     - Download and install
   - **Alternatives:** Sublime Text, WebStorm, Atom (but VS Code is most popular)

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **RAM** | 4 GB | 8 GB or more |
| **Disk Space** | 2 GB free | 5 GB free |
| **OS** | Windows 10, macOS 10.14, Ubuntu 18.04 | Latest versions |
| **Internet** | Required for initial setup | Broadband recommended |

### Checking If You're Ready

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
node --version    # Should show v18 or higher
npm --version     # Should show v9 or higher
git --version     # Should show git version 2.x or higher
python --version  # Should show Python 3.7 or higher (try python3 on Mac/Linux)
```

If all commands work, you're ready to install Booker! 🎉

**Note:** On Windows, you might need to use `python` instead of `python3`.

### Troubleshooting Prerequisites

**"command not found" errors?**
- The software isn't installed or isn't in your system PATH
- Try closing and reopening your terminal after installation
- On Windows, you might need to restart your computer

**Docker won't start?**
- Ensure virtualization is enabled in your BIOS (for Windows/Linux)
- On Windows, you need WSL 2 (Windows Subsystem for Linux)
- The setup script can help with Docker installation

**Still stuck?**
- Check the [Troubleshooting](#troubleshooting-common-issues) section below
- Each prerequisite's official website has detailed installation guides

---

## 🚀 Installation & Quick Start

### CLI Installation (Recommended)

Booker includes a powerful CLI tool similar to Angular CLI for managing your project:

1.  **Clone the repository**

        git clone https://github.com/thiercelin-loic/booker.git
        cd booker

2.  **Install dependencies and link CLI**

        npm install
        npm link

3.  **Configure your application**

        booker init

4.  **Start development**

        booker serve

**Common CLI Commands:**

- `booker init` - Interactive configuration wizard
- `booker default` (or `booker reset`) - Restore default configuration
- `booker serve` (or `booker s`) - Start development server
- `booker build` (or `booker b`) - Build for production
- `booker test` (or `booker t`) - Run unit tests
- `booker lint` (or `booker l`) - Check code quality
- `booker --help` - Show all commands

**CLI Features:**

✨ Works from any directory on your system  
✨ Angular CLI-like syntax for familiarity  
✨ Short aliases for faster typing  
✨ Comprehensive error handling  

**Troubleshooting:**

If you encounter `command not found: booker`:
```bash
npm link
```

If you see file execution errors on WSL/Linux:
```bash
chmod +x bin/booker.py
npm link
```

### Alternative: Using NPM Scripts

If you prefer traditional npm commands:

1.  **Clone the repository**

        git clone https://github.com/thiercelin-loic/booker.git
        cd booker

2.  **Install frontend dependencies**

        npm install

3.  **Start development server**

        npm start

### Available NPM Scripts

- `npm start` - Start development server
- `npm test` - Run unit tests
- `npm run build` - Build for production
- `npm run lint` - Check code quality

> **💡 Tip:** The CLI (`booker`) provides a better developer experience with shorter commands and works from any directory. NPM scripts are still available for CI/CD and automation purposes.

---

## 📖 CLI Documentation

### CLI Commands Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `booker init` | - | Run interactive configuration wizard |
| `booker default` | `reset` | Restore default Booker configuration |
| `booker serve` | `s`, `start` | Start development server |
| `booker build` | `b` | Build for production |
| `booker test` | `t` | Run unit tests |
| `booker lint` | `l` | Run linter |
| `booker version` | `-v`, `--version` | Show CLI version |
| `booker help` | `-h`, `--help` | Show help information |

### Common CLI Workflows

**Daily Development:**
```bash
# Start your day
booker serve
```

**Before Committing:**
```bash
# Check code quality
booker lint

# Run tests
booker test

# Build to verify
booker build
```

`bash



```

**Using Short Aliases:**
```bash
booker s          # serve
booker b          # build
booker t          # test
booker l          # lint
```

### CLI Installation Troubleshooting

**Command Not Found:**
```bash
# Re-link the CLI
npm link

# Or check if it's in your PATH
which booker
```

**Permission Denied:**
```bash
chmod +x bin/booker.py
```

**Line Ending Errors (Windows/WSL):**

If you encounter execution errors related to line endings:
```bash
# Fix line endings
sed -i 's/\r$//' bin/booker.py

# Or if you have dos2unix installed
dos2unix bin/booker.py
```

**Prevent Future Issues:**
```bash
# Configure Git to handle line endings automatically
git config core.autocrlf input

# Or globally
git config --global core.autocrlf input
```

### CLI vs npm Scripts

Both approaches work! The CLI wraps npm scripts seamlessly:

| npm script | CLI command | Notes |
|------------|-------------|-------|
| `npm start` | `booker serve` | Start dev server |
| `npm run build` | `booker build` | Build production |
| `npm test` | `booker test` | Run tests |
| `npm run lint` | `booker lint` | Check code quality |
| N/A | `booker init` | Configuration wizard (CLI-only) |

**When to Use:**
- **CLI** (`booker`): For interactive development - faster to type, more features, better UX
- **npm scripts**: For CI/CD and automation - more portable, standard conventions

### Alternative: Direct Execution

You can also run the CLI without global linking:
```bash
# From project root
python bin/booker.py <command>
```

### CLI Design Philosophy

The Booker CLI follows these principles:
1. **Familiar** - Similar to Angular CLI (`ng serve`, `ng build`)
2. **Intuitive** - Clear command names and help text
3. **Integrated** - Works with existing scripts seamlessly
4. **Documented** - Comprehensive documentation with examples
5. **Maintainable** - Modular structure, easy to extend

---

## ⚙️ Configuration

**Before starting development**, review and customize the application configuration.

#### 🎯 Quick Configuration (Recommended)

For an interactive setup experience, use the configuration assistant:

```bash
booker init
# or
python conf/setup.py
```

To restore all settings to default Booker configuration:

```bash
booker default
# or
python conf/default.py
```

> **Note:** The `default` command will restore the original grayscale theme (#4A4A4A, #808080, #333), default favicon, background image, API endpoints (localhost:3001/3002/3003), and all other default settings. This is useful when you want to return to the initial configuration.

> **Note:** The setup script uses a modular architecture for easier maintenance. Core functionality is organized into python modules in `conf/modules/` (`ui_helpers.py`, `config_prompts.py`, `file_updaters.py`, `defaults.py`) that handle display, configuration collection, file generation, and default restoration respectively.

This script will guide you through configuring:
- **Application branding** (name, title, description)
- **Project context** (business name, domain, URL)
- **License** (project license, e.g., CC BY-NC 4.0, MIT)
- **API endpoints** (auth, booking, messaging services - host, port, protocol)
- **Feature flags** (enable/disable authentication, booking, messaging, i18n, policies)
- **UI settings** (languages, date/time formats)
- **Color theme** (neutral grayscale by default, fully customizable)
- **Branding assets** (custom favicon - .ico files only)
- **Production deployment** (domain, SSL email, container settings, certificate renewal interval)
- **Cookie & session settings** (consent keys, max age, token storage)
- **Animation settings** (typing speed, erasing speed, delays)
- **User messages** (success/error messages for branding consistency)

The script automatically updates **15+ files** with your choices, including:
- Configuration files (`app.config.ts`, `proxy.conf.json`, `nginx.conf`)
- Constants files (cookies, storage, animations, messages)
- Deployment scripts (`docker/production.py`, `docker/entrypoint.py`)
- Styling and assets (`styles.css`, favicon, auth icon)

#### 📝 Manual Configuration

All project-specific values (branding, API endpoints, features) are centralized in:
```
src/environments/app.config.ts
```

#### What's Configurable

**1. Application Branding**
```typescript
name: 'Booker',
title: 'Booker',
description: 'A modern coworking space booking platform',
```

**2. Project Context**
```typescript
project: {
  name: 'Booker',
  displayName: 'Booker',
  domain: 'booker.eu',
  url: 'https://booker.eu',
}
```
Update these values to match your specific business. Example:
```typescript
project: {
  name: 'TokyoWorkSpace',
  displayName: 'Tokyo WorkSpace',
  domain: 'tokyoworkspace.jp',
  url: 'https://tokyoworkspace.jp',
}
```

**3. API Configuration**
```typescript
api: {
  auth: { host: 'localhost', port: 3001, protocol: 'http' },
  booking: { host: 'localhost', port: 3002, protocol: 'http' },
  messaging: { host: 'localhost', port: 3003, protocol: 'http' },
}
```
For production, update with your actual API endpoints:
```typescript
api: {
  auth: { host: 'api.yourdomain.com', port: 443, protocol: 'https' },
  // ... etc
}
```

**4. Feature Flags**
```typescript
features: {
  authentication: true,
  booking: true,
  messaging: true,
  internationalization: true,
  policies: true,
}
```

**5. UI Configuration**
```typescript
ui: {
  defaultLanguage: 'en',
  availableLanguages: ['en', 'fr'],
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm',
}
```

**6. License Configuration**
```typescript
license: 'CC BY-NC 4.0',
```
Change to any license that fits your project (MIT, Apache 2.0, etc.)

#### Additional Configurable Constants

Beyond the main `app.config.ts`, the setup script also manages specialized constant files:

**Cookie & Session Settings** (`src/app/shared/constants/cookie.constants.ts`)
```typescript
export const COOKIE_CONSTANTS = {
  CONSENT_KEY: 'consent',           // Cookie consent key
  CONSENT_MAX_AGE: 31536000,        // 1 year in seconds
  POLICY_MODAL_DELAY: 3000          // Delay before showing policy modal (ms)
};
```

**Storage Settings** (`src/app/shared/constants/storage.constants.ts`)
```typescript
export const STORAGE_CONSTANTS = {
  COOKIE_TOKEN_KEY: 'token',        // JWT token storage key
  COOKIE_SEPARATOR: '&',
  TOKEN_PREFIX: 'Bearer '
};
```

**Animation Timing** (`src/app/shared/constants/animation.constants.ts`)
```typescript
export const ANIMATION_CONSTANTS = {
  TYPING_SPEED: 50,                 // Character typing speed (ms)
  ERASING_SPEED: 50,                // Character erasing speed (ms)
  DELAY_BETWEEN_TEXTS: 2000         // Pause between text cycles (ms)
};
```

**User Messages** (`src/app/shared/constants/messages.constants.ts`)
```typescript
export const ERROR_MESSAGES = {
  LOGIN_REQUIRED: 'Please log in to make a booking.',
  BOOKING_INCOMPLETE: 'Please select a listing and specify both start and end dates.',
  // ... more messages
};

export const SUCCESS_MESSAGES = {
  BOOKING_SUCCESS: 'Booking successful!',
  MESSAGE_SENT: 'Message sent successfully'
};
```

#### Using Configuration in Code

```typescript
import { APP_CONFIG } from '@env/app.config';

const projectName = APP_CONFIG.project.name;
const apiUrl = getApiUrl('auth');
```

#### Environment-Specific Configurations

For different environments (development, staging, production), create:
- `app.config.ts` (base configuration)
- `app.config.production.ts` (production overrides)

Then use Angular's file replacement in `angular.json`:
```json
"fileReplacements": [{
  "replace": "src/environments/app.config.ts",
  "with": "src/environments/app.config.production.ts"
}]
```

---

## 🌍 Internationalization

The application supports multiple languages with a centralized configuration system. All user-facing text is stored in translation files located in `src/languages/`.

### Supported Languages
- **English (en)** 🇬🇧 - Default
- **Français (fr)** 🇫🇷
- **Español (es)** 🇪🇸
- **Deutsch (de)** 🇩🇪
- **中文 (zh)** 🇨🇳
- **العربية (ar)** 🇸🇦
- **Português (pt)** 🇵🇹
- **Italiano (it)** 🇮🇹
- **日本語 (ja)** 🇯🇵
- **Русский (ru)** 🇷🇺

### Adding a New Language

1. Create a new JSON file in `src/languages/` (e.g., `ko.json`)
2. Copy the structure from `en.json` and translate all values
3. Update `src/app/shared/language.config.ts`:

```typescript
export const LANGUAGE_CONFIG = {
  defaultLanguage: 'en',
  availableLanguages: [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ],
  storageKey: 'preferred-language',
  useBrowserLanguage: true
};
```

### Language Detection

The application automatically detects the user's browser language on first visit:
1. If a language preference is saved in localStorage, it uses that
2. Otherwise, if the browser language matches one of the supported languages, it uses the browser language
3. If neither condition is met, it defaults to English

Users can manually switch languages in the Settings page. The preference is saved in localStorage and persists across sessions.

---

### 🎨 Styling Customization

Developers can easily customize the application's visual theme by editing CSS custom properties in `src/styles.css`. All design tokens are centralized in the `:root` scope for consistent theming.

#### Available CSS Variables

**Colors & Themes**
```css
:root {
  --light: #e0e0e0;
  --primary: #4a4a4a;
  --secondary: #808080;
  --danger: #6a6a6a;
  --text: #333;
  --background: #f5f5f5;
}
```
*Note: Default colors use a neutral grayscale palette for easy customization.*

**Gradients**
```css
--primary-gradient: linear-gradient(45deg, var(--primary), var(--light) 200%);
--secondary-gradient: linear-gradient(45deg, var(--secondary), var(--light) 200%);
--danger-gradient: linear-gradient(45deg, var(--danger), var(--light) 200%);
--background-gradient: linear-gradient(45deg, var(--background), var(--light) 200%);
```

**Spacing**
```css
--padding-sm: 10px;
--padding-md: 20px;
--padding-lg: 70px;
--margin-sm: 1vh;
--margin-md: 2vh;
--margin-lg: 5vh;
--radius: 15px;
```

**Typography**
```css
--font-bold: 'Karla-Bold';
--font-light: 'Karla-Light';
--font-medium: 'Karla-Medium';
--font-lg: 20px;
--font-md: 16px;
--font-sm: 13px;
```

**Visual Effects**
```css
--shadow: 6px 4px 4px #0e0e0e2e;
--brightness: brightness(1.2);
--background-image: url('https://images.pexels.com/photos/9574945/pexels-photo-9574945.jpeg');
```

#### Quick Theme Example

To create a dark theme:
```css
:root {
  --primary: #4a9eff;
  --text: #e0e0e0;
  --background: #1a1a1a;
  --light: #2d2d2d;
}
```

All components will automatically inherit these changes, ensuring consistent styling across the entire application.

---

## 🚀 Production Deployment

The production deployment script `docker/production.py` contains configuration for deploying to production environments.

#### Configuration Variables

The script contains the following variables at the top of `docker/production.py`:

```python
# Production Deployment Configuration
# Note: Only DOMAIN and EMAIL are customizable during setup
# PROJECT_NAME, NETWORK_NAME, and PROJECT_PATH are static values
PROJECT_NAME="Booker"                # Docker container name (static)
NETWORK_NAME="booker"                # Docker network name (static)
DOMAIN="example.com"                  # Your production domain (customizable)
EMAIL="admin@example.com"             # Email for Let's Encrypt SSL (customizable)
PROJECT_PATH="/home/user/Booker"    # Project directory path (static)
```

**During Setup (`booker init`):**
- ✅ **DOMAIN** and **EMAIL** are configurable through the interactive wizard
- 🔒 **PROJECT_NAME**, **NETWORK_NAME**, and **PROJECT_PATH** use default values and cannot be changed during setup

**Certificate Renewal** (`docker/entrypoint.py`)

The certificate renewal is automatically managed in the entrypoint script.

This is automatically configured when using `conf/setup.py`.

---

## 📁 Configuration Scripts Documentation

The `conf/` directory contains the interactive configuration wizard that updates project settings across multiple files.

### Configuration Structure

```
conf/
├── setup.py                 # Main configuration wizard script
└── modules/                 # Modular configuration components
    ├── ui_helpers.py       # UI display and user interaction utilities
    ├── config_prompts.py   # Configuration collection prompts
    └── file_updaters.py    # File modification functions
```

### What Gets Configured

The configuration wizard (`booker init` or `python conf/setup.py`) configures:

- **Application branding** (name, title, description)
- **Project context** (domain, URL, license)
- **API endpoints** (Auth, Booking, Messaging services)
- **Feature flags** (enable/disable major features)
- **UI preferences** (languages, date/time formats)
- **Styling theme** (colors, custom CSS)
- **Branding assets** (favicon)
- **Production deployment** (Docker settings, domain, SSL email)
- **Cookie/session settings** (consent keys, max age, token storage)
- **Animation timing** (typing speed, erasing speed, delays)
- **User messages** (success/error messages for branding consistency)

### Files Modified by Configuration

The wizard automatically updates these files:
- `src/environments/app.config.ts` - Main app configuration
- `proxy.conf.json` - Development proxy settings
- `src/styles.css` - Custom theme colors (optional)
- `src/index.html` - Page title
- `package.json` - Package name
- `src/app/shared/constants/*.ts` - Various constants (cookies, storage, animations, messages)
- `docker/production.sh` - Production deployment settings (optional)
- `docker/entrypoint.sh` - Certificate renewal settings
- `nginx.conf` - Web server configuration

### Configuration Design Philosophy

These scripts are **general-purpose configuration tools** that:
- Are reusable across different deployment methods
- Focus on application settings rather than infrastructure
- Can be run independently of Docker
- Use modular architecture for easier maintenance

---

## 🧪 Quality & Testing

- **Unit Tests:** `npm test` (Karma/Jasmine)
- **Linting:** `npm run lint` (ESLint + Prettier)
- **Build:** `npm run build` (Production optimized)

---

## 🎯 Workflow Examples & Best Practices

### Development Workflow Patterns

#### Pattern 1: Feature Development

```bash
# Start fresh
git checkout -b feature/new-feature
booker serve

# Develop...
# Test in browser: http://localhost:4200

# Before committing
booker lint
booker test
booker build

# Commit
git add .
git commit -m "Add new feature"
git push
```

#### Pattern 2: Bug Fixing

```bash
# Check bug report


# Fix the code...

# Test the fix
booker test
booker serve
# Verify in browser

# Ensure quality
booker lint
booker build
```

#### Pattern 3: Code Review

```bash
# Pull branch
git checkout feature/some-feature

# Start fresh
booker serve

# Review in browser
# Check logs


# Check code quality
booker lint
booker test
```

### Pre-Deploy Checklist

```bash
# 1. Ensure clean state
git status

# 2. Run full test suite
booker lint && booker test

# 3. Build production
booker build --configuration production

# 4. Check build output
ls -lh dist/booker/browser/

# 5. Test build locally (optional)
npx http-server dist/booker/browser -p 8080

# 6. Deploy
# (copy dist/ to your server or deploy via CI/CD)
```

### Power User Tips

**Using Command Chaining:**
```bash
# Quality check
booker l && booker t

# Full validation
booker l && booker t && booker b

```

**Environment Variables:**
```bash
# Custom port
PORT=8080 booker serve

# Production build
NODE_ENV=production booker build
```

### Real-World Examples

**Monday Morning Setup:**
```bash
cd ~/projects/booker
git pull origin main
npm install  # if package.json changed
booker serve

# Open browser to http://localhost:4200
# Start coding!
```

**Pre-Commit Hook Example:**
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running pre-commit checks..."

booker lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed"
    exit 1
fi

booker test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed"
    exit 1
fi

echo "✅ All checks passed"
```

**CI/CD Pipeline Example:**
```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm link
      - run: booker lint
      - run: booker test
      - run: booker build
```

### Troubleshooting Common Issues

**Port Already in Use:**
```bash
# Find what's using port 4200
lsof -i :4200

# Kill the process
kill -9 <PID>

# Or use different port
PORT=8080 booker serve
```

**Build Issues:**
```bash
# Clean build
rm -rf dist/
booker build

# Check for errors
booker lint
```

### Best Practices


2. **Keep the server running:**
   ```bash
   booker serve
   ```

3. **Run quality checks before committing:**
   ```bash
   booker lint && booker test && booker build
   ```

4. **Use aliases for speed:**
   ```bash
   booker s   # Not: booker serve
   ```

---

## 🎨 Visual CLI Guide

### Command Tree

```
booker
├── init                  ← Interactive configuration wizard
├── serve (s, start)     ← Start development server
├── build (b)            ← Build for production
├── test (t)             ← Run unit tests
├── lint (l)             ← Run linter
├── version (-v)         ← Show version
└── help (-h, --help)    ← Show help
```

### Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       First Time Setup                          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                        npm install
                               │
                               ▼
                          npm link
                               │
                               ▼
                         booker --version
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Configuration                             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                          booker init
                               │
                    ┌──────────┴──────────┐
                    │  Interactive Wizard │
                    │  - Branding         │
                    │  - API Endpoints    │
                    │  - Features         │
                    │  - Styling          │
                    └──────────┬──────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Development                               │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                          booker serve
                               │
                               ▼
                     http://localhost:4200
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Quality & Testing                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                    ┌──────────┼──────────┐
                    │          │          │
                    ▼          ▼          ▼
              booker lint   booker test  booker build
                    │          │          │
                    └──────────┴──────────┘
                               │
                               ▼
                         All passed!

```

### Platform Support

```
┌─────────────────────────────────────────┐
│           Supported Platforms           │
├─────────────────────────────────────────┤
│  ✅  Linux (Ubuntu, Debian, etc.)      │
│  ✅  macOS (Intel & Apple Silicon)     │
│  ✅  WSL (Windows Subsystem for Linux) │
│  ⚠️   Windows PowerShell (via bash)    │
└─────────────────────────────────────────┘
```

---

## 🤝 Credits & Acknowledgements

* **UI Layout & Wireframes:** Based on the work of [Rizky Sentro](https://dribbble.com/rizky_sentro).
* **Integration & Logic:** Full implementation by **Loïc Thiercelin**.

---

## 👤 Author

**Loïc Thiercelin**
* LinkedIn: [linkedin.com/in/loïc-thiercelin](https://www.linkedin.com/in/loïc-thiercelin)
* Website where this template is used: [parisworkhub.eu](https://parisworkhub.eu)