# ExpertFlow Agent Desk — Project Context Reference

Use this file to onboard a new Claude / Copilot session with full project context.

---

## Project Location
`/Users/mac/Desktop/EF/Claude/Expertflow Template/`

---

## Files

| File | Purpose |
|---|---|
| `agent-desk-v2-template.html` | Main agent desk UI (single canvas) |
| `list-view-template.html` | Contact listing / contacts screen |
| `navbar.js` | Shared IIFE — injects CSS + HTML + JS for all global panels into every page |
| `ef-server.py` | Dev server — auto-injects `navbar.js` into every HTML response |
| `COPILOT-CONTEXT.md` | Detailed component-by-component reference for Copilot |
| `CLAUDE.md` | Design system spec (ABSOLUTE — all tokens, components, constraints) |

---

## Architecture

**navbar.js** is a self-contained IIFE that runs on every page. It:
1. Injects shared CSS (all panel styles, tooltip styles, nav-btn hover)
2. Injects shared HTML (`#stateDropdown`, `#profilePanel`, `#notifPanel`, `#qlPanel`, `#hamPanel`, `#hamSub`) into `#app` via `insertAdjacentHTML('beforeend')`
3. Registers all global JS functions on `window.*`
4. Sets up a single `mousedown` outside-click handler and `keydown` Escape handler
5. Runs `init()` on `DOMContentLoaded`

**CRITICAL RULE:** Any change to navbar layout, navbar icons, or shared panels must be made in `navbar.js`. Any feature that exists in both HTML templates must be updated in BOTH files simultaneously.

---

## Design Tokens (`:root` in each template)

```css
--color-primary:    #1a50a3   /* EF blue */
--color-primary-h:  #1e5bb9   /* hover */
--color-primary-lt: #ECF3FF   /* light blue — page-body bg, row hover, active badges */
--color-bg:         #ffffff
--color-canvas:     #F3F6FA   /* secondary surface */
--color-text:       #282828
--color-body:       #212121
--color-medium:     #555555
--color-muted:      #929292
--color-border:     #ececec
--color-border-p:   #d1dced   /* prominent border */
--color-border-i:   #c5c5c5   /* input border */
--color-success:    #26c98c
--color-error:      #ff6767
--color-warn:       #fdb635
--navbar-h:         50px
```

**Font:** Roboto only.  
**Icons:** Inline SVG only — no icon fonts, no Material Icons (permanently banned).

---

## Shared Panels (all injected by navbar.js)

| Panel ID | Trigger | Toggle Function | Width |
|---|---|---|---|
| `#stateDropdown` | `.state-pill` | `toggleStateDD(e)` | 236px |
| `#profilePanel` | `.agent-av` | `togglePP(e)` | 280px |
| `#notifPanel` | `[aria-label="Notifications"]` | `toggleNotifDD(e)` | 360px |
| `#qlPanel` | `[aria-label="Quick Links"]` | `toggleQuickLinks(e)` | 380px |
| `#hamPanel` + `#hamSub` | `.nav-ham` | `toggleHamMenu(e)` | 300px + 270px |

- All panels: `position:fixed`, `z-index:600+`, positioned via `getBoundingClientRect()`
- Opening any panel closes all others
- Shared state vars: `sddOpen`, `ppOpen`, `notifOpen`, `qlOpen`, `hamOpen`, `_hamSubTimer`

---

## Navbar Structure (both templates)

```
LEFT:   .nav-ham (hamburger → toggleHamMenu) | Logo SVG | subtitle
RIGHT:  nav-btn icons | .state-pill (toggleStateDD) | .agent-av (togglePP)
```

**Nav btn hover:** `border-radius:50%` — circle, not square. Both hover and active states are circular.  
**Nav icon SVG stroke:** hardcoded `stroke="#1a50a3"` (not CSS var).  
**Tooltips:** `data-tip="Label"` attribute — single delegation listener, never per-element mouseenter.

---

## Hamburger Menu (navbar.js)

- **Main panel (300px):** Dashboard (hover → submenu) | Subscribed Lists | **Customer Interactions** (active) | Customers | Customer Labels
- **Submenu (270px, fly-out to right):** Summary Dashboard | Agent Performance Dashboard | Available Agents Detail | My Past Conversations
- Submenu uses 120ms hide delay (`_hamSubTimer`) so mouse can travel across the gap without it closing
- `hamShowSub(item)` flips submenu to left side if near viewport right edge

---

## Quick Links Panel (navbar.js)

- `QL_LINKS` array: 4 pinned + 5 unpinned items
- `_qlRender(q)` renders sorted list — pinned first, then a 1px divider with `margin:14px 0`, then unpinned
- **Header:** "Quick Links" text + close button only — no icon in header
- Pin/unpin toggles per item; state persists in JS array for the session

---

## Page Layout Pattern

All listing screens use this floating-card pattern:

```css
.page-body {
  background: var(--color-primary-lt);  /* light blue canvas */
  padding: 12px;
  gap: 8px;
  display: flex;
  flex-direction: column;
}
/* Content inside = white bordered cards floating on light blue */
```

---

## Voicemail Screen (`#vmScreen`)

Must match contacts listing **100%**:

```
#vmScreen  (position:fixed, full viewport below navbar)
  background: var(--color-primary-lt);  padding:12px;  gap:8px

  .vm-top-card          ← white card (toolbar)
    .vm-page-hdr        ← single row: title | badge | spacer | search | filter pills

  .vm-table-wrap        ← white card (table)
    .vm-table
```

- Title "Voicemail" — **no icon**, `font-size:20px; font-weight:600`
- Filter pills (All / Unread / Read) live **in the same toolbar row** as title + search — NOT a separate row below
- Filter button style: `border-radius:4px`, `border:1px solid var(--color-border-i)`, blue active state (tb-btn style)
- Row hover: `background:var(--color-primary-lt)`

---

## Contact Cards

### agent-desk-v2-template.html
- Trigger: `.ch-av` hover
- Cards: `#ciPeek` (280px) → `#ciExpanded` (300px)
- Flow: hover → peek → "View more" → expanded → "View less" → back
- Edit icon → `openEditCustomer()` → `#ecpPanel` (440px slide-in from right)

### list-view-template.html
- Trigger: `.cust-av-sm` hover in table row — `showContactCard(event, id)`
- Cards: `#lccPeek` (260px) → `#lccExpanded` (300px)
- Hide delay: 220ms via `startHideCard()` / `cancelHideCard()`

---

## Outbound Panel

- Width: 396px
- Search bar (`.ob-search-wrap`): `height:38px; flex:1`
- Dialpad toggle (`.ob-dialpad-tog`): `height:38px; min-width:44px; font-size:22px`
- 10px gap between search and dialpad button

---

## CSS Prefix Map

| Prefix | Domain |
|---|---|
| `nav-` | Navbar elements |
| `vm-` | Voicemail screen |
| `ob-` | Outbound modal |
| `ci-` | Contact card — agent-desk |
| `lcc-` / `lce-` | Contact card — list-view |
| `ecp-` | Edit Customer Panel (440px slide-in) |
| `sdd-` | State dropdown |
| `pp-` | Profile panel |
| `notif-` | Notification panel |
| `ql-` | Quick Links panel |
| `ham-` | Hamburger menu + submenu |
| `tb-` | Conversation toolbar buttons |
| `cc-` | Active call controls |

---

## Hard Rules — Never Violate

1. **Both templates always.** Every change to a shared feature goes to both `agent-desk-v2-template.html` AND `list-view-template.html`
2. **No icons next to screen titles.** Plain text titles only (`font-size:20px; font-weight:600`)
3. **No Material Icons, no icon fonts.** Inline SVG only
4. **Nav btn hover = circle.** `border-radius:50%` on both `:hover` and `.active`
5. **Token values only.** No invented hex colours — always use the CSS variable
6. **Layout is locked.** Tab strip | Center pane | Right panel — no 4th column, no new pages
7. **Panel positioning via getBoundingClientRect().** Never hardcode `top` / `left` values for navbar panels
8. **Quick Links header has no icon.** Text + close button only
9. **Voicemail filters are in the toolbar row.** Never in a separate row below the header
10. **14px gap between pinned and unpinned** in Quick Links (`margin:14px 0` on the separator div)
