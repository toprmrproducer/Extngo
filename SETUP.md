# Setup Instructions

## Quick Start

Follow these steps to get the Next.js version running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Assets Already Moved ✅

All required assets have been copied to the `public/` directory:
- ✅ hero-bg.jpg
- ✅ product-reel.png
- ✅ use-car.png
- ✅ use-lan.png
- ✅ conference-room.png
- ✅ specs-lifestyle.png
- ✅ color-variants.png
- ✅ retractable-unit.png

### 3. Run Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## What Changed from Original

### Architecture
- **Before**: Vanilla HTML + React CDN + Babel Standalone
- **After**: Next.js 15 with App Router + TypeScript

### Key Improvements
1. **Performance**: Next.js Image optimization, font optimization
2. **Type Safety**: Full TypeScript support
3. **Build System**: Proper bundling and optimization
4. **SEO**: Better meta tags and server-side rendering support
5. **Developer Experience**: Hot reload, better error messages

### File Structure Comparison

**Original:**
```
Extngo Hero.html
hero-shared.jsx
hero-scene.jsx
hero-safe.jsx
hero-detail.jsx
product-pinned.jsx
product-sections.jsx
assets/
```

**Next.js:**
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ExtngoLogo.tsx
│   ├── NavBar.tsx
│   ├── GiantWordmark.tsx
│   ├── Word.tsx
│   ├── HeroScene.tsx
│   ├── HeroSafe.tsx
│   ├── PinnedProduct.tsx
│   ├── ProductDetail.tsx
│   └── ... (other components)
public/
├── hero-bg.jpg
├── product-reel.png
└── ... (other assets)
```

## Features Preserved

✅ All animations (fade-up, fade-down, Ken Burns, etc.)
✅ Pinned product scroll effect
✅ Giant wordmark parallax
✅ Responsive design
✅ All hover states
✅ Corner brackets animation
✅ Orange sweep text effect
✅ Smooth scrolling

## Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## Troubleshooting

### Images not loading?
Make sure all images are in the `public/` directory.

### Fonts not loading?
The fonts are loaded via Next.js font optimization. They should work automatically.

### Animations not working?
Check that you're using a modern browser with CSS animation support.

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Assets are already in place
3. ✅ Run dev server: `npm run dev`
4. 🎉 Visit http://localhost:3000

Enjoy your Next.js powered Extngo landing page!
