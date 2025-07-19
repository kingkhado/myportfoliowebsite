// Loading Screen Controller
class LoadingScreen {
    constructor() {
        this.loadingScreen = null;
        this.progressBar = null;
        this.loadingText = null;
        this.minLoadTime = 2000; // Minimum loading time in milliseconds
        this.startTime = Date.now();
        this.init();
    }

    init() {
        // Create loading screen HTML
        this.createLoadingScreen();
        
        // Start loading process
        this.startLoading();
        
        // Hide loading screen when page is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.handlePageLoad();
            });
        } else {
            this.handlePageLoad();
        }
    }

    createLoadingScreen() {
        // Determine the correct path to the GIF based on current page location
        const currentPath = window.location.pathname;
        let gifPath = "THE COOLEST IMAGES/LOADING SCREEN/God saved me from a Bad trip_2.gif";
        
        // If we're in a subdirectory (about/ or portfolio/), adjust the path
        if (currentPath.includes('/about/') || currentPath.includes('/portfolio/')) {
            gifPath = "../THE COOLEST IMAGES/LOADING SCREEN/God saved me from a Bad trip_2.gif";
        }
        
        // Create loading screen container
        const loadingHTML = `
            <div class="loading-screen" id="loadingScreen">
                <!-- Pixel Decorations -->
                <div class="pixel-decoration"></div>
                <div class="pixel-decoration"></div>
                <div class="pixel-decoration"></div>
                <div class="pixel-decoration"></div>
                
                <!-- Loading Animation -->
                <div class="loading-animation">
                    <img src="${gifPath}" alt="Loading..." class="loading-gif">
                </div>
                
                <!-- Loading Text -->
                <div class="loading-text" id="loadingText">LOADING MAKHADO KHASHANE</div>
                <div class="loading-subtext" id="loadingSubtext">Initializing creative universe...</div>
                
                <!-- Progress Bar -->
                <div class="loading-progress">
                    <div class="loading-progress-bar" id="progressBar"></div>
                </div>
            </div>
        `;
        
        // Insert at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        
        // Get references
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressBar = document.getElementById('progressBar');
        this.loadingText = document.getElementById('loadingText');
        this.loadingSubtext = document.getElementById('loadingSubtext');
    }

    startLoading() {
        // Simulate loading progress
        let progress = 0;
        const loadingMessages = [
            'Initializing creative universe...',
            'Loading pixel art assets...',
            'Preparing portfolio showcase...',
            'Syncing with the matrix...',
            'Almost ready to create...'
        ];
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random progress increment
            
            if (progress > 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            
            // Update progress bar
            this.progressBar.style.width = progress + '%';
            
            // Update loading message
            const messageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
            this.loadingSubtext.textContent = loadingMessages[messageIndex];
            
        }, 200);
    }

    handlePageLoad() {
        // Ensure minimum loading time has passed
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minLoadTime - elapsedTime);
        
        setTimeout(() => {
            this.hideLoadingScreen();
        }, remainingTime);
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            // Final loading message
            this.loadingSubtext.textContent = 'Welcome to the creative universe!';
            this.progressBar.style.width = '100%';
            
            // Hide loading screen after a brief delay
            setTimeout(() => {
                this.loadingScreen.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    if (this.loadingScreen && this.loadingScreen.parentNode) {
                        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                    }
                }, 500);
            }, 500);
        }
    }
}

// Initialize loading screen when script loads
document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
});

// Fallback: Initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    new LoadingScreen();
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingScreen;
}
