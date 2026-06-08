# ExpertFlow Agent Desktop — Copilot Context

> This file is the single source of truth for AI-assisted work on this project.
> Read it fully before suggesting any change. All conventions here are intentional.

---

## Project Overview

A **vanilla HTML/CSS/JS** agent desktop UI for ExpertFlow contact center software.
No build step, no framework — every file is a standalone HTML page served by `ef-server.py` (a local Python dev server that auto-injects `navbar.js` into every page).

### Files

| File | Purpose |
|---|---|
| `agent-desk-v2-template.html` | Main agent workspace — conversation view, voicemail, queue, outbound panel |
| `list-view-template.html` | Customer / phonebook listing — table, filters, contact cards, outbound panel |
| `navbar.js` | **Global** navbar component — injected into every page automatically by `ef-server.py`. Contains shared CSS, shared panel HTML, and all shared JS functions |
| `ef-server.py` | Local dev server — auto-injects `<script src="navbar.js">` before `</body>` |
| `ticket-management.html` | Separate ticket management view (independent) |

### Critical Rule

> **Any change to the navbar, header, or shared panels MUST be applied to ALL HTML templates simultaneously — never just one.**
>
> Navbar HTML lives inside each template's `<nav>` tag. Shared panel HTML (state dropdown, profile panel, notification panel, quick links panel) lives in `navbar.js` and is injected at runtime.

---

## Design System Tokens

Defined in `<style>` on `:root` in each template. Dark mode overrides on `.dark`.

```css
--color-primary:     #1a50a3   /* EF blue — buttons, active states, links */
--color-primary-h:   #1e5bb9   /* hover shade of primary */
--color-primary-lt:  #ECF3FF   /* light blue bg — hover highlights, badges */
--color-bg:          #ffffff   /* page / card background */
--color-canvas:      #F3F6FA   /* secondary surface — table rows, inputs */
--color-text:        #282828   /* primary text */
--color-muted:       #929292   /* secondary / placeholder text */
--color-border:      #ececec   /* subtle dividers */
--color-border-p:    #d1dced   /* prominent borders */
--color-border-i:    #c5c5c5   /* input borders */
--color-success:     #26c98c   /* green — Ready state, success notifications */
--color-error:       #ff6767   /* red — error notifications, logout, end call */
```

Dark mode tokens (applied on `.dark` class on `#app`):
```css
--color-bg: #1e2022;  --color-canvas: #151515;
--color-text: #e5e7eb; --color-muted: #9ca3af;
--color-border: #2c2f35;
```

---

## Navbar Structure (both templates)

Each template has its own `<nav>` HTML. The order of buttons is identical in both:

```html
<nav>
  <!-- Hamburger menu -->
  <button class="nav-ham" aria-label="Menu" data-tip="Menu">…</button>

  <!-- Logo -->
  <img class="nav-logo" …>

  <!-- Left nav buttons (page navigation) -->
  <button class="nav-btn [active]" aria-label="Customers / Phonebook" onclick="navTo('list-view-template.html')">…</button>
  <button class="nav-btn [active]" aria-label="Conversations" onclick="navTo('agent-desk-v2-template.html')">…</button>

  <!-- Right nav buttons (tools/panels) -->
  <button class="nav-btn" aria-label="Quick Links" onclick="toggleQuickLinks(event)">   <!-- chain link SVG -->
  <button class="nav-btn" id="vmNavBtn" aria-label="Voicemail — 3 unread" onclick="toggleVm()">
    <span class="nav-badge">3</span>
  </button>
  <button class="nav-btn" aria-label="Notifications" onclick="toggleNotifDD(event)">
    <span class="nav-badge">3</span>
  </button>
  <button class="nav-btn" aria-label="Outbound" onclick="openOutbound()">…</button>

  <div class="nav-vsep"></div>

  <!-- State pill -->
  <div class="state-pill" onclick="toggleStateDD(event)">
    <span class="state-check" style="background:#26c98c">…</span>
    <span>Ready</span>
    <span style="font-variant-numeric:tabular-nums">00:00:00</span>  <!-- live timer -->
  </div>

  <!-- Agent avatar -->
  <div class="agent-av" onclick="togglePP(event)">AJ</div>
</nav>
```

**CSS classes:**
- `.nav-btn` — 30×30px icon button, `border-radius:6px`, hover scales 1.1×
- `.nav-btn.active` — filled primary blue circle, white icon (marks current page)
- `.nav-badge` — red dot badge (absolute top-right of button), `background:var(--color-error)`
- `.nav-vsep` — 1px vertical separator
- `.state-pill` — rounded pill with colored status dot + label + live timer
- `.agent-av` — 32px circular avatar with agent initials

**Tooltip system:** All buttons use `data-tip="…"` (not `title`). A single `document.addEventListener('mouseover')` delegation listener in each template shows/hides `#tb-tooltip`. This covers dynamically rendered content.

---

## navbar.js — Global Shared Component

**How it works:** IIFE (immediately invoked function expression). Injects CSS into `<head>`, removes any stale panel elements, then `insertAdjacentHTML('beforeend', ...)` into `#app` (or `<body>`). Runs on `DOMContentLoaded` or immediately if DOM is ready.

### Shared State Variables

```js
var sddOpen = false    // state dropdown
var ppOpen  = false    // profile panel
var notifOpen = false  // notification panel
var qlOpen  = false    // quick links panel
```

### Global Functions (on `window`)

| Function | What it does |
|---|---|
| `navTo(url)` | Fade-out `#app` 120ms then navigate |
| `toggleDark()` | Toggle `.dark` on `#app`, persist to `sessionStorage` |
| `toggleStateDD(e)` | Open/close state dropdown, positioned below `.state-pill` |
| `closeSDD()` | Close state dropdown |
| `selectState(name, color)` | Update pill dot color + label, tick the correct item |
| `toggleChannel(ch)` | Toggle voice/chat/email channel toggles in state dropdown |
| `togglePP(e)` | Open/close profile panel, positioned below `.agent-av` |
| `closePP()` | Close profile panel |
| `updatePpDarkToggle()` | Sync dark mode toggle in profile panel |
| `toggleNotifDD(e)` | Open/close notification panel |
| `closeNotifDD()` | Close notification panel |
| `readNotif(item)` | Mark single notification as read, update badge |
| `markAllNotifRead()` | Mark all notifications read, update badge |
| `toggleQuickLinks(e)` | Open/close quick links panel, render fresh list |
| `closeQuickLinks()` | Close quick links panel |
| `qlTogglePin(id)` | Toggle pin state of a quick link, re-render list |
| `qlSearch(q)` | Filter quick links by label text |
| `qlNavigate(id)` | Navigate to link URL (external opens new tab) |

### Injected Panels

All panels are `position:fixed`, `z-index:600`, positioned via JS using `getBoundingClientRect()` of the trigger button.

| Panel ID | Trigger | Width |
|---|---|---|
| `#stateDropdown` | `.state-pill` click | 236px min |
| `#profilePanel` | `.agent-av` click | 280px |
| `#notifPanel` | `[aria-label="Notifications"]` click | 360px |
| `#qlPanel` | `[aria-label="Quick Links"]` click | 380px |

**Outside-click / Escape:** Both handled in `navbar.js`. Escape closes all panels. Clicking outside a panel closes that panel (checks `!panel.contains(e.target)` and `!e.target.closest(triggerSelector)`).

### Quick Links Data

```js
var QL_LINKS = [
  {id:1, label:'Start New Interaction',  url:'#', pinned:true,  external:false},
  {id:2, label:'Compliance Check',       url:'#', pinned:true,  external:false},
  {id:3, label:'Outbound sales agents',  url:'#', pinned:true,  external:true},
  {id:4, label:'SaaS customer success',  url:'#', pinned:true,  external:false},
  {id:5, label:'CRM Portal',             url:'#', pinned:false, external:false},
  {id:6, label:'Live Chat Console',      url:'#', pinned:false, external:false},
  {id:7, label:'Email Templates',        url:'#', pinned:false, external:false},
  {id:8, label:'Script Library',         url:'#', pinned:false, external:false},
  {id:9, label:'Knowledge Base',         url:'#', pinned:false, external:false},
];
```

Rendered dynamically by `_qlRender(q)`. Pinned items show filled blue pin icon; unpinned show outline pin. State persists in the JS array during the session.

---

## agent-desk-v2-template.html

### Layout

Three-column layout inside `#app`:
1. **Left sidebar** — conversation list
2. **Center** — active conversation (messages, toolbar, composer)
3. **Right** — customer info, conversation details, knowledge base (collapsible sections)

### Key Component IDs

| ID | Description |
|---|---|
| `#ciPeek` | Contact card — peek state (280px wide) |
| `#ciExpanded` | Contact card — expanded state (300px, scrollable) |
| `#ecpOverlay` | Edit Customer Panel backdrop |
| `#ecpPanel` | Edit Customer Panel (slide-in from right, 440px) |
| `#outboundModal` | Outbound dialer panel (right side, 396px) |
| `#dialpadSection` | Dialpad grid (hidden by default) |
| `#vmScreen` | Voicemail inbox overlay |
| `#queueScreen` | Queue/recent conversations overlay |
| `#callCtrl` | Active call controls bar |

### Contact Card System (agent-desk)

Two-state card triggered by hovering the customer avatar (`.ch-av`) in the right panel:

- **Peek card** (`#ciPeek`): avatar, name, status dot, phone, email, channel icons, link+edit buttons, "View more" button
- **Expanded card** (`#ciExpanded`): same header, full channel identifiers list, general info fields, "View less" button

**CSS classes:** `.ci-card`, `.ci-top`, `.ci-av`, `.ci-meta`, `.ci-icons`, `.ci-edit`, `.ci-ch-list`, `.ci-ch-row`, `.ci-num`, `.ci-sub`, `.ci-rows`, `.ci-div`, `.ci-sec-ttl`, `.ci-fields-box`

**Visibility:** `.visible` class — uses `opacity` + `pointer-events` transition (not `display`).

**Functions:**
```js
showPeek()        // show peek card after positioning
hidePeek()        // 200ms delay then hide (allows mouse travel)
expandCi()        // peek → expanded
collapseCi()      // expanded → peek → hide
openEditCustomer()  // open ECP overlay + panel
closeEditCustomer() // close ECP
```

### Outbound Panel (agent-desk)

```
#outboundModal (width: 396px, fixed right)
  ├── header (title + close)
  ├── .ob-search-row (display:flex, gap:10px)
  │     ├── .ob-search-wrap (flex:1, height:38px) — search input with magnifier icon
  │     └── .ob-dialpad-tog (height:38px, min-width:44px) — dialpad toggle button
  ├── .ob-add-bar — "Number not found" bar (hidden by default)
  ├── .ob-dialpad — 3-col digit grid (hidden by default)
  ├── .ob-contact-list — scrollable contact rows
  └── .ob-composer-area — SMS / Email / WhatsApp in-flow composers (one at a time)
```

No footer Clear/Call buttons. Call initiated from contact row call icon or `initiateCall()`.

**Composer pattern:** `_closeAllComposers()` hides all; `_openComposer(id, focusId)` shows one.

---

## list-view-template.html

### Layout

Two-column layout:
1. **Left** — filter sidebar (labels, channel filters)
2. **Right** — search bar + data table + pagination

### Table Rendering

`FULL_DATA` array → filtered by `filtered` → paginated → rendered by `renderTable()`.

Each row has:
- Customer avatar (`.cust-av-sm`) — shows initials, `onmouseenter="showContactCard(event, id)"`, hover flips to primary blue
- Name, labels (colored dots), channel icon, status, last contact, actions

**CHANNEL_SETS** — deterministic per-row channel assignment (index-based, so re-renders don't shuffle icons).

### Contact Card System (list-view)

Two-card system identical in structure to agent-desk, but IDs are different:

- **Peek card** (`#lccPeek`, 260px): triggered by `showContactCard(event, id)` on avatar/name hover
- **Expanded card** (`#lccExpanded`, 300px): triggered by `expandLcc()` inside peek card

**Hide delay:** 220ms timeout on `startHideCard()`. `cancelHideCard()` called on `mouseenter` of either card or the trigger element.

**Functions:**
```js
showContactCard(event, id)   // populate + show lccPeek
expandLcc()                  // lccPeek → lccExpanded (populates fields + channels)
collapseLcc()                // lccExpanded → lccPeek
startHideCard()              // 220ms timer to hide both cards
cancelHideCard()             // clear the timer
openEditCustomer()           // open ecpOverlay + ecpPanel
closeEditCustomer()          // close ECP
```

### Edit Customer Panel (ECP) — same structure in both templates

```
#ecpOverlay (full-screen backdrop, onclick closes)
#ecpPanel (slide-in from right, width:440px)
  ├── .ecp-hdr (title + close button)
  ├── .ecp-body
  │     ├── General Info section
  │     │     ├── Full Name input
  │     │     ├── Label select
  │     │     └── Role input
  │     └── Channel Identifiers section
  │           ├── WhatsApp — 2 value rows (each: input + delete btn)
  │           ├── Facebook — 1 value row
  │           ├── Email — value rows + "Add" button
  │           ├── Phone — value rows + "Add" button
  │           ├── WeChat / Messaging — value rows
  │           └── LinkedIn — value rows
  └── .ecp-footer (Cancel + Save buttons)
```

**CSS classes:** `.ecp-overlay`, `.ecp-panel`, `.ecp-panel.open`, `.ecp-hdr`, `.ecp-body`, `.ecp-sec-ttl`, `.ecp-ch-block`, `.ecp-ch-hdr`, `.ecp-ch-ico`, `.ecp-val-row`, `.ecp-val-inp`, `.ecp-del-btn`, `.ecp-add-btn`, `.ecp-footer`, `.ecp-cancel`, `.ecp-save`

### Outbound Panel (list-view)

Identical to agent-desk version: 396px wide, same search/dialpad layout, no footer.

---

## Tooltip System

Each template implements its own tooltip via event delegation — **not per-element listeners**.

```js
// Single listener covers all current and future elements
document.addEventListener('mouseover', function(e) {
  var el = e.target.closest('[data-tip]');
  // position and show #tb-tooltip
});
document.addEventListener('mouseout', function(e) {
  // hide #tb-tooltip
});
```

**All interactive elements use `data-tip="Label"` not `title="Label"`.**

---

## Notification Panel

```
#notifPanel (360px, max-height:480px)
  ├── .notif-hdr — title + unread count badge + "Mark all as read" button
  ├── .notif-list — scrollable list of .notif-item elements
  │     Each item: icon circle + body (title, desc, time) + optional unread dot
  │     .unread class = blue-tinted background
  │     Icons: .notif-ico.info / .warn / .success / .error
  └── .notif-footer — "View all notifications" button
```

**Badge update:** `_updateNotifCount()` updates both `#notifBadgeCount` (inside panel) and `.nav-badge` on the bell nav button.

---

## State / Status Dropdown

```
#stateDropdown (236px min)
  ├── Agent State section: Ready / Lunch Break / Out of Office
  ├── Channels section: Voice / Chat / Email toggles
  └── Logout item
```

Tick mark (✓) shown next to active state. `selectState(name, color)` updates the `.state-pill` dot color and text.

---

## Profile Panel

```
#profilePanel (280px)
  ├── .pp-top — avatar + name + Ready status
  └── .pp-menu — My Profile / My Statistics / Supervisor View / Activity Log / Settings / Dark Mode toggle / Sign Out
```

Dark mode toggle in profile panel calls `toggleDark()` (defined in `navbar.js`) + `updatePpDarkToggle()`.

---

## CSS Naming Conventions

| Prefix | Domain |
|---|---|
| `nav-` | Navbar elements |
| `ci-` | Contact card (agent-desk — peek + expanded) |
| `lcc-` | List-view contact card peek |
| `lce-` | List-view contact card expanded |
| `ecp-` | Edit Customer Panel |
| `ob-` | Outbound modal |
| `ob-search-` | Outbound search bar |
| `ob-dialpad-` | Outbound dialpad |
| `vm-` | Voicemail components |
| `cc-` | Active call controls |
| `sdd-` | State dropdown |
| `pp-` | Profile panel |
| `notif-` | Notification panel |
| `ql-` | Quick links panel |
| `tb-` | Toolbar buttons (in conversation toolbar) |
| `ch-` | Channel chip / channel-related (context-dependent) |

---

## Known Patterns & Conventions

1. **No framework** — vanilla JS only. Arrow functions, template literals, `const`/`let` are fine. No imports/exports.
2. **No CSS preprocessors** — all styles inline in `<style>` blocks within each HTML file, plus `navbar.js` injects its own `<style id="ef-navbar-css">`.
3. **Position panels with JS** — all dropdown/overlay panels use `getBoundingClientRect()` on the trigger to set `top`/`right` on the panel via `style` property.
4. **Transitions via class toggle** — panels use `.open` or `.visible` class. CSS handles `opacity`, `transform`, `pointer-events` transitions. Do not use `display:none` toggling when smooth transitions are needed.
5. **Shared state stays in navbar.js** — `sddOpen`, `ppOpen`, `notifOpen`, `qlOpen`. Page-specific state (e.g., `vmOpen`, `qlOpen` within a page) lives in the template's own `<script>`.
6. **`data-tip` not `title`** — all tooltips use `data-tip` attribute.
7. **SVG icons inline** — no icon font except Material Icons (`<span class="material-icons">icon_name</span>`). Both approaches are used; prefer whichever is already used in the surrounding context.
8. **EF blue stroke on nav icons** — `stroke="#1a50a3"` on navbar SVG icons (not CSS variable, intentionally hardcoded so active state override `stroke:#fff` works cleanly).

---

## What NOT to Do

- Do not add `title=` attributes to buttons — use `data-tip=` instead.
- Do not add `display:none` / `display:block` toggling to panels that should animate — use `.open` / `.visible` class.
- Do not modify only one template when changing navbar elements — always update both.
- Do not introduce new external dependencies (no CDN imports, no npm packages).
- Do not add comments explaining what code does — only add comments when a non-obvious constraint or workaround is present.
- Do not add error handling for impossible cases (e.g., null-checking elements that are always in the DOM).
- Do not create separate JS files — all page-specific JS lives in `<script>` at the bottom of each HTML file.
