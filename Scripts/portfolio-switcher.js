// Portfolio Game-Style Switcher JavaScript

let currentCategoryIndex = 0;
const categories = ['before-christ', 'after-christ'];
const categoryNames = ['BEFORE CHRIST', 'AFTER CHRIST'];

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupEventListeners();
});

function initializePortfolio() {
    // Set up initial state
    showCategory('before-christ');
    
    // Add click listeners to all list items
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach(item => {
        item.addEventListener('click', function() {
            selectItem(this);
        });
    });
}

function setupEventListeners() {
    // Category button listeners
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            currentCategoryIndex = index;
            const category = this.getAttribute('data-category');
            showCategory(category);
            updateActiveButton(this);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            switchCategory(-1);
        } else if (e.key === 'ArrowRight') {
            switchCategory(1);
        }
    });
}

function switchCategory(direction) {
    currentCategoryIndex += direction;
    
    // Wrap around if we go beyond bounds
    if (currentCategoryIndex < 0) {
        currentCategoryIndex = categories.length - 1;
    } else if (currentCategoryIndex >= categories.length) {
        currentCategoryIndex = 0;
    }
    
    const category = categories[currentCategoryIndex];
    showCategory(category);
    
    // Update active button
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    categoryBtns[currentCategoryIndex].classList.add('active');
    
    // Add visual feedback for arrow click
    const arrow = direction > 0 ? document.querySelector('.right-arrow') : document.querySelector('.left-arrow');
    arrow.style.transform = 'scale(0.9)';
    setTimeout(() => {
        arrow.style.transform = 'scale(1)';
    }, 150);
}

function showCategory(category) {
    // Hide all category lists
    const categoryLists = document.querySelectorAll('.category-list');
    categoryLists.forEach(list => {
        list.classList.remove('active');
    });
    
    // Show selected category list
    const selectedList = document.getElementById(category + '-list');
    if (selectedList) {
        selectedList.classList.add('active');
    }
    
    // Clear main display and reset to default
    resetMainDisplay();
    
    // Update category index for arrow navigation
    currentCategoryIndex = categories.indexOf(category);
}

function updateActiveButton(activeBtn) {
    // Remove active class from all buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    activeBtn.classList.add('active');
}

function selectItem(itemElement) {
    // Remove selected class from all items
    const allItems = document.querySelectorAll('.list-item');
    allItems.forEach(item => item.classList.remove('selected'));
    
    // Add selected class to clicked item
    itemElement.classList.add('selected');
    
    // Get item data
    const type = itemElement.getAttribute('data-type');
    const src = itemElement.getAttribute('data-src');
    const title = itemElement.getAttribute('data-title');
    const description = itemElement.getAttribute('data-desc');
    const year = itemElement.getAttribute('data-year');
    
    // Display the item
    displayItem(type, src, title, description, year);
    
    // Add selection animation
    itemElement.style.transform = 'translateX(10px)';
    setTimeout(() => {
        itemElement.style.transform = 'translateX(5px)';
    }, 200);
}

function displayItem(type, src, title, description, year) {
    const mainVideo = document.getElementById('main-video');
    const mainImage = document.getElementById('main-image');
    const defaultDisplay = document.getElementById('default-display');
    const itemTitle = document.getElementById('item-title');
    const itemDescription = document.getElementById('item-description');
    const itemMeta = document.getElementById('item-meta');
    
    // Hide all display elements first
    if (mainVideo) mainVideo.style.display = 'none';
    if (mainImage) mainImage.style.display = 'none';
    if (defaultDisplay) defaultDisplay.style.display = 'none';
    
    // Update info
    itemTitle.textContent = title;
    itemDescription.textContent = description;
    itemMeta.textContent = `Created in ${year} • ${type.toUpperCase()}`;
    
    // Show loading state briefly
    const displayContainer = document.getElementById('selected-item-display');
    displayContainer.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        // Restore original content
        displayContainer.innerHTML = `
            <video id="main-video" width="100%" height="100%" controls style="border-radius: 15px; display: none;">
                <source src="" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <img id="main-image" src="" alt="Selected artwork" style="width: 100%; height: 100%; object-fit: contain; border-radius: 15px; display: none;">
            <iframe id="main-pdf" src="" style="width: 100%; height: 100%; border: none; border-radius: 15px; display: none;"></iframe>
            <div id="default-display" class="default-content" style="display: none;">
                <h2>Select an item to view</h2>
                <p>Choose from the list on the right to see the full artwork</p>
            </div>
        `;
        
        // Get new references after innerHTML change
        const newMainVideo = document.getElementById('main-video');
        const newMainImage = document.getElementById('main-image');
        const newMainPdf = document.getElementById('main-pdf');
        
        if (type === 'video') {
            newMainVideo.querySelector('source').src = src;
            newMainVideo.load(); // Reload video with new source
            newMainVideo.style.display = 'block';
            
            // Add video event listeners
            newMainVideo.addEventListener('loadstart', function() {
                console.log('Video loading started');
            });
            
            newMainVideo.addEventListener('error', function() {
                console.error('Video failed to load:', src);
                showErrorMessage('Video failed to load');
            });
            
        } else if (type === 'image') {
            newMainImage.src = src;
            newMainImage.style.display = 'block';
            
            // Add image error handling
            newMainImage.addEventListener('error', function() {
                console.error('Image failed to load:', src);
                showErrorMessage('Image failed to load');
            });
            
        } else if (type === 'pdf') {
            // Show PDF message with download link and explicit content warning
            displayContainer.innerHTML = `
                <div class="pdf-message">
                    <h3>📄 PDF Document</h3>
                    <p>This is a PDF art journal that can be viewed or downloaded.</p>
                    <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 15px 0; color: #856404;">
                        <h4 style="margin: 0 0 10px 0; color: #d63031;">⚠️ Content Warning</h4>
                        <p style="margin: 0; font-size: 10px;">This PDF contains explicit content. Viewer discretion is advised.</p>
                    </div>
                    <p><a href="${src}" target="_blank">Click here to open PDF in new tab</a></p>
                    <p style="margin-top: 20px; font-size: 8px; color: #666;">
                        Note: PDF will open in a new browser tab for better viewing experience.
                    </p>
                </div>
            `;
        } else if (type === 'youtube') {
            // Show YouTube video with after-christ styling
            displayContainer.innerHTML = `
                <div class="youtube-container after-christ-youtube" style="position: relative; width: 100%; height: 100%; border-radius: 15px; overflow: hidden; border: 2px solid #ffd700; box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="${src}?autoplay=1&mute=1&loop=1&playlist=${src.split('/').pop()}" 
                        title="${title}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen
                        style="border-radius: 13px;">
                    </iframe>
                    <div class="youtube-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; background: linear-gradient(45deg, rgba(255, 215, 0, 0.1), transparent);"></div>
                </div>
            `;
        }
        
        // Add fade-in animation for non-PDF content
        if (type !== 'pdf') {
            const activeElement = type === 'video' ? newMainVideo : newMainImage;
            activeElement.style.opacity = '0';
            activeElement.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                activeElement.style.opacity = '1';
            }, 100);
        }
        
    }, 500); // Brief loading delay for better UX
}

function resetMainDisplay() {
    const mainVideo = document.getElementById('main-video');
    const mainImage = document.getElementById('main-image');
    const defaultDisplay = document.getElementById('default-display');
    const itemTitle = document.getElementById('item-title');
    const itemDescription = document.getElementById('item-description');
    const itemMeta = document.getElementById('item-meta');
    
    // Hide media elements
    if (mainVideo) mainVideo.style.display = 'none';
    if (mainImage) mainImage.style.display = 'none';
    
    // Show default display
    if (defaultDisplay) defaultDisplay.style.display = 'block';
    
    // Reset info
    itemTitle.textContent = 'Welcome to My Portfolio';
    itemDescription.textContent = 'Select any artwork from the right panel to view it in full detail.';
    itemMeta.textContent = '';
    
    // Remove selected class from all items
    const allItems = document.querySelectorAll('.list-item');
    allItems.forEach(item => item.classList.remove('selected'));
}

function showErrorMessage(message) {
    const displayContainer = document.getElementById('selected-item-display');
    displayContainer.innerHTML = `
        <div class="error-message" style="text-align: center; color: #ff6b9d;">
            <h3 style="font-size: 14px; margin-bottom: 10px;">⚠️ Error</h3>
            <p style="font-size: 10px;">${message}</p>
            <p style="font-size: 8px; margin-top: 10px; color: #999;">Please try selecting another item</p>
        </div>
    `;
}

// Utility function to preload media for better performance
function preloadMedia() {
    const allItems = document.querySelectorAll('.list-item');
    allItems.forEach(item => {
        const type = item.getAttribute('data-type');
        const src = item.getAttribute('data-src');
        
        if (type === 'image') {
            const img = new Image();
            img.src = src;
        }
        // Note: Video preloading is more complex and memory-intensive, 
        // so we'll load videos on-demand
    });
}

// Call preload after a short delay to not block initial page load
setTimeout(preloadMedia, 2000);

// Export functions for global access
window.switchCategory = switchCategory;
window.showCategory = showCategory;
window.selectItem = selectItem;
