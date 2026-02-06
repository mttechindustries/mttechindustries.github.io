// MT Tech Industries - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize feather icons
    feather.replace();
    
    // Mobile Navigation Toggle
    const navHamburger = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('mobile-menu');
    
    if (navHamburger && navMenu) {
        navHamburger.addEventListener('click', function() {
            navMenu.classList.toggle('hidden');
            navHamburger.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!navMenu.classList.contains('hidden')) {
                    navMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                navbar.classList.add('bg-dark-900/95');
            } else {
                navbar.classList.remove('bg-dark-900/95');
            }
        });
    }
    
    // Technology Card Hover Effects
    const techCards = document.querySelectorAll('.glass-panel');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Project Card Button Interactions
    const projectButtons = document.querySelectorAll('.group button');
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectName = this.closest('.glass-panel').querySelector('h3').textContent;
            alert(`Details for ${projectName} would be displayed here. This would link to a dedicated project page.`);
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalHTML = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                submitButton.innerHTML = '<span>Message Sent!</span><i data-feather="check" class="w-4 h-4"></i>';
                submitButton.classList.remove('from-cyan-600', 'to-blue-600', 'hover:from-cyan-500', 'hover:to-blue-500');
                submitButton.classList.add('from-emerald-600', 'to-teal-600');
                
                // Add check icon
                feather.replace();
                
                setTimeout(() => {
                    submitButton.innerHTML = originalHTML;
                    submitButton.disabled = false;
                    submitButton.classList.remove('from-emerald-600', 'to-teal-600');
                    submitButton.classList.add('from-cyan-600', 'to-blue-600', 'hover:from-cyan-500', 'hover:to-blue-500');
                    feather.replace();
                }, 2000);
                
                // Log form data (in real implementation, send to server)
                console.log('Form submitted:', formObject);
                
            }, 1500);
        });
    }
    
    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.glass-panel, .tech-card, .stats div, .grid div, .section-header, .hero-gradient > div'
    );
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Project Detail Buttons - Link to project pages
    const projectDetailButtons = document.querySelectorAll('.text-cyan-400, .text-violet-400, .text-blue-400, .text-rose-400');
    projectDetailButtons.forEach(button => {
        if (button.tagName === 'BUTTON' || button.classList.contains('group-hover:gap-2')) {
            button.addEventListener('click', function() {
                const projectCard = this.closest('.glass-panel');
                if (projectCard) {
                    const projectName = projectCard.querySelector('h3').textContent;
                    // In a real implementation, this would navigate to a project-specific page
                    console.log(`Navigating to details page for: ${projectName}`);
                }
            });
        }
    });
    
    // Stats counters animation
    const stats = document.querySelectorAll('.text-3xl');
    if (stats.length > 0) {
        const animateCounters = () => {
            stats.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/[^\d]/g, '')) || 0;
                if (target > 0 && !stat.dataset.animated) {
                    stat.dataset.animated = true;
                    
                    let current = 0;
                    const increment = target / 50; // Divide by animation duration factor
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                    }, 20);
                }
            });
        };
        
        // Trigger counter animation when stats section comes into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 300);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('#overview'); // Using overview section for stats
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }
    
    // Particle effect for hero background (simplified)
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full pointer-events-none';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.1})`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animation = `fall ${Math.random() * 10 + 10}s linear infinite`;
        
        return particle;
    }

    // Add particle animation CSS
    const particleCSS = `
        @keyframes fall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(calc(100vh + 100px)) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = particleCSS;
    document.head.appendChild(style);
    
    // Add particles to hero section
    const heroSection = document.querySelector('.hero-gradient');
    if (heroSection) {
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = createParticle();
                heroSection.appendChild(particle);
                
                // Remove particle after animation completes
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 20000); // Match animation duration
            }, i * 300);
        }
        
        // Continuously add particles
        setInterval(() => {
            const particle = createParticle();
            heroSection.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 20000);
        }, 300);
    }
    
    console.log('🚀 MT Tech Industries website loaded successfully!');
});

// Analytics tracking (placeholder - replace with actual analytics)
function trackEvent(event, data) {
    console.log('Analytics Event:', event, data);
    // Example: gtag('event', event, data);
}

// Track page views
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
});

// Track project interest
document.querySelectorAll('.glass-panel').forEach(card => {
    card.addEventListener('click', function() {
        const projectName = this.querySelector('h3').textContent;
        trackEvent('project_interest', {
            project: projectName
        });
    });
});

// Track contact form interaction
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('focus', function() {
        trackEvent('contact_form_interaction', {
            action: 'form_focus'
        });
    }, true);
    
    contactForm.addEventListener('submit', function() {
        trackEvent('contact_form_submission', {
            action: 'form_submit'
        });
    }, true);
}