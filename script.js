// MT Tech Industries - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navHamburger = document.getElementById('nav-hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (navHamburger && navMenu) {
    navHamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navHamburger.classList.toggle('active');
    });
  }

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        navMenu.classList.remove('active');
        navHamburger.classList.remove('active');
      }
    });
  });

  // Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Technology Card Hover Effects
  const techCards = document.querySelectorAll('.tech-card');
  techCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Floating Tech Icons Animation
  const techIcons = document.querySelectorAll('.tech-icon');
  techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2) rotate(10deg)';
      this.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
    });
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Get form data
      const formData = new FormData(this);
      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      setTimeout(() => {
        this.reset();
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = '#10b981';
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          submitButton.style.background = '';
        }, 2000);
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

  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.tech-card, .about-points li, .contact-method');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Consciousness Diagram Animation
  const consciousnessLayers = document.querySelectorAll('.consciousness-layer');
  consciousnessLayers.forEach((layer, index) => {
    layer.style.opacity = '0';
    layer.style.transform = 'translate(-50%, -50%) scale(0.8)';
    layer.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    observer.observe(layer);
  });

  // Particle Effect for Hero Background
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(102, 126, 234, 0.3);
      border-radius: 50%;
      pointer-events: none;
      animation: particle-float 8s linear infinite;
    `;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    return particle;
  }
  const particleCSS = `
    @keyframes particle-float {
      0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = particleCSS;
  document.head.appendChild(style);
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = createParticle();
        heroSection.appendChild(particle);
        setTimeout(() => {
          if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, 8000);
      }, i * 400);
    }
    setInterval(() => {
      const particle = createParticle();
      heroSection.appendChild(particle);
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 8000);
    }, 800);
  }
});
