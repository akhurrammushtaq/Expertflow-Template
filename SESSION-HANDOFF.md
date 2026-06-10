# Session Handoff — ExpertFlow UI

Use this file to resume work in a new conversation. Read CLAUDE.md and SKILL-v2.md first, then this file.

---

## Files in Play

| File | Purpose |
|---|---|
| `agentdesk-new.html` | Richer agent desk — sidenav (56px), inline overlay screens, 247-row contacts |
| `agent-desk-v2-template.html` | Standard agent desk — 3-column layout per SKILL-v2.md |
| `list-view-template.html` | Standalone contacts/listing page |
| `navbar.js` | Global IIFE injected into all pages — owns outbound panel, call controls, state pill, tooltips |
| `SKILL-v2.md` | Design system spec — tokens, components, layout rules |

**Critical rule:** Every change goes to ALL files that contain that screen. Never touch only the file in context. See memory file `feedback_apply_changes_to_all_templates.md`.

---

## Architecture — Key Facts

### navbar.js injection (CRITICAL)
- Runs as IIFE on every page load
- **Removes** any existing `#outboundModal` and `#callCtrl` from the DOM then re-injects its own versions
- Defines on `window.*`: `openOutbound`, `closeOutbound`, `obRenderContacts`, `obInitials`, `openSmsComposer`, `openEmailComposer`, `openWaComposer`, `addContactFromDialpad`
- Outbound modal IDs (navbar.js owned): `callSearch`, `dialpadTogBtn`, `dialpadSection`, `callContactList`, `obSmsComposer`, `obEmailComposer`, `obWaComposer`, `smsToInp`, `smsMsgInp`, `emailToInp`, `emailSubjInp`, `emailMsgInp`, `waToInp`, `waMsgInp`
- Call control IDs (navbar.js owned): `callCtrl`, `ccAv`, `ccName`, `ccStatus`, `ccTimer`, `ccMuteBtn`, `ccMuteIc`, `ccMuteLbl`, `ccHoldBtn`, `ccHoldIc`, `ccHoldLbl`, `ccKpBtn`

### agentdesk-new.html screens
All screens are inline overlays inside the single HTML file:
- `#dashScreen` — dashboard
- `#custScreen` — contacts listing (247 rows, `CUST_BASE` data, `custRenderTable()`)
- `#vmScreen` — voicemail
- `#ticketScreen` — tickets
- `#queueScreen` — queue

Screen navigation: `snavNav(el, actionFn)` → saves active nav to `sessionStorage('efActiveNav')` → restored on refresh via `_restoreNav()`

---

## What Was Done This Session

### 1. Toolbar active state (both templates)
```css
.tb.act { background: #555555; }
.tb.act svg { fill: #fff; width: 20px; height: 20px; }
```
Changed from blue `#1a50a3` to dark grey `#555555`. Icon size reduced to 20px.

### 2. Wrapup system ported to agentdesk-new.html
Full wrapup drawer (CSS + HTML + JS) copied from v2. Prefix: `wu-`. Auto-triggers on `exitCall()`. Right-side fixed drawer 380px. Backdrop click to dismiss.

### 3. Outbound panel — agentdesk-new.html now uses navbar.js
**Problem:** navbar.js deletes and replaces `#outboundModal` and `#callCtrl` at runtime. Local implementations were pointless.
**Fix:** Removed entire local `#outboundModal` HTML, all local outbound JS (`OB_CONTACTS`, `WA_SVG`, `openOutbound`, `closeOutbound`, `obRenderContacts`, dialpad functions, all composer functions). navbar.js owns the outbound panel 100%.
**Kept local:** `startCall`, `endCall`, `ccMute`, `ccHold`, `ccKeypad` (use navbar.js-injected IDs).

### 4. Call controller — inline SVG (agentdesk-new.html)
Replaced `material-icons` spans with inline SVG constants:
- `_CC_MIC_SVG`, `_CC_MIC_OFF_SVG`, `_CC_PAUSE_SVG`, `_CC_PLAY_SVG`
- `startCall`, `ccMute`, `ccHold` use `getElementById('ccMuteIc')` / `getElementById('ccHoldIc')`

### 5. Tab switching → contact card sync (agentdesk-new.html)
`data-contact="jt/rk/aj/tb"` on each `.conv-tab`. `switchConvTab()` calls `updateContactCard(contactId)` which updates peek + expanded card with correct contact data.

### 6. Outbound icon in v2
Changed to diagonal arrow (↗):
```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a50a3" stroke-width="1.8">
  <line x1="7" y1="17" x2="17" y2="7"/>
  <polyline points="7 7 17 7 17 17"/>
</svg>
```

### 7. Dialpad icon fix (navbar.js line ~662)
Replaced broken path-based SVG with 10 explicit `<circle>` elements.

### 8. Contacts list hover icons — both listing templates
`_custRowIcons(r)` in agentdesk-new.html and `rowObIcons(r)` in list-view-template.html:
- **Call** → `startCall(phone, name)` directly (opens call controller)
- **SMS** → `window.openSmsComposer(phone, name)`
- **Email** → `window.openEmailComposer(email, name)`
- **WhatsApp** → `window.openWaComposer(phone, name)`

### 9. Close outbound on nav change
`_closeAllScreens()` calls `if(window.closeOutbound)window.closeOutbound()` — covers all nav actions.

### 10. Row action icons — unified style (all listing templates)
```css
.row-ob-icon {
  width: 26px; height: 26px;
  border-radius: 4px;          /* was 50% */
  color: var(--color-muted);   /* was missing / --color-medium */
  transition: color .15s, background .15s;  /* no more scale(1.15) */
}
.row-ob-icon:hover { background: var(--color-primary-lt); color: var(--color-primary); }
.row-ob-icon svg { fill: currentColor; width: 16px; height: 16px; }
```
WA icon simplified: `fill="currentColor"` — no more `.row-wa-ic` class or separate fill rules.

### 11. Icons right-aligned in listing
`.actions-cell { text-align: right }` in both listing templates. Dynamic row `<td>` gets `class="actions-cell"`.

### 12. Session persistence on refresh (agentdesk-new.html)
`snavNav()` saves `el.id` to `sessionStorage('efActiveNav')`. `_restoreNav()` called at script end restores active screen on refresh. All sidenav items now have IDs: `snavDashboard`, `snavConversations`, `snavOutbound`, `snavCall`, `snavContacts`, `snavQuickLinks`, `vmSnavItem`, `snavTickets`.

---

## Known Patterns / Non-obvious Rules

- `data-tip="Label"` for tooltips — delegated listener in navbar.js, never per-element
- All icons = inline SVG only — Material Icons font permanently banned
- `startCall(phone, name)` — works on navbar.js-injected `#callCtrl`, safe to call from anywhere
- `window.openOutbound()` — always call via `window.` since navbar.js defines it on window
- Active toolbar button: CSS `.tb.act` gives dark grey bg + white 20px icon — never add circle paths inside SVGs
- `ch-info` needs `min-width:0; overflow:hidden` — toolbar needs `flex-shrink:0` — never remove
- sessionStorage (not localStorage) for nav state — clears on tab close, correct for work sessions

---

## Pending / Watch Out

- `agentdesk-new.html` idle screen contact buttons use emoji (☎️💬📧) — should eventually be inline SVG
- `ticket-management.html` exists but hasn't been synced with the nav/style changes from this session
- Any new screen added must exist as: (1) standalone HTML file AND (2) inline overlay in `agentdesk-new.html`
