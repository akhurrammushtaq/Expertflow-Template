# Idle Screen Design - Agent Login (No Active Conversation)

## Problem
When agent logs in or finishes a conversation, they need to quickly:
- See what's waiting for them
- Resume interrupted conversations
- Find specific customers
- Take new actions

---

## Recommended Layout

### **Top Section - Agent Status & Quick Info** (Height: 60px)
```
┌─────────────────────────────────────────────────────────┐
│  Status: 🟢 Ready    │  Queue Wait: 5 customers  │ 📞 ↗️│
│  Avg Handle Time: 4m 32s                              │
└─────────────────────────────────────────────────────────┘
```

**Contains:**
- Agent status (Ready/Busy/Break/Offline) - clickable to change
- Queue position/waiting count
- Average handle time (performance metric)
- Outbound icon (↗️ - the new screen icon you want to add)

---

### **Main Content - 3 Sections**

#### **Section 1: ACTIVE/PAUSED CONVERSATIONS** (25% height)
```
┌─────────────────────────────────────────────────────────┐
│ 📌 PAUSED CONVERSATIONS - Resume Chat                  │
├─────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐│
│ │ John Tylor          📞 SMS          Paused 2 min ago  ││
│ │ "Can you help with my order?"                       ││
│ └──────────────────────────────────────────────────────┘│
│ ┌──────────────────────────────────────────────────────┐│
│ │ Sarah Smith         💬 Chat         Paused 15 min ago ││
│ │ "I need to cancel my subscription"                  ││
│ └──────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Shows paused/interrupted conversations
- One-click resume
- Last message preview
- Time since paused
- Contact channel indicator

---

#### **Section 2: SEARCH & QUICK ACTIONS** (Center toolbar)
```
┌─────────────────────────────────────────────────────────┐
│  🔍 Search customer or number...                        │
│  [Contact Search]  [By Phone]  [By Email]              │
├─────────────────────────────────────────────────────────┤
│  ☎️ Outbound Call   💬 New SMS   📧 New Email           │
│  🔄 Schedule CB    📋 Notes     ⏱️ Scheduled            │
└─────────────────────────────────────────────────────────┘
```

**Contains:**
- Smart search field (searches names, phone, email)
- Quick action buttons
- Schedule callback
- View notes on customer
- View scheduled tasks

---

#### **Section 3: RECENT CONVERSATIONS** (50% height)
```
┌──────────────────────────────────────────────────────────┐
│ 📅 RECENT CONVERSATIONS (Last 30 days)                   │
├──────────────────────────────────────────────────────────┤
│ Sort by: [Date ▼] [Channel ▼] [Status ▼]  Filter: [...]│
├──────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐│
│ │ John Tylor          📞 Outbound    ✓ Resolved        ││
│ │ 2 hours ago         Duration: 4m 32s      Rating: ⭐⭐⭐││
│ └────────────────────────────────────────────────────────┘│
│ ┌────────────────────────────────────────────────────────┐│
│ │ Sarah Smith         💬 Chat        ✓ Resolved        ││
│ │ 45 min ago          Duration: 12m 15s     Rating: ⭐⭐ ││
│ └────────────────────────────────────────────────────────┘│
│ ┌────────────────────────────────────────────────────────┐│
│ │ Mike Johnson        📧 Email       ⏳ Waiting Reply   ││
│ │ 1 day ago           Duration: 6m 48s      Notes: 2   ││
│ └────────────────────────────────────────────────────────┘│
│ ┌────────────────────────────────────────────────────────┐│
│ │ [Load More...]                                        ││
│ └────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

**Shows (10-15 recent conversations):**
- Customer name
- Channel icon (☎️ 📞 💬 📧)
- Conversation status (Resolved, Waiting, Pending)
- Time ago
- Duration
- Rating if available
- Notes count
- One-click resume

**Sortable by:**
- Date (newest first)
- Channel
- Status
- Rating

**Filterable by:**
- Resolved/Unresolved
- Channel type
- Date range

---

## Alternative Layouts to Consider

### **Option A: Tab-Based (What we recommend)**
```
Tabs: [Paused Conversations] [Recent] [Favorites] [Search]
```
- Clean, organized
- Easy to navigate
- Scalable

### **Option B: Card-Based Dashboard**
```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Paused  │  │ Recent  │  │Favorites│
│   (2)   │  │  (15)   │  │   (8)   │
└─────────┘  └─────────┘  └─────────┘
```
- Visual, quick glance
- Mobile-friendly
- Good for quick stats

### **Option C: Single Stream (Timeline)**
- All conversations in one chronological feed
- Paused conversations sticky at top
- Infinite scroll
- More like social media

---

## Top Icon Placement & Navigation

**Where to add the icon:**
- Top right navbar, next to outbound icon
- Or: Left sidebar as main navigation item

**Icon suggestions:**
- 🏠 Home
- 📋 Dashboard
- 📊 Conversations
- 🔄 Queue

**Navigation flow:**
```
Outbound (→) ← NEW ICON → [No Active Conv Screen]
                              ↓
                      (Click conversation)
                              ↓
                     [Open Conversation]
```

---

## What Gets Shown Priority?

### **Highest Priority:**
1. **Paused conversations** - Agent can resume instantly
2. **Incoming queue** - New customers waiting
3. **Search** - Find specific customer

### **Medium Priority:**
4. **Recent conversations** - History and context
5. **Quick actions** - New outbound, callback
6. **Agent stats** - Performance metrics

### **Lower Priority:**
7. Favorites - Frequent contacts
8. Notes/scheduling - Planning features

---

## Recommended Screen Sections Breakdown

```
20% - Status bar + Queue info + Quick Actions
15% - Paused Conversations (if any)
15% - Search + Action Buttons
50% - Recent Conversations List (scrollable)
```

---

## User Actions on This Screen

**Agent can:**
1. Click paused conversation → Resume immediately
2. Search customer → View history or start new conversation
3. Click recent conversation → Reopen it
4. Click quick action buttons → Call, SMS, Email outbound
5. Change status → Ready/Break/Offline
6. Click rating/notes → View details
7. Sort/filter → Customize view

---

## What Information to Show Per Conversation

**Minimum:**
- Customer name
- Channel
- Last message preview
- Time
- Duration
- Status

**Additional:**
- Rating/satisfaction
- Notes count
- Tags/labels
- Next scheduled action
- Unread indicator

---

## Recommendation Summary

**I suggest: Tab-Based Layout with 3 Tabs**

```
Tabs:
1️⃣ [ACTIVE] - Paused conversations + quick resume
2️⃣ [RECENT] - Last 30 conversations with sort/filter
3️⃣ [SEARCH] - Find any customer + quick actions
```

**Why?**
✅ Clean and organized
✅ Not overwhelming with info
✅ Scalable (more tabs later)
✅ Mobile-friendly
✅ Follows standard UI patterns
✅ Agent can focus on one task at a time

---

## Next Steps

Should I implement:
1. **Option A: Tab-based layout** (recommended) ✅
2. **Option B: Card-based dashboard**
3. **Option C: Single timeline stream**

Or do you have a different preference?
