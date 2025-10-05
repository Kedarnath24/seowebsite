// DOM Elements
const getStartedBtn = document.getElementById('getStartedBtn');
const contentWrapper = document.querySelector('.content-wrapper');
const backgroundContainer = document.querySelector('.background-container');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure all elements are ready
    setTimeout(() => {
        initializeAnimations();
        setupInteractions();
        setupAccessibility();
    }, 200);
});

// Initialize entrance animations and effects
function initializeAnimations() {
    // Add loaded class for styling control
    document.body.classList.add('loaded');
    
    // Create highly visible floating particles
    createFloatingParticles();
    
    // Ensure orbs are visible by adding additional visual elements
    enhanceBackgroundOrbs();
    
    // Force reflow to ensure animations are visible
    if (contentWrapper) {
        contentWrapper.offsetHeight; // Force reflow
        contentWrapper.style.visibility = 'visible';
    }
}

// Enhance background orbs visibility
function enhanceBackgroundOrbs() {
    // Add more visible floating orbs as div elements
    const orbs = [
        { size: 300, color: 'rgba(59, 130, 246, 0.4)', top: '20%', left: '80%', duration: 20 },
        { size: 250, color: 'rgba(168, 85, 247, 0.3)', top: '70%', left: '10%', duration: 25 },
        { size: 200, color: 'rgba(34, 197, 94, 0.3)', top: '40%', left: '50%', duration: 30 }
    ];
    
    orbs.forEach((orb, index) => {
        const orbElement = document.createElement('div');
        orbElement.className = `floating-orb floating-orb-${index}`;
        orbElement.style.cssText = `
            position: fixed;
            width: ${orb.size}px;
            height: ${orb.size}px;
            background: radial-gradient(circle, ${orb.color} 0%, transparent 70%);
            border-radius: 50%;
            top: ${orb.top};
            left: ${orb.left};
            pointer-events: none;
            z-index: 1;
            filter: blur(60px);
            opacity: 0.8;
            animation: floatOrb ${orb.duration}s ease-in-out infinite;
            animation-delay: ${index * -5}s;
        `;
        
        backgroundContainer.appendChild(orbElement);
    });
    
    // Add floating orb animation if not present
    if (!document.querySelector('#floating-orb-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-orb-styles';
        style.textContent = `
            @keyframes floatOrb {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                }
                25% {
                    transform: translate(100px, -80px) scale(1.2);
                }
                50% {
                    transform: translate(-60px, 120px) scale(0.8);
                }
                75% {
                    transform: translate(-80px, -60px) scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup button interactions and effects
function setupInteractions() {
    if (getStartedBtn) {
        // Enhanced mouse enter effect
        getStartedBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.08)';
            this.style.boxShadow = `
                0 15px 40px rgba(59, 130, 246, 0.6),
                0 0 60px rgba(139, 92, 246, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `;
        });
        
        // Mouse leave effect
        getStartedBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = `
                0 4px 25px rgba(59, 130, 246, 0.4),
                0 0 20px rgba(139, 92, 246, 0.2)
            `;
        });
        
        // Enhanced click handler with very visible ripple effect
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create highly visible ripple effect
            createEnhancedRippleEffect(e, this);
            
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
            }, 300);
            
            // Handle the action
            handleGetStartedClick();
        });
        
        // Keyboard interaction
        getStartedBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Create a synthetic click event for keyboard users
                const rect = this.getBoundingClientRect();
                const syntheticEvent = new MouseEvent('click', {
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2,
                    bubbles: true
                });
                this.dispatchEvent(syntheticEvent);
            }
        });
        
        // Touch events for mobile
        getStartedBtn.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        getStartedBtn.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 100);
        });
    }
}

// Handle the get started button click
function handleGetStartedClick() {
    console.log('Get Started button clicked!');
    
    // Add visual feedback
    const button = getStartedBtn;
    
    // Create success pulse animation
    button.style.animation = 'successPulse 0.8s ease-out';
    
    // Add success pulse keyframes if not present
    if (!document.querySelector('#success-pulse-styles')) {
        const style = document.createElement('style');
        style.id = 'success-pulse-styles';
        style.textContent = `
            @keyframes successPulse {
                0% { 
                    box-shadow: 0 4px 25px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2); 
                }
                50% { 
                    box-shadow: 0 0 0 30px rgba(16, 185, 129, 0.4), 0 0 80px rgba(6, 182, 212, 0.6); 
                    transform: scale(1.1);
                }
                100% { 
                    box-shadow: 0 4px 25px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2); 
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Reset animation after completion
    setTimeout(() => {
        button.style.animation = '';
    }, 800);
    
    // Show click feedback
    showClickFeedback();
}

// Show click feedback
function showClickFeedback() {
    // Create a temporary message
    const feedback = document.createElement('div');
    feedback.textContent = 'Welcome! Loading your experience...';
    feedback.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.4s ease-out;
        box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
        text-align: center;
        min-width: 280px;
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => feedback.remove(), 400);
    }, 3000);
}

// Create highly visible ripple effect
function createEnhancedRippleEffect(e, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight) * 2;
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - radius;
    const y = e.clientY - rect.top - radius;
    
    circle.style.cssText = `
        position: absolute;
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: rippleEffect 1s ease-out;
        pointer-events: none;
        z-index: 0;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    `;
    
    circle.classList.add('ripple');
    
    // Remove existing ripples
    const existingRipples = element.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    // Add new ripple
    element.appendChild(circle);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (circle.parentNode) {
            circle.remove();
        }
    }, 1000);
}

// Create floating particles for enhanced background effect
function createFloatingParticles() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const particleCount = window.innerWidth > 768 ? 12 : 6;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(i), i * 150);
    }
}

// Create individual floating particle with high visibility
function createParticle(index) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // Larger, more visible particles
    const size = Math.random() * 8 + 4;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 10 + 20;
    const delay = Math.random() * 15;
    
    // Bright, visible colors
    const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(6, 182, 212, 0.7)'
    ];
    const color = colors[index % colors.length];
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color} 0%, transparent 70%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 2;
        opacity: 1;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        will-change: transform;
        box-shadow: 0 0 ${size * 3}px ${color};
    `;
    
    if (backgroundContainer) {
        backgroundContainer.appendChild(particle);
    }
}

// Setup accessibility features
function setupAccessibility() {
    // Ensure proper focus management
    if (getStartedBtn) {
        getStartedBtn.setAttribute('aria-label', 'Get started with our platform');
        getStartedBtn.setAttribute('role', 'button');
    }
    
    // Handle reduced motion preferences
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion(e) {
        if (e.matches) {
            document.body.classList.add('reduced-motion');
            // Remove particles and orbs for users who prefer reduced motion
            const particles = document.querySelectorAll('.floating-particle, .floating-orb');
            particles.forEach(particle => particle.remove());
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
    
    reducedMotionQuery.addListener(handleReducedMotion);
    handleReducedMotion(reducedMotionQuery);
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Performance optimization - throttle resize events
function throttle(func, wait) {
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

// Handle window resize for responsive behavior
window.addEventListener('resize', throttle(function() {
    // Update particles and orbs for new screen size
    const particles = document.querySelectorAll('.floating-particle, .floating-orb');
    particles.forEach((particle, index) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
    });
}, 300));

// Page visibility API for performance
document.addEventListener('visibilitychange', function() {
    const animatedElements = document.querySelectorAll('.floating-particle, .floating-orb, .gradient-orb');
    
    if (document.hidden) {
        // Pause animations when page is not visible
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Add loading progress indicator
window.addEventListener('load', function() {
    // Ensure all animations are properly initialized
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
    }, 500);
});

// Export functions for potential future use
window.WelcomePage = {
    handleGetStartedClick,
    createEnhancedRippleEffect,
    showClickFeedback,
    enhanceBackgroundOrbs
};