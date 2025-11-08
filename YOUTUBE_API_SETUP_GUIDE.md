# 🎬 YouTube API Setup Guide

## How to Get Real YouTube Data for Your Gamepad Stats

Your Video Gamepad Stats feature is now configured to fetch **REAL data** from YouTube! Follow these steps to set up your YouTube Data API key.

---

## 📋 Quick Setup (5 Minutes)

### **Step 1: Go to Google Cloud Console**
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account (the one associated with your YouTube channel)

### **Step 2: Create a New Project**
1. Click the project dropdown at the top
2. Click "NEW PROJECT"
3. Name it: "My Portfolio Website" (or any name you prefer)
4. Click "CREATE"
5. Wait for the project to be created (takes a few seconds)

### **Step 3: Enable YouTube Data API v3**
1. In the search bar at the top, type: "YouTube Data API v3"
2. Click on "YouTube Data API v3" in the results
3. Click the blue "ENABLE" button
4. Wait for it to enable (takes a few seconds)

### **Step 4: Create API Credentials**
1. Click "CREATE CREDENTIALS" button
2. Select:
   - **Which API are you using?** → YouTube Data API v3
   - **Where will you be calling the API from?** → Web browser (JavaScript)
   - **What data will you be accessing?** → Public data
3. Click "What credentials do I need?"
4. Your API key will be generated!

### **Step 5: Copy Your API Key**
1. You'll see a screen with your API key
2. Click the "COPY" button
3. **IMPORTANT**: Save this key somewhere safe!

### **Step 6: Add API Key to Your Website**
1. Open `Scripts/video-gamepad-stats.js`
2. Find line 14:
   ```javascript
   this.apiKey = 'YOUR_YOUTUBE_API_KEY_HERE';
   ```
3. Replace `YOUR_YOUTUBE_API_KEY_HERE` with your actual API key:
   ```javascript
   this.apiKey = 'AIzaSyC1234567890abcdefghijklmnopqrstuv';
   ```
4. Save the file

### **Step 7: Test It!**
1. Open `index.html` in your browser
2. Scroll to the Video Gamepad Stats section
3. Click any stat button (Views, Comments, Impressions)
4. You should see REAL data from YouTube! 🎉

---

## 🔒 Security Best Practices

### **Restrict Your API Key (Recommended)**
To prevent unauthorized use of your API key:

1. Go back to Google Cloud Console
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your API key
4. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your website URL:
     - `https://yourdomain.com/*`
     - `http://localhost/*` (for local testing)
5. Under "API restrictions":
   - Select "Restrict key"
   - Choose "YouTube Data API v3"
6. Click "SAVE"

---

## 📊 What Data You'll Get

### **Views** 🎮
- **Source**: `statistics.viewCount`
- **Description**: Total number of times the video has been viewed
- **Real-time**: Updates every 24-48 hours

### **Comments** 💬
- **Source**: `statistics.commentCount`
- **Description**: Total number of comments on the video
- **Real-time**: Updates every 24-48 hours

### **Impressions** 👁️
- **Source**: Calculated (views × 3)
- **Description**: Estimated impressions based on typical YouTube metrics
- **Note**: YouTube API doesn't provide actual impressions for public data

### **Additional Data Available**
The API also fetches (but doesn't display yet):
- Likes count
- Video title
- Publish date
- Thumbnail URL

---

## 🎯 How It Works

### **On Page Load:**
1. Script fetches data for all 3 videos at once
2. Shows "Loading YouTube data..." message
3. Stores data in memory
4. Ready for display when you click buttons

### **When You Click a Button:**
1. Retrieves stored data for current video
2. Displays the selected metric
3. Animates the number counting up
4. Shows mini bar graph

### **When You Switch Videos:**
1. Automatically updates to show new video's data
2. No need to click button again
3. Smooth transition

---

## 🔧 Troubleshooting

### **Problem: "YouTube API key not set. Using demo data."**
**Solution**: 
- You haven't replaced `YOUR_YOUTUBE_API_KEY_HERE` with your actual key
- Open `Scripts/video-gamepad-stats.js` and add your key on line 14

### **Problem: "YouTube API error: 403"**
**Possible Causes**:
- API key is invalid
- YouTube Data API v3 is not enabled
- API key restrictions are too strict

**Solutions**:
1. Verify your API key is correct
2. Check that YouTube Data API v3 is enabled in Google Cloud Console
3. Check API key restrictions (try removing restrictions temporarily)

### **Problem: "YouTube API error: 400"**
**Possible Causes**:
- Invalid video ID
- Malformed API request

**Solutions**:
1. Verify video IDs in your HTML are correct
2. Check browser console for detailed error message

### **Problem: Data shows as 0 or N/A**
**Possible Causes**:
- Video is private or unlisted
- Video statistics are disabled
- Video was recently uploaded (data not yet available)

**Solutions**:
1. Make sure videos are public
2. Check video settings on YouTube
3. Wait 24-48 hours for new videos

### **Problem: "Falling back to demo data"**
**This means**:
- API request failed for some reason
- Script is using mock data as fallback
- Check browser console for specific error

---

## 💰 API Quota & Limits

### **Free Tier:**
- **10,000 units per day** (free)
- Each API call costs **1 unit**
- Your website uses **1 call** on page load (fetches all 3 videos)
- **You can load your page 10,000 times per day for free!**

### **Quota Usage:**
- Page load: 1 unit
- Switching videos: 0 units (uses cached data)
- Clicking stat buttons: 0 units (uses cached data)

### **If You Exceed Quota:**
- Script automatically falls back to demo data
- No errors shown to users
- Resets at midnight Pacific Time

---

## 🚀 Advanced Configuration

### **Add More Videos:**
1. Add video to playlist in `index.html`:
   ```html
   <div class="playlist-item" data-video-id="NEW_VIDEO_ID" data-title="Video Title">
       <!-- Video thumbnail and info -->
   </div>
   ```
2. Data will be fetched automatically!

### **Change Impression Calculation:**
In `Scripts/video-gamepad-stats.js`, line 120:
```javascript
impressions: (parseInt(stats.viewCount) || 0) * 3,
```
Change the multiplier (3) to any number you prefer.

### **Add More Metrics:**
The API provides additional data you can display:
- `stats.likeCount` - Number of likes
- `stats.favoriteCount` - Number of favorites
- `snippet.publishedAt` - Publish date

---

## 📚 API Documentation

For more details, visit:
- **YouTube Data API v3**: https://developers.google.com/youtube/v3
- **Statistics Resource**: https://developers.google.com/youtube/v3/docs/videos#statistics
- **Quota Calculator**: https://developers.google.com/youtube/v3/determine_quota_cost

---

## ✅ Verification Checklist

Before going live, verify:
- [ ] API key is set in `video-gamepad-stats.js`
- [ ] YouTube Data API v3 is enabled
- [ ] API key restrictions are configured
- [ ] Test on local machine first
- [ ] Check browser console for errors
- [ ] Verify real data is displaying
- [ ] Test all 3 videos
- [ ] Test all 3 stat buttons
- [ ] Check mobile responsiveness

---

## 🎉 Success!

Once set up, your Video Gamepad Stats will display:
- ✅ **Real view counts** from YouTube
- ✅ **Real comment counts** from YouTube
- ✅ **Estimated impressions** based on views
- ✅ **Automatic updates** when switching videos
- ✅ **Smooth animations** and visual effects
- ✅ **Professional data visualization**

**Your website now has live YouTube statistics! 🚀**

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12) for error messages
2. Verify API key is correct
3. Ensure YouTube Data API v3 is enabled
4. Check video IDs are correct
5. Review troubleshooting section above

---

**Last Updated**: January 2025  
**API Version**: YouTube Data API v3  
**Status**: Active ✅
