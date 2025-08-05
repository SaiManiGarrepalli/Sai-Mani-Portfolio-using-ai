// Modern Light Theme Portfolio - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeActiveLinks();
    initializeEnhancedFeatures();
});

// Navigation Functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });
    }
}

// Smooth Scrolling - Fixed Implementation
function initializeSmoothScrolling() {
    // Handle all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Handle other anchor links
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.parentElement && entry.target.parentElement.classList.contains('skills-grid')) {
                    const gridItems = Array.from(entry.target.parentElement.children);
                    const index = gridItems.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                if (entry.target.parentElement && entry.target.parentElement.classList.contains('projects-grid')) {
                    const gridItems = Array.from(entry.target.parentElement.children);
                    const index = gridItems.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.15}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .card,
        .timeline-item,
        .highlight-item,
        .activity-item,
        .cert-item
    `);

    animatedElements.forEach(function(element) {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Hero elements animation on load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-actions, .profile-photo');
    heroElements.forEach(function(element, index) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(function() {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
}

// Active Navigation Links
function initializeActiveLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                setActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Set initial active link
    setActiveLink();
}

// Contact Form Handling - Fixed Implementation
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            // Clear previous errors
            clearFormErrors();
            
            // Basic validation
            let hasErrors = false;
            
            if (!name) {
                showFieldError(nameInput, 'Name is required');
                hasErrors = true;
            }
            
            if (!email) {
                showFieldError(emailInput, 'Email is required');
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                showFieldError(emailInput, 'Please enter a valid email address');
                hasErrors = true;
            }
            
            if (!message) {
                showFieldError(messageInput, 'Message is required');
                hasErrors = true;
            }
            
            if (hasErrors) {
                showNotification('Please fix the errors and try again.', 'error');
                return;
            }
            
            // Get submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
            
            // Simulate form submission
            setTimeout(function() {
                // Success state
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #22c55e)';
                
                // Show success message
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--primary-green))';
                }, 3000);
            }, 1500);
        });

        // Input focus effects and validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                clearFieldError(this);
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.parentElement.classList.remove('focused');
                }
            });

            // Real-time validation feedback
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form validation helper functions
function showFieldError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    input.parentElement.appendChild(errorElement);
}

function clearFieldError(input) {
    input.classList.remove('error');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearFormErrors() {
    const errorInputs = document.querySelectorAll('.form-control.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    errorInputs.forEach(input => input.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.nav').offsetHeight || 80;
        const targetPosition = section.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(function(notification) {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Set notification content
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Style notification
    const styles = {
        position: 'fixed',
        top: '100px',
        right: '20px',
        maxWidth: '400px',
        background: getNotificationBackground(type),
        color: getNotificationColor(type),
        border: `1px solid ${getNotificationBorder(type)}`,
        borderRadius: '0.75rem',
        padding: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: '10000',
        transform: 'translateX(500px)',
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
    };
    
    Object.assign(notification.style, styles);
    
    // Add notification styles if not already present
    if (!document.querySelector('.notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.className = 'notification-styles';
        notificationStyles.textContent = `
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .notification-icon {
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            .notification-message {
                flex: 1;
                font-weight: 500;
                line-height: 1.4;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
                color: inherit;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            .notification-close:hover {
                opacity: 1;
                background: rgba(0, 0, 0, 0.1);
            }
            .form-control.error {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(function() {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after delay
    setTimeout(function() {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(500px)';
            notification.style.opacity = '0';
            setTimeout(function() {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        default: return 'ℹ️';
    }
}

function getNotificationBackground(type) {
    switch (type) {
        case 'success': return '#f0fdf4';
        case 'error': return '#fef2f2';
        case 'warning': return '#fffbeb';
        default: return '#eff6ff';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#166534';
        case 'error': return '#dc2626';
        case 'warning': return '#d97706';
        default: return '#1d4ed8';
    }
}

function getNotificationBorder(type) {
    switch (type) {
        case 'success': return '#bbf7d0';
        case 'error': return '#fecaca';
        case 'warning': return '#fed7aa';
        default: return '#dbeafe';
    }
}

// Enhanced Interactive Features
function initializeEnhancedFeatures() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (hero && profilePhoto) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const scrollPercent = scrolled / heroHeight;
            
            if (scrollPercent <= 1) {
                profilePhoto.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 - scrollPercent * 0.05})`;
            }
        });
    }

    // Hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Interactive skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const handleResize = debounce(function() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}, 250);

window.addEventListener('resize', handleResize);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Sai Mani Portfolio - Loaded successfully!');
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;