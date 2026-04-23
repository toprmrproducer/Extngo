# Dependencies Guide

## Production Dependencies

These are required to run the application:

### Core Framework
```json
"next": "^15.1.0"
```
- **Purpose**: React framework with server-side rendering, routing, and optimization
- **Why**: Provides the foundation for the entire application
- **Features**: App Router, Image optimization, Font optimization, API routes

### React Libraries
```json
"react": "^18.3.1",
"react-dom": "^18.3.1"
```
- **Purpose**: UI library for building components
- **Why**: Required by Next.js and for all component logic
- **Features**: Hooks, Context, JSX, Virtual DOM

---

## Development Dependencies

These are only needed during development:

### TypeScript
```json
"typescript": "^5.6.0"
```
- **Purpose**: Type checking and better developer experience
- **Why**: Catches errors before runtime, better IDE support
- **Features**: Type safety, IntelliSense, Refactoring tools

### Type Definitions
```json
"@types/node": "^22.0.0",
"@types/react": "^18.3.0",
"@types/react-dom": "^18.3.0"
```
- **Purpose**: TypeScript type definitions for Node.js and React
- **Why**: Enables TypeScript to understand Node and React APIs
- **Features**: Autocomplete, Type checking for external libraries

### Code Quality
```json
"eslint": "^8.57.0",
"eslint-config-next": "^15.1.0"
```
- **Purpose**: Code linting and style enforcement
- **Why**: Maintains code quality and catches common mistakes
- **Features**: Automatic error detection, Code style enforcement

---

## Why These Specific Versions?

### Next.js 15.1.0
- Latest stable version
- App Router (stable)
- Turbopack support
- React Server Components
- Improved performance

### React 18.3.1
- Latest stable React
- Concurrent features
- Automatic batching
- Suspense improvements

### TypeScript 5.6.0
- Latest stable TypeScript
- Better type inference
- Improved performance
- New language features

---

## Optional Dependencies (Not Included)

You might want to add these later:

### Styling
```bash
npm install tailwindcss postcss autoprefixer
# or
npm install styled-components
# or
npm install @emotion/react @emotion/styled
```

### State Management
```bash
npm install zustand
# or
npm install @reduxjs/toolkit react-redux
```

### Forms
```bash
npm install react-hook-form
npm install zod  # for validation
```

### Analytics
```bash
npm install @vercel/analytics
npm install @vercel/speed-insights
```

### Animation Libraries
```bash
npm install framer-motion
# or
npm install gsap
```

### API/Data Fetching
```bash
npm install @tanstack/react-query
npm install axios
```

### Testing
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev cypress  # for E2E testing
```

---

## Installation Commands

### Fresh Install
```bash
npm install
```

### Clean Install (if having issues)
```bash
rm -rf node_modules package-lock.json
npm install
```

### Update Dependencies
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

---

## Package Sizes

Approximate sizes after installation:

- **node_modules**: ~400-500 MB
- **Production build**: ~2-5 MB (optimized)
- **Development build**: Larger (includes source maps)

---

## Compatibility

### Node.js Version Required
- **Minimum**: Node.js 18.17 or later
- **Recommended**: Node.js 20.x or later

Check your version:
```bash
node --version
```

### Package Manager
Works with:
- ✅ npm (included with Node.js)
- ✅ yarn
- ✅ pnpm
- ✅ bun

---

## Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Version conflicts
```bash
npm install --legacy-peer-deps
```

### Slow installation
```bash
npm install --prefer-offline
```

### Clear npm cache
```bash
npm cache clean --force
```

---

## Security

### Check for vulnerabilities
```bash
npm audit
```

### Fix vulnerabilities
```bash
npm audit fix
```

### Update to latest secure versions
```bash
npm update
```

---

## Production Deployment

For production, only production dependencies are installed:

```bash
npm install --production
# or
npm ci --production
```

This reduces the deployment size significantly.

---

## Summary

**Total Dependencies**: 6
- **Production**: 3 (Next.js, React, React-DOM)
- **Development**: 6 (TypeScript, Type definitions, ESLint)

**Why so few?**
- Next.js includes many features built-in
- No need for separate routing library
- No need for separate build tools
- No need for separate image optimization
- No need for separate font optimization

This keeps the project lean and maintainable! 🎉
