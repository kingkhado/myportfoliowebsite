// Content Warning System
class ContentWarningManager {
    constructor() {
        this.warnings = {
            // 18+ Content
            'BONDAGE DRAWING': { rating: '18+', reasons: ['Adult Content', 'Mature Themes'] },
            'mental bondage collage': { rating: '18+', reasons: ['Adult Content', 'Mature Themes'] },
            
            // Rated R Content
            'AFTERDARK X SOVA RUSHBITE': { rating: 'RATED R', reasons: ['Strong Language', 'Mature Content'] },
            'unknown p full version final': { rating: 'RATED R', reasons: ['Strong Language', 'Violence'] },
            
            // PG13 Content
            'shower deep thoughtsffla': { rating: 'PG13', reasons: ['Mild Language', 'Suggestive Content'] },
            'Shower Deep Thoughts': { rating: 'PG13', reasons: ['Mild Language', 'Suggestive Content'] },
            'PARALYZED': { rating: 'PG13', reasons: ['Intense Themes'] },
            'Paralyzed': { rating: 'PG13', reasons: ['Intense Themes'] },
            
            // Language warnings
            'the real jay-1_1_1': { rating: 'L', reasons: ['Strong Language'] },
            'The Real Jay': { rating: 'L', reasons: ['Strong Language'] },
            
            // Violence warnings
            'captive mover': { rating: 'V', reasons: ['Violence', 'Intense Action'] },
            'Captive Mover': { rating: 'V', reasons: ['Violence', 'Intense Action'] }
        };
        
        this.init();
    }

    init() {
        this.createModalHTML();
        this.addWarningBadges();
        this.attachEventListeners();
    }

    createModalHTML() {
        const modalHTML = `
            <div id="content-warning-modal" class="warning-modal">
                <div class="warning-modal-content">
                    <div class="warning-header">
                        <div class="warning-icon">⚠️</div>
                        <h2>CONTENT WARNING</h2>
                    </div>
                    <div class="warning-body">
                        <div class="rating-badge" id="modal-rating"></div>
                        <div class="warning-reasons" id="modal-reasons"></div>
                        <p class="warning-message">This content may contain material that some viewers might find inappropriate or disturbing.</p>
                    </div>
                    <div class="warning-actions">
                        <button class="warning-btn cancel-btn" onclick="contentWarningManager.closeModal()">
                            <span class="btn-text">GO BACK</span>
                        </button>
                        <button class="warning-btn proceed-btn" onclick="contentWarningManager.proceedToContent()">
                            <span class="btn-text">I UNDERSTAND, CONTINUE</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    addWarningBadges() {
        const listItems = document.querySelectorAll('.list-item');
        
        listItems.forEach(item => {
            const title = item.getAttribute('data-title');
            const warning = this.warnings[title];
            
            if (warning) {
                // Create warning badge
                const badge = document.createElement('span');
                badge.className = `warning-badge rating-${warning.rating.toLowerCase().replace(/\+/g, 'plus').replace(/\s/g, '-')}`;
                badge.textContent = warning.rating;
                badge.title = `Content Warning: ${warning.reasons.join(', ')}`;
                
                // Add badge to item
                const itemName = item.querySelector('.item-name');
                if (itemName) {
                    itemName.appendChild(badge);
                }
                
                // Add warning class to item
                item.classList.add('has-warning');
                item.setAttribute('data-warning', JSON.stringify(warning));
            }
        });
    }

    attachEventListeners() {
        const listItems = document.querySelectorAll('.list-item.has-warning');
        
        listItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const warning = JSON.parse(item.getAttribute('data-warning'));
                this.showWarningModal(warning, item);
            });
        });
    }

    showWarningModal(warning, item) {
        const modal = document.getElementById('content-warning-modal');
        const ratingBadge = document.getElementById('modal-rating');
        const reasonsList = document.getElementById('modal-reasons');
        
        // Set rating badge
        ratingBadge.textContent = warning.rating;
        ratingBadge.className = `rating-badge rating-${warning.rating.toLowerCase().replace(/\+/g, 'plus').replace(/\s/g, '-')}`;
        
        // Set reasons
        reasonsList.innerHTML = warning.reasons.map(reason => 
            `<span class="reason-tag">${reason}</span>`
        ).join('');
        
        // Store current item for proceed action
        this.currentItem = item;
        
        // Show modal with animation
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('content-warning-modal');
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    proceedToContent() {
        if (this.currentItem) {
            // Remove warning event listener temporarily
            const newItem = this.currentItem.cloneNode(true);
            this.currentItem.parentNode.replaceChild(newItem, this.currentItem);
            
            // Trigger the original click event
            const event = new Event('click');
            newItem.dispatchEvent(event);
            
            // Re-attach warning listener after a delay
            setTimeout(() => {
                newItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const warning = JSON.parse(newItem.getAttribute('data-warning'));
                    this.showWarningModal(warning, newItem);
                });
            }, 1000);
        }
        
        this.closeModal();
    }

    // Method to bypass warning for specific content (for testing)
    bypassWarning(itemTitle) {
        const item = document.querySelector(`[data-title="${itemTitle}"]`);
        if (item && item.classList.contains('has-warning')) {
            item.classList.remove('has-warning');
            item.removeAttribute('data-warning');
            
            const badge = item.querySelector('.warning-badge');
            if (badge) badge.remove();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.portfolio-container')) {
        window.contentWarningManager = new ContentWarningManager();
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('content-warning-modal');
    if (modal && e.target === modal) {
        window.contentWarningManager.closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('content-warning-modal');
        if (modal && modal.style.display === 'flex') {
            window.contentWarningManager.closeModal();
        }
    }
});
