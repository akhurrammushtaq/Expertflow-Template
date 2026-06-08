# Idle Screen Testing Guide

## Quick Start
1. **Hard refresh browser**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)
2. **Click the workspace icon** (📊 grid icon) in top-right navbar
3. Follow tests below

---

## Test 1: Screen Opens/Closes ✓
**When agent clicks Workspace icon:**
- [ ] Idle screen slides in as full-screen panel (below navbar)
- [ ] Workspace icon in navbar becomes highlighted/active
- [ ] Screen shows "🏠 Your Workspace" header
- [ ] Status shows: "Ready • Avg 4m 32s"

**When agent clicks Workspace icon again (or ESC):**
- [ ] Idle screen closes/slides away
- [ ] Workspace icon becomes inactive
- [ ] Returns to previous view

---

## Test 2: Empty State Display ✓
**On Idle Screen:**
- [ ] Large icon: 📴
- [ ] Heading: "No Active Conversation"
- [ ] Subheading: "You're all set! Ready to help"
- [ ] All text is centered and prominent

---

## Test 3: Quick Action Buttons ✓
**Idle screen shows 2x2 grid of large buttons:**
- [ ] **☎️ START CALL** — visible and clickable
- [ ] **💬 SEND SMS** — visible and clickable
- [ ] **📧 SEND EMAIL** — visible and clickable
- [ ] **📱 WHATSAPP** — visible and clickable

**Button styling:**
- [ ] Normal: Light gray background with dark text
- [ ] Hover: Light blue background, text darkens, slight zoom
- [ ] Each button has icon + label below

---

## Test 4: Quick Action Functionality ✓

### Test 4a: Start Call
- [ ] Click **☎️ START CALL** button
- [ ] Outbound modal opens
- [ ] Call tab is active (default)
- [ ] Dialpad is visible and ready
- [ ] Idle screen closes

### Test 4b: Send SMS
- [ ] Click **💬 SEND SMS** button
- [ ] Outbound modal opens
- [ ] SMS tab becomes active
- [ ] "To:" field is visible
- [ ] Idle screen closes

### Test 4c: Send Email
- [ ] Click **📧 SEND EMAIL** button
- [ ] Outbound modal opens
- [ ] Email tab becomes active
- [ ] "To:", "Subject:", and message fields visible
- [ ] Idle screen closes

### Test 4d: WhatsApp
- [ ] Click **📱 WHATSAPP** button
- [ ] Outbound modal opens
- [ ] WhatsApp tab is active (if implemented)
- [ ] Idle screen closes

---

## Test 5: Suggested Callbacks Section ✓
**Below quick action buttons:**
- [ ] Section header: "SUGGESTED CALLBACKS"
- [ ] Shows 3 example callback cards:
  - **John Tylor** — ☎️ Called 2 hours ago — "Can you help with my order?" — [CALL NOW] button
  - **Sarah Smith** — 💬 Messaged 45 min ago — "I need to cancel..." — [RESPOND] button
  - **Mike Johnson** — 📧 Waiting reply 1 day ago — "Status update..." — [RESPOND] button

**Each callback card:**
- [ ] Shows avatar with initials
- [ ] Shows customer name and channel
- [ ] Shows time since interaction
- [ ] Shows message preview (italicized)
- [ ] Has action button on right

---

## Test 6: Suggested Callback Interaction ✓

### Click Card
- [ ] Clicking anywhere on callback card triggers action
- [ ] Alert: "Calling {customer}..."
- [ ] Idle screen closes after action

### Click Button Only
- [ ] Clicking [CALL NOW]/[RESPOND] button triggers action
- [ ] Alert: "Calling {customer}..."
- [ ] Idle screen closes

**Hover effect:**
- [ ] Card background lightens on hover
- [ ] Border color changes to primary blue

---

## Test 7: Search Tab ✓
**Click Search tab (or it's default):**
- [ ] Search input visible: "Search customer by name, phone, or email..."
- [ ] Three filter chips below: [All Contacts] [Recent] [Favorites]
- [ ] All Contacts chip is active by default
- [ ] Contact quick-select list appears showing:
  - John Tylor — 555-0123 — [☎️] [💬] [📧]
  - Sarah Smith — 555-0124 — [☎️] [💬] [📧]
  - Mike Johnson — 555-0125 — [☎️] [💬] [📧]

**Search functionality:**
- [ ] Type in search box
- [ ] Results filter in real-time (mock data)
- [ ] Clear search shows all contacts again

**Filter chips:**
- [ ] Click [Recent] — highlights and filters list
- [ ] Click [Favorites] — highlights and filters list
- [ ] Click [All Contacts] — shows full list

**Contact action buttons:**
- [ ] Click ☎️ — Opens outbound > Call tab with number pre-filled
- [ ] Click 💬 — Opens outbound > SMS tab
- [ ] Click 📧 — Opens outbound > Email tab

---

## Test 8: Dialpad Tab ✓
**Click Dialpad tab:**
- [ ] Tab becomes active (underline visible)
- [ ] Shows number display field (empty)
- [ ] Shows 3x4 dialpad grid (0-9, *, #)
- [ ] Shows ⌫ Backspace button
- [ ] Shows [☎️ Call] button below

**Dialpad functionality:**
- [ ] Type 2025550123 (click buttons)
- [ ] Display formats as: +1 (202) 555-0123
- [ ] Click ⌫ Backspace → last digit deletes
- [ ] Type again → formatting updates
- [ ] Click [☎️ Call] → Alert: "Calling +1 (202) 555-0123..." and screen closes

---

## Test 9: Recent Conversations Section ✓
**Bottom of idle screen:**
- [ ] Section header: "RECENT CONVERSATIONS"
- [ ] Shows 3 conversation rows:
  - **JT** | John Tylor | 📞 Outbound • Resolved | 2h ago
  - **SS** | Sarah Smith | 💬 Chat • Resolved | 45m ago
  - **MJ** | Mike Johnson | 📧 Email • Waiting | 1d ago

**Each row:**
- [ ] Shows avatar with initials
- [ ] Shows customer name
- [ ] Shows channel icon and conversation status
- [ ] Shows time since interaction
- [ ] Clickable to view/resume conversation

---

## Test 10: Tab Switching ✓
**Between Search and Dialpad tabs:**
- [ ] Click Search tab → Shows search content, hides dialpad
- [ ] Click Dialpad tab → Shows dialpad content, hides search
- [ ] Tab underline follows active tab
- [ ] Content switches with no lag

---

## Test 11: Visual Design ✓
**Colors and spacing:**
- [ ] Header background: White
- [ ] Content background: Light gray (canvas color)
- [ ] Buttons have proper spacing (12px gap)
- [ ] Text hierarchy is clear (size, weight)
- [ ] Hover states are visible and smooth
- [ ] No overlapping elements

**Responsive:**
- [ ] All elements fit on screen (no horizontal scroll)
- [ ] Content scrolls vertically if needed
- [ ] Buttons remain clickable on hover

---

## Test 12: Dark Mode ✓
**Click Dark Mode toggle (moon icon):**
- [ ] Idle screen background darkens
- [ ] Text becomes light colored
- [ ] Buttons have dark background with light text
- [ ] All hover/active states still work
- [ ] No contrast issues

---

## Test 13: Integration with Other Screens ✓

**No interference with:**
- [ ] Queue screen still works when clicking Queue icon
- [ ] Outbound modal still works independently
- [ ] Chat doesn't get disrupted when opening idle screen
- [ ] Voicemail screen still functional

**Closing Idle Screen:**
- [ ] Click Workspace icon again → Closes
- [ ] Press ESC → Closes (if ESC handler added)
- [ ] Auto-closes when opening Outbound
- [ ] Auto-closes when initiating action

---

## Expected Behavior

✅ **When idle screen is open:**
- Agent sees "No Active Conversation" with prominent action buttons
- Quick actions for Call, SMS, Email, WhatsApp
- Suggested callbacks ready to click
- Easy search or direct dial options
- Recent conversations visible

✅ **When agent takes action:**
- Appropriate outbound modal opens
- Idle screen closes automatically
- Contact info may be pre-filled
- Agent continues workflow

✅ **When agent clicks another nav item:**
- Idle screen closes
- New screen/view opens
- Workspace icon becomes inactive

---

## Success Criteria
✅ All tests pass = Idle Screen is working correctly!

If any test fails:
1. Note which test #
2. Describe what happened
3. Take screenshot if possible
4. Report the issue

---

## Known Limitations (Mock Data)
⚠️ These are placeholders that would connect to real backend:
- Suggested callbacks are hardcoded (would come from backend)
- Search results are mock data (would query database)
- Contact list is static (would be dynamic from CRM)
- Alerts appear instead of actual calls/messages
- Recent conversations are demo data

---

## Next Integration Steps
1. Connect suggested callbacks to backend API
2. Implement real search with contacts database
3. Populate recent conversations from conversation history
4. Add real outbound initiation (not alerts)
5. Track agent idle time and state changes
6. Add analytics/logging for idle screen usage
