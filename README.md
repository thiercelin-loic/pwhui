# ParisWorkHub - Workspace Booking Platform

[![Angular](https://img.shields.io/badge/Angular-20-dd0031?style=flat&logo=angular)](https://angular.io/)
[![NestJS](https://img.shields.io/badge/NestJS-Compatible-E0234E?style=flat&logo=nestjs)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc/4.0/)

> **Live Demo:** [https://parisworkhub.eu](https://parisworkhub.eu)

A modern Fullstack application built to manage coworking space reservations.
This repository contains the **Frontend** architecture built with **Angular 20**, designed to consume a NestJS API.

---

## 📸 Screenshots

| **Home & Search** | **Booking Flow** | **Real-time Chat** |
|:---:|:---:|:---:|
| ![Home](./screenshots/home.png) | ![Booking](./screenshots/booking.png) | ![Chat](./screenshots/chat.png) |

*(Screenshots are stored in the /screenshots folder)*

---

## 🚀 Key Features

- **Authentication System**: Secure JWT login/registration with route guards.
- **Dynamic Booking**: Complete cart management and date validation.
- **Real-Time Messaging**: Chat interface powered by Redis.
- **Policy & Contracts**: Dedicated interfaces for legal document management.
- **Responsive Design**: Mobile-first approach using modern CSS.
- **Toast Notifications**: Feedback system for user actions.

---
## 🧠 Engineering Highlights

Beyond standard features, this project implements advanced patterns:

* **Optimized Data Fetching:** Implementation of RxJS `shareReplay` operator to cache API responses and reduce server load.
* **Automated DevOps Security:** Custom Nginx configuration handling ACME challenges for automatic **Let's Encrypt SSL** certificate generation and renewal within Docker containers.
* **Strict Code Quality:** Enforced linting rules using **ESLint** with specific Angular configurations to maintain clean architecture.
* **Smart UX Patterns:** Debounced search inputs and skeleton loaders for smoother user interactions.

## 🛠️ Technical Stack

- **Framework**: Angular 20
- **Language**: TypeScript 5.9
- **State Management**: RxJS
- **Testing**: Jasmine & Karma
- **DevOps**: Docker & Nginx (Auto-HTTPS with Let's Encrypt)

---

## 📂 Project Architecture

The project follows a modular architecture based on Feature Modules and Standalone Components.

    pwhui/
    ├── src/
    │   ├── app/
    │   │   ├── auth/           # Authentication strategies & Guards
    │   │   ├── cart/           # Booking workflow & State management
    │   │   ├── chat/           # Real-time messaging interface
    │   │   ├── contract/       # Legal data handling
    │   │   ├── landing/        # Home page & Search interface
    │   │   ├── navigation/     # Top navigation & Menu components
    │   │   ├── policy/         # Business rules & Policy service
    │   │   ├── settings/       # User settings & Profile management
    │   │   ├── start/          # Onboarding & Welcome screens
    │   │   ├── app.config.ts   # Application configuration
    │   │   ├── app.routes.ts   # Route definitions
    │   │   ├── app.ts          # Root component
    │   │   ├── booking.service.ts  # Booking logic & API integration
    │   │   └── init.service.ts     # Application initialization
    │   ├── fonts/              # Custom typography assets
    │   ├── icons/              # Optimized SVG icons
    │   ├── server/             # Server-side rendering utilities
    │   ├── index.html          # HTML entry point
    │   ├── main.ts             # Application bootstrapping
    │   └── styles.css          # Global styles
    ├── docker/
    │   ├── dependencies.sh     # Dependency installation script
    │   ├── entrypoint.sh       # Container startup script
    │   └── production.sh       # Production deployment automation
    ├── public/                 # Static assets
    ├── screenshots/            # Documentation images
    ├── angular.json            # Angular workspace configuration
    ├── Dockerfile              # Container build instructions
    ├── nginx.conf              # Web server configuration
    ├── proxy.conf.json         # Development API proxy
    └── package.json            # Dependencies & Scripts

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (LTS)
- npm or yarn
- Docker Desktop (optional but recommended)

### Frontend (pwhui)

1.  **Clone & Install**

        git clone https://github.com/thiercelin-loic/pwhui.git
        cd pwhui
        npm install

2.  **Environment Variables**
    Create a `.env` file in the root of the `pwhui` directory based on the following example:

        PORT=4200
        NODE_ENV=development

2.  **Development Mode**

        npm start
        # Navigate to http://localhost:4200/

3.  **Docker Deployment**
    The project includes production-ready Docker scripts handling Nginx and SSL certificates automatically.

    **Production:**
    1.  Configure `docker/production.sh` with your domain/email.
    2.  Run the deployment:

            ./docker/production.sh

    *Features: Nginx reverse-proxy, Auto-renewing Let's Encrypt SSL certificates.*

### Backend Microservices

This project relies on several NestJS microservices. Clone and set up each of them separately.

#### 1. Auth Service

-   **Repository:** [https://github.com/thiercelin-loic/auth](https://github.com/thiercelin-loic/auth)
-   **Installation:**

        git clone https://github.com/thiercelin-loic/auth.git
        cd auth
        docker compose up

-   **Environment Variables:**
    Create a `.env` file in the root of the `auth` directory based on the following example:

        MYSQL_HOST=database
        MYSQL_PORT=3306
        MYSQL_USERNAME=root
        MYSQL_PASSWORD=password
        MYSQL_DATABASE=auth
        NODE_ENV=production
        PORT=3000

#### 2. Booking Service

-   **Repository:** [https://github.com/thiercelin-loic/booking](https://github.com/thiercelin-loic/booking)
-   **Installation:**

        git clone https://github.com/thiercelin-loic/booking.git
        cd booking
        docker compose up

-   **Environment Variables:**
    Create a `.env` file in the root of the `booking` directory based on the following example:

        MYSQL_HOST=database
        MYSQL_PORT=3306
        MYSQL_USERNAME=root
        MYSQL_PASSWORD=password
        MYSQL_DATABASE=booking
        NODE_ENV=production
        PORT=3000

#### 3. Tell Service (Real-time Messaging)

-   **Repository:** [https://github.com/thiercelin-loic/tell](https://github.com/thiercelin-loic/tell)
-   **Installation:**

        git clone https://github.com/thiercelin-loic/tell.git
        cd tell
        docker compose up
---

## 🧪 Quality & Testing

- **Unit Tests:** `npm test` (Karma/Jasmine)
- **Linting:** `npm run lint` (ESLint + Prettier)
- **Build:** `npm run build` (Production optimized)

---

## 🤝 Credits & Acknowledgements

* **UI Layout & Wireframes:** Based on the work of [Rizky Sentro](https://dribbble.com/rizkysentro).
* **Integration & Logic:** Full implementation by **Loïc Thiercelin**.

---

## 👤 Author

**Loïc Thiercelin**
* LinkedIn: [linkedin.com/in/loïc-thiercelin](https://www.linkedin.com/in/loïc-thiercelin)
* Website: [parisworkhub.eu](https://parisworkhub.eu)