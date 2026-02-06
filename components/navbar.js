// Custom element for navigation bar
class MtNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-slate-800">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <a href="#" class="flex items-center gap-3">
              <img src="../MT-Tech-Industries.png" alt="MT Tech Industries Logo" class="w-10 h-10 rounded-lg object-contain">
              <span class="text-xl font-bold text-slate-100">MT Tech Industries</span>
            </a>
            
            <div class="hidden md:flex items-center gap-8">
              <a href="#overview" class="text-slate-300 hover:text-cyan-400 transition-colors">Overview</a>
              <a href="#technologies" class="text-slate-300 hover:text-cyan-400 transition-colors">Technologies</a>
              <a href="#infrastructure" class="text-slate-300 hover:text-cyan-400 transition-colors">Infrastructure</a>
              <a href="#contact" class="text-slate-300 hover:text-cyan-400 transition-colors">Contact</a>
            </div>
            
            <button id="mobile-menu-toggle" class="md:hidden text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4">
            <div class="flex flex-col gap-3">
              <a href="#overview" class="text-slate-300 hover:text-cyan-400 transition-colors py-2">Overview</a>
              <a href="#technologies" class="text-slate-300 hover:text-cyan-400 transition-colors py-2">Technologies</a>
              <a href="#infrastructure" class="text-slate-300 hover:text-cyan-400 transition-colors py-2">Infrastructure</a>
              <a href="#contact" class="text-slate-300 hover:text-cyan-400 transition-colors py-2">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    `;
    
    // Add mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          mobileMenu.classList.add('hidden');
        }
      });
    });
  }
}

customElements.define('mt-nav', MtNav);