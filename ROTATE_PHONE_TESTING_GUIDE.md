# Rotate Phone Prompt - Testing Guide

## Quick Testing Instructions

### Desktop Browser Testing (Chrome/Firefox DevTools)

1. **Open a game page in your browser:**
   - `games/WEB GL GAMES/index.html`
   - `games/WEB GL GAMES/CHUSHIN/index.html`
   - `games/WEB GL GAMES/Thatha tribe/index.html`

2. **Open DevTools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)

3. **Enable Device Toolbar:**
   - Press `Ctrl+Shift+M` (Windows/Linux)
   - Press `Cmd+Shift+M` (Mac)
   - Or click the device icon in DevTools

4. **Select a Mobile Device:**
   - Choose "iPhone 12 Pro" or "Pixel 5" from dropdown
   - Or set custom dimensions (e.g., 375x667)

5. **Test Portrait Mode:**
   - Ensure device is in portrait orientation (taller than wide)
   - **Expected Result:** Full-screen overlay appears with:
     - Black semi-transparent background
     - Animated phone icon
     - "Rotate Your Device" heading
     - Message about landscape mode

6. **Test Landscape Mode:**
   - Click the rotate icon in DevTools (or set dimensions to landscape)
   - **Expected Result:** Overlay disappears completely

7. **Test Orientation Changes:**
   - Toggle between portrait and landscape multiple times
   - **Expected Result:** Overlay shows/hides smoothly without errors

8. **Check Console:**
   - Look for any JavaScript errors
   - **Expected Result:** No errors in console

### Mobile Device Testing (Actual Devices)

#### iOS Testing (iPhone/iPad)
1. Open Safari on your iPhone/iPad
2. Navigate to one of the game pages
3. Hold device in portrait orientation
4. **Expected:** Rotate prompt appears
5. Rotate device to landscape
6. **Expected:** Prompt disappears, game is playable

#### Android Testing
1. Open Chrome/Firefox on your Android device
2. Navigate to one of the game pages
3. Hold device in portrait orientation
4. **Expected:** Rotate prompt appears
5. Rotate device to landscape
6. **Expected:** Prompt disappears, game is playable

### Desktop Testing (No Mobile Emulation)

1. Open any game page in regular desktop browser
2. Resize window to various sizes
3. **Expected Result:** Rotate prompt should NEVER appear on desktop
4. Check console for errors
5. **Expected Result:** No errors

## Test Checklist

### ✅ Functionality Tests
- [ ] Prompt appears on mobile in portrait mode
- [ ] Prompt disappears on mobile in landscape mode
- [ ] Prompt does NOT appear on desktop browsers
- [ ] Orientation changes are detected smoothly
- [ ] No JavaScript errors in console
- [ ] Games still load and function correctly
- [ ] Overlay has high z-index (appears above everything)

### ✅ Visual Tests
- [ ] Overlay covers entire screen
- [ ] Background is semi-transparent black
- [ ] Phone icon is visible and centered
- [ ] Icon has rotation animation
- [ ] Text is readable (white on dark background)
- [ ] Content fades in smoothly
- [ ] Responsive on different screen sizes

### ✅ Browser Compatibility
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Firefox Mobile
- [ ] Samsung Internet
- [ ] Chrome Desktop (should not show)
- [ ] Firefox Desktop (should not show)
- [ ] Safari Desktop (should not show)

### ✅ Edge Cases
- [ ] Rapid orientation changes
- [ ] Orientation change during game loading
- [ ] Very small screens (< 320px)
- [ ] Very large tablets (iPad Pro)
- [ ] Browser zoom levels (50%, 100%, 150%)
- [ ] Landscape-first devices

## Common Issues & Solutions

### Issue: Prompt doesn't appear on mobile
**Solution:** 
- Check browser console for errors
- Verify file paths are correct (../../Scripts/rotate-phone-prompt.js)
- Ensure CSS file is loaded (check Network tab)
- Verify device is detected as mobile (check user agent)

### Issue: Prompt appears on desktop
**Solution:**
- Check if user agent string contains mobile keywords
- Verify media query in CSS: `@media (orientation: landscape)`
- Clear browser cache and reload

### Issue: Prompt doesn't disappear in landscape
**Solution:**
- Check if orientation change events are firing
- Verify matchMedia is supported in browser
- Check console for JavaScript errors
- Try resizing window to trigger resize event

### Issue: Overlay blocks game even in landscape
**Solution:**
- Verify CSS has `display: none !important` for landscape
- Check z-index isn't causing issues
- Inspect element to see computed styles

## Manual Testing Commands

### Check if files are loaded correctly:
Open browser console and run:
```javascript
// Check if CSS is loaded
console.log(document.querySelector('link[href*="rotate-phone-prompt.css"]'));

// Check if JS is loaded
console.log(document.querySelector('script[src*="rotate-phone-prompt.js"]'));

// Check if overlay exists
console.log(document.getElementById('rotate-phone-prompt'));

// Check current orientation
console.log(window.matchMedia("(orientation: portrait)").matches ? "Portrait" : "Landscape");

// Check if mobile
console.log(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop");
```

## Performance Testing

1. **Load Time:**
   - Overlay should appear instantly on portrait load
   - No noticeable delay in game loading

2. **Animation Performance:**
   - Rotation animation should be smooth (60fps)
   - No jank or stuttering

3. **Memory Usage:**
   - Check DevTools Performance tab
   - Overlay should have minimal memory footprint

## Accessibility Testing

1. **Text Readability:**
   - High contrast (white on black)
   - Font size adequate (24px title, 16px message)

2. **Visual Clarity:**
   - Icon is clear and understandable
   - Message is concise and actionable

## Success Criteria

✅ **The feature is working correctly if:**
1. Prompt appears ONLY on mobile devices in portrait mode
2. Prompt disappears immediately when rotated to landscape
3. No JavaScript errors in console
4. Games load and function normally
5. Desktop users never see the prompt
6. Animations are smooth and performant
7. Text is readable on all mobile devices

## Quick Test URL

You can test locally by opening these files in your browser:
- `file:///c:/Users/makha/Documents/makkymak/myportfoliowebsite/games/WEB GL GAMES/index.html`
- `file:///c:/Users/makha/Documents/makkymak/myportfoliowebsite/games/WEB GL GAMES/CHUSHIN/index.html`
- `file:///c:/Users/makha/Documents/makkymak/myportfoliowebsite/games/WEB GL GAMES/Thatha tribe/index.html`

Or if hosted online, use your website URL + the game paths.
