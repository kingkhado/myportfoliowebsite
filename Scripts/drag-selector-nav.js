// Drag-and-Drop Selector Box Navigation System
// A draggable selector box that snaps to nav items for navigation

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let currentX = 0;
let currentY = 0;
let selectorBox = null;
let navItems = [];
let currentSelectedIndex = 0;

// Page configuration
const pages = [
    { name: 'HOME', url: './index.html', path: 'index' },
    { name: 'PORTFOLIO', url: './portfolio/portfolio.html', path: 'portfolio' },
    { name: 'ABOUT', url: './about/about.html', path: 'about' },
    { name: 'GAMES', url: './games/itchio-games.html', path: 'games' },
    { name: 'LINKS', url: './links.html', path: 'links' }
];

// Initialize the drag selector navigation
function initDragSelectorNav() {
    detectCurrentPage();
    createSelectorBox();
    setupNavItems();
    setupEventListeners();
    setupKeyboardNavigation();
    positionSelectorOnCurrentPage();
}

// Detect which page we're currently on
function detectCurrentPage() {
    const currentPath = window.location.pathname.toLowerCase();
    
    if (currentPath.includes('portfolio')) {
        currentSelectedIndex = 1;
    } else if (currentPath.includes('about')) {
        currentSelectedIndex = 2;
    } else if (currentPath.includes('games') || currentPath.includes('itchio')) {
        currentSelectedIndex = 3;
    } else if (currentPath.includes('links')) {
        currentSelectedIndex = 4;
    } else {
        currentSelectedIndex = 0; // Home
    }
}

// Create the draggable selector box
function createSelectorBox() {
    selectorBox = document.createElement('div');
    selectorBox.id = 'nav-selector-box';
    selectorBox.className = 'nav-selector-box';
    selectorBox.setAttribute('role', 'button');
    selectorBox.setAttribute('aria-label', 'Drag to navigate between pages');
    selectorBox.setAttribute('tabindex', '0');
    selectorBox.setAttribute('title', 'Drag me to navigate! 🎮');
    selectorBox.innerHTML = '⬌'; // Drag icon
    
    // Add styles
    selectorBox.style.cssText = `
        position: absolute;
        width: 50px;
        height: 50px;
        background: linear-gradient(145deg, #4a90e2, #2c5aa0);
        border: 3px solid #fff;
        border-radius: 50%;
        cursor: grab;
        z-index: 10002;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #fff;
        box-shadow: 
            0 4px 15px rgba(74, 144, 226, 0.6),
            0 0 20px rgba(74, 144, 226, 0.4);
        transition: all 0.3s ease;
        user-select: none;
        touch-action: none;
    `;
    
    // Create custom tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'drag-selector-tooltip';
    tooltip.textContent = 'Drag me to navigate! 🎮';
    tooltip.style.cssText = `
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%) scale(0);
        background: linear-gradient(145deg, #4a90e2, #2c5aa0);
        color: #fff;
        padding: 8px 16px;
        border-radius: 15px;
        font-family: 'Press Start 2P', cursive;
        font-size: 8px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 4px 15px rgba(74, 144, 226, 0.6);
        z-index: 10003;
    `;
    
    selectorBox.appendChild(tooltip);
    
    // Show tooltip on hover
    selectorBox.addEventListener('mouseenter', () => {
        tooltip.style.transform = 'translateX(-50%) scale(1)';
        tooltip.style.opacity = '1';
    });
    
    selectorBox.addEventListener('mouseleave', () => {
        tooltip.style.transform = 'translateX(-50%) scale(0)';
        tooltip.style.opacity = '0';
    });
    
    document.body.appendChild(selectorBox);
}

// Setup nav items and disable click navigation
function setupNavItems() {
    const navLinks = document.querySelectorAll('.top-nav-link');
    
    navLinks.forEach((link, index) => {
        const rect = link.getBoundingClientRect();
        navItems.push({
            element: link,
            index: index,
            rect: rect,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
            page: pages[index]
        });
        
        // Disable click navigation
        link.style.pointerEvents = 'none';
        link.style.cursor = 'default';
        
        // Add visual indicator that clicking is disabled
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showMessage('Drag the selector box to navigate!');
        });
    });
}

// Position selector to the LEFT of the navigation bar
function positionSelectorOnCurrentPage() {
    if (navItems.length > 0) {
        // Get the first nav item (HOME) to use as reference
        const firstItem = navItems[0];
        // Position selector 80px to the LEFT of the first nav item
        const leftOffset = 80;
        updateSelectorPosition(firstItem.centerX - leftOffset, firstItem.centerY, true);
        highlightNavItem(currentSelectedIndex);
    }
}

// Setup event listeners for dragging
function setupEventListeners() {
    // Mouse events
    selectorBox.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    
    // Touch events
    selectorBox.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    // Window resize - recalculate positions
    window.addEventListener('resize', () => {
        setupNavItems();
        positionSelectorOnCurrentPage();
    });
}

// Handle drag start (mouse)
function handleDragStart(e) {
    isDragging = true;
    dragStartX = e.clientX - selectorBox.offsetLeft;
    dragStartY = e.clientY - selectorBox.offsetTop;
    
    selectorBox.style.cursor = 'grabbing';
    selectorBox.style.transform = 'scale(1.1)';
    selectorBox.style.zIndex = '10003';
    
    e.preventDefault();
}

// Handle drag move (mouse)
function handleDragMove(e) {
    if (!isDragging) return;
    
    currentX = e.clientX - dragStartX;
    currentY = e.clientY - dragStartY;
    
    updateSelectorPosition(e.clientX, e.clientY, false);
    highlightNearestNavItem(e.clientX, e.clientY);
    
    e.preventDefault();
}

// Handle drag end (mouse)
function handleDragEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    selectorBox.style.cursor = 'grab';
    selectorBox.style.transform = 'scale(1)';
    
    // Find nearest nav item and snap to it
    const nearestItem = findNearestNavItem(e.clientX, e.clientY);
    if (nearestItem) {
        snapToNavItem(nearestItem);
    }
}

// Handle touch start
function handleTouchStart(e) {
    isDragging = true;
    const touch = e.touches[0];
    dragStartX = touch.clientX - selectorBox.offsetLeft;
    dragStartY = touch.clientY - selectorBox.offsetTop;
    
    selectorBox.style.cursor = 'grabbing';
    selectorBox.style.transform = 'scale(1.1)';
    selectorBox.style.zIndex = '10003';
    
    e.preventDefault();
}

// Handle touch move
function handleTouchMove(e) {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    currentX = touch.clientX - dragStartX;
    currentY = touch.clientY - dragStartY;
    
    updateSelectorPosition(touch.clientX, touch.clientY, false);
    highlightNearestNavItem(touch.clientX, touch.clientY);
    
    e.preventDefault();
}

// Handle touch end
function handleTouchEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    selectorBox.style.cursor = 'grab';
    selectorBox.style.transform = 'scale(1)';
    
    const touch = e.changedTouches[0];
    const nearestItem = findNearestNavItem(touch.clientX, touch.clientY);
    if (nearestItem) {
        snapToNavItem(nearestItem);
    }
}

// Update selector position
function updateSelectorPosition(x, y, instant = false) {
    if (instant) {
        selectorBox.style.transition = 'none';
    } else {
        selectorBox.style.transition = 'all 0.1s ease';
    }
    
    selectorBox.style.left = (x - 25) + 'px';
    selectorBox.style.top = (y - 25) + 'px';
}

// Find nearest nav item to current position
function findNearestNavItem(x, y) {
    let nearest = null;
    let minDistance = Infinity;
    
    navItems.forEach(item => {
        const distance = Math.sqrt(
            Math.pow(x - item.centerX, 2) + 
            Math.pow(y - item.centerY, 2)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            nearest = item;
        }
    });
    
    return nearest;
}

// Highlight nearest nav item while dragging
function highlightNearestNavItem(x, y) {
    const nearest = findNearestNavItem(x, y);
    
    navItems.forEach(item => {
        if (item === nearest) {
            item.element.style.background = 'rgba(74, 144, 226, 0.3)';
            item.element.style.transform = 'scale(1.1)';
        } else {
            item.element.style.background = '';
            item.element.style.transform = '';
        }
    });
}

// Highlight specific nav item
function highlightNavItem(index) {
    navItems.forEach((item, i) => {
        if (i === index) {
            item.element.style.background = 'rgba(74, 144, 226, 0.2)';
        } else {
            item.element.style.background = '';
        }
    });
}

// Snap to nav item and navigate
function snapToNavItem(item) {
    // Animate snap to the nav item first
    selectorBox.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    updateSelectorPosition(item.centerX, item.centerY, false);
    
    // Clear highlights
    navItems.forEach(navItem => {
        navItem.element.style.background = '';
        navItem.element.style.transform = '';
    });
    
    // Navigate if different page
    if (item.index !== currentSelectedIndex) {
        showMessage(`Navigating to ${item.page.name}...`);
        
        setTimeout(() => {
            navigateToPage(item.page, item.index);
        }, 400);
    } else {
        showMessage(`Already on ${item.page.name}`);
        
        // Return to LEFT position after 500ms if staying on same page
        setTimeout(() => {
            returnToHomePosition();
        }, 500);
    }
}

// Return selector to its home position (LEFT of HOME nav item)
function returnToHomePosition() {
    if (navItems.length > 0) {
        const firstItem = navItems[0];
        const leftOffset = 80;
        selectorBox.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        updateSelectorPosition(firstItem.centerX - leftOffset, firstItem.centerY, false);
    }
}

// Navigate to page
function navigateToPage(page, index) {
    let targetUrl = page.url;
    
    // Adjust URL based on current location
    const currentPath = window.location.pathname;
    if (currentPath.includes('/portfolio/') || currentPath.includes('/about/') || currentPath.includes('/games/')) {
        if (index === 0) {
            targetUrl = '../index.html';
        } else if (index === 1) {
            targetUrl = '../portfolio/portfolio.html';
        } else if (index === 2) {
            targetUrl = '../about/about.html';
        } else if (index === 3) {
            targetUrl = '../games/itchio-games.html';
        } else if (index === 4) {
            targetUrl = '../links.html';
        }
    }
    
    window.location.href = targetUrl;
}

// Setup keyboard navigation (accessibility)
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return; // Don't interfere with form inputs
        }
        
        let newIndex = currentSelectedIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                newIndex = Math.max(0, currentSelectedIndex - 1);
                e.preventDefault();
                break;
            case 'ArrowRight':
                newIndex = Math.min(navItems.length - 1, currentSelectedIndex + 1);
                e.preventDefault();
                break;
            case 'Enter':
                if (navItems[currentSelectedIndex]) {
                    const item = navItems[currentSelectedIndex];
                    snapToNavItem(item);
                }
                e.preventDefault();
                break;
        }
        
        if (newIndex !== currentSelectedIndex) {
            currentSelectedIndex = newIndex;
            const item = navItems[currentSelectedIndex];
            updateSelectorPosition(item.centerX, item.centerY, false);
            highlightNavItem(currentSelectedIndex);
            showMessage(`Selected: ${item.page.name} (Press Enter to navigate)`);
        }
    });
    
    // Focus on selector box for keyboard navigation
    selectorBox.addEventListener('focus', () => {
        selectorBox.style.boxShadow = `
            0 4px 15px rgba(74, 144, 226, 0.6),
            0 0 30px rgba(74, 144, 226, 0.6),
            0 0 0 3px rgba(255, 255, 255, 0.5)
        `;
    });
    
    selectorBox.addEventListener('blur', () => {
        selectorBox.style.boxShadow = `
            0 4px 15px rgba(74, 144, 226, 0.6),
            0 0 20px rgba(74, 144, 226, 0.4)
        `;
    });
}

// Show message to user
function showMessage(text) {
    // Remove existing message
    const existing = document.querySelector('.nav-selector-message');
    if (existing) {
        existing.remove();
    }
    
    const message = document.createElement('div');
    message.className = 'nav-selector-message';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(145deg, #4a90e2, #2c5aa0);
        color: #fff;
        padding: 12px 24px;
        border-radius: 25px;
        font-family: 'Press Start 2P', cursive;
        font-size: 10px;
        z-index: 10004;
        box-shadow: 0 4px 20px rgba(74, 144, 226, 0.6);
        animation: messageFade 2s ease-in-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes messageFade {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        20%, 80% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    .nav-selector-box:hover {
        transform: scale(1.05);
        box-shadow: 
            0 6px 20px rgba(74, 144, 226, 0.8),
            0 0 30px rgba(74, 144, 226, 0.6);
    }
    
    .nav-selector-box:active {
        transform: scale(0.95);
    }
    
    /* Mobile fallback - show instruction */
    @media (max-width: 768px) {
        .nav-selector-box::after {
            content: 'Drag me!';
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 8px;
            white-space: nowrap;
            color: #4a90e2;
            font-family: 'Press Start 2P', cursive;
            animation: pulse 2s ease-in-out infinite;
        }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for nav to be fully rendered
    setTimeout(initDragSelectorNav, 500);
});

// Export functions
window.dragSelectorNav = {
    init: initDragSelectorNav,
    navigateToIndex: (index) => {
        if (navItems[index]) {
            snapToNavItem(navItems[index]);
        }
    }
};
