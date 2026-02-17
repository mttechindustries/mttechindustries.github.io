# MT Tech Industries - Hybrid Hosting Solution with Namecheap

## Understanding the Current Situation

Your current setup has:
- A public GitHub repository (mttechindustries.github.io) serving as your website via GitHub Pages
- Domain (mttechindustries.com/.org) routed through Namecheap to GitHub Pages
- Public repository means all source code and content is visible to everyone
- Current authentication system exists but is client-side only (easily bypassed)

## Recommended Hybrid Approach

### 1. Private Repository for Sensitive Content
- Keep sensitive project details, technical specifications, and internal documentation in private repositories
- Use GitHub's private repository feature for content that should not be publicly accessible
- Implement proper access controls for team members and authorized partners

### 2. Namecheap Advanced Features Integration

#### A. Subdomain Strategy
- Use subdomains for different access levels:
  - `public.mttechindustries.com` → GitHub Pages (public content)
  - `secure.mttechindustries.com` → VPS hosting (restricted content)
  - `investor.mttechindustries.com` → VPS hosting (investor content)
  - `partner.mttechindustries.com` → VPS hosting (partner content)

#### B. Namecheap VPS/Dedicated Server
- Host sensitive content on a Namecheap VPS with proper authentication
- Implement server-side authentication that cannot be bypassed like client-side systems
- Use SSL certificates for secure connections

### 3. Implementation Strategy

#### Phase 1: Repository Restructure
1. Separate public and private content
2. Move sensitive information to private repositories
3. Update public repository to only contain marketing-facing content

#### Phase 2: Namecheap DNS Configuration
1. Set up subdomain routing to different hosting solutions
2. Configure SSL certificates for all subdomains
3. Implement proper DNS security measures

#### Phase 3: Authentication System
1. Implement server-side authentication on VPS for restricted content
2. Create secure API endpoints for content delivery
3. Add proper session management and security measures

## Detailed Implementation Plan

### A. Content Classification
```
Public Content (GitHub Pages):
├── Marketing materials
├── Company overview
├── High-level project teasers
├── Contact information
└── Public blog/news

Private Content (VPS):
├── Technical specifications
├── Financial information
├── Detailed research data
├── Customer information
└── Internal documentation
```

### B. Namecheap DNS Configuration
1. Log into Namecheap dashboard
2. Navigate to Domain List → mttechindustries.com
3. Click "Manage" → "Advanced DNS"
4. Add the following records:

```
Record Type | Host | Value | TTL
A           | @    | 185.199.108.153* | 30 min (for GitHub Pages)
A           | @    | 185.199.109.153* | 30 min
A           | @    | 185.199.110.153* | 30 min
A           | @    | 185.199.111.153* | 30 min
A           | secure | [VPS IP ADDRESS] | 30 min
A           | investor | [VPS IP ADDRESS] | 30 min
A           | partner | [VPS IP ADDRESS] | 30 min
CNAME       | www  | mttechindustries.github.io | 30 min
```
*GitHub Pages IP addresses

### C. GitHub Repository Structure
Create a new private repository structure:
```
mttechindustries-private/
├── investor-content/
│   ├── financials/
│   ├── roadmaps/
│   └── reports/
├── partner-content/
│   ├── technical-docs/
│   ├── api-specs/
│   └── integration-guides/
├── collaborator-content/
│   ├── research-data/
│   ├── experimental-results/
│   └── methodologies/
└── admin-content/
    ├── user-management/
    └── system-config/
```

### D. VPS Setup on Namecheap
1. Purchase a Namecheap VPS or cloud hosting
2. Install a web server (Apache/Nginx)
3. Set up authentication system (PHP/Node.js/Python)
4. Configure SSL certificates
5. Implement content delivery system

### E. Secure Content Delivery
Create an API endpoint on your VPS that validates authentication tokens and delivers content:

```javascript
// Example authentication flow
async function fetchSecureContent(token, contentType) {
  const response = await fetch(`https://secure.mttechindustries.com/api/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
      contentType: contentType,
      userId: getUserIdFromToken(token)
    })
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Authentication failed');
  }
}
```

## Migration Strategy

### Step 1: Audit Current Content
- Identify which content should remain public
- Identify which content needs restriction
- Plan migration of sensitive content to private repositories

### Step 2: Set Up Infrastructure
- Configure Namecheap VPS for private content
- Set up authentication system
- Test security measures

### Step 3: Update DNS
- Configure subdomains as outlined above
- Ensure proper SSL certificate installation
- Test all routing

### Step 4: Content Migration
- Move sensitive content to private repositories
- Update public content to reference secure endpoints where appropriate
- Test all functionality

### Step 5: Security Testing
- Penetration testing of authentication system
- Verify that sensitive content cannot be accessed without proper authorization
- Test backup and recovery procedures

## Benefits of This Approach

1. **Enhanced Security**: Sensitive content is no longer exposed in public repositories
2. **Better Access Control**: Server-side authentication that cannot be bypassed
3. **Scalability**: Ability to create different access levels for different user types
4. **Compliance**: Better ability to meet regulatory requirements for sensitive data
5. **Performance**: Ability to optimize different subdomains for different content types

## Risks and Mitigation

### Risk: Increased Complexity
- Mitigation: Document all processes and maintain clear operational procedures

### Risk: Higher Costs
- Mitigation: Start with basic VPS plan and scale as needed

### Risk: Single Point of Failure
- Mitigation: Implement proper backup and redundancy measures

This hybrid approach leverages both GitHub's reliable static hosting and Namecheap's flexible VPS solutions to create a more secure and scalable infrastructure for MT Tech Industries.