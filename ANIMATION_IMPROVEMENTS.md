# Extngo — Animation Improvement Guide

A full analysis of the current animation system and a concrete roadmap to make every interaction feel ultra-smooth and physically real.

---

## 1. Current Stack Overview

| Layer | What's Used |
|---|---|
| CSS Keyframes | `heroFadeUp`, `heroFadeDown`, `heroKen`, `heroFloat`, `floatSpec`, `slideUpProduct`, `heroWordmark` |
| CSS Transitions | `transition` on inline styles (NavBar, Testimonials, WhoItsFor, VideoCard) |
| React State | `useState` + `useEffect` driving opacity/transform via inline style |
| Scroll Tracking | `window.addEventListener('scroll')` + `requestAnimationFrame` (PinnedProduct, GiantWordmark) |
| Visibility Trigger | `IntersectionObserver` (ProductDifferences, Testimonials) |
| Mouse Tracking | `mousemove` + `requestAnimationFrame` (GiantWordmark parallax) |

No external animation library is used. Everything is hand-rolled CSS + React state.

---

## 2. Component-by-Component Animation Audit

### NavBar.tsx
**Current:**
- Logo + links fade-down on mount via `.anim-fade-down` CSS class (staggered 0.05s–0.57s delays)
- Background, border, text color all transition `0.35s ease` when scrolling past hero
- Mobile menu slides in with `translateY(-110% → 0)` at `0.35s cubic-bezier(0.2,0.7,0.2,1)`
- Hamburger lines rotate/translate `0.25s` on toggle
- Mobile menu items stagger fade-in `0.3s` with per-item delays

**Problems:**
- Color transitions use `ease` (symmetric) — feels mechanical. Should use `ease-out` for scroll-triggered state changes.
- Mobile menu cubic-bezier `(0.2,0.7,0.2,1)` is decent but the close direction uses the same curve — should be asymmetric (faster out, slower in).
- No spring feel on hamburger icon transform.

**Improvements:**
- Use `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) for menu open, `cubic-bezier(0.55, 0, 1, 0.45)` for close.
- Add `will-change: transform` to the mobile menu div.
- Stagger mobile menu items with a slightly longer delay (0.06s per item instead of 0.05s) for a more deliberate cascade.
- Replace `ease` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)` on background/color transitions.

---

### HeroScene.tsx (Background Image)
**Current:**
- Ken Burns zoom: `heroKen 14s ease-out forwards` — scales from 1.12 → 1.0, origin at `60% 55%`

**Problems:**
- `ease-out` starts fast and decelerates — for a slow ambient zoom this is backwards. It should start slow and stay slow.
- 14s is fine but the `forwards` fill means it freezes at 1.0 scale permanently. No loop.
- No parallax on scroll (the image doesn't respond to scrolling at all).

**Improvements:**
- Change to `cubic-bezier(0.0, 0.0, 0.2, 1)` (decelerate) or simply `linear` for a more cinematic drift.
- Add a subtle scroll parallax: translate the image `translateY(scrollY * 0.3)` using a passive scroll listener + RAF. This creates depth as the user scrolls into the content.
- Consider looping the Ken Burns with a very long duration (30s+) and alternating direction for a living background feel.

---

### GiantWordmark.tsx (Parallax Background Text)
**Current:**
- Fade-in via `heroWordmark` keyframe: `1.6s` at `0.2s` delay (opacity 0 → 0.09, scale 1.06 → 1.0, letter-spacing tightens)
- Mouse parallax: `mousemove` → RAF → `setPos` → inline `transform: translate(x, y) scale(scrollScale)`
- Scroll scale: `0.75 → 1.5` as user scrolls through first viewport

**Problems:**
- Mouse parallax uses `setPos` which triggers a React re-render on every RAF frame. This is expensive — causes layout recalculation on the entire component tree.
- The parallax transform is applied via React state, not directly on the DOM element. This adds a full React reconciliation cycle per frame.
- No lerp (linear interpolation) / smoothing on the mouse position — the text snaps directly to cursor position, which feels twitchy.
- Scroll scale also goes through React state (`setScrollScale`) — same re-render problem.

**Improvements:**
- Use a `ref` to directly mutate `element.style.transform` instead of `setState`. Bypasses React entirely for 60fps DOM updates.
- Add lerp smoothing: `currentX += (targetX - currentX) * 0.08` per frame. This gives the text a "floating on water" feel — it lags behind the cursor slightly and eases to rest.
- Separate the scroll scale into its own RAF loop that writes directly to the DOM ref.
- Add `will-change: transform` to the wordmark element.

```js
// Pattern: direct DOM mutation instead of setState
const lerp = (a, b, t) => a + (b - a) * t
let cx = 0, cy = 0, tx = 0, ty = 0

const tick = () => {
  cx = lerp(cx, tx, 0.08)
  cy = lerp(cy, ty, 0.08)
  el.style.transform = `translate(${cx}px, ${cy}px) scale(${scrollScale})`
  raf = requestAnimationFrame(tick)
}
```

---

### HeroSafe.tsx (Hero Content)
**Current:**
- Badge: `.anim-fade-up` at `0.35s` delay
- Headline words: `Word` component with staggered delays (0.45s, 0.6s, 0.95s) — each word slides up from `110%` via `heroFadeUp`
- Subtext: `.anim-fade-up` at `1.25s`
- CTA row: `.anim-fade-up` at `1.5s`
- Social proof row: `.anim-fade-up` at `1.75s`
- Corner brackets: `.bracket` CSS class with scale-in

**Problems:**
- `heroFadeUp` uses `translate3d(0, 22px, 0)` — a 22px shift is subtle. The word reveal uses `110%` which is dramatic. The inconsistency makes the entrance feel uncoordinated.
- The `Word` component wraps text in `<span class="word"><span style="animationDelay">` — the inner span has the animation but the outer `overflow: hidden` clip is on the parent `div` in HeroSafe, not on `.word` itself. This is correct but fragile.
- No exit animation when the hero unmounts (it just disappears when `heroVisible` becomes false in page.tsx).
- The orange sweep underline on "network again" is a CSS background-size animation — good, but the timing (`0.9s–1.5s`) means it fires before the word has fully settled.

**Improvements:**
- Add a hero exit animation: when `heroVisible` goes false, fade + scale down the hero content before unmounting. Use a `leaving` state with a 400ms delay before actually removing from DOM.
- Sync the orange sweep to start exactly when the word animation completes (delay = word delay + word duration).
- Add a subtle `scale(1.02) → scale(1)` on the CTA button entrance for a "pop" feel.
- Consider adding a very subtle `blur(4px) → blur(0)` on the headline words during their entrance for a cinematic focus-pull effect.

---

### Word.tsx (Text Reveal)
**Current:**
- Inner `<span>` has `animationDelay` set via inline style
- The animation itself (`heroFadeUp`) is defined in globals.css as a class applied to `.word span`

**Problems:**
- The component is purely presentational — no way to know when the animation completes (no `onAnimationEnd` callback).
- No support for character-level stagger (only word-level).

**Improvements:**
- Add an optional `onComplete` prop that fires `onAnimationEnd`.
- For the hero headline specifically, consider splitting into character spans with micro-stagger (0.02s per char) for a more premium text reveal. This is a significant visual upgrade.

---

### PinnedProduct.tsx (Floating Product Image)
**Current:**
- Tracks 3 anchor points (`hero`, `detail`, `orange`) via `getBoundingClientRect()` on every scroll frame
- Interpolates `x, y, width, height` between anchor positions using cubic easing
- Applies result as `position: fixed` with `left/top/width/height` inline styles
- Float animation: `heroFloat 8s ease-in-out infinite` (±10px vertical, 0.6deg rotation)
- Drop shadow transitions `0.4s ease`
- Fade-in on mount: `pinnedProductIn`

**Problems:**
- `getBoundingClientRect()` is called 3 times per scroll frame — this forces layout (reflow). It's the most expensive DOM operation.
- `left/top/width/height` are layout properties — animating them triggers layout + paint on every frame. Should use `transform: translate() scale()` instead.
- The cubic easing is recalculated from scratch every frame (no caching).
- The `rafRef` loop runs continuously even when the element is off-screen.
- `filter: drop-shadow()` is GPU-composited but still expensive when changing every frame.

**Improvements:**
- Cache anchor positions on scroll start, only recalculate on resize (use `ResizeObserver`).
- Switch from `left/top/width/height` to a single `transform: translate(x, y) scale(s)` on a fixed-size element. This moves animation entirely to the compositor thread — zero layout cost.
- Use `contain: strict` on the pinned product wrapper.
- Pause the RAF loop when `scrollY` hasn't changed (compare previous scroll position).
- Pre-compute the easing lookup table on mount instead of recalculating per frame.

```js
// Pattern: transform-only animation (compositor thread)
// Instead of: el.style.left = x + 'px'; el.style.width = w + 'px'
// Do:
const scaleX = w / baseWidth
const scaleY = h / baseHeight
el.style.transform = `translate(${x - baseX}px, ${y - baseY}px) scale(${scaleX}, ${scaleY})`
```

---

### ProductDetail.tsx (Specs Section)
**Current:**
- No scroll-triggered animations — section is fully static
- Micro-spec badges are positioned absolutely with no entrance animation
- The circular arc text SVG has no animation

**Problems:**
- This is the first section the user sees after scrolling past the hero. It appears instantly with no entrance — feels abrupt after the animated hero.
- The spec badges (`50 FT`, `1 GBPS`, etc.) could float subtly to match the ProductDifferences section's floating specs.

**Improvements:**
- Add `IntersectionObserver` to trigger staggered fade-up on the right-side text content (heading, body, price, spec pills).
- Add a slow rotation animation to the circular arc SVG text (`rotate 30s linear infinite`) — very subtle, adds life.
- Add the same `floatSpec` animation to the micro-spec badges (staggered, different phases so they don't all move together).
- Add a gentle scale-in on the radial gradient background circle.

---

### ProductDifferences.tsx (Green vs Orange Comparison)
**Current:**
- `IntersectionObserver` at `threshold: 0.2` triggers `isVisible` state
- Both product containers: `slideUpProduct 1.2s cubic-bezier(0.16, 0.84, 0.44, 1) forwards` — slides up 220px + scales from 0.92
- Floating specs: `fadeInSpec 0.7s ease-out` then `floatSpec 5s ease-in-out infinite`
- Green product image: `heroFloat 8s 1.4s ease-in-out infinite`

**Problems:**
- Both product containers use the same `animationDelay: '0s'` and `'0.2s'` — but these are set as inline styles on the container div, while the actual animation is on `.product-container` class. The delay on the class and the delay on the div may conflict.
- `slideUpProduct` moves 220px — very dramatic. Combined with scale, it can feel heavy/slow on mobile.
- The `isVisible` state change re-renders the entire component, which re-evaluates all the `jsx` styled-components string (the `<style jsx>` block).
- Floating specs use `position: absolute` with `left: 50%; top: 50%` + `translate(calc(-50% + Xpx), calc(-50% + Ypx))` — this is correct but the `calc()` is recalculated on every paint.

**Improvements:**
- Reduce `slideUpProduct` Y from 220px to 60px and increase scale from 0.92 to 0.96 for a more refined entrance.
- Stagger the two product containers more deliberately: left at 0s, right at 0.15s.
- Move the `@keyframes` out of the `<style jsx>` block and into `globals.css` to avoid re-injection on re-render.
- Add `will-change: transform, opacity` to `.product-container` and `.floating-spec`.

---

### WhoItsFor.tsx (Use Case Carousel)
**Current:**
- Active card expands via `flex`, `height`, `opacity` transitions at `0.55s cubic-bezier(0.2,0.8,0.2,1)`
- Card hover: `translateY(-4px)` + shadow increase
- Active card icon: scales from 1 → 1.8
- Background image: scales from 1 → 1.04 on active
- Stat numbers: staggered fade-up (0.2s–0.5s delays)
- Auto-rotate every 3 seconds

**Problems:**
- Animating `height` triggers layout on every frame — one of the most expensive CSS properties to animate. Should use `max-height` with a known max, or better, `grid-template-rows: 0fr → 1fr` (the modern CSS accordion trick).
- The `flex` property change also triggers layout.
- Auto-rotate uses `setInterval` — if the tab is backgrounded and comes back, the interval may fire multiple times rapidly.
- No pause on hover (user can't read the content before it auto-advances).
- The `0.55s` transition on height feels slow on mobile.

**Improvements:**
- Replace `height` animation with `grid-template-rows` transition:
  ```css
  .card-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s cubic-bezier(0.22,1,0.36,1); }
  .card-body.open { grid-template-rows: 1fr; }
  .card-body > div { overflow: hidden; }
  ```
- Pause auto-rotate on `mouseenter`, resume on `mouseleave`.
- Use `document.visibilityState` to pause/resume the interval when tab is hidden.
- Add a progress indicator (thin line that fills over 3s) so users know when the next card will advance.

---

### Testimonials.tsx (Review Cards)
**Current:**
- Cards fade-up on `IntersectionObserver` trigger: `opacity 0.65s ease`, `transform 0.65s cubic-bezier(0.2,0.8,0.2,1)` with per-card delays
- Video card: play/pause button fades `0.3s`, overlay gradient transitions `0.4s`
- Featured card has dark background with larger text

**Problems:**
- `ease` on opacity is symmetric — the fade-in decelerates but the initial acceleration is also slow, making it feel sluggish.
- All cards share the same `visible` boolean — they all animate simultaneously when the section enters the viewport. The stagger delays help but they're all triggered at the same moment.
- No `will-change` on the cards.
- The video card's play button disappears on play but there's no way to show it again on hover (it only reappears when paused).

**Improvements:**
- Use `cubic-bezier(0.0, 0.0, 0.2, 1)` (Material Design decelerate) for fade-in — starts fast, eases to rest. Much more snappy.
- Add `will-change: transform, opacity` to each card before animation triggers, remove after.
- Show the play button on hover even when playing (at reduced opacity, e.g. 0.4).
- Consider using individual `IntersectionObserver` per card for true per-element stagger rather than a single section observer.

---

## 3. Global CSS Animation Issues

### globals.css
**Current keyframes:**
- `heroFadeUp`: `translate3d(0, 22px, 0)` — 22px shift
- `heroFadeDown`: `translate3d(0, -12px, 0)` — 12px shift
- `heroFadeIn`: opacity only
- `heroWordmark`: opacity + scale + letter-spacing

**Problems:**
- `heroFadeUp` and `heroFadeDown` use different Y values (22px vs 12px) — inconsistent feel across the page.
- `letter-spacing` animation in `heroWordmark` is not GPU-accelerated (triggers layout). Should be avoided or replaced with `transform: scaleX()`.
- `scroll-behavior: smooth` on `html` can interfere with programmatic scroll and JS-driven scroll animations. Consider removing it and handling smooth scroll in JS where needed.
- No `@media (prefers-reduced-motion: reduce)` block — all animations play regardless of user accessibility settings.

**Improvements:**
- Standardize Y offset: use 24px for all fade-up, 12px for all fade-down.
- Remove `letter-spacing` from `heroWordmark` animation — replace with `transform: scaleX(0.98) → scaleX(1)`.
- Add reduced motion support:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- Add `will-change: transform, opacity` to `.anim-fade-up` and `.anim-fade-down` before animation, then `will-change: auto` after.

---

## 4. Missing Animations (High Impact)

### Page Transitions
There are no page-level transitions. When the hero unmounts (scrolled past), it just disappears. Adding a fade-out + slight scale-down before unmount would make the scroll feel like a real scene transition.

### Scroll Progress Indicator
No visual feedback for scroll position. A thin accent-colored line at the top of the viewport (like a reading progress bar) would add polish.

### Button Micro-interactions
CTA buttons have `boxShadow` but no hover/active state animations. Adding:
- `transform: translateY(-2px)` on hover
- `transform: translateY(0) scale(0.98)` on active (press)
- Shadow increase on hover
...would make buttons feel physically pressable.

### Spec Pill Hover (ProductDetail)
The spec pills (`Speed`, `Length`, etc.) have no hover state. A subtle `background` + `border-color` transition on hover would add interactivity.

### Image Load Blur-up
Product images (`/product-green.png`, `/product-reel.png`) have no loading state. Adding a blur-up effect (start blurred, transition to sharp on load) prevents layout shift and feels premium.

---

## 5. Recommended Library: GSAP or Framer Motion

The current hand-rolled approach works but has real limits:

| Need | Current Approach | Problem |
|---|---|---|
| Smooth lerp | Manual RAF + setState | Re-renders React tree |
| Scroll-driven | scroll listener + RAF | Runs on main thread |
| Spring physics | CSS cubic-bezier | No real spring, no overshoot |
| Sequence/timeline | Nested setTimeout/delay | Hard to maintain |
| Exit animations | Not implemented | Elements just disappear |

### Option A: GSAP (recommended for this project)
- `gsap.to()` writes directly to DOM — zero React re-renders
- `ScrollTrigger` plugin replaces all manual scroll listeners
- `gsap.ticker` replaces all manual RAF loops
- Spring-like easing via `elastic` or `back` ease types
- Timeline API for sequenced animations

```bash
npm install gsap
```

Key migrations:
- `PinnedProduct` scroll morphing → `ScrollTrigger` with `scrub: true`
- `GiantWordmark` parallax → `gsap.quickTo()` with lerp
- `WhoItsFor` height animation → `gsap.to(el, { height: 'auto' })`
- Hero entrance sequence → `gsap.timeline()`

### Option B: Framer Motion
- Better React integration (declarative `motion.div`)
- `AnimatePresence` solves the hero exit animation problem
- `useScroll` + `useTransform` for scroll-driven values
- Spring physics built-in (`type: "spring"`)
- Larger bundle size than GSAP

```bash
npm install framer-motion
```

Key migrations:
- All `anim-fade-up` → `<motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>`
- Hero unmount → `<AnimatePresence>` wrapper in page.tsx
- `PinnedProduct` → `useScroll` + `useTransform` + `useSpring`
- `GiantWordmark` parallax → `useMotionValue` + `useSpring`

---

## 6. Priority Improvement List

Ordered by visual impact vs implementation effort:

| Priority | Change | Impact | Effort |
|---|---|---|---|
| 1 | Add `prefers-reduced-motion` support | Accessibility + legal | Low |
| 2 | Fix GiantWordmark to use direct DOM mutation + lerp | Smoothness | Low |
| 3 | Fix PinnedProduct to use `transform` instead of `left/top/width/height` | Performance | Medium |
| 4 | Add hero exit animation (fade + scale before unmount) | Polish | Medium |
| 5 | Fix WhoItsFor height animation → `grid-template-rows` | Performance | Low |
| 6 | Add button micro-interactions (hover/active transforms) | Feel | Low |
| 7 | Add `IntersectionObserver` to ProductDetail | Completeness | Low |
| 8 | Add scroll parallax to HeroScene image | Depth | Low |
| 9 | Pause WhoItsFor auto-rotate on hover | UX | Low |
| 10 | Install GSAP + migrate PinnedProduct + GiantWordmark | Ultra-smooth | High |
| 11 | Install Framer Motion + add AnimatePresence to page.tsx | Exit animations | Medium |
| 12 | Character-level text stagger on hero headline | Premium feel | Medium |

---

## 7. Easing Reference

Replace generic `ease` with these physics-based curves throughout:

| Use Case | Curve | CSS |
|---|---|---|
| Elements entering viewport | Decelerate | `cubic-bezier(0.0, 0.0, 0.2, 1)` |
| Elements leaving viewport | Accelerate | `cubic-bezier(0.4, 0.0, 1, 1)` |
| Interactive elements (hover, click) | Standard | `cubic-bezier(0.4, 0.0, 0.2, 1)` |
| Menus / overlays opening | Expo out | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Menus / overlays closing | Expo in | `cubic-bezier(0.55, 0, 1, 0.45)` |
| Spring-like (buttons, cards) | Back out | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Ambient / floating | Sine in-out | `cubic-bezier(0.37, 0, 0.63, 1)` |

---

## 8. Performance Checklist

Before shipping any animation improvement, verify:

- [ ] All animated properties are `transform` or `opacity` only (no `width`, `height`, `top`, `left`, `margin`)
- [ ] `will-change: transform` added to elements that animate on scroll
- [ ] `will-change` removed after animation completes (use `animationend` event)
- [ ] No `getBoundingClientRect()` inside RAF loops (cache on scroll start)
- [ ] No `setState` inside RAF loops (use direct DOM mutation)
- [ ] All scroll listeners use `{ passive: true }`
- [ ] `IntersectionObserver` used instead of scroll position checks for visibility
- [ ] `@media (prefers-reduced-motion: reduce)` disables all animations
- [ ] Animations tested at 60fps on a mid-range mobile device (throttle CPU in DevTools)
