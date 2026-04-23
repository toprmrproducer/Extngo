# Project Structure

## Complete File Tree

```
extngo-nextjs/
├── 📁 public/                      # Static assets (served at /)
│   ├── hero-bg.jpg                 # Hero background image
│   ├── product-reel.png            # Main product image
│   ├── use-car.png                 # Use case: automotive
│   ├── use-lan.png                 # Use case: networking
│   ├── conference-room.png         # Conference banner
│   ├── specs-lifestyle.png         # Specs section image
│   ├── color-variants.png          # Color variants showcase
│   └── retractable-unit.png        # Bonus unit image
│
├── 📁 src/
│   ├── 📁 app/                     # Next.js App Router
│   │   ├── layout.tsx              # Root layout (fonts, metadata)
│   │   ├── page.tsx                # Home page (main entry)
│   │   └── globals.css             # Global styles & animations
│   │
│   └── 📁 components/              # React components
│       ├── ExtngoLogo.tsx          # Logo component
│       ├── NavBar.tsx              # Navigation bar
│       ├── GiantWordmark.tsx       # Animated background wordmark
│       ├── Word.tsx                # Staggered word animation
│       ├── HeroScene.tsx           # Hero background scene
│       ├── HeroSafe.tsx            # Main hero section
│       ├── PinnedProduct.tsx       # Scroll-pinned product
│       ├── ProductDetail.tsx       # Product detail section
│       ├── ProductSections.tsx     # Split sections
│       ├── UseCases.tsx            # Use cases grid
│       ├── SpecsOnTheFly.tsx       # Specifications
│       ├── ColorVariants.tsx       # Color variants
│       ├── BonusUnit.tsx           # Bonus unit section
│       └── FooterCTA.tsx           # Footer CTA
│
├── 📄 package.json                 # Dependencies & scripts
├── 📄 next.config.js               # Next.js configuration
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 .eslintrc.json               # ESLint configuration
├── 📄 .gitignore                   # Git ignore rules
│
└── 📁 Documentation/
    ├── README.md                   # Main documentation
    ├── QUICKSTART.md               # Quick start guide
    ├── SETUP.md                    # Detailed setup
    ├── DEPENDENCIES.md             # Dependencies guide
    ├── CONVERSION_SUMMARY.md       # Conversion details
    └── PROJECT_STRUCTURE.md        # This file
```

---

## Directory Purposes

### `/public`
- **Purpose**: Static files served directly
- **Access**: Available at root URL (e.g., `/hero-bg.jpg`)
- **Contents**: Images, fonts, icons, robots.txt, etc.
- **Note**: Files here are NOT processed by webpack

### `/src/app`
- **Purpose**: Next.js App Router pages and layouts
- **Key Files**:
  - `layout.tsx`: Wraps all pages (fonts, metadata)
  - `page.tsx`: Home page component
  - `globals.css`: Global styles

### `/src/components`
- **Purpose**: Reusable React components
- **Organization**: One component per file
- **Naming**: PascalCase (e.g., `HeroSafe.tsx`)

---

## Component Hierarchy

```
page.tsx (Main Page)
├── HeroSafe
│   ├── HeroScene
│   ├── GiantWordmark
│   ├── NavBar
│   │   └── ExtngoLogo
│   └── Word (multiple instances)
│
├── PinnedProduct (fixed position)
│
├── ProductDetail
│
├── UseCases
│
├── ProductSections
│   ├── SafeSecure
│   ├── StreamingGaming
│   └── ConferenceBanner
│
├── SpecsOnTheFly
│
├── ColorVariants
│
├── BonusUnit
│
└── FooterCTA
```

---

## File Naming Conventions

### Components
- **Format**: `PascalCase.tsx`
- **Examples**: `HeroSafe.tsx`, `NavBar.tsx`
- **Why**: Standard React convention

### Pages
- **Format**: `lowercase.tsx`
- **Examples**: `page.tsx`, `layout.tsx`
- **Why**: Next.js convention

### Styles
- **Format**: `lowercase.css`
- **Examples**: `globals.css`
- **Why**: Standard CSS convention

### Assets
- **Format**: `kebab-case.ext`
- **Examples**: `hero-bg.jpg`, `product-reel.png`
- **Why**: URL-friendly, no spaces

---

## Import Paths

### Absolute Imports (Recommended)
```typescript
import HeroSafe from '@/components/HeroSafe'
import { SafeSecure } from '@/components/ProductSections'
```

### Relative Imports
```typescript
import HeroSafe from '../components/HeroSafe'
import { SafeSecure } from '../components/ProductSections'
```

**Note**: `@/` is configured in `tsconfig.json` to point to `src/`

---

## Build Output

After running `npm run build`:

```
.next/                              # Build output (gitignored)
├── cache/                          # Build cache
├── server/                         # Server-side code
├── static/                         # Static assets
└── ...
```

---

## Key Configuration Files

### `package.json`
- Dependencies
- Scripts (dev, build, start, lint)
- Project metadata

### `next.config.js`
- Next.js settings
- Image optimization
- Build configuration

### `tsconfig.json`
- TypeScript compiler options
- Path aliases (`@/`)
- Include/exclude patterns

### `.eslintrc.json`
- Code quality rules
- Next.js specific rules

---

## File Sizes (Approximate)

### Source Files
- Components: ~2-5 KB each
- Pages: ~5-10 KB
- Styles: ~10-15 KB
- Total source: ~100 KB

### Assets
- Images: ~1.5 MB total
- Fonts: Auto-optimized by Next.js

### Build Output
- Production build: ~2-5 MB
- Includes optimized code, images, fonts

---

## Adding New Files

### New Component
1. Create `src/components/MyComponent.tsx`
2. Export component
3. Import in `page.tsx` or other components

### New Page
1. Create `src/app/about/page.tsx`
2. Accessible at `/about`

### New Asset
1. Add to `public/` folder
2. Reference as `/filename.ext`

---

## Best Practices

### Components
- ✅ One component per file
- ✅ Use TypeScript interfaces for props
- ✅ Use 'use client' for client components
- ✅ Keep components small and focused

### Styling
- ✅ Use CSS variables for theming
- ✅ Keep animations in globals.css
- ✅ Use inline styles for component-specific styles

### Assets
- ✅ Use Next.js Image component
- ✅ Optimize images before adding
- ✅ Use descriptive filenames

### Code Organization
- ✅ Group related components
- ✅ Use barrel exports if needed
- ✅ Keep business logic separate

---

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Edit files**: Changes auto-reload
3. **Check types**: TypeScript checks automatically
4. **Lint code**: `npm run lint`
5. **Build**: `npm run build`
6. **Test build**: `npm start`

---

## Production Deployment

### Build Process
```bash
npm run build
```

Creates optimized production build in `.next/`

### What Gets Deployed
- ✅ Optimized JavaScript bundles
- ✅ Optimized CSS
- ✅ Optimized images
- ✅ Server-side code
- ✅ Static assets

### What Doesn't Get Deployed
- ❌ Source TypeScript files
- ❌ node_modules (installed on server)
- ❌ Development dependencies
- ❌ .next/cache

---

## Summary

**Total Files**: ~30
- **Components**: 14
- **Pages**: 2 (layout + page)
- **Styles**: 1
- **Config**: 5
- **Assets**: 8
- **Documentation**: 6

**Total Size**: ~2 MB (source + assets)
**Build Size**: ~2-5 MB (optimized)

Clean, organized, and ready for production! 🚀
