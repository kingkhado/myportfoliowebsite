# YouTube API 403 Forbidden Error - Fix Guide

## Problem
Your YouTube API key is returning a **403 Forbidden** error, which prevents the website from fetching real video statistics.

## Why This Happens
1. **API Not Enabled**: YouTube Data API v3 is not enabled in your Google Cloud project
2. **API Key Restrictions**: The key has HTTP referrer restrictions that block requests
3. **Quota Exceeded**: Daily API quota has been exceeded (unlikely for new projects)
4. **Invalid Key**: The key may have been revoked or regenerated

## Solution Steps

### Option 1: Fix Current API Key (Recommended)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with the Google account that created the API key

2. **Enable YouTube Data API v3**
   - Click on "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "ENABLE"

3. **Remove API Key Restrictions**
   - Go to "APIs & Services" → "Credentials"
   - Find your API key: `AIzaSyCXS8p8fljdNF9kEuH-0Zv985hcrpi4r1s`
   - Click "Edit" (pencil icon)
   - Under "Application restrictions":
     - Select "None" (for testing)
     - OR select "HTTP referrers" and add:
       - `https://wits-digital-arts-interactive-media.github.io/*`
       - `http://localhost:*` (for local testing)
       - `http://127.0.0.1:*` (for local testing)
   - Under "API restrictions":
     - Select "Restrict key"
     - Check only "YouTube Data API v3"
   - Click "SAVE"

4. **Wait 5 Minutes**
   - API key changes can take a few minutes to propagate
   - Clear your browser cache
   - Reload your website

### Option 2: Create New API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/apis/credentials

2. **Create New API Key**
   - Click "+ CREATE CREDENTIALS" → "API key"
   - Copy the new key immediately

3. **Configure the New Key**
   - Click "Edit API key"
   - Name it: "YouTube Portfolio Stats"
   - Application restrictions: "None" (or add your website URLs)
   - API restrictions: Select "YouTube Data API v3" only
   - Click "SAVE"

4. **Update Your Website**
   - Open `Scripts/config.js`
   - Replace the old key with your new key:
   ```javascript
   const CONFIG = {
       YOUTUBE_API_KEY: 'YOUR_NEW_API_KEY_HERE',
   };
   ```

## Testing the Fix

After making changes, test with this command in PowerShell:

```powershell
curl "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=LEMjHJ8L5WU&key=YOUR_API_KEY"
```

**Expected Success Response:**
```json
{
  "items": [
    {
      "id": "LEMjHJ8L5WU",
      "statistics": {
        "viewCount": "1234",
        "likeCount": "56",
        "commentCount": "12"
      }
    }
  ]
}
```

## Current Workaround

Until you fix the API key, the website uses **demo data** for video stats. To update with your real stats:

1. Go to YouTube Studio: https://studio.youtube.com/
2. Check each video's analytics
3. Update the values in `Scripts/video-gamepad-stats.js` in the `useDemoData()` function:

```javascript
const demoVideos = {
    'LEMjHJ8L5WU': { 
        title: 'God saved me from a BAD trip!',
        views: 1247,  // ← Update with real number
        likes: 89,    // ← Update with real number
        comments: 45  // ← Update with real number
    },
    // ... update other videos
};
```

## API Key Security Note

⚠️ **IMPORTANT**: Your API key is currently visible in your public repository. After fixing the 403 error, consider:

1. **Regenerate the key** in Google Cloud Console
2. **Add domain restrictions** to prevent unauthorized use
3. **Monitor usage** in Google Cloud Console to detect abuse
4. **Set up billing alerts** to avoid unexpected charges

## Need Help?

If you continue to have issues:
1. Check Google Cloud Console → "APIs & Services" → "Dashboard" for error messages
2. Verify your Google Cloud project has billing enabled (required for API access)
3. Check the quota limits in "APIs & Services" → "YouTube Data API v3" → "Quotas"

---

**Current Status**: Website is using demo data. Real YouTube stats will work once API key is properly configured.
