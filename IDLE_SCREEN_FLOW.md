# Idle Screen Flow — Agent No Active Conversation

## Industry Best Practices Analysis

### Genesys Approach
- **Top**: Large status indicator with agent state and statistics
- **Center**: Prominent action buttons (Call, Chat, Email, Schedule)
- **Below**: Available work queue or recent interactions
- **Focus**: Agent agency — "What do you want to do next?"

### Eleveo Approach  
- **Top**: Agent status and performance metrics
- **Center**: Large CTAs for outbound actions (Call, SMS, WhatsApp)
- **Below**: Suggested callbacks (customers who need follow-up)
- **Right**: Recent transactions list
- **Focus**: Task-driven — "Here's what needs your attention"

### Five9 Approach
- **Top**: Queue status and agent state
- **Center**: Multiple tabs (Home, Recent, Callbacks, Tasks)
- **Focus**: Callbacks first, then outbound options
- **Bottom**: Quick dial features

---

## Recommended Flow — "Your Workspace" Idle Screen

### When Agent Has NO Active Conversation:

```
┌─────────────────────────────────────────────────────┐
│ 🏠 Your Workspace          Status: Ready | 4m avg  │
├─────────────────────────────────────────────────────┤
│                                                     │
│              📴 NO ACTIVE CONVERSATION              │
│         You're all set! Ready to help              │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  ☎️ START CALL   │   💬 SEND SMS            │  │
│  │  📧 SEND EMAIL  │   📱 WHATSAPP            │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
├─────────────────────────────────────────────────────┤
│ SUGGESTED CALLBACKS — Waiting for Your Response    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  John Tylor          ☎️   Called 2 hours ago      │
│  "Can you help with my order?"          [CALL NOW] │
│                                                     │
│  Sarah Smith         💬   Messaged 45 min ago     │
│  "I need to cancel my subscription"    [CALLBACK]  │
│                                                     │
│  Mike Johnson        📧   Waiting reply 1 day ago  │
│  "Status update on request"            [RESPOND]   │
│                                                     │
├─────────────────────────────────────────────────────┤
│ SEARCH OR DIAL                                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🔍 [Search customer by name/number...]           │
│  📞 [Show Dialpad]                                 │
│                                                     │
│  Recent:                                            │
│  [John Tylor - 555-0123]  [Call] [SMS] [Email]    │
│  [Sarah Smith - 555-0124] [Call] [SMS] [Email]    │
│  [Mike Johnson - 555-0125] [Call] [SMS] [Email]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Screen Sections (Vertical Layout)

### 1. **Header** (Height: 50px)
- Title: "🏠 Your Workspace"
- Agent Status: Ready/Break/Offline
- Performance Metric: Avg Handle Time
- No close button (can use ESC or dashboard nav)

### 2. **Empty State Message** (Height: 80px)
- Large heading: "📴 NO ACTIVE CONVERSATION"
- Subheading: "You're all set! Ready to help"
- Optional: Motivational message based on performance

### 3. **Quick Action Buttons** (Height: 120px)
- 2x2 grid of large buttons:
  - **☎️ START CALL** → Opens Outbound > Call tab with dialpad
  - **💬 SEND SMS** → Opens Outbound > SMS tab
  - **📧 SEND EMAIL** → Opens Outbound > Email tab
  - **📱 WHATSAPP** → Opens Outbound > WhatsApp (if available)
- Each button: 100px height, fills 2 columns
- Visual feedback: Hover zoom, active state color

### 4. **Suggested Callbacks** (Height: Flexible, max 150px)
- Section header: "SUGGESTED CALLBACKS — Waiting for Your Response"
- Shows 3-5 recent customers with:
  - Contact name + channel icon (☎️ 💬 📧 📱)
  - Last interaction time (2h ago, 45m ago, etc.)
  - Last message preview
  - Action button: [CALL NOW] / [RESPOND] / [CALLBACK]
- If empty: "No pending callbacks — Great job keeping up!"

### 5. **Search / Dialpad Section** (Height: Flexible)
- Tab toggle: [🔍 SEARCH] [📞 DIALPAD]
- **Search tab**:
  - Search input with placeholder "Search customer by name, phone, or email..."
  - Filter chips: [All Contacts] [Recent] [Favorites]
  - Results list with inline action buttons
- **Dialpad tab**:
  - Number display
  - Dialpad grid (0-9, *, #)
  - Recent contacts quick-select below

### 6. **Recent Conversations** (Height: Flexible, scrollable)
- Shows last 5-10 conversations in compact list
- Each row: Avatar | Name | Channel | Time | Status
- On click: Opens conversation (if stored) or initiates new contact

---

## User Flows

### Flow A: Agent Initiates Outbound (Most Common)
1. Agent sees idle screen
2. Clicks one of the 4 big action buttons
3. Outbound modal opens with appropriate tab (Call/SMS/Email/WhatsApp)
4. Agent either:
   - Dials a number (uses dialpad)
   - Selects from suggested callbacks (quick action)
   - Searches for customer (search bar)
5. Action completes → Conversation starts

### Flow B: Agent Reviews Suggested Callbacks
1. Agent sees idle screen with suggested callbacks section
2. Scans the 3-5 waiting customers
3. Clicks [CALL NOW] or [RESPOND] on one
4. Initiates outbound to that customer
5. Conversation starts

### Flow C: Agent Searches for Specific Customer
1. Agent sees idle screen
2. Scrolls to Search/Dialpad section
3. Types customer name/phone in search box
4. Results appear with inline action buttons
5. Clicks [Call], [SMS], or [Email]
6. Outbound modal opens pre-filled with contact info

### Flow D: Agent Dials Direct Number
1. Agent clicks "START CALL" button
2. Outbound modal opens
3. Agent switches to Dialpad tab (or it's default)
4. Types number using dialpad
5. Clicks Call to initiate

---

## Technical Implementation

### HTML Structure
```html
<div class="idle-screen" id="idleScreen">
  <!-- Header -->
  <div class="idle-header">
    <h2>🏠 Your Workspace</h2>
    <div class="idle-status">Ready | Avg 4m 32s</div>
  </div>

  <!-- Empty State -->
  <div class="idle-empty-state">
    <div class="idle-empty-icon">📴</div>
    <h1>No Active Conversation</h1>
    <p>You're all set! Ready to help</p>
  </div>

  <!-- Quick Actions Grid -->
  <div class="idle-quick-actions">
    <button class="idle-action-btn" onclick="openOutbound('call')">
      ☎️ <span>Start Call</span>
    </button>
    <button class="idle-action-btn" onclick="openOutbound('sms')">
      💬 <span>Send SMS</span>
    </button>
    <button class="idle-action-btn" onclick="openOutbound('email')">
      📧 <span>Send Email</span>
    </button>
    <button class="idle-action-btn" onclick="openOutbound('whatsapp')">
      📱 <span>WhatsApp</span>
    </button>
  </div>

  <!-- Suggested Callbacks -->
  <div class="idle-section">
    <h3>Suggested Callbacks</h3>
    <div class="suggested-callbacks">
      <!-- Callback cards here -->
    </div>
  </div>

  <!-- Search / Dialpad -->
  <div class="idle-section">
    <div class="idle-tabs">
      <button class="idle-tab active" onclick="switchIdleTab('search')">🔍 Search</button>
      <button class="idle-tab" onclick="switchIdleTab('dialpad')">📞 Dialpad</button>
    </div>
    
    <div id="idleSearch" class="idle-tab-content active">
      <!-- Search content -->
    </div>
    
    <div id="idleDialpad" class="idle-tab-content">
      <!-- Dialpad content -->
    </div>
  </div>

  <!-- Recent Conversations -->
  <div class="idle-section">
    <h3>Recent Conversations</h3>
    <div class="recent-convs">
      <!-- Recent conversations list -->
    </div>
  </div>
</div>
```

### CSS Classes
- `.idle-screen` — Full screen container (fixed, top: navbar-h)
- `.idle-header` — Top status bar
- `.idle-empty-state` — "No active conversation" message
- `.idle-quick-actions` — 2x2 grid of big buttons
- `.idle-action-btn` — Individual action button (120px height)
- `.idle-section` — Section headers and content
- `.suggested-callbacks` — Callback cards list
- `.idle-tabs` — Tab switcher
- `.idle-tab-content` — Tab content containers
- `.recent-convs` — Recent conversations list

### JavaScript Functions
```javascript
// Toggle idle screen visibility
function toggleIdle() { ... }
function openIdle() { ... }
function closeIdle() { ... }

// Switch between Search and Dialpad tabs
function switchIdleTab(tab) { ... }

// Open outbound with pre-selected channel
function openOutbound(channel) {
  // channel = 'call', 'sms', 'email', 'whatsapp'
  // Opens outbound modal with appropriate tab active
}

// Handle suggested callback clicks
function callSuggestedCallback(contactId) { ... }

// Search functionality
function searchIdleContacts(query) { ... }

// Populate suggested callbacks from backend data
function loadSuggestedCallbacks() { ... }
```

---

## Design Tokens Alignment

### Colors
- Header background: `var(--color-bg)` (white)
- Empty state text: `var(--color-text)` (dark)
- Action buttons: 
  - Normal: `var(--color-canvas)` (light gray background)
  - Hover: `var(--color-primary-lt)` (light blue background) 
  - Active: `var(--color-primary)` (blue background)
- Section dividers: `var(--color-border)` (light gray)

### Spacing
- Header padding: 16px 24px
- Empty state margin: 40px top
- Action buttons gap: 12px
- Section padding: 16px 24px
- Card spacing: 8px

### Typography
- Section headers: 14px, weight 600, color: `var(--color-text)`
- Empty state heading: 20px, weight 600
- Empty state subheading: 14px, weight 400, color: `var(--color-muted)`
- Button text: 13px, weight 500

---

## States & Variations

### When Callbacks Are Available
- Show 3-5 suggested callbacks section
- Highlight with subtle background color
- "N pending callbacks" badge

### When No Callbacks
- Show: "No pending callbacks — Great job keeping up! 🎉"
- Encourage agent to take new incoming work or make outbound

### When Search Has Results
- Display matching contacts with action buttons
- Highlight search text in results
- Show "X results found"

### When Search Has No Results
- Show: "No contacts found. Try another search or use dialpad."
- Clear call-to-action to dialpad

---

## Next Steps

1. ✅ Implement Idle Screen HTML structure
2. ✅ Style with CSS (matching design tokens)
3. ✅ Add JavaScript functionality (toggle, tabs, callbacks)
4. ✅ Connect to Outbound modal (pre-fill channel)
5. ✅ Add suggested callbacks population (mock data or API)
6. ✅ Test all user flows (search, dialpad, callbacks, outbound)

---

## Why This Design Works

✅ **Genesys-inspired**: Status at top, agent decides next action  
✅ **Eleveo-inspired**: Large action CTAs, task-driven workflow  
✅ **Five9-inspired**: Suggested callbacks, search, dialpad options  
✅ **Mobile-friendly**: Big buttons, clear hierarchy  
✅ **Accessibility**: High contrast, clear labels  
✅ **Flexible**: Scales with different callback volumes  
✅ **Non-disruptive**: Uses calendar icon, doesn't disturb Queue screen  
