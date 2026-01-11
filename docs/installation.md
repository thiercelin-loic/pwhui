# Installation Guide

Complete step-by-step installation guide for AgoraUI. Choose your preferred installation method and follow the instructions carefully.

## 📋 Table of Contents

- [System Requirements](#system-requirements)
- [Prerequisites](#prerequisites)
- [Installation Method 1: CLI (Recommended)](#installation-method-1-cli-recommended)
- [Installation Method 2: NPM Scripts](#installation-method-2-npm-scripts)
- [Verifying Installation](#verifying-installation)
- [First Run](#first-run)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **RAM** | 4 GB | 8 GB or more |
| **Disk Space** | 2 GB free | 5 GB free |
| **OS** | Windows 10, macOS 10.14, Ubuntu 18.04 | Latest versions |
| **Internet** | Required for initial setup | Broadband recommended |
| **Processor** | Dual-core | Quad-core or better |

---

## Prerequisites

Before installing AgoraUI, ensure you have these tools installed:

### 1. Node.js (Required)

**What it is:** JavaScript runtime environment

**How to install:**
```bash
# Check if already installed
node --version

# Should show v18.0.0 or higher
```

**If not installed:**
- Visit [nodejs.org](https://nodejs.org/)
- Download the LTS (Long Term Support) version
- Run the installer
- Restart your terminal

### 2. npm (Comes with Node.js)

**What it is:** Node Package Manager

**How to verify:**
```bash
npm --version
# Should show 9.0.0 or higher
```

### 3. Git (Required)

**What it is:** Version control system

**How to install:**
```bash
# Check if already installed
git --version

# Should show git version 2.0.0 or higher
```

**If not installed:**
- Visit [git-scm.com](https://git-scm.com/)
- Download for your OS
- Install with default settings
- Restart your terminal

### 4. Docker Desktop (Recommended)

**What it is:** Container platform for backend services

**How to install:**
```bash
# Check if already installed
docker --version

# Should show Docker version 20.0.0 or higher
```

**If not installed:**
- Visit [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- Download for your OS
- Install (may require restart)
- Ensure Docker Desktop is running

**Note:** Docker is optional but highly recommended. Without it, you'll need to manually set up backend services.

### 5. Code Editor (Recommended)

**Recommendation:** Visual Studio Code

**Why:** Best Angular support, integrated terminal, free

**Install:** [code.visualstudio.com](https://code.visualstudio.com/)

---

## Installation Method 1: CLI (Recommended)

The CLI provides the best developer experience with powerful commands and easier workflow.

### Step 1: Clone the Repository

```bash
git clone https://github.com/thiercelin-loic/agoraui.git
cd agoraui
```

**Expected output:**
```
Cloning into 'agoraui'...
remote: Enumerating objects: XXX, done.
...
```

**What this does:**
- Downloads all project files from GitHub
- Creates an `agoraui` folder
- Changes directory into the project

### Step 2: Install Dependencies

```bash
npm install
```

**Expected output:**
```
npm WARN deprecated ...
added XXX packages in XXs
```

**What this does:**
- Downloads ~500 MB of required packages
- Installs Angular, TypeScript, and all dependencies
- Creates `node_modules` folder

**Time:** 2-5 minutes depending on internet speed

**Yellow warnings?** Usually safe to ignore  
**Red errors?** See [Troubleshooting](#troubleshooting)

### Step 3: Link the CLI Globally

```bash
npm link
```

**Expected output:**
```
added 1 package, and audited XXX packages in Xs
```

**What this does:**
- Makes `agora` command available globally
- You can now run `agora` from any directory

**Verify it worked:**
```bash
agora --version
```

Should show the version number (e.g., `1.0.0`)

**If command not found:** See [Troubleshooting](#troubleshooting)

### Step 4: Configure Your Application

```bash
agora init
```

**What this does:**
- Launches interactive configuration wizard
- Asks about app name, colors, features, etc.
- Updates 15+ configuration files automatically

**Your options:**
1. **Accept all defaults** (Press Enter repeatedly) - Good for first time
2. **Customize everything** - Provide your specific values

**Time:** 30 seconds (defaults) to 10 minutes (full customization)

**Example prompts:**
```
? What is your application name? (AgoraUI)
? What is your application title? (AgoraUI)
? Enable authentication feature? (Y/n)
? Default language? (en)
? Primary color? (#4A4A4A)
```

### Step 5: Start Development Server

```bash
agora serve
```

**What this does:**
1. Checks for Docker (offers to install if missing)
2. Starts backend services in Docker containers
3. Starts Angular development server
4. Opens browser to `http://localhost:4200`

**Expected output:**
```
Checking Docker installation...
Starting backend services...
Starting development server...

✔ Compiled successfully.
🎉 Application is running at http://localhost:4200
```

**First run?** Backend downloads take 2-5 minutes  
**Subsequent runs?** ~10-20 seconds

**Browser should open automatically** showing the AgoraUI homepage.

### ✅ Installation Complete!

You should now see AgoraUI running in your browser. Proceed to [First Run](#first-run).

---

## Installation Method 2: NPM Scripts

Use this method for CI/CD, automated deployments, or if you can't use `npm link`.

### Step 1: Clone the Repository

```bash
git clone https://github.com/thiercelin-loic/agoraui.git
cd agoraui
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development

```bash
npm start
```

**What's different from CLI method:**
- No global `agora` command (use npm scripts instead)
- Configuration wizard not available (edit files manually)
- Commands are longer

**Available npm scripts:**
```bash
npm start              # Start dev server (with backend setup)
npm run build          # Build for production
npm test               # Run unit tests
npm run lint           # Check code quality
npm run backend:start  # Start backend services
npm run backend:stop   # Stop backend services
```

### Manual Configuration

Since `agora init` isn't available:

1. Open `src/environments/app.config.ts`
2. Edit values directly:
   ```typescript
   export const APP_CONFIG = {
     name: 'Your App Name',
     title: 'Your App Title',
     // ... other settings
   };
   ```
3. Save and restart: `npm start`

**OR** run the wizard directly:
```bash
bash conf/setup.sh
```

### ✅ Installation Complete!

Proceed to [First Run](#first-run).

---

## Verifying Installation

### Check Frontend

1. Browser should open to `http://localhost:4200`
2. You should see the AgoraUI homepage
3. Navigation bar and search box visible
4. No console errors (Press F12 → Console tab)

### Check Backend Services

```bash
# If using CLI:
agora backend:logs

# If using npm:
docker ps
```

**Expected:** Three containers running:
- `auth.api` (port 3001)
- `booking.api` (port 3002)
- `tell.api` (port 3003)

### Quick Test

1. Click "Sign Up" in navigation
2. Create a test account
3. If successful, installation is working perfectly!

---

## First Run

### Explore the Application

- [ ] **Create an account** - Test the authentication system
- [ ] **Browse listings** - See sample booking data
- [ ] **Make a booking** - Test the booking flow
- [ ] **Try messaging** - Send a test message
- [ ] **Change language** - Settings → Language
- [ ] **Test search** - Use the search bar

### Understanding What's Running

**Frontend (Port 4200):**
- Angular development server
- Hot reload enabled (changes auto-refresh)
- Runs on `http://localhost:4200`

**Backend (Docker):**
- Auth Service (Port 3001) - Login/signup
- Booking Service (Port 3002) - Listings/bookings
- Tell Service (Port 3003) - Real-time messaging
- PostgreSQL databases for each service
- Redis for messaging

### Development Workflow

```bash
# Terminal 1: Start everything
agora serve

# Terminal 2 (optional): Monitor backend logs
agora backend:logs

# Terminal 3 (optional): Watch tests
agora test --watch
```

### Stopping Services

**Stop frontend:**
- Press `Ctrl+C` in the terminal running `agora serve`

**Stop backend:**
```bash
agora backend:stop
```

**Stop everything quickly:**
```bash
# Press Ctrl+C, then:
agora backend:stop
```

---

## Troubleshooting

### `npm install` Fails

**Error:** `EACCES` or permission denied

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Try again
npm install

# If still failing, check Node.js version
node --version  # Should be v18+
```

### `agora` Command Not Found

**After `npm link`:**

**Solution 1:** Verify npm's global directory is in PATH
```bash
npm config get prefix
# Add this directory to your system PATH
```

**Solution 2:** Run directly from project
```bash
./bin/agora serve
```

**Solution 3 (Windows/WSL):** Fix line endings
```bash
sed -i 's/\r$//' bin/agora
chmod +x bin/agora
npm link
```

### Docker Won't Start

**Error:** `Cannot connect to Docker daemon`

**Solution:**
1. Ensure Docker Desktop is running (check system tray)
2. On Windows: Enable WSL 2
3. On Linux: `sudo systemctl start docker`
4. Restart Docker Desktop

### Port Already in Use

**Error:** `Port 4200 is already in use`

**Solution 1:** Find and kill the process
```bash
# macOS/Linux
lsof -ti:4200 | xargs kill -9

# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

**Solution 2:** Use different port
```bash
PORT=8080 agora serve
```

### Backend Not Connecting

**Error:** 404 or connection refused when calling APIs

**Solution:**
```bash
# Check Docker containers
docker ps

# Restart backend
agora backend:stop
agora backend:start

# Check logs for errors
agora backend:logs
```

### White Screen / Nothing Loads

**Solution:**
1. Check browser console (F12) for errors
2. Verify build succeeded (no red errors in terminal)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart dev server:
   ```bash
   # Ctrl+C to stop, then:
   agora serve
   ```

### Still Having Issues?

1. Check the [comprehensive troubleshooting guide](./troubleshooting.md)
2. Search [GitHub Issues](https://github.com/thiercelin-loic/agoraui/issues)
3. Create a new issue with:
   - Your OS and versions (Node, npm, Docker)
   - Full error message
   - Steps you tried
   - What you expected vs what happened

---

## Next Steps

### Immediate Next Steps

1. **Read the [Beginner's Guide](./beginners-guide.md)** - If you're new
2. **Explore the [Configuration Guide](./configuration.md)** - Customize your app
3. **Check the [CLI Reference](./cli-reference.md)** - Learn all commands
4. **Review the [Project Structure](./project-structure.md)** - Understand the codebase

### Within Your First Week

- [ ] Make simple customizations (colors, text, logo)
- [ ] Read through [Development Workflow](./development-workflow.md)
- [ ] Understand [Backend Services](./backend-services.md)
- [ ] Learn about [Internationalization](./internationalization.md)

### Learning Path

1. Week 1: **Explore** - Use the app, understand features
2. Week 2: **Customize** - Change config, styles, text
3. Week 3: **Learn** - Study Angular basics, read code
4. Week 4+: **Build** - Add features, modify functionality

---

**Installation successful?** Great! Check out the [Development Workflow](./development-workflow.md) to start building.

**Having problems?** The [Troubleshooting Guide](./troubleshooting.md) has solutions for common issues.
