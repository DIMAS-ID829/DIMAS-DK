//javascript file//

// ============================================
// INITIALIZE AOS (Animate On Scroll)
// ============================================
AOS.init({
    once: true,
    offset: 200, // Increased from 10 to trigger earlier
    duration: 400 // Reduced from 800 for faster animation
});

// ============================================
// Enhanced JavaScript for Portfolio Website
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Welcome Screen Functionality
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainPortfolio = document.querySelector('main');
    const websiteText = document.getElementById('websiteText');
    const typingCursor = document.querySelector('.typing-cursor');

    // Typewriter Effect for Website URL in Welcome Screen
    const websiteURL = 'www.dk.id';
    let urlIndex = 0;
    let typingComplete = false;

    function typeWebsiteURL() {
        if (urlIndex < websiteURL.length) {
            websiteText.innerHTML += `<span class="gradient-char">${websiteURL.charAt(urlIndex)}</span>`;
            urlIndex++;
            setTimeout(typeWebsiteURL, 260);
        } else {
            typingComplete = true;
            setTimeout(() => {
                if (typingCursor) {
                    typingCursor.style.display = 'none';
                }
                
                const linkContainer = document.createElement('div');
                linkContainer.className = 'website-link-container';
                
                const link = document.createElement('a');
                link.href = 'https://www.dk.id';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'website-link';
                
                const linkGlow = document.createElement('div');
                linkGlow.className = 'website-link-glow';
                link.appendChild(linkGlow);
                
                const linkContent = document.createElement('div');
                linkContent.className = 'website-link-content';
                
                const globeIcon = document.createElement('svg');
                globeIcon.className = 'globe-icon';
                globeIcon.setAttribute('viewBox', '0 0 20 20');
                globeIcon.innerHTML = '<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M14.66 14.66l1.41 1.41M4.93 14.07l1.41-1.41M14.66 5.34l1.41-1.41" stroke="currentColor" stroke-width="1.5"/>';
                linkContent.appendChild(globeIcon);
                
                const websiteSpan = document.createElement('span');
                websiteSpan.className = 'website-text';
                websiteSpan.textContent = websiteURL;
                linkContent.appendChild(websiteSpan);
                
                link.appendChild(linkContent);
                linkContainer.appendChild(link);
                
                websiteText.innerHTML = '';
                websiteText.parentNode.replaceChild(linkContainer, websiteText);
                
                setTimeout(() => {
                    if (welcomeScreen) {
                        welcomeScreen.classList.add('fade-out');
                        
                        setTimeout(() => {
                            welcomeScreen.style.display = 'none';
                            if (mainPortfolio) {
                                mainPortfolio.classList.add('active');
                            }
                            
                            if (typeof AOS !== 'undefined') {
                                AOS.refresh();
                            }
                        }, 1000);
                    }
                }, 2000);
            }, 500);
        }
    }

    if (websiteText) {
        setTimeout(typeWebsiteURL, 1800);
    }

    // DOM Elements
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const heroSubtitle = document.getElementById('rotating-profession');
    const ctaBtn = document.querySelector('.cta-btn');
    const hireBtns = document.querySelectorAll('.hire-btn');
    const aboutBtn = document.querySelector('.about-btn');
    const socialIcons = document.querySelectorAll('.social-icon');

    // Professions for typewriter effect
    const professions = [
        'Full-Stack Developer',
        'Frontend Engineer', 
        'Backend Developer',
        'UI/UX Designer',
        'Tech Innovator'
    ];

    // Typewriter Effect
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        if (!heroSubtitle) return;
        
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            heroSubtitle.innerHTML = "I'm a " + currentProfession.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
            charIndex--;
            typingSpeed = 75;
        } else {
            heroSubtitle.innerHTML = "I'm a " + currentProfession.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentProfession.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Smooth Scroll Navigation
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header?.offsetHeight || 80;
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (navMenu?.classList.contains('active')) {
                    toggleMobileMenu();
                }

                updateActiveNavLink(targetId);
            }
        }
    }

    // Update Active Navigation Link
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Scroll-based Header Effects
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    // Scroll-based Active Navigation
    function updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + (header?.offsetHeight || 80);

        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });

        if (activeSection) {
            const id = '#' + activeSection.getAttribute('id');
            updateActiveNavLink(id);
            
            if (history.pushState) {
                history.pushState(null, null, id);
            }
        } else if (scrollPosition < 100) {
            updateActiveNavLink('#home');
        }
    }

    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavFromScroll, 50);
    });

    // Intersection Observer for Animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                const siblings = entry.target.parentElement?.querySelectorAll('.animate-on-scroll');
                if (siblings && siblings.length > 1) {
                    siblings.forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.style.opacity = '1';
                            sibling.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Setup animations for elements
    function setupAnimations() {
        const animatedElements = document.querySelectorAll(
            '.hero-stats .stat, .about-highlights .highlight, .floating-card, .social-icon'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            el.style.transitionDelay = `${index * 0.1}s`;
            
            animationObserver.observe(el);
        });
    }

    // Button Click Handlers
    function handleButtonClick(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        if (button.classList.contains('cta-btn') || button.textContent.includes('Hire')) {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                showNotification('Contact section coming soon!', 'info');
            }
        } else if (button.textContent.includes('Download CV')) {
            showNotification('CV download will be available soon!', 'info');
        }
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const iconClass = type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : 'exclamation-triangle';
        const bgColor = type === 'info' ? 'var(--accent-primary)' : type === 'success' ? '#10b981' : '#ef4444';

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${iconClass}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: bgColor,
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Keyboard Navigation
    function handleKeyboard(event) {
        if (event.key === 'Escape' && navMenu?.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        if (navMenu?.classList.contains('active') && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault();
            const currentActive = document.querySelector('.nav-link:focus') || document.querySelector('.nav-link.active');
            const navLinksArray = Array.from(navLinks);
            const currentIndex = navLinksArray.indexOf(currentActive);
            
            let nextIndex;
            if (event.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % navLinksArray.length;
            } else {
                nextIndex = currentIndex <= 0 ? navLinksArray.length - 1 : currentIndex - 1;
            }
            
            navLinksArray[nextIndex]?.focus();
        }
    }

    // Performance Optimized Scroll Handler
    let ticking = false;
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Debounced Resize Handler
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth >= 769 && navMenu?.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 250);
    }

    // Initialize Active Navigation from Hash
    function initializeActiveNav() {
        const hash = window.location.hash || '#home';
        updateActiveNavLink(hash);
        
        if (hash !== '#home') {
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = header?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    }

    // Event Listeners
    hamburger?.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    [ctaBtn, ...hireBtns, aboutBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleButtonClick);
        }
    });

    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    window.addEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('resize', handleResize);
    window.addEventListener('hashchange', initializeActiveNav);
    document.addEventListener('keydown', handleKeyboard);

    document.addEventListener('click', (event) => {
        if (navMenu?.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !hamburger?.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    // Initialize everything
    function init() {
        if (heroSubtitle) {
            typeWriter();
        }
        
        setupAnimations();
        initializeActiveNav();
        handleScroll();
        
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        console.log('Portfolio website initialized successfully! 🚀');
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!data.name || !data.email || !emailRegex.test(data.email) || !data.subject || !data.message) {
                showNotification('Please fill in all fields with valid email', 'error');
                return;
            }

            console.log('Form submitted:', data);
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            this.reset();
        });
    }

    // JavaScript for Modals with Carousel Pause
    const skillCards = document.querySelectorAll('.skill-card');
    const modals = document.querySelectorAll('.modal');
    const closes = document.querySelectorAll('.close');
    const carousel = document.querySelector('.skills-carousel');

    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            const modal = document.getElementById(`modal-${skill}`);
            if (modal) {
                modal.style.display = 'block';
                if (carousel) {
                    carousel.style.animationPlayState = 'paused'; // Pause carousel when modal opens
                }
            }
        });
    });

    closes.forEach(close => {
        close.addEventListener('click', function() {
            this.parentElement.parentElement.style.display = 'none';
            if (carousel) {
                carousel.style.animationPlayState = 'running'; // Resume carousel when modal closes
            }
        });
    });

    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                if (carousel) {
                    carousel.style.animationPlayState = 'running'; // Resume carousel when modal closes via outside click
                }
            }
        });
    });

    // Add to your existing JS (inside DOMContentLoaded)
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModals = document.querySelectorAll('.modal'); // Assuming all modals, but filter if needed
    const serviceCloses = document.querySelectorAll('.close');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const modal = document.getElementById(`modal-${service}`);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    serviceCloses.forEach(close => {
        close.addEventListener('click', function() {
            this.parentElement.parentElement.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        serviceModals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    init();

    // Add CSS for ripple effect and notifications
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
        
        .loaded {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .website-text .gradient-char {
            background: linear-gradient(to right, #6366f1, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .website-link-container {
            animation: fadeUp 0.6s ease backwards;
            animation-delay: 1.6s;
        }
        
        .website-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px);
            border-radius: 9999px;
            text-decoration: none;
            position: relative;
            transition: transform 0.3s ease;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(168, 85, 247, 0.2);
        }
        
        .website-link:hover {
            transform: scale(1.05);
        }
        
        .website-link-glow {
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
            border-radius: 9999px;
            filter: blur(8px);
            transition: filter 0.3s ease;
        }
        
        .website-link:hover .website-link-glow {
            filter: blur(12px);
        }
        
        .website-link-content {
            position: relative;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .globe-icon {
            width: clamp(16px, 4vw, 20px);
            height: clamp(16px, 4vw, 20px);
            color: #6366f1;
            stroke: currentColor;
            fill: none;
        }
        
        .website-text {
            font-size: clamp(18px, 4vw, 24px);
            background: linear-gradient(to right, #6366f1, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .typing-cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background: linear-gradient(to bottom, #6366f1, #a855f7);
            margin-left: 2px;
            animation: blink 0.7s infinite;
            vertical-align: middle;
        }
        
        @keyframes blink {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
        }
        
        .nav-link:focus-visible,
        .social-icon:focus-visible,
        .hire-btn:focus-visible,
        .cta-btn:focus-visible,
        .website-link:focus-visible {
            outline: 2px solid var(--accent-primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// Disable right-click and certain keyboard shortcuts
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function (e) {
    if (
        (e.ctrlKey && (e.key === 's' || e.key === 'u')) ||
        e.key === 'F12'
    ) {
        e.preventDefault();
    }
});
