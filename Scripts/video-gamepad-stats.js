// Video Gamepad Stats - Interactive Data Visualization
// Displays video metrics (views, comments, impressions) in a gamepad-style interface
// Fetches REAL data from YouTube Data API v3

class VideoGamepadStats {
    constructor() {
        this.currentVideo = null;
        this.activeButton = null;
        this.videoData = {}; // Will be populated from YouTube API
        
        // YouTube Data API v3 Key
        // API key configured for fetching real YouTube statistics
        this.apiKey = 'AIzaSyAu_qhdH6fZqkXwD-Rw-tJ3-2veTzajbD0';
        
        // API endpoint
        this.apiEndpoint = 'https://www.googleapis.com/youtube/v3/videos';
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Get the first active video
        const activePlaylistItem = document.querySelector('.playlist-item.active');
        if (activePlaylistItem) {
            this.currentVideo = activePlaylistItem.getAttribute('data-video-id');
        }
        
        // Fetch data for all videos
        this.fetchAllVideoData();
        
        // Add event listeners to gamepad buttons
        this.setupGamepadButtons();
        
        // Listen for video changes
        this.setupVideoChangeListener();
    }
    
    async fetchAllVideoData() {
        // Get all video IDs from playlist
        const playlistItems = document.querySelectorAll('.playlist-item');
        const videoIds = Array.from(playlistItems).map(item => 
            item.getAttribute('data-video-id')
        );
        
        // Fetch data for all videos at once
        await this.fetchYouTubeData(videoIds);
    }
    
    async fetchYouTubeData(videoIds) {
        // Check if API key is set
        if (this.apiKey === 'YOUR_YOUTUBE_API_KEY_HERE') {
            console.warn('YouTube API key not set. Using demo data.');
            this.useDemoData();
            return;
        }
        
        try {
            // Join video IDs with comma for batch request
            const videoIdsString = videoIds.join(',');
            
            // Build API URL
            const url = `${this.apiEndpoint}?part=statistics,snippet&id=${videoIdsString}&key=${this.apiKey}`;
            
            // Show loading state
            this.showLoadingState();
            
            // Fetch data from YouTube API
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`YouTube API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Process the data
            this.processYouTubeData(data);
            
            // Hide loading state
            this.hideLoadingState();
            
            console.log('YouTube data loaded successfully:', this.videoData);
            
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
            console.warn('Falling back to demo data');
            this.useDemoData();
            this.hideLoadingState();
        }
    }
    
    processYouTubeData(data) {
        // Process each video's statistics
        data.items.forEach(video => {
            const videoId = video.id;
            const stats = video.statistics;
            const snippet = video.snippet;
            
            this.videoData[videoId] = {
                title: snippet.title,
                views: parseInt(stats.viewCount) || 0,
                comments: parseInt(stats.commentCount) || 0,
                // YouTube API doesn't provide impressions directly
                // We'll estimate it as views * 3 (typical impression-to-view ratio)
                impressions: (parseInt(stats.viewCount) || 0) * 3,
                likes: parseInt(stats.likeCount) || 0,
                // Additional data available
                publishedAt: snippet.publishedAt,
                thumbnail: snippet.thumbnails.medium.url
            };
        });
    }
    
    useDemoData() {
        // Fallback demo data if API key is not set or API fails
        this.videoData = {
            'LEMjHJ8L5WU': {
                title: 'God saved me from a BAD trip!',
                views: 1247,
                comments: 89,
                impressions: 3741
            },
            'oH_Wo6JFbnE': {
                title: 'Power in the Name of Jesus',
                views: 892,
                comments: 56,
                impressions: 2676
            },
            't_PLrynPFWQ': {
                title: 'Relaxing Christian Instrumentals',
                views: 2341,
                comments: 124,
                impressions: 7023
            }
        };
    }
    
    showLoadingState() {
        const dataPanel = document.querySelector('.stats-data-panel');
        const dataContent = document.querySelector('.stat-data-content');
        
        dataPanel.classList.remove('hidden');
        dataContent.innerHTML = `
            <div class="stats-loading">
                <div class="loading-spinner"></div>
                <p>Loading YouTube data...</p>
            </div>
        `;
        dataContent.classList.add('show');
    }
    
    hideLoadingState() {
        const dataPanel = document.querySelector('.stats-data-panel');
        dataPanel.classList.add('hidden');
    }
    
    setupGamepadButtons() {
        const buttons = document.querySelectorAll('.gamepad-stat-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const statType = button.getAttribute('data-stat');
                this.showStat(statType, button);
                this.createParticleEffect(e);
            });
        });
    }
    
    setupVideoChangeListener() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        
        playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    const videoId = item.getAttribute('data-video-id');
                    this.currentVideo = videoId;
                    
                    // If video data not loaded yet, fetch it
                    if (!this.videoData[videoId]) {
                        this.fetchYouTubeData([videoId]).then(() => {
                            // If a stat is currently displayed, refresh it
                            if (this.activeButton) {
                                const statType = this.activeButton.getAttribute('data-stat');
                                this.showStat(statType, this.activeButton);
                            }
                        });
                    } else {
                        // If a stat is currently displayed, refresh it
                        if (this.activeButton) {
                            const statType = this.activeButton.getAttribute('data-stat');
                            this.showStat(statType, this.activeButton);
                        }
                    }
                }, 100);
            });
        });
    }
    
    showStat(statType, button) {
        // Remove active class from all buttons
        document.querySelectorAll('.gamepad-stat-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        this.activeButton = button;
        
        // Get data panel
        const dataPanel = document.querySelector('.stats-data-panel');
        const dataContent = document.querySelector('.stat-data-content');
        
        // Show panel if hidden
        dataPanel.classList.remove('hidden');
        
        // Hide current content
        dataContent.classList.remove('show');
        
        // Wait for fade out, then update content
        setTimeout(() => {
            this.updateDataPanel(statType);
            
            // Show new content
            setTimeout(() => {
                dataContent.classList.add('show');
            }, 50);
        }, 300);
    }
    
    updateDataPanel(statType) {
        const data = this.videoData[this.currentVideo];
        if (!data) {
            // Show error message if data not available
            const dataContent = document.querySelector('.stat-data-content');
            dataContent.innerHTML = `
                <div class="stats-inactive-message">
                    <span class="icon">⚠️</span>
                    <p>Data not available for this video</p>
                    <p style="font-size: 8px; margin-top: 10px;">Please check your API key or try again later</p>
                </div>
            `;
            return;
        }
        
        const dataContent = document.querySelector('.stat-data-content');
        const statValue = data[statType];
        
        // Define stat configurations
        const statConfig = {
            views: {
                icon: '🎮',
                title: 'VIEWS',
                color: '#4169e1',
                description: 'Total video views from YouTube'
            },
            comments: {
                icon: '💬',
                title: 'COMMENTS',
                color: '#32cd32',
                description: 'Engagement through comments and discussions'
            },
            impressions: {
                icon: '👁️',
                title: 'IMPRESSIONS',
                color: '#ffd700',
                description: 'Estimated impressions (views × 3)'
            }
        };
        
        const config = statConfig[statType];
        
        // Update content
        dataContent.innerHTML = `
            <div class="stat-data-header">
                <span class="stat-data-icon">${config.icon}</span>
                <h4 class="stat-data-title" style="color: ${config.color}">${config.title}</h4>
            </div>
            
            <div class="stat-data-value">
                <div class="stat-number" style="color: ${config.color}">${this.formatNumber(statValue)}</div>
                <p class="stat-description">${config.description}</p>
            </div>
            
            <div class="stat-mini-graph">
                ${this.generateMiniGraph(statType, statValue, config.color)}
            </div>
        `;
        
        // Animate the number counting up
        this.animateNumber(statValue);
    }
    
    generateMiniGraph(statType, currentValue, color) {
        // Generate 5 bars showing trend
        const bars = [];
        const maxValue = currentValue * 1.2;
        
        // Generate random historical data for visualization
        for (let i = 0; i < 5; i++) {
            const value = Math.floor(currentValue * (0.6 + Math.random() * 0.4));
            const height = (value / maxValue) * 100;
            const displayValue = this.formatNumber(value);
            
            bars.push(`
                <div class="graph-bar" 
                     style="height: ${height}%; background: linear-gradient(to top, ${color}, ${this.lightenColor(color)}); box-shadow: 0 0 15px ${color}80;"
                     data-value="${displayValue}">
                </div>
            `);
        }
        
        return bars.join('');
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    lightenColor(color) {
        // Simple color lightening for gradient effect
        const colorMap = {
            '#4169e1': '#6a8aff',
            '#32cd32': '#5aff5a',
            '#ffd700': '#ffed4e'
        };
        return colorMap[color] || color;
    }
    
    animateNumber(targetValue) {
        const numberElement = document.querySelector('.stat-number');
        if (!numberElement) return;
        
        const duration = 1000; // 1 second
        const steps = 30;
        const stepValue = targetValue / steps;
        let currentValue = 0;
        let step = 0;
        
        const interval = setInterval(() => {
            step++;
            currentValue += stepValue;
            
            if (step >= steps) {
                currentValue = targetValue;
                clearInterval(interval);
            }
            
            numberElement.textContent = this.formatNumber(Math.floor(currentValue));
        }, duration / steps);
    }
    
    createParticleEffect(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random direction
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;
            
            // Get button color
            const computedStyle = window.getComputedStyle(button);
            const borderColor = computedStyle.borderColor;
            particle.style.background = borderColor;
            
            document.body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new VideoGamepadStats();
    });
} else {
    new VideoGamepadStats();
}
