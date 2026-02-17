# Navigation Structure for MT Tech Industries Website

## Current Navigation Analysis

### Existing Navigation Components
- Main navigation in `components/navbar.js` (custom element)
- Footer navigation in `components/footer.js` (custom element)
- Current navigation appears to be consistent across all pages

### Current Navigation Structure
1. Home
2. Technologies/Projects
3. About/Company Info
4. Contact

## Proposed Role-Based Navigation System

### 1. Public Navigation (Unauthenticated Users)
Accessible to all visitors without authentication:

#### Header Navigation
- **Home** - Main landing page with company overview
- **Technologies** - High-level overview of core technology areas
- **Projects** - Surface-level project descriptions (teasers only)
- **About** - Company mission, values, and methodology
- **Contact** - General contact information and inquiry forms

#### Footer Navigation
- **Privacy Policy** - Legal information and IP protection notices
- **Terms of Use** - Usage guidelines and restrictions
- **Contact Info** - Email addresses for different inquiry types
- **Social Links** - Professional social media profiles

#### Special Elements for Public Users
- "Request Access" buttons/prompts for advanced content
- Registration/login prompts in appropriate locations
- Limited project detail views with "Learn More" buttons linking to secure access

### 2. Partner Navigation
For business partners with basic access:

#### Header Navigation
- **Dashboard** - Partner dashboard with account information
- **Projects** - Detailed project information relevant to partnerships
- **Resources** - Technical documentation and integration guides
- **Collaboration** - Partnership tools and communication channels
- **Support** - Partner-specific support resources

#### Additional Elements
- Access to basic technical documentation
- Partner-specific roadmaps and timelines
- Integration guides and API documentation
- Dedicated partner support channels

### 3. Investor Navigation
For investors with financial and strategic information:

#### Header Navigation
- **Dashboard** - Investor dashboard with portfolio information
- **Financials** - Financial reports, projections, and market analysis
- **Roadmaps** - Strategic roadmaps and development timelines
- **IP Portfolio** - Intellectual property portfolio and protection status
- **Reports** - Quarterly reports and strategic analyses

#### Additional Elements
- Financial documents and projections
- Market opportunity analyses
- Investment updates and communications
- Board meeting materials (for board members)

### 4. Collaborator Navigation
For research collaborators with deep technical access:

#### Header Navigation
- **Research Hub** - Central location for research materials
- **Technical Docs** - Detailed technical specifications and research papers
- **Tools** - Research tools and simulation platforms
- **Data** - Access to research datasets and experimental results
- **Communication** - Research collaboration tools

#### Additional Elements
- Detailed technical documentation
- Research methodologies and protocols
- Experimental data and results
- Research collaboration tools and forums

### 5. Admin Navigation
For internal staff with full access:

#### Header Navigation
- **Admin Dashboard** - Administrative tools and system status
- **User Management** - User accounts and permissions
- **Content Management** - Website content and documentation
- **Analytics** - User analytics and system monitoring
- **Security** - Security logs and IP protection monitoring

## Implementation Strategy

### 1. Dynamic Navigation System
Create a JavaScript-based navigation system that renders different menus based on user authentication status:

```javascript
// Navigation manager
const NavigationManager = {
    init: function() {
        this.updateNavigation();
        this.setupEventListeners();
    },

    getUserRole: function() {
        // Get user role from session storage or authentication token
        return sessionStorage.getItem('accessLevel') || 'public';
    },

    updateNavigation: function() {
        const userRole = this.getUserRole();
        const navContainer = document.getElementById('main-navigation');
        
        if (navContainer) {
            navContainer.innerHTML = this.getNavigationForRole(userRole);
            this.highlightCurrentPage();
        }
        
        // Update footer navigation if needed
        const footerNav = document.getElementById('footer-navigation');
        if (footerNav) {
            footerNav.innerHTML = this.getFooterNavigationForRole(userRole);
        }
    },

    getNavigationForRole: function(role) {
        switch(role) {
            case 'admin':
                return this.adminNavigationTemplate();
            case 'investor':
                return this.investorNavigationTemplate();
            case 'collaborator':
                return this.collaboratorNavigationTemplate();
            case 'partner':
                return this.partnerNavigationTemplate();
            default:
                return this.publicNavigationTemplate();
        }
    },

    publicNavigationTemplate: function() {
        return `
            <nav class="flex items-center justify-between p-6">
                <div class="flex items-center space-x-10">
                    <a href="index.html" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        MT Tech
                    </a>
                    <div class="hidden md:flex space-x-8">
                        <a href="index.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Home</a>
                        <a href="#technologies" class="text-slate-300 hover:text-cyan-400 transition-colors">Technologies</a>
                        <a href="#projects" class="text-slate-300 hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="#about" class="text-slate-300 hover:text-cyan-400 transition-colors">About</a>
                        <a href="#contact" class="text-slate-300 hover:text-cyan-400 transition-colors">Contact</a>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="secure-access.html" class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white hover:opacity-90 transition-opacity">
                        Access Portal
                    </a>
                </div>
            </nav>
        `;
    },

    partnerNavigationTemplate: function() {
        return `
            <nav class="flex items-center justify-between p-6">
                <div class="flex items-center space-x-10">
                    <a href="index.html" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        MT Tech
                    </a>
                    <div class="hidden md:flex space-x-8">
                        <a href="index.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Dashboard</a>
                        <a href="secure-portal.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="docs/partner-resources.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Resources</a>
                        <a href="collaboration-tools.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Collaborate</a>
                        <a href="support.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Support</a>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-cyan-400">Partner</span>
                    <a href="logout.html" class="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                        Logout
                    </a>
                </div>
            </nav>
        `;
    },

    // Similar templates for investor, collaborator, and admin roles...

    highlightCurrentPage: function() {
        // Highlight the current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('#main-navigation a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === '')) {
                link.classList.add('text-cyan-400');
                link.classList.remove('text-slate-300');
            }
        });
    },

    setupEventListeners: function() {
        // Add event listeners for mobile menu, etc.
    }
};

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    NavigationManager.init();
});
```

### 2. Custom Navigation Elements
Update the custom navigation components to support role-based content:

#### Updated `components/navbar.js`
```javascript
// Custom element for navigation bar
class MTNavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addStyles();
    }

    render() {
        const userRole = sessionStorage.getItem('accessLevel') || 'public';
        
        this.shadowRoot.innerHTML = `
            <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div class="container mx-auto px-6">
                    ${this.getNavigationHTML(userRole)}
                </div>
            </header>
        `;
    }

    getNavigationHTML(role) {
        switch(role) {
            case 'admin':
                return this.getAdminNavigation();
            case 'investor':
                return this.getInvestorNavigation();
            case 'collaborator':
                return this.getCollaboratorNavigation();
            case 'partner':
                return this.getPartnerNavigation();
            default:
                return this.getPublicNavigation();
        }
    }

    getPublicNavigation() {
        return `
            <nav class="flex items-center justify-between p-6">
                <div class="flex items-center space-x-10">
                    <a href="index.html" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        MT Tech
                    </a>
                    <div class="hidden md:flex space-x-8">
                        <a href="index.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Home</a>
                        <a href="#technologies" class="text-slate-300 hover:text-cyan-400 transition-colors">Technologies</a>
                        <a href="#projects" class="text-slate-300 hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="#about" class="text-slate-300 hover:text-cyan-400 transition-colors">About</a>
                        <a href="#contact" class="text-slate-300 hover:text-cyan-400 transition-colors">Contact</a>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="secure-access.html" class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white hover:opacity-90 transition-opacity">
                        Access Portal
                    </a>
                </div>
            </nav>
        `;
    }

    getPartnerNavigation() {
        return `
            <nav class="flex items-center justify-between p-6">
                <div class="flex items-center space-x-10">
                    <a href="index.html" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        MT Tech
                    </a>
                    <div class="hidden md:flex space-x-8">
                        <a href="index.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Dashboard</a>
                        <a href="secure-portal.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="docs/partner-resources.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Resources</a>
                        <a href="collaboration-tools.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Collaborate</a>
                        <a href="support.html" class="text-slate-300 hover:text-cyan-400 transition-colors">Support</a>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-cyan-400">Partner</span>
                    <a href="logout.html" class="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                        Logout
                    </a>
                </div>
            </nav>
        `;
    }

    // Additional navigation templates for other roles...

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                width: 100%;
            }
            
            nav {
                background-color: rgba(15, 23, 42, 0.9);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            nav.bg-scrolled {
                background-color: rgba(15, 23, 42, 0.95);
            }
        `;
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('mt-nav', MTNavBar);
```

### 3. Access-Aware Content Rendering
Update pages to render content based on user access level:

```html
<!-- Example of access-aware content rendering -->
<div data-access-level="public">
    <h2>Public Project Overview</h2>
    <p>This is a high-level overview of our project available to all users.</p>
</div>

<div data-access-level="partner" class="hidden">
    <h2>Partner Resources</h2>
    <p>Detailed technical documentation available to partners.</p>
    <a href="docs/partner-guide.pdf">Download Partner Guide</a>
</div>

<div data-access-level="investor" class="hidden">
    <h2>Investor Information</h2>
    <p>Financial projections and market analysis for investors.</p>
    <a href="docs/investor-presentation.pdf">View Investor Deck</a>
</div>
```

### 4. Mobile Navigation Considerations
Ensure navigation works well on mobile devices with collapsible menus:

```javascript
// Mobile menu functionality
const MobileMenu = {
    init: function() {
        const hamburger = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        
        if (hamburger && menu) {
            hamburger.addEventListener('click', function() {
                menu.classList.toggle('hidden');
                hamburger.classList.toggle('active');
                
                // Change hamburger to close icon
                const bars = hamburger.querySelectorAll('.bar');
                if (menu.classList.contains('hidden')) {
                    // Revert to hamburger
                    bars[0].style.transform = 'rotate(0) translate(0)';
                    bars[2].style.transform = 'rotate(0) translate(0)';
                    bars[1].style.opacity = '1';
                } else {
                    // Transform to X
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                    bars[1].style.opacity = '0';
                }
            });
        }
    }
};
```

### 5. Breadcrumb Navigation
Add breadcrumb navigation to help users understand their location:

```html
<nav aria-label="Breadcrumb" class="mb-6">
    <ol class="flex items-center space-x-2 text-sm text-slate-500">
        <li><a href="index.html" class="hover:text-cyan-400">Home</a></li>
        <li class="flex items-center"><i data-feather="chevron-right" class="w-4 h-4 mx-2"></i> <span>Projects</span></li>
        <li class="flex items-center"><i data-feather="chevron-right" class="w-4 h-4 mx-2"></i> <span>PAFFT Omnimath</span></li>
    </ol>
</nav>
```

## Implementation Steps

### Phase 1: Navigation Framework
1. Create the NavigationManager JavaScript module
2. Update custom navigation components to support role-based rendering
3. Implement access-aware content rendering system

### Phase 2: Role-Specific Navigation
1. Develop navigation templates for each role (public, partner, investor, collaborator, admin)
2. Test navigation rendering for each role type
3. Ensure proper highlighting of current page

### Phase 3: Mobile Optimization
1. Implement responsive mobile navigation
2. Test navigation on various screen sizes
3. Optimize touch targets and interactions

### Phase 4: Integration and Testing
1. Integrate navigation system with existing authentication
2. Test user experience for each role type
3. Verify that navigation correctly reflects access permissions

This navigation structure will provide a tailored experience for each user type while maintaining security and guiding users appropriately based on their access level.