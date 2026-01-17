// Configuration file for API keys and sensitive data
// IMPORTANT: Replace with your own API key from Google Cloud Console
// Never commit real API keys to version control

const CONFIG = {
    YOUTUBE_API_KEY: 'AIzaSyCXS8p8fljdNF9kEuH-0Zv985hcrpi4r1s', // Your YouTube API key
    // Add other configuration options here as needed
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
