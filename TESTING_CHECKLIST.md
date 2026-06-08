# Outbound Modal Testing Checklist

## Quick Start
1. **Hard refresh browser**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)
2. **Click the outbound arrow icon** in top-right navbar
3. Follow tests below

---

## Test 1: Dialpad Functionality ✓
**In CALL tab:**
- [ ] Click dialpad numbers (1-9, 0, *, #) → Numbers appear and format as +1 (555) 123-4567
- [ ] Click ⌫ Backspace → Last digit deletes
- [ ] Click Clear → All numbers cleared
- [ ] Type multiple numbers → Format updates correctly

**Example:** Type 2, 0, 2, 5, 5, 5, 0, 1, 2, 3 → Should show: +1 (202) 555-0123

---

## Test 2: Contact Hover Actions ✓
**In CALL tab contact list:**
- [ ] Hover over "John Tylor" → Three icons appear on the right (Call, SMS, WhatsApp)
- [ ] Hover away → Icons disappear
- [ ] Icons are Material Design SVG (not emojis)

---

## Test 3: Quick Actions from Contact ✓
**From hovering contact:**
- [ ] Click ☎️ Call icon → Alert: "Calling +1 (555) 0123..."
- [ ] Click 💬 SMS icon → Switches to SMS tab with number pre-filled in "To:" field
- [ ] Click 📱 WhatsApp icon → Alert: "Opening WhatsApp for +1 (555) 0123..."

---

## Test 4: Direct Contact Selection ✓
**In CALL tab:**
- [ ] Click on contact name/phone → Number appears in dialpad display
- [ ] Selected number shows formatted: +1 (555) 0123

---

## Test 5: Add Contact from Dialpad ✓
**IMPORTANT - This is the new flow:**
- [ ] Type number on dialpad: `2025551234`
- [ ] Click **"+ Add Contact"** button (below backspace)
- [ ] Modal opens with fields:
  - Phone: `+1 (202) 555-1234` (pre-filled)
  - First Name: (empty, focus here)
  - Last Name: (empty)
  - Email: (empty)
  - Company: (empty)
  - Notes: (empty)
- [ ] Checkbox: "Call after saving contact" (checked)

---

## Test 6: Save New Contact ✓
**In the Add Contact modal:**
- [ ] Fill in: First Name = "John", Last Name = "New Contact"
- [ ] Click "Save Contact"
- [ ] Alert: "Contact saved: John New Contact - +1 (202) 555-1234"
- [ ] Alert: "Calling +1 (202) 555-1234..."
- [ ] Modal closes
- [ ] Back in dialpad with number still showing

---

## Test 7: Save Without Calling ✓
**In the Add Contact modal:**
- [ ] Fill in: First Name = "Jane Doe"
- [ ] UNCHECK "Call after saving contact"
- [ ] Click "Save Contact"
- [ ] Alert: "Contact saved: Jane Doe..."
- [ ] NO calling alert
- [ ] Modal closes

---

## Test 8: Cancel Adding Contact ✓
**In the Add Contact modal:**
- [ ] Fill in some details
- [ ] Click "Cancel" button
- [ ] Modal closes without saving
- [ ] Form data is cleared (if you open modal again)

---

## Test 9: Validation ✓
**Add Contact modal validation:**
- [ ] Try to save with empty First Name
- [ ] Alert: "Please enter at least a first name"
- [ ] Contact is NOT saved
- [ ] Modal stays open

---

## Test 10: SMS Tab ✓
**Click SMS tab:**
- [ ] Tab becomes active (underline visible)
- [ ] Shows "Search or enter number..." field
- [ ] Shows recent contacts below
- [ ] Message compose area at bottom
- [ ] "To:" field shows selected contact number
- [ ] Character counter shows "0/160"
- [ ] Type SMS message → Counter updates
- [ ] Click "Send SMS" → Alert with message sent

---

## Test 11: Email Tab ✓
**Click EMAIL tab:**
- [ ] Tab becomes active
- [ ] Shows contact search field
- [ ] "To:", "Subject:", and "Message" fields appear
- [ ] Fill all fields and click "Send Email" → Alert confirms

---

## Test 12: Search Contacts ✓
**In CALL tab:**
- [ ] Type "john" in search field → Shows only John Tylor
- [ ] Type "555" → Shows contacts with 555 in phone number
- [ ] Clear search → All contacts visible again

---

## Test 13: Modal Close & Reopen ✓
- [ ] Click "X" close button on modal
- [ ] Modal slides in from right
- [ ] Reopen modal → Previous data is cleared (fresh modal)

---

## Expected Issues (Known Limitations)
⚠️ **These are placeholders that would connect to real backend:**
- Alerts appear instead of actual calls/SMS/emails
- New contacts are saved to alerts, not actual database
- Search is basic text matching

---

## Success Criteria
✅ All tests pass = Outbound modal is working correctly!

If any test fails:
1. Note which test #
2. Describe what happened
3. Share screenshot if possible
4. I'll fix it

---

## How to Report Issues
Format:
```
Test #: [NUMBER]
Expected: [WHAT SHOULD HAPPEN]
Actual: [WHAT HAPPENED]
Screenshot: [IF AVAILABLE]
```

Example:
```
Test #3: Click SMS icon from contact
Expected: Switch to SMS tab with number pre-filled
Actual: Nothing happened
```
