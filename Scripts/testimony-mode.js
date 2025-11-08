// Testimony Mode JavaScript

let testimonyModeActive = false;

// Initialize testimony mode
function initTestimonyMode() {
    // Add scroll listener for reveal animations
    window.addEventListener('scroll', revealStoryItems);
    
    // Initial check
    revealStoryItems();
    
    // Add event listener to checkbox
    const testimonyCheckbox = document.getElementById('testimony-mode-btn');
    if (testimonyCheckbox) {
        testimonyCheckbox.addEventListener('change', function() {
            toggleTestimonyMode(this.checked);
        });
    }
}

// Toggle testimony mode
function toggleTestimonyMode(isActive) {
    testimonyModeActive = isActive;
    
    const body = document.body;
    const testimonyContainer = document.getElementById('testimony-container');
    
    if (testimonyModeActive) {
        // Enter testimony mode
        body.classList.add('testimony-mode-active');
        testimonyContainer.classList.add('active');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Trigger animations after a brief delay
        setTimeout(() => {
            revealStoryItems();
        }, 500);
        
    } else {
        // Exit testimony mode
        body.classList.remove('testimony-mode-active');
        testimonyContainer.classList.remove('active');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Reveal story items on scroll
function revealStoryItems() {
    if (!testimonyModeActive) return;
    
    const storyItems = document.querySelectorAll('.story-item');
    const salvationFinale = document.querySelector('.salvation-finale');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    storyItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < windowHeight - revealPoint) {
            item.classList.add('visible');
        }
    });
    
    // Reveal salvation finale
    if (salvationFinale) {
        const finaleTop = salvationFinale.getBoundingClientRect().top;
        if (finaleTop < windowHeight - revealPoint) {
            salvationFinale.classList.add('visible');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonyMode();
    
    // Add event listener to exit button
    const exitBtn = document.getElementById('exit-testimony-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            // Uncheck the checkbox
            const testimonyCheckbox = document.getElementById('testimony-mode-btn');
            if (testimonyCheckbox) {
                testimonyCheckbox.checked = false;
                toggleTestimonyMode(false);
            }
        });
    }
});

// Export functions for global access
window.toggleTestimonyMode = toggleTestimonyMode;
