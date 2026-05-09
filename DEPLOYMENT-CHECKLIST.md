# 🚀 Deployment Checklist - Lighthouse Optimization

## Pre-Deployment

### ☐ 1. Compress Images (CRITICAL)
```bash
./optimize-images.sh
```

**Or manually compress using:**
- https://squoosh.app/
- ImageMagick: `convert image.webp -quality 85 image.webp`

**Verify sizes:**
```bash
ls -lh public/*.webp
# All should be < 1MB
```

### ☐ 2. Test Build Locally
```bash
npm run build
```

**Check for:**
- ✅ No build errors
- ✅ No warnings about large chunks
- ✅ Bundle size is reasonable

### ☐ 3. Test Locally
```bash
npm run start
```

**Open http://localhost:3000 and verify:**
- ✅ Page loads correctly
- ✅ Images display properly
- ✅ No console errors
- ✅ Animations work smoothly

### ☐ 4. Check Network Tab
**In Chrome DevTools:**
- ✅ Images are WebP/AVIF format
- ✅ Total payload < 3MB
- ✅ No 404 errors for videos
- ✅ Fonts load with display: swap

---

## Deployment

### ☐ 5. Commit Changes
```bash
git add .
git commit -m "perf: optimize images and improve Lighthouse score to 90+"
git status  # Verify all files staged
```

### ☐ 6. Push to Repository
```bash
git push origin main
# Or: git push
```

### ☐ 7. Verify Deployment
- ✅ Check Vercel dashboard
- ✅ Wait for build to complete (2-3 minutes)
- ✅ Check deployment logs for errors

---

## Post-Deployment

### ☐ 8. Wait 5 Minutes
Allow CDN cache to populate and deployment to stabilize.

### ☐ 9. Test Production Site
**Visit:** https://extngo-eight.vercel.app

**Verify:**
- ✅ Page loads correctly
- ✅ Images display properly
- ✅ No console errors
- ✅ Smooth scrolling and animations

### ☐ 10. Run Lighthouse Test
**PageSpeed Insights:**
1. Go to: https://pagespeed.web.dev/
2. Enter: https://extngo-eight.vercel.app
3. Click "Analyze"
4. Wait for results (30-60 seconds)

**Expected Scores:**
- Performance: 90-95 ✅
- Accessibility: 98-100 ✅
- Best Practices: 100 ✅
- SEO: 100 ✅

### ☐ 11. Test Mobile
**Run Lighthouse on Mobile:**
- Switch to "Mobile" tab
- Re-run analysis
- Verify scores are similar

### ☐ 12. Check Core Web Vitals
**In PageSpeed Insights, verify:**
- ✅ LCP < 2.5s (green)
- ✅ FID/INP < 200ms (green)
- ✅ CLS < 0.1 (green)

---

## Verification

### ☐ 13. Network Analysis
**Chrome DevTools → Network tab:**
- ✅ Total size < 3MB
- ✅ Images compressed
- ✅ No missing resources
- ✅ Cache headers present

### ☐ 14. Performance Tab
**Chrome DevTools → Performance:**
1. Click record
2. Reload page
3. Stop recording
4. Check for:
   - ✅ No long tasks > 50ms
   - ✅ Smooth frame rate
   - ✅ No layout shifts

### ☐ 15. Console Check
**Chrome DevTools → Console:**
- ✅ No errors
- ✅ No warnings
- ✅ Clean output

---

## If Score < 90

### Troubleshooting Steps:

#### ☐ 1. Verify Image Compression
```bash
ls -lh public/*.webp
```
All files should be < 1MB

#### ☐ 2. Clear Cache
```bash
# Hard refresh in browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# Or use Incognito mode
```

#### ☐ 3. Force Vercel Rebuild
```bash
vercel --prod --force
```

#### ☐ 4. Check Image Delivery
- Open Network tab
- Filter by "Img"
- Verify WebP/AVIF format
- Check actual file sizes

#### ☐ 5. Re-run Lighthouse 3 Times
- Scores vary ±5 points
- Take average of 3 runs
- Use consistent network conditions

#### ☐ 6. Test Different Times
- CDN performance varies
- Test during off-peak hours
- Compare multiple runs

---

## Success Criteria

### ✅ Performance Score: 90+
- FCP < 1.8s
- LCP < 2.5s
- TBT < 200ms
- CLS < 0.1
- SI < 3.4s

### ✅ No Console Errors
- Clean console output
- No 404s
- No JavaScript errors

### ✅ Images Optimized
- All < 1MB
- WebP/AVIF format
- Proper dimensions

### ✅ Total Payload < 3MB
- Down from 12.9MB
- 75% reduction

---

## Documentation

### Files Created:
- ✅ `LIGHTHOUSE-SUMMARY.md` - Complete overview
- ✅ `PERFORMANCE-FIXES.md` - Detailed explanations
- ✅ `QUICK-FIX-GUIDE.md` - Quick reference
- ✅ `optimize-images.sh` - Compression script
- ✅ `DEPLOYMENT-CHECKLIST.md` - This file

### Files Modified:
- ✅ `next.config.js` - Performance config
- ✅ `src/app/layout.tsx` - Preload hints
- ✅ `src/app/page.tsx` - Lazy loading
- ✅ `src/app/globals.css` - Performance CSS
- ✅ `src/components/Testimonials.tsx` - Error handling
- ✅ `src/components/PinnedProduct.tsx` - Image priority
- ✅ `src/components/ProductDetail.tsx` - Image dimensions
- ✅ `src/components/WhoItsFor.tsx` - Performance hints

---

## Final Notes

### Before Deployment:
1. **MUST compress images** - This is critical
2. Test locally first
3. Verify no console errors

### After Deployment:
1. Wait 5 minutes for CDN
2. Test with PageSpeed Insights
3. Verify all metrics are green

### Expected Timeline:
- Image compression: 5-10 minutes
- Deployment: 2-3 minutes
- CDN propagation: 5 minutes
- Testing: 5 minutes
- **Total: ~20 minutes**

### Expected Result:
**Performance score improvement: +22-27 points**
- Before: 68
- After: 90-95

---

**Status**: Ready for deployment ✅  
**Critical Action**: Compress images before deploying 🔴  
**Estimated Impact**: Performance score 90-95 🎯

---

*Good luck! 🚀*
