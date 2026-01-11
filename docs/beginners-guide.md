# Beginner's Guide to AgoraUI

Welcome! This guide is designed for people who are new to web development or AgoraUI. We'll explain everything step-by-step without assuming prior knowledge.

## 📚 Table of Contents

1. [What is AgoraUI?](#what-is-agoraui)
2. [What You Need to Know](#what-you-need-to-know)
3. [Understanding Web Applications](#understanding-web-applications)
4. [Your First Steps](#your-first-steps)
5. [Understanding the Code](#understanding-the-code)
6. [Making Your First Change](#making-your-first-change)
7. [Common Beginner Questions](#common-beginner-questions)
8. [Next Steps](#next-steps)

---

## What is AgoraUI?

### The Simple Answer

AgoraUI is a **pre-built website template** for booking platforms. Instead of building a booking website from scratch (which takes months), you download AgoraUI and customize it to your needs (which takes days or weeks).

**Real-world examples of what you can build:**
- Coworking space booking platform (like WeWork)
- Vacation rental marketplace (like Airbnb)
- Meeting room reservation system
- Equipment rental service
- Tutoring platform
- Freelance services marketplace

### What Makes It Special?

✅ **Complete Features:** Login, booking, chat, multi-language support  
✅ **Modern Technology:** Built with Angular 20 and TypeScript  
✅ **Easy Customization:** Change colors, text, and features without deep coding knowledge  
✅ **Production Ready:** Can be deployed to the internet for real users  
✅ **Learning Tool:** Excellent for learning modern web development

---

## What You Need to Know

### Absolute Minimum

If you're **completely new to programming**, we recommend learning these basics first (2-4 weeks):
- **HTML** - The structure of web pages
- **CSS** - The styling (colors, fonts, layout)
- **JavaScript basics** - The programming language

**Free Resources:**
- [freeCodeCamp](https://www.freecodecamp.org/) - Comprehensive free courses
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn) - Mozilla's learning platform
- [W3Schools](https://www.w3schools.com/) - Quick tutorials and references

### Helpful But Not Required

These will make your journey easier but you can learn them as you go:
- **TypeScript** - JavaScript with extra features
- **Git** - Version control (saving your code)
- **Command line basics** - Using the terminal
- **Angular concepts** - Components, services, routing

---

## Understanding Web Applications

### Frontend vs Backend

Think of a restaurant:

**Frontend (What You See)**
- The dining area where customers sit
- The menu they read
- The plates they receive
- *In AgoraUI:* The buttons, forms, and pages users interact with

**Backend (Behind the Scenes)**
- The kitchen where food is prepared
- The storage where ingredients are kept
- The chefs who cook
- *In AgoraUI:* The servers that store data and process requests

### How They Talk

```
User clicks "Log In" button
       ↓
Frontend: "Hey backend, check if this username/password is correct"
       ↓
Backend: *checks database*
       ↓
Backend: "Yes, that's correct! Here's a secure token."
       ↓
Frontend: "Great! Show the user their dashboard."
       ↓
User sees: Dashboard page
```

### What is an API?

**API** = Application Programming Interface

**Simple explanation:** A menu of requests the frontend can make to the backend.

**Example API Menu:**
- `/auth/login` - Check username and password
- `/bookings/create` - Make a new booking
- `/messages/send` - Send a chat message

---

## Your First Steps

### Step 1: Set Up Your Computer (30 minutes)

You need to install some tools. Don't worry, we'll guide you through each one:

1. **Node.js** - JavaScript runtime
   - Go to [nodejs.org](https://nodejs.org/)
   - Download the "LTS" version (Long Term Support)
   - Run the installer (click Next, Next, Finish)
   - Test: Open terminal and type `node --version`

2. **Git** - Version control
   - Go to [git-scm.com](https://git-scm.com/)
   - Download for your OS
   - Install with default settings
   - Test: Open terminal and type `git --version`

3. **VS Code** (Recommended code editor)
   - Go to [code.visualstudio.com](https://code.visualstudio.com/)
   - Download and install
   - Open it - this is where you'll view/edit code

4. **Docker Desktop** (Optional but helpful)
   - Go to [docker.com](https://www.docker.com/products/docker-desktop)
   - Download and install
   - You might need to restart your computer

### Step 2: Download AgoraUI (5 minutes)

Open your terminal (or VS Code's integrated terminal) and type:

```bash
git clone https://github.com/thiercelin-loic/agoraui.git
cd agoraui
```

**What this does:**
- Downloads all AgoraUI code to your computer
- Moves you into the project folder

You should see a progress bar and then be inside the `agoraui` folder.

### Step 3: Install Dependencies (5 minutes)

Type:

```bash
npm install
```

**What this does:**
- Downloads ~500 MB of code libraries that AgoraUI needs
- This is like downloading all the ingredients before cooking

Wait for it to finish. You'll see a progress bar and eventually "added XXX packages".

### Step 4: Link the CLI Tool (1 minute)

Type:

```bash
npm link
```

**What this does:**
- Makes the `agora` command available globally
- Now you can type `agora` commands from anywhere

### Step 5: Start the Application (2 minutes)

Type:

```bash
agora serve
```

**What this does:**
- Starts the backend services (in Docker)
- Starts the frontend development server
- Opens your browser to http://localhost:4200

**First time?** This might take 3-5 minutes as it downloads backend services.

### Step 6: Explore! (15 minutes)

You should now see the AgoraUI homepage in your browser. Try these:

- [ ] Click "Sign Up" and create a test account
- [ ] Browse the sample listings
- [ ] Make a test booking
- [ ] Try the chat feature
- [ ] Go to Settings and change the language
- [ ] Try searching for something

**Congratulations! You're running AgoraUI!** 🎉

---

## Understanding the Code

### Project Structure

Open the project in VS Code. You'll see folders like this:

```
agoraui/
├── src/                    ← Most of your work happens here
│   ├── app/               ← The main application code
│   │   ├── auth/         ← Login/signup pages
│   │   ├── landing/      ← Homepage
│   │   ├── profil/       ← Booking interface
│   │   ├── chat/         ← Messaging feature
│   │   └── shared/       ← Code used everywhere
│   ├── languages/        ← Translation files
│   └── styles.css        ← Global styling
├── docs/                  ← Documentation (you're here!)
└── package.json          ← Project configuration
```

### Key Concepts

#### Components

**What:** A reusable piece of the user interface.

**Example:** The navigation bar at the top is a component. You write it once, and it appears on every page.

**In AgoraUI:** Each folder in `src/app/` is a different component or feature.

#### Services

**What:** Reusable code that does something useful.

**Example:** `AuthService` handles all login/logout logic.

**Why useful:** Write the code once, use it anywhere.

#### Routing

**What:** How the app decides which page to show.

**Example:** When you go to `/login`, it shows the login component.

**In AgoraUI:** Check `src/app/app.routes.ts` to see all routes.

#### Configuration

**What:** Settings that control how your app behaves.

**Example:** App name, colors, API endpoints.

**In AgoraUI:** Main config is in `src/environments/app.config.ts`.

---

## Making Your First Change

Let's make simple changes so you understand how it works:

### Change 1: Update the App Name (Easy)

1. Open `src/environments/app.config.ts`
2. Find the line: `name: 'AgoraUI',`
3. Change it to: `name: 'My Awesome App',`
4. Save the file
5. The browser will automatically reload
6. Look at the top navigation bar - it changed!

**What you learned:** Configuration files control many aspects of the app.

### Change 2: Modify a Color (Easy)

1. Open `src/styles.css`
2. Find the line: `--primary: #4a4a4a;`
3. Change it to: `--primary: #FF6B6B;` (a nice red)
4. Save the file
5. Watch the colors change in your browser!

**What you learned:** CSS variables control styling across the entire app.

### Change 3: Edit Text (Easy)

1. Open `src/languages/en.json`
2. Find: `"TITLE": "Welcome to AgoraUI"`
3. Change to: `"TITLE": "Welcome to My Platform"`
4. Save the file
5. Restart the server (Ctrl+C, then `agora serve`)
6. Homepage title changed!

**What you learned:** Translation files contain all user-facing text.

### Change 4: Add a Console Message (Medium)

1. Open `src/app/landing/landing.component.ts`
2. Find the `ngOnInit()` method
3. Add this line inside it:
   ```typescript
   console.log('Welcome! The homepage is loading.');
   ```
4. Save the file
5. Open browser console (F12 → Console tab)
6. Refresh the page - you'll see your message!

**What you learned:** You can run code when components load.

---

## Common Beginner Questions

### "What's TypeScript?"

**Answer:** JavaScript + extra features that catch errors early.

**Example:**
```typescript
// JavaScript - no error until runtime
let age = "25";
age = age + 5; // "255" (oops!)

// TypeScript - error before you even run it
let age: number = "25"; // ERROR: Type 'string' is not assignable to type 'number'
```

### "What's the difference between npm and Node.js?"

**Answer:**
- **Node.js** - Runs JavaScript on your computer
- **npm** - Downloads and manages JavaScript libraries (comes with Node.js)

**Analogy:**
- Node.js = The kitchen
- npm = The grocery store where you get ingredients

### "Why do I need Docker?"

**Answer:** Docker runs the backend services automatically in isolated containers.

**Without Docker:** You'd manually install PostgreSQL, Redis, configure databases, set environment variables, etc. (takes hours, often breaks).

**With Docker:** Run one command, everything works (takes minutes).

### "Can I break something?"

**Answer:** Yes, but it's okay! That's how you learn.

**Safety tips:**
- Git tracks all changes - you can always undo
- Work on a copy if you're nervous: `git checkout -b my-experiment`
- The worst that happens: Delete the folder and re-clone

### "How long until I can build my own features?"

**Answer:** Depends on your background:
- **Some HTML/CSS/JS experience:** 2-4 weeks of exploration
- **Complete beginner:** 2-3 months of learning + practice
- **Experienced with other frameworks:** 1-2 weeks

---

## Next Steps

### Week 1: Exploration

- [ ] Run the app and explore all features
- [ ] Read through this beginner's guide
- [ ] Make the simple changes above
- [ ] Browse the code files (don't worry if you don't understand everything)
- [ ] Check out the [Glossary](./glossary.md) for terms you don't know

### Week 2: Understanding

- [ ] Read [Project Structure](./project-structure.md)
- [ ] Understand [Configuration Guide](./configuration.md)
- [ ] Learn about [Routing](./data-flow.md)
- [ ] Explore one feature in depth (start with authentication)

### Week 3: Customization

- [ ] Use `agora init` to configure your app
- [ ] Change the color scheme
- [ ] Modify some text and translations
- [ ] Add your own logo/branding
- [ ] Read [Styling Guide](./styling.md)

### Week 4: Learning Angular

- [ ] Complete [Angular Tutorial](https://angular.io/tutorial)
- [ ] Understand components, services, and dependency injection
- [ ] Learn about observables and RxJS basics
- [ ] Read [Development Workflow](./development-workflow.md)

### Month 2+: Building

- [ ] Create a new component
- [ ] Add a new route/page
- [ ] Modify a form to include new fields
- [ ] Connect to a new API endpoint
- [ ] Build a simple feature from scratch

---

## Learning Resources

### For Absolute Beginners

**Start with these:**
1. [freeCodeCamp Responsive Web Design](https://www.freecodecamp.org/learn/responsive-web-design/) - HTML & CSS
2. [JavaScript.info](https://javascript.info/) - JavaScript fundamentals
3. [Git Handbook](https://guides.github.com/introduction/git-handbook/) - Version control basics

**Time:** 4-6 weeks of evening study

### For This Project Specifically

**Recommended path:**
1. [Angular Tutorial](https://angular.io/tutorial) - Official Angular guide
2. [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
3. [Docker Getting Started](https://docs.docker.com/get-started/) - Basics
4. This documentation's other guides!

### Video Tutorials

- **Angular:** Search "Angular crash course" on YouTube
- **TypeScript:** "TypeScript in 100 Seconds" by Fireship
- **Git:** "Git and GitHub for Beginners" by freeCodeCamp

---

## Getting Help

### When You're Stuck

1. **Read the error message** - Often tells you exactly what's wrong
2. **Check the [Troubleshooting Guide](./troubleshooting.md)**
3. **Search Google** - Copy/paste the error message
4. **Check [FAQ](./faq.md)** - Common questions answered
5. **Ask for help** - Provide:
   - What you're trying to do
   - What you expected
   - What actually happened
   - Full error message
   - What you've already tried

### Resources

- **This documentation** - Comprehensive guides for everything
- **Angular Discord** - Active community
- **Stack Overflow** - Search or ask questions
- **GitHub Issues** - For AgoraUI-specific problems

---

## You've Got This! 💪

Learning to code takes time, but every expert started as a beginner. The fact that you're reading this guide shows you're on the right track.

**Remember:**
- It's normal to feel overwhelmed at first
- Making mistakes is part of learning
- Google is your friend
- Every developer still looks things up constantly
- The community is here to help

**Start small, celebrate small wins, and keep building!**

---

**Ready to dive deeper?** Check out the [Installation Guide](./installation.md) or [Configuration Guide](./configuration.md) next!
