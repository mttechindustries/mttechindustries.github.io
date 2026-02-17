# MT Tech Industries Authentication System

## Current Authentication Flow

### 1. Public Access
- `index.html` - Public homepage with teaser for restricted content
- Various public pages accessible without authentication

### 2. Restricted Access Entry Points
- `secure-access.html` - Main entry point for partners, investors, collaborators
- `login.html` - Entry point for general members

### 3. Token-Based Authentication
Current system uses simple token validation in `secure-access.html`:
```javascript
const validTokens = {
    'partner_access': 'partner',
    'investor_access': 'investor',
    'collaborator_access': 'collaborator',
    'admin_access': 'admin'
};
```

## Enhanced Authentication System Recommendations

### 1. Multi-Level Access Control
- **Public**: Anyone can access
- **Partner**: Business partners with basic technical documentation
- **Investor**: Investors with financial information and roadmaps
- **Collaborator**: Research collaborators with detailed technical specs
- **Admin**: Internal staff with full access

### 2. Improved Token System
Instead of hardcoded tokens in JavaScript (which are visible to anyone viewing source), implement:

#### Server-Side Token Validation
Since GitHub Pages only supports static files, use a third-party authentication service like:
- Auth0
- Firebase Authentication
- Netlify Identity
- Clerk.dev

#### Time-Limited Tokens
Implement tokens that expire after a certain period to enhance security.

### 3. Session Management
Current system uses sessionStorage which is browser-specific and clears when browser closes:
```javascript
sessionStorage.setItem('accessLevel', validTokens[token]);
sessionStorage.setItem('authenticated', 'true');
```

Consider implementing:
- Short-lived sessions (e.g., 1 hour)
- Automatic logout after inactivity
- Secure token storage

### 4. Enhanced Security Measures
Current IP protection in `script.js`:
```javascript
// IP Protection: Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// IP Protection: Disable text selection
document.body.style.userSelect = 'none';

// IP Protection: Disable common keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        return false;
    }
    // ... other shortcuts
});
```

Additional security measures:
- Content Security Policy (CSP) headers
- Rate limiting for authentication attempts
- Suspicious activity logging

### 5. Recommended Implementation

#### A. Authentication Service Integration
Integrate with a service like Firebase Authentication or Auth0 to handle:
- User registration and management
- Token validation
- Session management
- Password reset functionality

#### B. Role-Based Access Control
Define roles with specific permissions:
- `public`: Access to marketing materials, company overview
- `partner`: Access to basic technical docs, partnership opportunities
- `investor`: Access to financial projections, business plans, roadmaps
- `collaborator`: Access to detailed technical specs, research papers
- `admin`: Full access to all content and admin tools

#### C. Content Organization
Organize content by access level:
```
/public/          # Always accessible
  /assets/
  /marketing/
  /company/

/restricted/      # Requires authentication
  /partners/
    /docs/
    /resources/
  /investors/
    /financials/
    /roadmaps/
  /collaborators/
    /specs/
    /research/
  /admin/
    /tools/
    /analytics/
```

#### D. Secure Token Exchange
Since GitHub Pages is static, implement a secure token exchange mechanism:
1. User enters token on frontend
2. Token is sent to external authentication service (via HTTPS)
3. Service validates token and returns signed JWT
4. Frontend stores JWT temporarily and uses for API calls
5. All protected content is accessed through signed requests

### 6. Implementation Steps

#### Phase 1: Authentication Service Setup
1. Choose authentication provider (Firebase, Auth0, etc.)
2. Configure user roles and permissions
3. Set up token validation endpoints

#### Phase 2: Frontend Integration
1. Update `secure-access.html` to use new auth system
2. Modify all restricted pages to validate tokens properly
3. Implement role-based content filtering

#### Phase 3: Content Restructuring
1. Organize content by access level
2. Update navigation to reflect access permissions
3. Implement dynamic content loading based on user role

#### Phase 4: Security Enhancement
1. Add additional client-side protections
2. Implement monitoring for suspicious activity
3. Add audit logging for access to sensitive content

## Namecheap DNS Configuration

### Current Setup
- Domain: mttechindustries.com (registered with Namecheap)
- DNS: Pointing to GitHub Pages (A records pointing to GitHub IP addresses)
- GitHub Pages: Serving content from this repository

### Recommended DNS Enhancements
1. Add SPF, DKIM, DMARC records for email security
2. Set up subdomain redirects if needed (investor.mttechindustries.com)
3. Configure SSL certificate through GitHub Pages
4. Set up DNS-level DDoS protection

## Next Steps

1. Evaluate authentication service options based on your specific needs
2. Determine which content should be accessible at each level
3. Plan migration from current system to enhanced system
4. Implement security enhancements gradually