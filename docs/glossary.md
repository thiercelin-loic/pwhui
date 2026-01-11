# Glossary

A comprehensive list of technical terms used in AgoraUI documentation. Each term includes a simple explanation for beginners and a technical definition for developers.

## How to Use This Glossary

- **Beginners:** Read the "Simple" column
- **Developers:** Check the "Technical" column for precise definitions
- **Everyone:** Use Ctrl+F (Cmd+F) to search for specific terms

---

## A

### Angular
- **Simple:** A framework (set of tools) for building websites
- **Technical:** TypeScript-based open-source web application framework maintained by Google, used for building single-page applications (SPAs)
- **Used in AgoraUI:** The entire frontend is built with Angular 20

### API (Application Programming Interface)
- **Simple:** A menu of requests the frontend can make to the backend
- **Technical:** A set of defined methods and protocols for communication between software components, typically using HTTP/REST
- **Used in AgoraUI:** Frontend communicates with auth, booking, and messaging services via RESTful APIs

### Authentication
- **Simple:** Proving who you are (like showing ID)
- **Technical:** The process of verifying the identity of a user or system, typically through credentials like username/password
- **Used in AgoraUI:** JWT-based authentication with sessions and route guards

### Authorization
- **Simple:** Permission to do something (like having a key to a room)
- **Technical:** The process of verifying what a user has access to, determining permissions and privileges
- **Used in AgoraUI:** Route guards check if users can access certain pages

---

## B

### Backend
- **Simple:** The server-side part that stores data and handles business logic
- **Technical:** Server-side application logic, database management, and API endpoints that process client requests
- **Used in AgoraUI:** Three NestJS microservices (auth, booking, tell) running in Docker containers

### Bootstrap
- **Simple:** Starting up or loading an application
- **Technical:** The process of initializing and loading an application's core functionality
- **Used in AgoraUI:** Application bootstraps in `main.ts`

### Build
- **Simple:** Converting your code into a version that can run in browsers
- **Technical:** The process of compiling, bundling, and optimizing source code into production-ready assets
- **Used in AgoraUI:** `agora build` or `npm run build` creates optimized files in `/dist` folder

---

## C

### CLI (Command Line Interface)
- **Simple:** A text-based tool where you type commands
- **Technical:** A text-based interface for interacting with software by typing commands
- **Used in AgoraUI:** The `agora` command provides shortcuts for common tasks

### Component
- **Simple:** A reusable piece of the user interface (like a button or navigation bar)
- **Technical:** Self-contained Angular building block with TypeScript logic, HTML template, and CSS styling
- **Used in AgoraUI:** Each feature (auth, booking, chat) is composed of multiple components

### Configuration
- **Simple:** Settings that control how your app behaves
- **Technical:** Environment-specific parameters and options that define application behavior without code changes
- **Used in AgoraUI:** Centralized in `src/environments/app.config.ts`

### Container (Docker)
- **Simple:** A package that includes software and everything it needs to run
- **Technical:** Lightweight, standalone, executable package that includes code, runtime, libraries, and system tools
- **Used in AgoraUI:** Backend services run in Docker containers for consistency

### CRUD
- **Simple:** The four basic operations: Create, Read, Update, Delete
- **Technical:** The four fundamental operations for persistent storage in databases or APIs
- **Used in AgoraUI:** Booking system implements full CRUD for listings and reservations

### CSS (Cascading Style Sheets)
- **Simple:** The styling language that controls colors, fonts, and layout
- **Technical:** Style sheet language used for describing the presentation of HTML documents
- **Used in AgoraUI:** Global styles in `styles.css`, component-specific styles in `.component.css` files

---

## D

### Dependency
- **Simple:** Code libraries that your project needs to work
- **Technical:** External packages or modules required by an application to function properly
- **Used in AgoraUI:** Listed in `package.json`, installed via `npm install`

### Deployment
- **Simple:** Putting your website on the internet so others can use it
- **Technical:** The process of making an application available in a production environment
- **Used in AgoraUI:** See [Deployment Guide](./deployment.md)

### Development Server
- **Simple:** A local server that runs on your computer for testing
- **Technical:** A local server environment that enables hot reloading and debugging features for development
- **Used in AgoraUI:** Started with `agora serve`, runs on port 4200

### Docker
- **Simple:** A tool that packages software so it runs the same everywhere
- **Technical:** A containerization platform that packages applications and their dependencies into isolated containers
- **Used in AgoraUI:** Backend services (PostgreSQL, Redis, APIs) run in Docker containers

### DOM (Document Object Model)
- **Simple:** The structure of a web page that JavaScript can manipulate
- **Technical:** A programming interface for HTML documents representing the page structure as a tree of objects
- **Used in AgoraUI:** Angular manipulates the DOM to update the UI dynamically

---

## E

### Endpoint
- **Simple:** A specific URL the backend uses to receive requests
- **Technical:** A specific route in an API that accepts HTTP requests and returns responses
- **Used in AgoraUI:** Examples: `/api/auth/login`, `/api/bookings/create`, `/api/messages/send`

### Environment
- **Simple:** Different settings for development vs production
- **Technical:** Configuration context (development, staging, production) with specific settings for each
- **Used in AgoraUI:** Environment configs in `src/environments/`

### Environment Variable
- **Simple:** Settings stored outside your code (like passwords)
- **Technical:** Dynamic-named values that affect running processes, often used for configuration
- **Used in AgoraUI:** API endpoints, database URLs, secrets stored in `.env` files

---

## F

### Frontend
- **Simple:** The part users see and interact with (buttons, forms, pages)
- **Technical:** Client-side application that runs in the browser, handling UI and user interactions
- **Used in AgoraUI:** The Angular application (this repository)

### Framework
- **Simple:** A set of tools and rules for building applications
- **Technical:** A platform providing structure, libraries, and best practices for application development
- **Used in AgoraUI:** Angular (frontend), NestJS (backend)

---

## G

### Git
- **Simple:** Software that tracks changes to your code
- **Technical:** Distributed version control system for tracking changes in source code during development
- **Used in AgoraUI:** Track changes, collaborate, manage versions

### GitHub
- **Simple:** A website where developers store and share code
- **Technical:** Web-based platform for version control and collaboration using Git
- **Used in AgoraUI:** Source code hosted at github.com/thiercelin-loic/agoraui

---

## H

### Hot Reload
- **Simple:** The browser automatically refreshes when you change code
- **Technical:** Feature that updates running applications without full restart, preserving state
- **Used in AgoraUI:** Enabled in development mode with `agora serve`

### HTML (HyperText Markup Language)
- **Simple:** The language that defines the structure of web pages
- **Technical:** The standard markup language for creating web pages and applications
- **Used in AgoraUI:** Component templates with `.html` extension

### HTTP/HTTPS
- **Simple:** The protocol browsers use to communicate with servers
- **Technical:** Hypertext Transfer Protocol (Secure), the foundation of data communication on the web
- **Used in AgoraUI:** API calls use HTTP in development, HTTPS in production

---

## I

### i18n (Internationalization)
- **Simple:** Making your app work in multiple languages
- **Technical:** The process of designing software so it can be adapted to various languages without code changes
- **Used in AgoraUI:** Supports 10+ languages via ngx-translate, files in `src/languages/`

### IDE (Integrated Development Environment)
- **Simple:** Software for writing and editing code (like VS Code)
- **Technical:** Software application providing comprehensive facilities for software development
- **Examples:** VS Code, WebStorm, Sublime Text

---

## J

### JavaScript
- **Simple:** The programming language that makes websites interactive
- **Technical:** High-level, interpreted programming language that runs in browsers and on servers (Node.js)
- **Used in AgoraUI:** TypeScript compiles to JavaScript

### JSON (JavaScript Object Notation)
- **Simple:** A format for storing and exchanging data
- **Technical:** Lightweight data-interchange format that's easy for humans to read and machines to parse
- **Used in AgoraUI:** Configuration files, translation files (`en.json`), API responses

### JWT (JSON Web Token)
- **Simple:** A secure way to keep users logged in
- **Technical:** Compact, URL-safe token for securely transmitting information between parties as a JSON object
- **Used in AgoraUI:** Authentication tokens stored in cookies, sent with API requests

---

## L

### Library
- **Simple:** Pre-written code you can use in your project
- **Technical:** Collection of pre-written code providing specific functionality that can be imported and used
- **Examples in AgoraUI:** ngx-translate (translations), RxJS (reactive programming)

### Localhost
- **Simple:** Your own computer acting as a server
- **Technical:** The default name for the loopback network interface (127.0.0.1) on your local machine
- **Used in AgoraUI:** Development server runs on `http://localhost:4200`

---

## M

### Microservices
- **Simple:** Breaking a large application into smaller, independent pieces
- **Technical:** Architectural pattern where an application is composed of small, independent services communicating via APIs
- **Used in AgoraUI:** Three services: auth (3001), booking (3002), tell (3003)

### Module
- **Simple:** A file containing related code
- **Technical:** A file or collection of files that encapsulates functionality and can be imported elsewhere
- **Used in AgoraUI:** Feature modules like `AuthModule`, `BookingModule`

---

## N

### NestJS
- **Simple:** A framework for building server applications
- **Technical:** Progressive Node.js framework for building efficient, scalable server-side applications with TypeScript
- **Used in AgoraUI:** All three backend microservices use NestJS

### Node.js
- **Simple:** Software that runs JavaScript on your computer (not just browsers)
- **Technical:** JavaScript runtime built on Chrome's V8 JavaScript engine for server-side execution
- **Used in AgoraUI:** Required to run the development server and build process

### npm (Node Package Manager)
- **Simple:** A tool to download and manage code libraries
- **Technical:** The default package manager for Node.js, manages project dependencies
- **Used in AgoraUI:** Install dependencies with `npm install`, scripts in `package.json`

---

## O

### Observable
- **Simple:** A way to handle data that arrives over time
- **Technical:** RxJS data type representing a stream of values over time that can be observed and reacted to
- **Used in AgoraUI:** HTTP requests, user input events, real-time data streams

---

## P

### Package
- **Simple:** A bundle of code that adds functionality
- **Technical:** A directory with code and a `package.json` file describing its metadata and dependencies
- **Examples in AgoraUI:** Angular, TypeScript, RxJS are all packages

### Port
- **Simple:** A number that identifies a specific service on a computer
- **Technical:** A numerical identifier in networking used to distinguish different services on the same host
- **Used in AgoraUI:** 4200 (frontend), 3001 (auth), 3002 (booking), 3003 (messaging)

### Production
- **Simple:** The real version that users access on the internet
- **Technical:** The live environment where the application is deployed for end-users
- **Used in AgoraUI:** Build with `agora build`, deploy to server

### Proxy
- **Simple:** A middleman that forwards requests
- **Technical:** An intermediary server that forwards requests from the client to another server
- **Used in AgoraUI:** `proxy.conf.json` routes API calls to backend services in development

---

## R

### Repository (Repo)
- **Simple:** A project's code storage location
- **Technical:** A storage location for software packages, often with version control
- **Used in AgoraUI:** Main repo + three backend repos (auth, booking, tell)

### REST (Representational State Transfer)
- **Simple:** A standard way for frontend and backend to communicate
- **Technical:** Architectural style for designing networked applications using HTTP methods (GET, POST, PUT, DELETE)
- **Used in AgoraUI:** All API endpoints follow REST principles

### Route
- **Simple:** A URL path that shows a specific page
- **Technical:** A URL pattern mapped to a specific component in the application
- **Used in AgoraUI:** Defined in `app.routes.ts` (e.g., `/login`, `/booking`)

### Route Guard
- **Simple:** Security that checks if you can access a page
- **Technical:** Angular service that controls navigation by determining if a route can be activated
- **Used in AgoraUI:** Checks if user is logged in before accessing protected pages

### RxJS
- **Simple:** A library for working with data streams
- **Technical:** Reactive Extensions for JavaScript, library for reactive programming using observables
- **Used in AgoraUI:** Handles async operations, HTTP requests, event streams

---

## S

### Service
- **Simple:** Reusable code that does something useful
- **Technical:** Angular class that encapsulates business logic and can be injected into components
- **Used in AgoraUI:** `AuthService`, `BookingService`, `LanguageService`, etc.

### SPA (Single Page Application)
- **Simple:** A website that doesn't reload when you navigate
- **Technical:** Web application that loads a single HTML page and dynamically updates content without full page reloads
- **Used in AgoraUI:** The entire Angular application is an SPA

### SSL/HTTPS
- **Simple:** Technology that secures data between browser and server
- **Technical:** Secure Sockets Layer/HTTP Secure, cryptographic protocol for secure communication
- **Used in AgoraUI:** Let's Encrypt SSL certificates in production

---

## T

### Terminal
- **Simple:** A text-based interface for running commands
- **Technical:** Command-line interface (CLI) for interacting with the operating system
- **Examples:** Command Prompt (Windows), Terminal (Mac), Bash (Linux)

### Token
- **Simple:** A piece of data that proves who you are
- **Technical:** A string representing authentication credentials or permissions
- **Used in AgoraUI:** JWT tokens for maintaining user sessions

### TypeScript
- **Simple:** JavaScript with extra features that catch errors early
- **Technical:** Statically-typed superset of JavaScript that compiles to plain JavaScript
- **Used in AgoraUI:** All code in `src/` is written in TypeScript (`.ts` files)

---

## U

### UI (User Interface)
- **Simple:** Everything users see and interact with
- **Technical:** The visual elements and interaction patterns of an application
- **Used in AgoraUI:** Components, templates, and styles

### URL (Uniform Resource Locator)
- **Simple:** The address of a webpage (like `example.com/about`)
- **Technical:** Reference to a web resource specifying its location and protocol
- **Examples in AgoraUI:** `http://localhost:4200`, `https://yourdomain.com/booking`

---

## V

### Version Control
- **Simple:** Tracking changes to code over time
- **Technical:** System for managing changes to files, enabling collaboration and history tracking
- **Used in AgoraUI:** Git for version control, GitHub for hosting

---

## W

### WebSocket
- **Simple:** A way for server and browser to talk in real-time
- **Technical:** Protocol providing full-duplex communication channels over a single TCP connection
- **Used in AgoraUI:** Real-time chat messaging in the Tell service

---

## Y

### Yarn
- **Simple:** An alternative to npm for managing code libraries
- **Technical:** Package manager for JavaScript, alternative to npm
- **Used in AgoraUI:** You can use yarn instead of npm if you prefer

---

## Need More Definitions?

If you encounter a term not listed here:
1. Search this glossary using Ctrl+F (Cmd+F)
2. Check the [FAQ](./faq.md)
3. Google: "What is [term] in web development"
4. Ask in the GitHub Issues with the "documentation" label

---

**Found this helpful?** Consider [contributing](./contributing.md) by adding definitions for terms you had to look up!
