# Rotate Phone Prompt Feature

## Overview
A mobile-friendly feature that prompts users to rotate their device to landscape orientation for optimal gaming experience on Unity WebGL games.

## Implementation

### Files Created
1. **Scripts/rotate-phone-prompt.js** - JavaScript module that:
   - Detects mobile devices
   - Monitors device orientation changes
   - Shows/hides the rotate prompt overlay automatically
   - Uses multiple detection methods for maximum compatibility

2. **Styles/rotate-phone-prompt.css** - Styling that provides:
   - Full-screen semi-transparent overlay
   - Animated phone rotation icon
   - Clear, readable message text
   - Responsive design for different screen sizes

### Files Modified
1. **games/WEB GL GAMES/index.html** - WSOA2024 Physics game
2. **games/WEB GL GAMES/CHUSHIN/index.html** - Chushin game
3. **games/WEB GL GAMES/Thatha tribe/index.html** - Thatha tribe game

Each game now includes:
- Link to rotate-phone-prompt.css in the `<head>`
- Script tag for rotate-phone-prompt.js before closing `</body>`

## How It Works

### Detection Logic
1. **Mobile Detection**: Uses `navigator.userAgent` to identify mobile devices (iPhone, iPad, iPod, Android)
2. **Orientation Detection**: Uses multiple methods for reliability:
   - `window.matchMedia("(orientation: portrait)")` (primary)
   - `window.innerHeight > window.innerWidth` (fallback)

### Event Listeners
- `orientationchange` - Fires when device orientation changes
- `resize` - Backup for devices that don't fire orientationchange
- `matchMedia.change` - Most reliable modern method

### User Experience
- **Portrait Mode**: Full-screen overlay appears with:
  - Animated phone icon showing rotation
  - "Rotate Your Device" heading
  - Helpful message about landscape mode
  - Semi-transparent black background (95% opacity)

- **Landscape Mode**: Overlay automatically disappears, allowing full game access

## Browser Compatibility
- Works on all modern mobile browsers (iOS Safari, Chrome, Firefox, Edge)
- Gracefully degrades on older browsers
- Desktop users never see the prompt (mobile-only feature)

## Customization Options

### Message Text
Edit in `Scripts/rotate-phone-prompt.js` line 58-62:
```javascript
<h2 class="rotate-phone-title">Rotate Your Device</h2>
<p class="rotate-phone-message">Please rotate your device to landscape mode for the best gaming experience</p>
```

### Colors & Styling
Edit in `Styles/rotate-phone-prompt.css`:
- Background color: `.rotate-phone-overlay { background: rgba(0, 0, 0, 0.95); }`
- Text color: `.rotate-phone-content { color: white; }`
- Icon animation: `@keyframes rotateAnimation`

### Animation Speed
Edit in `Styles/rotate-phone-prompt.css`:
- Rotation animation: `animation: rotateAnimation 2s ease-in-out infinite;`
- Fade-in animation: `animation: fadeIn 0.5s ease-in-out;`

## Testing

### Desktop Testing
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device (e.g., iPhone 12)
4. Rotate device orientation in DevTools
5. Verify prompt appears in portrait, disappears in landscape

### Mobile Testing
1. Open game on actual mobile device
2. Hold device in portrait orientation
3. Verify prompt appears
4. Rotate to landscape
5. Verify prompt disappears

## Performance
- Minimal performance impact
- Overlay only created once on page load
- Event listeners are efficient and non-blocking
- No continuous polling or heavy computations

## Accessibility
- High contrast text (white on dark background)
- Large, readable font sizes
- Clear, simple message
- Visual icon reinforces the message
- Responsive to all screen sizes

## Future Enhancements
Possible improvements:
- Add support for custom messages per game
- Include "dismiss" button for users who prefer portrait
- Add haptic feedback on supported devices
- Localization support for multiple languages
- Custom icons per game theme
