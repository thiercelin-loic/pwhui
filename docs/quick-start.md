# Quick Start Guide

Get up and running with AgoraUI in 5 minutes.

## Prerequisites

Ensure you have these installed:
- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **npm** (v9+) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Docker** (recommended) - [Download](https://www.docker.com/products/docker-desktop)

Check versions:
```bash
node --version
npm --version
git --version
docker --version
```

> **New to programming?** See [Prerequisites Explained](./prerequisites.md) for detailed setup guides.

---

## Installation (3 Steps)

### 1. Clone & Enter Directory

```bash
git clone https://github.com/thiercelin-loic/agoraui.git
cd agoraui
```

### 2. Install Dependencies

```bash
npm install
npm link
```

**What this does:**
- Downloads ~500MB of required packages (2-5 min)
- Makes `agora` command available globally

### 3. Configure & Start

```bash
agora init    # Interactive configuration (optional - can skip with Enter)
agora serve   # Starts everything
```

**First run:** Takes 2-5 minutes (downloads backend services)  
**Subsequent runs:** ~10 seconds

---

## ✅ Success!

Your browser should open to `http://localhost:4200`

### Test Everything Works

- [ ] Create a test user account (Click "Sign Up")
- [ ] Browse sample listings
- [ ] Make a test booking
- [ ] Try the chat feature
- [ ] Change language (Settings → Language)

---

## Next Steps

### Explore the App (15 min)
- Test all features
- Try different languages
- Check responsive design on mobile

### Customize (30 min)
```bash
agora init  # Re-run to customize
```
Change:
- App name and title
- Colors and theme
- Enabled features
- Languages

### Learn the Codebase (1 hour)
1. Read [Beginner's Guide](./beginners-guide.md)
2. Check [Project Structure](./project-structure.md)
3. Browse the code in VS Code
4. Make a small change and see it update

### Start Building (Ongoing)
- [Configuration Guide](./configuration.md) - Detailed customization
- [CLI Reference](./cli-reference.md) - All commands
- [Development Workflow](./development-workflow.md) - Best practices

---

## Common Commands

```bash
# Development
agora serve              # Start dev server
agora build              # Build for production
agora test               # Run tests
agora lint               # Check code quality

# Backend
agora backend:start      # Start backend services
agora backend:stop       # Stop backend services  
agora backend:logs       # View all logs

# Configuration
agora init               # Configuration wizard
agora default            # Restore defaults

# Help
agora --help             # All commands
agora --version          # Version info
```

---

## Troubleshooting

### Command not found: agora

```bash
npm link              # Try linking again
./bin/agora serve     # Or run directly
```

### Port 4200 already in use

```bash
lsof -ti:4200 | xargs kill -9    # macOS/Linux
# Or use different port:
PORT=8080 agora serve
```

### Docker issues

- Ensure Docker Desktop is running
- Restart Docker Desktop
- Check: `docker ps`

### Backend not connecting

```bash
agora backend:stop
agora backend:start
agora backend:logs    # Check for errors
```

> **More help:** [Full Troubleshooting Guide](./troubleshooting.md) | [FAQ](./faq.md)

---

## Alternative: NPM Scripts

If you can't use `npm link`:

```bash
npm start             # Instead of: agora serve
npm run build         # Instead of: agora build
npm test              # Instead of: agora test
npm run lint          # Instead of: agora lint
```

---

## What's Running?

**Frontend (localhost:4200):**
- Angular development server
- Hot reload enabled
- Your browser interface

**Backend (Docker containers):**
- Auth Service (port 3001)
- Booking Service (port 3002)
- Messaging Service (port 3003)
- 3x PostgreSQL databases
- Redis server

---

## Stopping Services

**Stop frontend:**
- Press `Ctrl+C` in terminal

**Stop backend:**
```bash
agora backend:stop
```

---

**Ready to customize?** → [Configuration Guide](./configuration.md)  
**Want to learn more?** → [Full Documentation](./README.md)  
**Need help?** → [FAQ](./faq.md) | [Troubleshooting](./troubleshooting.md)
