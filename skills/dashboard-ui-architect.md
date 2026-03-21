# Dashboard & Application UI Architect Skill

## When to Use
- Designing dashboards for monitoring systems, analytics, or operational control
- Planning information architecture for complex applications
- Structuring interfaces that support decision-making workflows
- Evaluating and improving existing dashboard layouts
- Creating UI specifications for development teams

## Key Concepts

### Core Principle
A good dashboard answers three questions immediately:
1. **What is happening?** — Current system state
2. **What requires attention?** — Alerts, anomalies, issues
3. **What can I do next?** — Actionable controls

### Information Hierarchy
Organize content by priority:
1. Critical signals (alerts, errors, thresholds)
2. Current status (key metrics, health indicators)
3. Actionable controls (frequent actions, quick operations)
4. Deeper exploration (drill-down paths, detailed views)

### Layered Information
- **Level 1 — Overview**: System state at a glance (5-second scan)
- **Level 2 — Operational Detail**: Key metrics and controls (30-second review)
- **Level 3 — Deep Analysis**: Detailed views, drill-down pages (extended analysis)

### Cognitive Load Reduction
Good dashboards minimize:
- Unnecessary navigation
- Visual clutter
- Hidden actions
- Unclear system state
- Unnecessary user decisions

## Design Workflow

### Phase 1 — Interface Problem Brief
Define before designing:
- **User Type**: Who uses the dashboard?
- **Primary Goal**: What are they trying to accomplish?
- **Key Decisions**: What decisions must the interface support?
- **Critical Information**: What must be visible immediately?
- **Frequent Actions**: What actions are performed often?
- **Constraints**: Technical or product limitations

### Phase 2 — Information Architecture
Structure the interface:
- Primary dashboard sections
- Key information groupings
- Navigation structure
- Relationships between views
- Drill-down paths

### Phase 3 — Layout Strategies
Generate 10-15 different dashboard structures:
- Status overview dashboards
- Operational control dashboards
- Analytics-first dashboards
- Workflow-driven dashboards
- Task-oriented interfaces
- Alert-driven interfaces
- Progressive disclosure layouts
- Modular widget dashboards
- Command-center style dashboards
- Timeline/activity-focused layouts

### Phase 4 — Evaluation
Evaluate each structure:
- Clarity
- Usability
- Scanning speed
- Cognitive load
- Action accessibility
- Scalability
- Implementation complexity

### Phase 5 — Architecture Decision
Select the strongest structure and explain:
- Why it supports user goals
- How it improves workflow
- What tradeoffs exist

### Phase 6 — UI Structure Plan
Define final structure:
- Navigation layout
- Dashboard sections and hierarchy
- Components (metrics, charts, tables, alerts, filters, controls)
- Interaction behavior
- Drill-down flow

## Examples

### Example 1: Git Repository Monitoring Dashboard

**Problem Brief:**
- User: IP protection analyst managing 77+ git repositories
- Goal: Monitor repository health, detect unauthorized changes, track commit timelines
- Key Decisions: Which repos need attention, evidence of tampering, timeline verification
- Critical Info: Recent commits, hash verification status, unauthorized access alerts
- Frequent Actions: Verify commits, export evidence, flag anomalies

**Layout Strategy Selected:** Alert-driven with status overview
- Top: Critical alerts (hash mismatches, unauthorized commits)
- Middle: Repository health grid (77+ repos with status indicators)
- Bottom: Recent activity timeline with forensic details

### Example 2: DNS/Domain Health Dashboard

**Problem Brief:**
- User: Domain administrator managing multiple domains
- Goal: Ensure domains point to correct servers, monitor DNS propagation
- Key Decisions: Fix misconfigured records, verify changes propagated
- Critical Info: Current A records, expected vs. actual IPs, propagation status
- Frequent Actions: Update DNS records, verify propagation, check SSL status

**Layout Strategy Selected:** Status overview with operational controls
- Top: Domain status cards (green/yellow/red indicators)
- Middle: DNS record comparison (expected vs. actual)
- Right: Quick actions (update records, verify, flush cache)

## Best Practices
- Start with user goals, not data presentation
- Design for 5-second scan comprehension
- Use progressive disclosure for complex data
- Make critical actions always accessible
- Separate monitoring from configuration interfaces
- Provide clear drill-down paths
- Test with real data volumes

## Common Patterns

### Status Card Pattern
```
┌─────────────────────────┐
│ [Icon] Domain Status    │
│ ████████░░ 85% Healthy  │
│ 3 issues need attention │
│ [View Details]          │
└─────────────────────────┘
```

### Alert Hierarchy
| Level | Color | Auto-Expand | Sound |
|-------|-------|-------------|-------|
| Critical | Red | Yes | Yes |
| Warning | Yellow | No | No |
| Info | Blue | No | No |

### Metric Display
- Show trend (↑↓→) with value
- Include threshold context (85/100 limit)
- Timestamp for data freshness
- Click for historical view

## Troubleshooting
| Issue | Solution |
|-------|----------|
| Dashboard feels cluttered | Apply 5-second scan test, remove non-essential elements |
| Users miss critical alerts | Increase visual hierarchy, add auto-expand for critical |
| Too many clicks to act | Move frequent actions to overview level |
| Data overwhelms users | Implement progressive disclosure, add filters |
| Unclear what to do next | Add action suggestions with alerts |

## Activation Keywords
- "design a dashboard"
- "dashboard layout"
- "UI architecture"
- "information hierarchy"
- "monitoring interface"
- "control panel design"
- "analytics dashboard"
