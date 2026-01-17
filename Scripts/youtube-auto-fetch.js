// YouTube Auto-Fetch Script - Automatically fetch and display recent videos
// This script fetches recent videos from your YouTube channel and adds them to the portfolio

class YouTubeAutoFetch {
    constructor() {
        this.apiKey = (window.CONFIG && window.CONFIG.YOUTUBE_API_KEY) ? window.CONFIG.YOUTUBE_API_KEY : 'YOUR_YOUTUBE_API_KEY_HERE';
        this.channelId = 'UCTheanimatedsaint'; // Replace with your actual channel ID
        this.apiEndpoint = 'https://www.googleapis.com/youtube/v3';
        this.maxResults = 10; // Number of recent videos to fetch
        this.fetchedVideos = [];
    }

    init() {
        // Only fetch if API key is configured
        if (this.apiKey !== 'YOUR_YOUTUBE_API_KEY_HERE') {
            this.fetchRecentVideos();
        } else {
            console.log('YouTube API key not configured. Using manual video entries.');
        }
    }

    async fetchRecentVideos() {
        try {
            console.log('Fetching recent videos from YouTube...');

            // First, get channel info to get uploads playlist
            const channelResponse = await fetch(`${this.apiEndpoint}/channels?part=contentDetails&id=${this.channelId}&key=${this.apiKey}`);
            const channelData = await channelResponse.json();

            if (!channelData.items || channelData.items.length === 0) {
                console.error('Channel not found or API error');
                return;
            }

            const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

            // Now fetch videos from uploads playlist
            const videosResponse = await fetch(`${this.apiEndpoint}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${this.maxResults}&key=${this.apiKey}`);
            const videosData = await videosResponse.json();

            this.fetchedVideos = videosData.items || [];
            console.log(`Fetched ${this.fetchedVideos.length} recent videos`);

            // Add videos to portfolio and homepage
            this.addVideosToPortfolio();
            this.addVideosToHomepage();

        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
        }
    }

    addVideosToPortfolio() {
        const afterChristList = document.getElementById('after-christ-list');
        if (!afterChristList) return;

        // Filter videos that aren't already manually added
        const manualVideoIds = ['pj8KyANCqwo', 'qNOqS6GOYBs', 'LEMjHJ8L5WU', 'oH_Wo6JFbnE', 't_PLrynPFWQ'];
        const newVideos = this.fetchedVideos.filter(video => {
            const videoId = video.snippet.resourceId.videoId;
            return !manualVideoIds.includes(videoId);
        });

        // Add new videos to the portfolio
        newVideos.forEach(video => {
            const videoId = video.snippet.resourceId.videoId;
            const title = video.snippet.title;
            const description = video.snippet.description.substring(0, 100) + '...';
            const publishedAt = new Date(video.snippet.publishedAt);
            const year = publishedAt.getFullYear();

            const videoElement = document.createElement('div');
            videoElement.className = 'list-item featured-video-item';
            videoElement.setAttribute('data-type', 'youtube');
            videoElement.setAttribute('data-src', `https://www.youtube.com/embed/${videoId}`);
            videoElement.setAttribute('data-title', title);
            videoElement.setAttribute('data-desc', description);
            videoElement.setAttribute('data-year', year);

            videoElement.innerHTML = `
                <span class="item-name">${title}</span>
                <span class="item-year">(${year})</span>
                <span class="item-badge">AUTO</span>
            `;

            // Insert before the TAS Background video
            const tasBackground = afterChristList.querySelector('[data-src*="TAS BG"]');
            if (tasBackground) {
                afterChristList.insertBefore(videoElement, tasBackground);
            } else {
                afterChristList.appendChild(videoElement);
            }
        });

        console.log(`Added ${newVideos.length} auto-fetched videos to portfolio`);
    }

    addVideosToHomepage() {
        const playlistItems = document.querySelector('.playlist-items');
        if (!playlistItems) return;

        // Filter videos that aren't already in the playlist
        const manualVideoIds = ['LEMjHJ8L5WU', 'oH_Wo6JFbnE', 't_PLrynPFWQ', 'pj8KyANCqwo', 'qNOqS6GOYBs'];
        const newVideos = this.fetchedVideos.filter(video => {
            const videoId = video.snippet.resourceId.videoId;
            return !manualVideoIds.includes(videoId);
        }).slice(0, 3); // Limit to 3 additional videos

        // Add new videos to homepage playlist
        newVideos.forEach(video => {
            const videoId = video.snippet.resourceId.videoId;
            const title = video.snippet.title;
            const publishedAt = new Date(video.snippet.publishedAt);
            const year = publishedAt.getFullYear();

            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            playlistItem.setAttribute('data-video-id', videoId);
            playlistItem.setAttribute('data-title', title);

            playlistItem.innerHTML = `
                <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="${title} thumbnail">
                <div class="playlist-item-info">
                    <p class="playlist-item-title">${title}</p>
                    <p class="playlist-item-year">${year}</p>
                </div>
            `;

            playlistItems.appendChild(playlistItem);
        });

        console.log(`Added ${newVideos.length} auto-fetched videos to homepage playlist`);
    }

    // Method to manually trigger fetch (useful for testing)
    refreshVideos() {
        this.fetchRecentVideos();
    }

    // Method to get channel ID from username/handle
    async getChannelIdFromUsername(username) {
        try {
            const response = await fetch(`${this.apiEndpoint}/search?part=snippet&q=${username}&type=channel&key=${this.apiKey}&maxResults=1`);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                return data.items[0].snippet.channelId;
            }
        } catch (error) {
            console.error('Error getting channel ID:', error);
        }
        return null;
    }
}

// Initialize auto-fetch when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const autoFetch = new YouTubeAutoFetch();
        autoFetch.init();
    });
} else {
    const autoFetch = new YouTubeAutoFetch();
    autoFetch.init();
}

// Export for global access
window.YouTubeAutoFetch = YouTubeAutoFetch;
