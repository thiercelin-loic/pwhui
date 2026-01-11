# Frequently Asked Questions (FAQ)

Common questions about AgoraUI, answered for all skill levels.

## 📚 Table of Contents

- [General Questions](#general-questions)
- [Technical Questions](#technical-questions)
- [Installation & Setup](#installation--setup)
- [Development Questions](#development-questions)
- [Deployment Questions](#deployment-questions)
- [Licensing & Usage](#licensing--usage)

---

## General Questions

### What is AgoraUI?

**Simple Answer:** A ready-made website template for building booking/marketplace platforms.

**Technical Answer:** An Angular 20-based SPA with TypeScript, featuring microservices architecture, JWT authentication, real-time messaging, and i18n support.

**Think of it as:** A professional starting point instead of building from scratch.

---

### Who is AgoraUI for?

**Perfect for:**
- Beginners learning web development
- Students building portfolio projects
- Freelancers delivering client projects quickly
- Startups validating marketplace ideas
- Developers learning Angular/microservices

**Not ideal for:**
- People with zero programming knowledge (learn HTML/CSS/JS basics first)
- Projects needing highly specialized features from day one

---

### What can I build with AgoraUI?

**Examples:**
- Coworking space booking (like WeWork)
- Vacation rentals (like Airbnb)
- Meeting room reservations
- Equipment rental marketplace
- Service booking platform (tutors, consultants)
- Event space reservations
- Vehicle rental platform

**Any service that needs:**
- User accounts
- Booking/reservation system
- Real-time messaging
- Multi-language support

---

### Is AgoraUI production-ready?

**Yes**, with proper configuration:

**✅ Production Features:**
- Modern tech stack (Angular 20, TypeScript 5.9)
- Security (JWT, route guards, secure tokens)
- Scalable architecture (microservices)
- Docker deployment
- SSL/HTTPS support
- Performance optimizations

**Before going live:**
- Configure production API endpoints
- Set up production databases
- Enable HTTPS
- Review security settings
- Thorough testing
- Set up monitoring

See the [Deployment Guide](./deployment.md) for details.

---

### Can I customize it?

**Absolutely!** AgoraUI is designed for easy customization:

**Easy (No coding needed):**
- App name, colors, logo
- Text and translations
- Enable/disable features
- API endpoints
- Date/time formats

**Medium (Basic coding):**
- Add new pages
- Modify forms
- Change layouts
- Add UI components

**Advanced (Requires Angular knowledge):**
- Custom features
- New API integrations
- Complex business logic
- Custom authentication flows

See [Configuration Guide](./configuration.md) and [Styling Guide](./styling.md).

---

## Technical Questions

### What's the technology stack?

**Frontend:**
- Angular 20 (framework)
- TypeScript 5.9 (language)
- RxJS (reactive programming)
- ngx-translate (internationalization)
- Modern CSS (styling)

**Backend (separate repos):**
- NestJS (Node.js framework)
- PostgreSQL (database)
- Redis (real-time messaging)
- JWT (authentication)
- Docker (containerization)

---

### Frontend vs Backend - What's the difference?

**Frontend (this repo):**
- What users see and interact with
- Runs in the browser
- HTML, CSS, TypeScript
- UI components, forms, pages

**Backend (separate microservices):**
- Server-side logic and data storage
- Runs on a server
- Processes requests, manages database
- Auth, Booking, Messaging services

**Analogy:** 
- Frontend = Restaurant dining area (what customers see)
- Backend = Kitchen (where the work happens)

---

### Why microservices instead of one backend?

**Benefits:**

**For Beginners:**
- Smaller codebases easier to understand
- Work on features independently
- If one service breaks, others still work

**For Developers:**
- Independent scaling
- Technology flexibility
- Team parallelization
- Fault isolation
- Easier testing and deployment

**AgoraUI's 3 services:**
1. **Auth** (3001) - User accounts and security
2. **Booking** (3002) - Listings and reservations
3. **Tell** (3003) - Real-time messaging

---

### What is TypeScript and do I need to learn it?

**What it is:** JavaScript + type safety

**Example:**
```typescript
// JavaScript - error only at runtime
let age = "25";
age = age + 5; // "255" (bug!)

// TypeScript - error before running
let age: number = "25"; // ERROR caught immediately!
```

**Do you need to learn it?**
- **For basic customization:** No
- **For serious development:** Yes

**Good news:** If you know JavaScript, TypeScript is easy to pick up.

---

### Do I need to know Angular?

**For what you want to do:**

**Just using it as-is:** No  
**Basic customization:** No, but helpful  
**Modifying features:** Some Angular knowledge helpful  
**Building new features:** Yes, definitely

**Learning resources:**
- [Official Angular Tutorial](https://angular.io/tutorial)
- [Angular in 100 Seconds](https://www.youtube.com/watch?v=Ata9cSC2WpM)
- [This project itself](./beginners-guide.md) - learn by exploring

---

### What's Docker and do I really need it?

**What it is:** Software that runs applications in isolated containers

**Why you need it:**
- Backend services run in Docker
- Automatic database setup
- Consistent across all computers
- One command to start everything

**Without Docker:**
- Manually install PostgreSQL, Redis
- Configure databases
- Manage multiple services
- Hours of setup, often breaks

**With Docker:**
- One command: `agora serve`
- Everything just works
- 2 minutes to start

**Verdict:** Technically optional, practically essential.

---

## Installation & Setup

### How long does installation take?

**Time breakdown:**

| Step | Time |
|------|------|
| Installing prerequisites (Node, Git, Docker) | 15-30 minutes (first time) |
| Cloning repository | 30 seconds |
| `npm install` | 2-5 minutes |
| `npm link` | 10 seconds |
| `agora init` (configuration) | 30 seconds - 10 minutes |
| `agora serve` (first run) | 2-5 minutes |
| **Total (first time)** | **20-50 minutes** |
| **Subsequent startups** | **10-20 seconds** |

---

### Which installation method should I use?

**CLI Method** (Recommended):
- ✅ Shorter commands (`agora serve` vs `npm start`)
- ✅ Works from any directory
- ✅ Interactive wizard (`agora init`)
- ✅ More features (`agora backend:logs`)
- ❌ Requires `npm link` step

**NPM Scripts:**
- ✅ Standard npm commands
- ✅ Good for CI/CD
- ✅ No extra setup
- ❌ Longer commands
- ❌ No interactive wizard
- ❌ Fewer features

**Verdict:** Use CLI unless you have a specific reason not to.

---

### What if installation fails?

**Common issues:**

**`npm install` fails:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**`agora` not found after `npm link`:**
```bash
# Option 1: Fix and re-link
sed -i 's/\r$//' bin/agora
chmod +x bin/agora
npm link

# Option 2: Run directly
./bin/agora serve
```

**Docker issues:**
- Ensure Docker Desktop is running
- Check Docker version: `docker --version`
- Restart Docker Desktop

See [Installation Guide](./installation.md#troubleshooting) for more solutions.

---

### Can I install without Docker?

**Yes, but not recommended.**

**What you'd need to do manually:**
- Install PostgreSQL (3 instances)
- Install Redis
- Configure databases
- Set up environment variables
- Manage multiple services

**Time:** Several hours of setup, platform-dependent

**Recommendation:** Just use Docker. It saves massive amounts of time.

---

## Development Questions

### How do I change the app name/colors/text?

**Easy way (Recommended):**
```bash
agora init
# Follow the wizard, customize everything
```

**Manual way:**
1. **App name:** Edit `src/environments/app.config.ts`
2. **Colors:** Edit `src/styles.css` (CSS variables)
3. **Text:** Edit `src/languages/en.json` (and other languages)

See [Configuration Guide](./configuration.md) for details.

---

### How do I add a new language?

**Step by step:**
1. Copy `src/languages/en.json` to `src/languages/YOUR_LANG.json`
2. Translate all values (keep keys the same)
3. Add to `src/app/shared/language.config.ts`:
   ```typescript
   { code: 'es', name: 'Español', flag: '🇪🇸' }
   ```
4. Restart server

See [Internationalization Guide](./internationalization.md) for details.

---

### How do I add a new page?

**Steps:**
1. Generate component: `ng generate component my-page`
2. Add route in `src/app/app.routes.ts`
3. Add navigation link (optional)

**Example:**
```typescript
// app.routes.ts
{
  path: 'my-page',
  component: MyPageComponent
}
```

See [Development Workflow](./development-workflow.md) for more.

---

### Can I disable features I don't need?

**Yes!** Configure in `app.config.ts`:

```typescript
features: {
  authentication: true,    // Set to false to disable
  booking: true,          // Set to false to disable
  messaging: true,        // Set to false to disable
  internationalization: true,
  policies: true
}
```

Or use the wizard:
```bash
agora init
# Answer "No" to features you don't want
```

---

### How do I test my changes?

**Automatic (Hot reload):**
- Save your files
- Browser automatically refreshes
- See changes immediately

**Manual testing:**
1. `agora serve` - Start dev server
2. Open `http://localhost:4200`
3. Test in browser
4. Check console for errors (F12)

**Unit tests:**
```bash
agora test
```

**Linting:**
```bash
agora lint
```

---

### Where do I add my custom code?

**Component-specific logic:**
- `src/app/FEATURE/FEATURE.component.ts`

**Reusable services:**
- `src/app/shared/services/`

**Global styles:**
- `src/styles.css`

**Configuration:**
- `src/environments/app.config.ts`

**Constants:**
- `src/app/shared/constants/`

See [Project Structure](./project-structure.md) for full organization.

---

## Deployment Questions

### How do I deploy to production?

**High-level steps:**
1. Build production version: `agora build`
2. Get a server (AWS, DigitalOcean, Vercel, etc.)
3. Upload `dist/agoraui/browser/` folder
4. Configure domain and HTTPS
5. Deploy backend services

See detailed [Deployment Guide](./deployment.md).

---

### What hosting options are available?

**Frontend hosting:**
- Vercel (recommended for beginners)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Your own server (Nginx)

**Backend hosting:**
- DigitalOcean (Docker droplet)
- AWS ECS
- Google Cloud Run
- Heroku
- Your own VPS

**Full-stack platforms:**
- AWS
- Google Cloud
- Azure
- DigitalOcean

---

### Do I need a domain name?

**For development:** No, use `localhost`

**For production:** Yes, you need:
- Domain name (e.g., `yourbusiness.com`)
- DNS configuration
- SSL certificate (free with Let's Encrypt)

**Typical costs:**
- Domain: $10-15/year
- Hosting: $5-50/month depending on service

---

### How do I set up HTTPS/SSL?

**Development:** Not needed (use HTTP)

**Production:** Required for security

**Options:**
1. **Let's Encrypt** (Free, automatic)
   - AgoraUI includes automated setup
   - See `docker/entrypoint.sh`
   
2. **CloudFlare** (Free CDN + SSL)
   - Easy setup
   - Includes DDoS protection

3. **Manual certificate** (Paid)
   - Buy from certificate authority
   - Install on server

See [SSL/HTTPS Guide](./ssl-https.md) for details.

---

## Licensing & Usage

### Can I use this for commercial projects?

**Current License:** CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial)

**✅ Allowed:**
- Personal projects
- Learning and education
- Non-profit organizations
- Portfolio projects
- Internal business tools

**❌ Not Allowed:**
- Selling this code as-is
- Commercial SaaS without modification
- Reselling as a template

**✅ Allowed (with attribution):**
- Using as a base for client projects
- Heavily modified commercial projects
- Starting point for your business

**For commercial licensing:** Contact the author

**Attribution:** Credit the author and link to the repo

---

### Do I need to credit the author?

**Yes**, under CC BY-NC 4.0:

**How to attribute:**
```
Based on AgoraUI by Loïc Thiercelin
https://github.com/thiercelin-loic/agoraui
```

**Where:**
- Footer of your website (recommended)
- About page
- README if open source

---

### Can I remove the "Powered by AgoraUI" notice?

**No**, attribution is required by the license.

**You can:**
- Style it to match your design
- Place it in the footer
- Make it subtle but visible

**You cannot:**
- Remove it entirely
- Hide it from users
- Omit author credit

---

### Can I modify the code?

**Yes!** That's the point.

**You're encouraged to:**
- Customize everything
- Add new features
- Improve existing code
- Fix bugs
- Optimize performance

**Please consider:**
- Contributing improvements back (see [Contributing Guide](./contributing.md))
- Sharing interesting modifications
- Helping others in issues/discussions

---

### Can I contribute to AgoraUI?

**Absolutely!** Contributions are welcome.

**Ways to contribute:**
- Report bugs
- Suggest features
- Improve documentation
- Add translations
- Submit pull requests
- Help others in discussions

See [Contributing Guide](./contributing.md) for how to get started.

---

## Still Have Questions?

### Search First
- Use Ctrl+F in these docs
- Search [GitHub Issues](https://github.com/thiercelin-loic/agoraui/issues)
- Check [Troubleshooting Guide](./troubleshooting.md)

### Ask for Help
1. **GitHub Discussions** - For general questions
2. **GitHub Issues** - For bugs or feature requests
3. **Stack Overflow** - Tag `agoraui` or `angular`

### When Asking
Include:
- What you're trying to do
- What you expected
- What actually happened
- Error messages (full text)
- Your environment (OS, Node version)
- What you've already tried

---

**Didn't find your question?** Open a [GitHub Discussion](https://github.com/thiercelin-loic/agoraui/discussions) or check the [comprehensive documentation](./README.md).
