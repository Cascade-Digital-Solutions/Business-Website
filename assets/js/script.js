/**
 * Professional Portfolio JavaScript
 * Handles animations, smooth scrolling, and interactive features
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/**
 * Initialize all portfolio functionality
 */
function initializePortfolio() {
    setupSmoothScrolling();
    setupScrollAnimations();
    updateProfileInitials();
    setupContactForm();
    setupSkillsInteraction();
    setupPerformanceOptimizations();
}

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientPosition().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Setup scroll-triggered animations
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add staggered animation for skill tags
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillTags(entry.target);
                }
                
                // Add staggered animation for service cards
                if (entry.target.classList.contains('services-grid')) {
                    animateServiceCards(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections and grid containers
    const elementsToObserve = document.querySelectorAll('section, .skills-grid, .services-grid');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animate skill tags with staggered effect
 */
function animateSkillTags(skillsGrid) {
    const skillTags = skillsGrid.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
}

/**
 * Animate service cards with staggered effect
 */
function animateServiceCards(servicesGrid) {
    const serviceCards = servicesGrid.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

/**
 * Update profile placeholder with initials from name
 */
function updateProfileInitials() {
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    const nameElement = document.querySelector('h1');
    
    if (profilePlaceholder && nameElement) {
        const name = nameElement.textContent.trim();
        const initials = name
            .split(' ')
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase())
            .join('');
        
        profilePlaceholder.textContent = initials;
    }
}

/**
 * Setup contact form functionality (if form is added later)
 */
function setupContactForm() {
    // Add email validation for contact links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email click for analytics (if needed)
            console.log('Email contact initiated');
            
            // Could add custom modal or confirmation here
        });
    });

    // Add phone number formatting
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone click for analytics (if needed)
            console.log('Phone contact initiated');
        });
    });
}

/**
 * Setup interactive skills functionality
 */
function setupSkillsInteraction() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        // Add click handler for mobile interaction
        category.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Add hover sound effect (optional)
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Make skill tags interactive
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Could open skill details modal or link to portfolio examples
            const skillName = this.textContent;
            console.log(`Skill clicked: ${skillName}`);
            
            // Add temporary highlight effect
            this.style.background = '#667eea';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.background = '#e9ecef';
                this.style.color = '#495057';
            }, 200);
        });
    });
}

/**
 * Setup performance optimizations
 */
function setupPerformanceOptimizations() {
    // Lazy load images when they're added
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Preload critical resources
    preloadCriticalResources();
    
    // Setup scroll performance optimization
    optimizeScrollPerformance();
}

/**
 * Preload critical resources
 */
function preloadCriticalResources() {
    // Preload fonts if using custom fonts
    const fontPreloads = [
        // Add custom font URLs here if needed
    ];
    
    fontPreloads.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = fontUrl;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

/**
 * Optimize scroll performance
 */
function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollPosition() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Add parallax effect to header if needed
        const header = document.querySelector('header');
        if (header && scrolled < window.innerHeight) {
            header.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Utility function for debouncing
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Setup responsive navigation (for future mobile menu)
 */
function setupResponsiveNavigation() {
    // This function is ready for when you add a mobile navigation menu
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navigationMenu = document.querySelector('.navigation-menu');
    
    if (mobileMenuButton && navigationMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navigationMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

/**
 * Setup keyboard navigation accessibility
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close any open modals or menus
        if (e.key === 'Escape') {
            const activeElements = document.querySelectorAll('.active, .open');
            activeElements.forEach(element => {
                element.classList.remove('active', 'open');
            });
        }
        
        // Enter key on service cards for accessibility
        if (e.key === 'Enter' && e.target.classList.contains('service-card')) {
            e.target.click();
        }
    });
}

/**
 * Setup analytics tracking (ready for implementation)
 */
function setupAnalytics() {
    // Track button clicks
    const trackableButtons = document.querySelectorAll('.btn, .service-card, .skill-category');
    
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const elementType = this.classList.contains('btn') ? 'button' : 
                               this.classList.contains('service-card') ? 'service' : 'skill';
            const elementText = this.textContent.trim().substring(0, 50);
            
            // Send to analytics service
            console.log(`Tracked: ${elementType} - ${elementText}`);
            
            // Example: gtag('event', 'click', { 'element_type': elementType });
        });
    });
}

/**
 * Initialize all functionality when DOM is ready
 */
function initializeAccessibility() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, .skill-tag, .service-card');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility and keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    setupKeyboardNavigation();
    initializeAccessibility();
    setupAnalytics();
});

// Handle window resize events
window.addEventListener('resize', debounce(function() {
    // Recalculate any layout-dependent features
    console.log('Window resized, recalculating layout...');
}, 250));

// Export functions for potential external use
window.portfolioUtils = {
    updateProfileInitials,
    setupSmoothScrolling,
    animateSkillTags,
    animateServiceCards
};
