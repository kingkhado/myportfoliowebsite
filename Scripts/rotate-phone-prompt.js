/**
 * Rotate Phone Prompt
 * Shows a prompt to mobile users when device is in portrait orientation
 * Automatically hides when device is rotated to landscape
 */

(function() {
    'use strict';

    // Check if device is mobile
    function isMobileDevice() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    // Check if device is in portrait orientation
    function isPortrait() {
        // Check using matchMedia (more reliable)
        if (window.matchMedia) {
            return window.matchMedia("(orientation: portrait)").matches;
        }
        // Fallback to window dimensions
        return window.innerHeight > window.innerWidth;
    }

    // Update prompt visibility based on orientation
    function updatePromptVisibility() {
        const prompt = document.getElementById('rotate-phone-prompt');
        if (!prompt) return;

        if (isMobileDevice() && isPortrait()) {
            prompt.style.display = 'flex';
        } else {
            prompt.style.display = 'none';
        }
    }

    // Initialize the rotate phone prompt
    function initRotatePrompt() {
        // Only run on mobile devices
        if (!isMobileDevice()) {
            return;
        }

        // Check if prompt already exists
        if (document.getElementById('rotate-phone-prompt')) {
            updatePromptVisibility();
            return;
        }

        // Create the prompt overlay
        const promptOverlay = document.createElement('div');
        promptOverlay.id = 'rotate-phone-prompt';
        promptOverlay.className = 'rotate-phone-overlay';
        
        promptOverlay.innerHTML = `
            <div class="rotate-phone-content">
                <div class="rotate-phone-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="4" width="14" height="16" rx="2" stroke="white" stroke-width="2"/>
                        <path d="M12 14L12 10M12 10L10 12M12 10L14 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="17" r="0.5" fill="white"/>
                    </svg>
                </div>
                <h2 class="rotate-phone-title">Rotate Your Device</h2>
                <p class="rotate-phone-message">Please rotate your device to landscape mode for the best gaming experience</p>
            </div>
        `;

        // Add to body
        document.body.appendChild(promptOverlay);

        // Initial visibility check
        updatePromptVisibility();

        // Listen for orientation changes
        window.addEventListener('orientationchange', function() {
            // Small delay to ensure orientation has changed
            setTimeout(updatePromptVisibility, 100);
        });

        // Also listen for resize events (backup for devices that don't fire orientationchange)
        window.addEventListener('resize', updatePromptVisibility);

        // Listen for matchMedia changes (most reliable)
        if (window.matchMedia) {
            const portraitQuery = window.matchMedia("(orientation: portrait)");
            if (portraitQuery.addEventListener) {
                portraitQuery.addEventListener('change', updatePromptVisibility);
            } else if (portraitQuery.addListener) {
                // Fallback for older browsers
                portraitQuery.addListener(updatePromptVisibility);
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRotatePrompt);
    } else {
        initRotatePrompt();
    }
})();
