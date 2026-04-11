<img src="./public/favicon.ico" alt="Booker" width="100" />

# Booker - Customizable Booking Plateform

[![Angular](https://img.shields.io/badge/Angular-20-dd0031?style=flat&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.7+-3776AB?style=flat&logo=python)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen?style=flat)](https://github.com/thiercelin-loic/booker)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc/4.0/)

Booker Client is a production-ready Angular frontend template for booking and marketplace apps.
It includes authentication flows, booking management, real-time chat UI, i18n, and a Python CLI
for cross-platform project setup.

This frontend is designed to run with the backend stack in
[booker-services](../booker-services/README.md).

## Table of Contents

- [Booker - Customizable Booking Plateform](#booker---customizable-booking-plateform)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Demo](#demo)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [CLI Commands](#cli-commands)
  - [Configuration](#configuration)
  - [Project Structure](#project-structure)
  - [Quality Checks](#quality-checks)
  - [Deployment](#deployment)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [License](#license)
  - [Credits](#credits)
  - [Author](#author)

## Overview

Use this template to build booking experiences for coworking spaces, rentals, appointments, and
service marketplaces. The project focuses on clear configuration, reusable UI components, and a
development workflow that works the same way on Windows, macOS, and Linux.

## Demo

| Home | Booking | Chat |
| :--: | :-----: | :--: |
| ![Home](./screenshots/home.png) | ![Booking](./screenshots/booking.png) | ![Chat](./screenshots/chat.png) |

## Features

- JWT-based authentication and protected routes
- End-to-end booking flow with date selection and validation
- Real-time chat interface (with backend pub/sub support)
- Internationalization with multiple language packs
- Responsive UI with centralized theme variables
- Configurable constants for cookies, storage, animations, and user messages
- Python CLI for setup, defaults, build, test, lint, and deployment delegation

## Tech Stack

- Frontend: Angular 20 (standalone components)
- Language: TypeScript 5.9
- Reactive layer: RxJS
- i18n: ngx-translate
- Tooling: Angular CLI, ESLint, Jasmine, Karma
- Automation: Python 3.7+ CLI
- Runtime serving: Nginx (containerized)
- Deployment orchestration: Docker Compose via booker-services

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.7+
- Git 2+
- Docker Desktop (optional, for containerized deployment)

## Installation

1. Clone the repository.
2. Move to the frontend folder.
3. Install dependencies.
4. Link the CLI (recommended).
5. Run interactive configuration.
6. Start the development server.

```bash
git clone https://github.com/thiercelin-loic/booker.git
cd booker
cd booker-client

npm install
npm link

booker init
booker serve
```

App URL: http://localhost:4200

Alternative without global CLI link:

```bash
npm start
# or
python bin/booker.py serve
```

## Usage

Typical development workflow:

```bash
booker serve
booker lint
booker test
booker build
```

Short aliases are supported:

```bash
booker s
booker l
booker t
booker b
```

## CLI Commands

| Command | Aliases | Description |
| ------- | ------- | ----------- |
| `booker init` | - | Run interactive configuration wizard |
| `booker default` | `reset` | Restore default Booker configuration |
| `booker serve` | `s`, `start` | Start development server |
| `booker build` | `b` | Build production assets |
| `booker test` | `t` | Run unit tests |
| `booker lint` | `l` | Run linter |
| `booker deps` | `d` | Manage backend Docker dependencies |
| `booker compose up` | `c up` | Delegate deployment to booker-services |
| `booker version` | `-v`, `--version` | Show CLI version |
| `booker help` | `-h`, `--help` | Show help |

## Configuration

Primary configuration files:

- `src/environments/app.config.ts`: app metadata, API endpoints, feature flags, UI defaults
- `src/styles.css`: theme tokens and global design variables
- `proxy.conf.json`: local API proxy for development
- `nginx.conf`: frontend container reverse-proxy behavior in production

Recommended approach:

- Use `booker init` for guided setup
- Use `booker default` to restore baseline values

## Project Structure

```text
booker-client/
├── bin/                     # CLI entrypoints
├── cli/                     # Config wizard and update modules
├── docker/                  # Container scripts
├── public/                  # Static assets
├── screenshots/             # README visuals
├── src/
│   ├── app/                 # Feature modules and shared logic
│   ├── environments/        # Runtime configuration
│   ├── languages/           # Translation files
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── nginx.conf
├── proxy.conf.json
└── package.json
```

## Quality Checks

Run these before creating a pull request:

```bash
booker lint
booker test
booker build
```

If Chrome is not auto-detected for headless tests on Windows:

```powershell
set PORT=9876
set CHROME_BIN=C:\Program Files\Google\Chrome\Application\chrome.exe
npm run test -- --watch=false --browsers=ChromeHeadless
```

## Deployment

Expected local layout:

```text
parisworkhub/
├── booker-client/
└── booker-services/
```

Recommended deployment flow:

```bash
cd ../booker-services
docker compose up --build
```

From the frontend repository, you can also delegate deployment:

```bash
booker compose up
```

For backend details, see [booker-services](../booker-services/README.md).

## Troubleshooting

`booker` command not found:

```bash
npm link
```

Permission issues on WSL/Linux:

```bash
chmod +x bin/booker.py
npm link
```

Port 4200 already in use:

```bash
npm start -- --port 4300
```

If API calls return HTML in Docker instead of JSON, review `nginx.conf` API proxy settings and
ensure `/api` routes are proxied to backend services.

## Contributing

Pull requests are welcome. For larger changes, open an issue first to discuss scope and design.

Suggested contribution flow:

1. Fork the repository.
2. Create a feature branch.
3. Run lint, tests, and build locally.
4. Submit a pull request with a clear summary.

## License

This project is licensed under the [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)
license.

## Credits

- UI layout and wireframe inspiration: [Rizky Sentro](https://dribbble.com/rizky_sentro)
- Integration and implementation: Loic Thiercelin

## Author

Loic Thiercelin

- LinkedIn: [linkedin.com/in/loic-thiercelin](https://www.linkedin.com/in/lo%C3%AFc-thiercelin)
- Live usage example: [parisworkhub.eu](https://parisworkhub.eu)