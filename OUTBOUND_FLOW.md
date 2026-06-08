# Outbound Call/SMS/Email Flow - Design Document

## Overview
When an agent is in an active conversation and clicks the **Outbound Arrow Icon** (top-right navbar), they should be able to initiate outbound communications (Call, SMS, Email) without losing context of the current conversation.

---

## Recommended Approach: **Right Side Modal Panel**

### Why Right Side Modal?
✅ **Advantages:**
- Doesn't interrupt current conversation view
- Agent can see conversation history while making outbound call
- Consistent with modern contact center layouts
- Easy to close/minimize
- Natural workflow (customer on left, actions on right)
- Accommodates dialpad + search + contact list

❌ **Alternatives Considered:**
- Floating Dialog: Too small, blocks conversation
- Full Screen: Loses conversation context
- Dropdown Menu: Not enough space for dialpad

---

## Detailed Flow

### **Step 1: Agent Clicks Outbound Icon**
**Trigger:** Click arrow icon in top-right navbar
**Action:** Right side panel opens (width: 315px or 340px, same as current right panel width)
**Layout:** Replace or stack with existing right panel

---

### **Step 2: Channel Selection**
**Panel Header:** "Outbound" with close button (X)

**Three Tabs/Buttons:**
```
┌─────────────────────────┐
│ ☎️ Call  💬 SMS  📧 Email│
└─────────────────────────┘
```

**Default:** Call tab active

---

### **Step 3A: CALL FLOW**

#### Dialpad Section
```
┌──────────────────────────┐
│  Display/Input Field:    │
│  [ +1 (555) 123-456]     │  ← Shows formatted number as typing
│                          │
│  ┌──┬──┬──┐             │
│  │ 1│ 2│ 3│             │  ← Dialpad (0-9, *, #)
│  ├──┼──┼──┤             │
│  │ 4│ 5│ 6│             │
│  ├──┼──┼──┤             │
│  │ 7│ 8│ 9│             │
│  ├──┼──┼──┤             │
│  │ *│ 0│ #│             │
│  └──┴──┴──┘             │
│  ⌫ (Backspace)          │  ← Delete last digit
│                          │
│ [Clear]  [Call]          │  ← Actions
└──────────────────────────┘
```

#### Search/Contact List Section
**Below Dialpad:**
```
┌──────────────────────────┐
│ 🔍 Search Contacts...    │  ← Search field
│                          │
│ ▼ RECENT                 │  ← Collapsible sections
│ John Tylor  +1 555-0123  │
│ Sarah Smith +1 555-0124  │
│                          │
│ ▼ FAVORITES              │
│ Michael Brown +1 555-    │
│                          │
│ ▼ ALL CONTACTS           │
│ (Show filtered list)     │
└──────────────────────────┘
```

#### Number Pressing Behavior
**When agent presses a digit (e.g., "2"):**
1. Number appears in input field: `2`
2. Contact list filters to show:
   - Contacts starting with "2"
   - Contacts with phone numbers containing "2"
   - Fuzzy match on name (if typed slowly)

**Example:**
- Type "2" → Shows "2nd Ave Clinic", "202-XXX-XXXX contacts"
- Type "55" → Shows "555" area code contacts
- Type "555-" → Smart formatting applied

#### Quick Actions
- **Tap Contact:** Directly calls that contact
- **Tap "Call" button:** Calls the dialed number
- **Long press digit:** Repeats digit (for extensions)
- **Backspace:** Delete last digit

---

### **Step 3B: SMS FLOW**

```
┌──────────────────────────┐
│ Outbound SMS             │
│                          │
│ 🔍 Search or Enter #...  │  ← Contact/number selector
│                          │
│ Recent:                  │
│ John Tylor  +1 555-0123  │
│ Sarah Smith +1 555-0124  │
│                          │
│ Message Template:        │
│ ┌──────────────────────┐ │
│ │ Type your SMS here   │ │
│ │ (Max 160 chars)      │ │
│ │                      │ │
│ │ [89/160]             │ │
│ └──────────────────────┘ │
│                          │
│ [Cancel]  [Send SMS]     │
└──────────────────────────┘
```

**Behavior:**
- Same search/contact list as Call
- Click contact → pre-populate phone number
- Type SMS message
- Character counter shows remaining chars

---

### **Step 3C: EMAIL FLOW**

```
┌──────────────────────────┐
│ Outbound Email           │
│                          │
│ 🔍 Search Contact...     │
│                          │
│ John Tylor               │
│   📧 john@example.com    │
│   📧 john.t@work.com     │
│                          │
│ To: [john@example.com]   │
│                          │
│ Subject:                 │
│ [         ]              │
│                          │
│ Message:                 │
│ ┌──────────────────────┐ │
│ │                      │ │
│ │                      │ │
│ └──────────────────────┘ │
│ [Cancel]  [Send Email]   │
└──────────────────────────┘
```

---

## Interaction Details

### Search Behavior
**As agent types:**
```
Type "j"  → Shows: John, Jane, James, Jessica, etc.
Type "jo" → Shows: John, Joan
Type "joh" → Shows: John
Type "555" → Shows: All contacts with 555 area code
```

**Smart Matching:**
- First name matching: "Sarah" 
- Last name matching: "Smith"
- Phone pattern: "555-0123"
- Company name: If applicable

### Contact List Display
```
Name             Phone              Last Contact
────────────────────────────────────────────────
John Tylor       +1 (555) 0123     2 min ago
Sarah Smith      +1 (555) 0124     Today 10:30
Michael Brown    +1 (555) 0125     Yesterday
```

### Number Formatting
- Input: "5550123"
- Display: "+1 (555) 0123"
- Handle different formats automatically

---

## State Management

### Modal States
- **Open/Closed:** Side panel visibility
- **Active Tab:** Call / SMS / Email
- **Input Value:** Dialed number or search query
- **Contact Selected:** Highlighted contact
- **Sending:** Disable buttons while processing

### Integration with Active Conversation
- Do NOT close current conversation
- Keep right panel (contact info) accessible via toggle
- Agent can switch between outbound and current chat
- Maintain conversation context

---

## Edge Cases

### During Existing Call
- Show "Current call with John Tylor"
- Option: "Transfer to new contact" or "Add to conference"
- Or: Start separate call (depends on system capability)

### Invalid Numbers
- Show validation: "Invalid phone number"
- Highlight in red
- Disable Call button

### Contact Not Found
- Show "No matching contacts"
- Allow free-form entry
- Confirm before dialing

---

## Implementation Checklist

- [ ] Create right side modal component
- [ ] Tab switching (Call/SMS/Email)
- [ ] Dialpad UI with number input
- [ ] Search/contact list integration
- [ ] Smart number formatting
- [ ] Validation (phone, email)
- [ ] Close/minimize modal
- [ ] API integration for call/SMS/email
- [ ] Loading states
- [ ] Error handling
- [ ] Analytics tracking

---

## Future Enhancements

1. **Conference Calling:** Add 2nd contact while on call
2. **Call Transfer:** Transfer current call to new number
3. **Voicemail Drop:** Pre-recorded message template
4. **Message Templates:** Saved SMS/email templates
5. **Call Recording:** Indicator during call
6. **Do Not Call List:** Warn before calling
7. **Callback Scheduling:** Schedule callback instead of immediate
