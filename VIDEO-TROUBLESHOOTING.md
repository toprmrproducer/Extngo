# Video Testimonials Troubleshooting Guide

## Issues Fixed

### 1. **Video Autoplay & Loading**
- Added `preload="metadata"` for faster initial load
- Added `<source>` tag with explicit MIME type
- Implemented intersection observer to only play videos when visible
- Added `onCanPlay` handler to ensure playback starts

### 2. **Performance Optimization**
- Videos now only play when in viewport (saves bandwidth & CPU)
- Added proper error handling with fallback UI
- Implemented lazy loading strategy

### 3. **Browser Compatibility**
- Added `playsInline` for iOS Safari
- Added proper MIME type headers in Next.js config
- Graceful fallback for autoplay blocking

## Current Video Sizes

```
review.mp4  - 25MB
review1.mp4 - 48MB
review2.mp4 - 16MB
review3.mp4 - 16MB
review4.mp4 - 56MB
```

## Recommended: Optimize Videos

Large video files can cause:
- Slow page load times
- High bandwidth usage
- Memory issues on mobile devices
- Choppy playback

### Option 1: Run the optimization script

```bash
./optimize-videos.sh
```

This will:
- Backup originals to `public/video-backups/`
- Reduce resolution to 720p (perfect for web)
- Compress with H.264 (CRF 28)
- Add faststart flag for streaming
- Reduce file sizes by 60-80%

### Option 2: Manual optimization with ffmpeg

```bash
ffmpeg -i public/review.mp4 \
  -vf "scale=-2:720" \
  -c:v libx264 \
  -crf 28 \
  -preset medium \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  public/review-optimized.mp4
```

### Option 3: Use online tools
- [HandBrake](https://handbrake.fr/) - Free, cross-platform
- [CloudConvert](https://cloudconvert.com/) - Online converter
- [Clipchamp](https://clipchamp.com/) - Browser-based editor

## Testing Checklist

- [ ] Videos load and play automatically
- [ ] Videos pause when scrolled out of view
- [ ] Mute/unmute button works
- [ ] Fallback UI shows if video fails to load
- [ ] Videos loop continuously
- [ ] Performance is smooth on mobile
- [ ] No console errors

## Common Issues

### Videos don't autoplay
**Cause:** Browser autoplay policies block unmuted videos
**Solution:** Videos are muted by default (this is correct)

### Videos are choppy
**Cause:** File sizes too large (16-56MB)
**Solution:** Run `./optimize-videos.sh` to compress

### Videos don't load
**Cause:** File path incorrect or CORS issue
**Solution:** Check browser console for errors, verify files exist in `/public`

### Black screen on mobile
**Cause:** Missing `playsInline` attribute
**Solution:** Already added in the fix

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (iOS 10+, macOS)
✅ Mobile browsers (with playsInline)

## Performance Tips

1. **Compress videos** - Target 2-5MB per video
2. **Use 720p resolution** - Sufficient for testimonials
3. **Enable faststart** - Allows streaming before full download
4. **Consider poster images** - Show thumbnail while loading
5. **Lazy load** - Already implemented with intersection observer

## Next Steps

1. Run the optimization script to reduce file sizes
2. Test on various devices and browsers
3. Monitor Core Web Vitals (LCP, CLS)
4. Consider adding loading skeletons for better UX
