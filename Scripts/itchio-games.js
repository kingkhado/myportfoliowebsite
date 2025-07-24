// Itch.io Games Integration
class ItchioGamesManager {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://itch.io/api/1';
        this.games = [
            { name: 'the thatha tribe', id: null },
            { name: 'airhockey', id: null }
        ];
    }

    async fetchUserGames() {
        try {
            const response = await fetch(`${this.baseUrl}/profile/games?api_key=${this.apiKey}`);
            const data = await response.json();
            
            if (data.games) {
                // Filter for our specific games
                const filteredGames = data.games.filter(game => 
                    this.games.some(targetGame => 
                        game.title.toLowerCase().includes(targetGame.name.toLowerCase())
                    )
                );
                return filteredGames;
            }
            return [];
        } catch (error) {
            console.error('Error fetching itch.io games:', error);
            // Fallback data if API fails
            return this.getFallbackGames();
        }
    }

    getFallbackGames() {
        return [
            {
                title: 'The Thatha Tribe',
                short_text: 'An immersive tribal adventure game',
                url: 'https://kingkhado.itch.io/african-tribe-war-game',
                cover_url: './THE COOLEST IMAGES/favico/TAS.png',
                published_at: '2024-01-01'
            },
            {
                title: 'Air Hockey',
                short_text: 'Classic air hockey game with modern twist',
                url: 'https://kingkhado.itch.io/ice-hockey-physics-game',
                cover_url: './THE COOLEST IMAGES/favico/TAS.png',
                published_at: '2024-01-01'
            }
        ];
    }

    async displayGames(containerId) {
        const container = document.getElementById(containerId);
        const loadingScreen = document.getElementById('loading-screen');
        
        if (!container) return;

        // Show loading screen
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }

        try {
            const games = await this.fetchUserGames();
            
            // Hide loading screen after getting data
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 300);
                }, 800); // Show loading for shorter time like other pages
            }
            
            if (games.length === 0) {
                container.innerHTML = '<div class="no-games">No games found</div>';
                return;
            }

            const gamesHTML = games.map(game => `
                <div class="game-card ${game.type === 'Profile' ? 'featured' : ''}" onclick="window.open('${game.url}', '_blank')">
                    <div class="game-cover">
                        <img src="${game.cover_url || '../THE COOLEST IMAGES/favico/TAS.png'}" 
                             alt="${game.title}" 
                             onerror="this.src='../THE COOLEST IMAGES/favico/TAS.png'">
                    </div>
                    <div class="game-info">
                        <h3>${game.title}</h3>
                        <p>${game.short_text || 'A game by MAKHADO KHASHANE'}</p>
                        <div class="game-meta">
                            <span class="game-type">${game.type || 'Game'}</span>
                            ${game.type === 'Profile' ? '<span class="visit-badge">Visit Profile →</span>' : '<span class="play-badge">PLAY GAME →</span>'}
                        </div>
                    </div>
                </div>
            `).join('');

            container.innerHTML = gamesHTML;
        } catch (error) {
            console.error('Error displaying games:', error);
            
            // Hide loading screen on error
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            
            container.innerHTML = '<div class="error">Error loading games</div>';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Use the API key directly
    const gamesManager = new ItchioGamesManager('4hNBKQ2Gm2QOUHOi37f3wJc184u1OajvuKRXyQsf');
    
    // Check if we're on the games page
    if (document.getElementById('games-grid')) {
        gamesManager.displayGames('games-grid');
    }
});
