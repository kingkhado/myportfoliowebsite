// Top Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.top-nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update button text
            if (navMenu.classList.contains('active')) {
                this.textContent = 'CLOSE ✕';
            } else {
                this.textContent = 'MENU ☰';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.top-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.textContent = 'MENU ☰';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.top-nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.textContent = 'MENU ☰';
                }
            }
        });
    }
    
    // Set active page indicator
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.top-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if current page matches link
        if (currentPage.includes(href) || 
            (currentPage.endsWith('/') && href.includes('index.html')) ||
            (currentPage.includes('index.html') && href.includes('index.html'))) {
            link.classList.add('active');
        }
    });
});
