# Dragonrealms

Scaffolded TypeScript project for building the Dragonrealms web application.

## 🚀 How to Run/Preview the Project

### Option 1: Quick Preview (Recommended)
```bash
npm run preview
```
This builds the TypeScript and opens the app directly in your browser.

### Option 2: Development Server
```bash
npm start
```
This starts a local development server at `http://localhost:8080` (or another port if 8080 is in use).

### Option 3: Manual Build and Open
```bash
npm run build
# Then open index.html in your browser
```

### Prerequisites
- Node.js installed on your system
- Run `npm install` first to install dependencies

## 🌐 Live Demo

Visit the live version at: [https://louverture-t.github.io/week7-dragonRealms/](https://louverture-t.github.io/week7-dragonRealms/)

## Tech Stack & User Journey

Dragonrealms is built with **TypeScript** and **ES2020 modules** for type-safe, object-oriented development, featuring an abstract Dragon base class with six specialized subclasses (Fire, Ice, Earth, Wind, Lightning, Shadow). The frontend uses vanilla **HTML5**, **CSS3**, and **DOM manipulation** without frameworks, ensuring lightweight performance and direct browser compatibility. Dragons are persisted using the **localStorage API** for client-side data management, allowing collections to survive browser sessions. The development workflow includes **TypeScript compilation**, **Vitest testing** with jsdom environment, and **live-server** for hot-reload development. Users create custom dragons through a validated form interface, view their collection in an interactive card-based layout, and manage dragons with full CRUD operations (create, read, update, delete). Each dragon exhibits polymorphic behavior through type-specific methods like unique attack patterns and roar sounds, demonstrating core OOP principles in a practical web application. The build process compiles TypeScript to ES2020 JavaScript modules that run natively in modern browsers without bundling. Testing coverage includes unit tests for dragon classes, factory patterns, and storage service functionality. The responsive design adapts to desktop and mobile viewports with CSS Grid and Flexbox layouts. This architecture provides a solid foundation for learning TypeScript, OOP concepts, and web development best practices in a fun, interactive dragon management system.

## Scripts

- `npm install` – install dev dependencies
- `npm run build` – compile TypeScript to `dist/`
- `npm run watch` – compile on file changes
- `npm run preview` – build and open in browser
- `npm start` – build and serve on localhost:8080
- `npm run test` – execute Vitest test suite
- `npm run test:watch` – run tests in watch mode

## Project Layout

```
Capstone/Src/
├── dist/              # Compiled JavaScript output directory (empty initially)
├── src/               # TypeScript source code
│   ├── models/        # Dragon class hierarchy
│   ├── __tests__/     # Vitest unit tests
│   ├── app.ts         # Application entry point
│   └── storage.ts     # localStorage service
├── index.html         # Application shell
├── styles.css         # Global styling
├── package.json       # npm metadata and scripts
├── tsconfig.json      # TypeScript configuration
├── vitest.config.ts   # Test runner configuration
└── README.md          # Project documentation
```




