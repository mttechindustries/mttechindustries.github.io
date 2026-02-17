# Secure Authentication System for Public GitHub Repository with Namecheap

## Overview

This guide outlines how to implement a secure authentication system for MT Tech Industries while working within the constraints of a public GitHub repository. The solution combines client-side presentation with server-side validation to protect sensitive content.

## System Architecture

### 1. Frontend (GitHub Pages)
- Static HTML/CSS/JS hosted on GitHub Pages
- User interface for login/access requests
- Client-side content filtering based on access tokens

### 2. Backend (Private Server)
- Server-side token validation
- Content delivery based on permissions
- User management and access control

### 3. DNS Management (Namecheap)
- Domain routing to appropriate services
- Subdomain configuration for different access levels

## Implementation Steps

### Step 1: Backend Authentication Server

First, set up a simple authentication server on a private hosting solution (like a Namecheap VPS):

#### Example Node.js Authentication Server (`server.js`)
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mock user database (in production, use a real database)
const users = [
  {
    id: 1,
    email: 'investor@example.com',
    password: '$2b$10$...', // hashed password
    role: 'investor'
  },
  {
    id: 2,
    email: 'partner@example.com',
    password: '$2b$10$...', // hashed password
    role: 'partner'
  }
];

// Secret key for JWT (should be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Token validation endpoint
app.post('/api/auth/validate', (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    res.json({
      valid: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Protected content endpoint
app.get('/api/content/:type', authenticateToken, (req, res) => {
  const { type } = req.params;
  const user = req.user;
  
  // Check if user has access to requested content type
  if (!hasAccess(user.role, type)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  
  // Return requested content based on type and user role
  const content = getContentByTypeAndRole(type, user.role);
  
  res.json({ content });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    req.user = user;
    next();
  });
}

// Helper function to check access permissions
function hasAccess(userRole, contentType) {
  const permissions = {
    public: ['public'],
    partner: ['public', 'partner'],
    investor: ['public', 'partner', 'investor'],
    admin: ['public', 'partner', 'investor', 'admin']
  };
  
  return permissions[userRole] && permissions[userRole].includes(contentType);
}

// Helper function to get content by type and role
function getContentByTypeAndRole(contentType, userRole) {
  // In a real implementation, this would fetch from a database
  const contentMap = {
    public: {
      title: 'Public Content',
      description: 'This content is available to all users'
    },
    partner: {
      title: 'Partner Content',
      description: 'This content is available to partners',
      details: 'Detailed technical specifications for partners'
    },
    investor: {
      title: 'Investor Content',
      description: 'This content is available to investors',
      financials: 'Financial projections and market analysis',
      roadmaps: 'Strategic roadmaps and development timelines'
    },
    admin: {
      title: 'Admin Content',
      internal: 'Internal documentation and processes'
    }
  };
  
  return contentMap[contentType];
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
```

### Step 2: Update Frontend Authentication

Update your frontend to communicate with the authentication server:

#### Enhanced Authentication Script (`auth-enhanced.js`)
```javascript
// Enhanced authentication system for MT Tech Industries
const MTTechAuth = {
  API_BASE: 'https://secure.mttechindustries.com/api', // Replace with your server URL
  
  init: function() {
    this.setupEventListeners();
    this.checkStoredCredentials();
  },
  
  setupEventListeners: function() {
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }
    
    // Handle secure access form submission
    const accessForm = document.getElementById('access-form');
    if (accessForm) {
      accessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleTokenAccess();
      });
    }
  },
  
  async handleLogin() {
    const email = document.getElementById('email')?.value || document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
      this.showMessage('Please enter both email and password', 'error');
      return;
    }
    
    try {
      const response = await fetch(`${this.API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store token and user info
        localStorage.setItem('mttech_token', data.token);
        localStorage.setItem('mttech_user', JSON.stringify(data.user));
        
        // Update UI based on role
        this.updateUIForRole(data.user.role);
        
        this.showMessage('Login successful!', 'success');
        
        // Redirect based on role
        this.redirectOnLogin(data.user.role);
      } else {
        this.showMessage(data.error || 'Login failed', 'error');
      }
    } catch (error) {
      this.showMessage('Network error. Please try again.', 'error');
    }
  },
  
  async handleTokenAccess() {
    const token = document.getElementById('token')?.value;
    
    if (!token) {
      this.showMessage('Please enter an access token', 'error');
      return;
    }
    
    try {
      const response = await fetch(`${this.API_BASE}/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        // Store token and user info
        localStorage.setItem('mttech_token', token);
        localStorage.setItem('mttech_user', JSON.stringify(data.user));
        
        // Update UI based on role
        this.updateUIForRole(data.user.role);
        
        this.showMessage('Access granted!', 'success');
        
        // Redirect based on role
        this.redirectOnAccess(data.user.role);
      } else {
        this.showMessage(data.error || 'Invalid token', 'error');
      }
    } catch (error) {
      this.showMessage('Network error. Please try again.', 'error');
    }
  },
  
  async checkStoredCredentials() {
    const token = localStorage.getItem('mttech_token');
    if (!token) return;
    
    try {
      const response = await fetch(`${this.API_BASE}/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        // Update UI based on role
        this.updateUIForRole(data.user.role);
      } else {
        // Token invalid, clear stored credentials
        this.clearCredentials();
      }
    } catch (error) {
      // Network error, don't clear credentials in case it's temporary
    }
  },
  
  updateUIForRole(role) {
    // Update navigation based on user role
    this.updateNavigation(role);
    
    // Show/hide content based on role
    this.filterContentByRole(role);
  },
  
  updateNavigation(role) {
    // Update navigation elements based on role
    const navElements = document.querySelectorAll('[data-role]');
    
    navElements.forEach(element => {
      const requiredRole = element.getAttribute('data-role');
      if (this.hasAccess(role, requiredRole)) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  },
  
  filterContentByRole(role) {
    // Show/hide content based on user role
    const contentElements = document.querySelectorAll('[data-access-level]');
    
    contentElements.forEach(element => {
      const requiredLevel = element.getAttribute('data-access-level');
      if (this.hasAccess(role, requiredLevel)) {
        element.style.display = 'block';
        
        // If element was previously replaced with access denied message, restore it
        const accessDenied = element.previousElementSibling;
        if (accessDenied && accessDenied.classList.contains('access-denied-message')) {
          accessDenied.remove();
        }
      } else {
        element.style.display = 'none';
        
        // Add access denied message
        const accessDenied = document.createElement('div');
        accessDenied.className = 'access-denied-message';
        accessDenied.innerHTML = `
          <div class="glass-panel p-4 rounded-lg border border-amber-500/30">
            <div class="flex items-center gap-2 text-amber-400">
              <i data-feather="lock"></i>
              <strong>Restricted Content</strong>
            </div>
            <p class="text-slate-400 text-sm mt-2">
              This content requires ${requiredLevel} access level. 
              <a href="secure-access.html" class="text-cyan-400 hover:text-cyan-300">Request access</a> to view.
            </p>
          </div>
        `;
        
        element.parentNode.insertBefore(accessDenied, element);
        feather.replace(); // Initialize icons
      }
    });
  },
  
  hasAccess(userRole, requiredLevel) {
    const permissions = {
      public: ['public'],
      partner: ['public', 'partner'],
      investor: ['public', 'partner', 'investor'],
      admin: ['public', 'partner', 'investor', 'admin']
    };
    
    return permissions[userRole] && permissions[userRole].includes(requiredLevel);
  },
  
  redirectOnLogin(role) {
    switch(role) {
      case 'investor':
        window.location.href = 'secure-portal-investor.html';
        break;
      case 'partner':
        window.location.href = 'secure-portal-partner.html';
        break;
      case 'admin':
        window.location.href = 'admin-dashboard.html';
        break;
      default:
        window.location.href = 'members-area.html';
    }
  },
  
  redirectOnAccess(role) {
    switch(role) {
      case 'investor':
        window.location.href = 'secure-portal-investor.html';
        break;
      case 'partner':
        window.location.href = 'secure-portal-partner.html';
        break;
      case 'admin':
        window.location.href = 'admin-dashboard.html';
        break;
      default:
        window.location.href = 'secure-portal.html';
    }
  },
  
  logout() {
    this.clearCredentials();
    this.updateNavigation('public');
    this.filterContentByRole('public');
    window.location.href = 'index.html';
  },
  
  clearCredentials() {
    localStorage.removeItem('mttech_token');
    localStorage.removeItem('mttech_user');
  },
  
  showMessage(message, type) {
    // Create and show message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type} p-3 rounded-lg mb-4 ${
      type === 'error' ? 'bg-red-900/30 border border-red-700/50' : 
      type === 'success' ? 'bg-emerald-900/30 border border-emerald-700/50' : 
      'bg-blue-900/30 border border-blue-700/50'
    }`;
    messageEl.textContent = message;
    
    // Insert message at the top of the form
    const form = document.querySelector('form');
    if (form) {
      form.parentNode.insertBefore(messageEl, form);
      
      // Remove message after 5 seconds
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, 5000);
    }
  }
};

// Initialize authentication system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  MTTechAuth.init();
  
  // Add logout functionality to logout buttons
  const logoutButtons = document.querySelectorAll('[data-action="logout"]');
  logoutButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      MTTechAuth.logout();
    });
  });
});
```

### Step 3: Update HTML Pages

Update your HTML pages to use the enhanced authentication system:

#### Example: Updated Login Page (`login-enhanced.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | MT Tech Industries</title>
    <!-- Include your existing head content -->
</head>
<body class="bg-dark-900 text-slate-100 font-sans antialiased overflow-x-hidden">
    <!-- Navigation Component -->
    <script src="components/navbar.js"></script>
    <mt-nav></mt-nav>

    <!-- Login Hero -->
    <section class="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden" style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);">
        <div class="absolute inset-0 opacity-30">
            <div class="absolute -top-40 -right-40 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
        </div>

        <div class="relative z-10 container mx-auto px-6 py-20">
            <div class="max-w-md mx-auto">
                <div class="glass-panel p-8 rounded-2xl border-slate-700">
                    <div class="text-center mb-8">
                        <div class="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-feather="lock" class="w-8 h-8 text-cyan-400"></i>
                        </div>
                        <h1 class="text-3xl font-bold text-slate-100 mb-2">Member Access</h1>
                        <p class="text-slate-400">Access exclusive research and development content</p>
                    </div>

                    <form id="login-form">
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-slate-400 mb-2">Email</label>
                            <input type="email" id="email" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Enter your email">
                        </div>

                        <div class="mb-6">
                            <label class="block text-sm font-medium text-slate-400 mb-2">Password</label>
                            <input type="password" id="password" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Enter your password">
                        </div>

                        <button type="submit" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-[1.02]">
                            Access Exclusive Content
                        </button>
                    </form>

                    <div class="mt-6 text-center">
                        <p class="text-slate-500 text-sm">
                            Need access? <a href="#contact" class="text-cyan-400 hover:text-cyan-300">Contact us</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Component -->
    <script src="components/footer.js"></script>
    <mt-footer></mt-footer>

    <!-- Scripts -->
    <script src="auth-enhanced.js"></script>
    <script src="script.js"></script>
    <script>feather.replace();</script>
</body>
</html>
```

### Step 4: Namecheap DNS Configuration

Configure your Namecheap DNS settings to support the hybrid approach:

1. Log into Namecheap dashboard
2. Go to Domain List → mttechindustries.com
3. Click "Manage" → "Advanced DNS"
4. Add these records:

```
Record Type | Host | Value | TTL
A           | @    | 185.199.108.153 | 30 min (GitHub Pages)
A           | @    | 185.199.109.153 | 30 min
A           | @    | 185.199.110.153 | 30 min
A           | @    | 185.199.111.153 | 30 min
A           | secure | [YOUR_VPS_IP] | 30 min
A           | api    | [YOUR_VPS_IP] | 30 min
CNAME       | www  | mttechindustries.github.io | 30 min
```

### Step 5: Security Considerations

1. **HTTPS Everywhere**: Ensure SSL certificates are properly configured for all subdomains
2. **Token Expiration**: Implement short-lived tokens with refresh mechanisms
3. **Rate Limiting**: Implement rate limiting on authentication endpoints
4. **Input Validation**: Validate all inputs on both client and server side
5. **Audit Logging**: Log authentication attempts and access to sensitive content

This system provides a secure way to manage access to sensitive content while maintaining a public presence through GitHub Pages, leveraging Namecheap's DNS management for routing to the appropriate services.