---
name: expertflow-list-view-design-system
description: >
  ExpertFlow List / Table View design system. Use this skill for ANY list, table,
  grid, or phonebook-style screen in the ExpertFlow product. This is the single
  source of truth for list-view-template.html. Read this fully before producing
  any output. Do not invent values — every token, radius, spacing, and component
  spec lives here.
source: Extracted from List.htm (Angular production build) +
        list-view-template.html (verified against live app) +
        SKILL-v2 design tokens (shared source)
license: Proprietary — ExpertFlow internal use only.
---

# ExpertFlow List View Design System

---

## ⛔ ABSOLUTE CONSTRAINTS — read first, follow always

1. **One canvas, one file.** Every output is `list-view-template.html` with the feature integrated. Never produce a standalone component or a separate file.
2. **Zero invented values.** Every colour, font size, radius, shadow, and spacing must come from Section 2–6 of this document. If it isn't listed, ask before using it.
3. **Layout is locked.** Navbar → Page Body (full-width, no left/right panels). The page body is a flex column: Toolbar → Table Card (flex:1) → Paginator inside the card.
4. **Page background is `--color-primary-lt` (`#ECF3FF`).** This matches the live app's `.phonebook-main` background. Dark mode override: `--color-canvas`.
5. **All icons are inline SVG.** No icon font, no external image. Material Icons caused silent rendering failures — never use them.
6. **Light mode by default.** Dark mode tokens apply when `.dark` class is on `#app`.
7. **WCAG AA minimum.** Muted/timestamp text at 12px minimum. `#646464` is the floor for readable text on white.
8. **Table uses `border-collapse: collapse` + `table-layout: fixed`.** This is required for column resize to work correctly.
9. **Column features are always three-part:** drag-handle | sort-trigger (label + channel icon + sort arrows) | resize-handle. Never omit any part.

---

## 1. Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  NAVBAR  — height: 50px, bg: #ffffff, border-bottom: 1px #ececec     │
├──────────────────────────────────────────────────────────────────────┤
│  PAGE BODY  — bg: #ECF3FF (--color-primary-lt), padding: 12px,       │
│               gap: 8px, flex-direction: column                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ TOOLBAR  — bg: #fff, border: 1px #ececec, border-radius: 8px  │  │
│  │ [Search input]   [spacer]  [Adv Filter]  [Col Pref]  [Labels] │  │
│  └────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ TABLE CARD  — bg: #fff, flex: 1, border-radius: 8px           │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │ TABLE WRAP (overflow: auto)                              │  │  │
│  │  │  sticky thead + scrollable tbody                         │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │ PAGINATOR  — border-top: 1px #ececec, padding: 10px 16px │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Panel placement rules for list screens

| Feature type | Where it goes |
|---|---|
| New filter/search control | Toolbar left zone |
| Bulk action buttons | Toolbar right zone (left of Column Preference) |
| Column visibility toggle | Column Preference panel/popover |
| Per-row actions | Last column (`.actions-cell`), hidden until row hover |
| Global page actions (Add, Export) | Toolbar right zone |
| Status / info messages | Below toolbar, above table card |
| Advanced filter form | Slide-in panel from right OR collapsible row under toolbar |

---

## 2. Colour Tokens

All tokens are identical to SKILL-v2. This section lists only the values most relevant to list screens.

### Light mode (default)

```css
/* Brand */
--color-primary:        #1a50a3   /* active sort indicator, links, active buttons */
--color-primary-hover:  #1e5bb9   /* button hover */
--color-primary-light:  #ECF3FF   /* PAGE BACKGROUND, table row hover, active button bg */

/* Surfaces */
--color-bg:             #ffffff   /* navbar, toolbar, table card, paginator */
--color-canvas:         #F3F6FA   /* label option hover */
--color-sec-bg:         #F4F6F8   /* table thead background */

/* Text */
--color-text:           #282828   /* customer name (bold) */
--color-body:           #212121   /* table cell values */
--color-medium:         #555555   /* column header labels, toolbar button text */
--color-muted:          #929292   /* paginator info, empty cell dash, placeholder */
--color-ph:             #aaaaaa   /* search input placeholder */

/* Borders */
--color-border:         #ececec   /* table cell borders, card/toolbar borders */
--color-border-panel:   #d1dced   /* labels dropdown border */
--color-border-input:   #c5c5c5   /* search input, toolbar button borders */

/* Semantic */
--color-success:        #26c98c   /* Support label dot */
--color-error:          #ff6767   /* VIP label dot, nav badge */
--color-warn:           #fdb635   /* Premium label dot */
```

### Dark mode overrides (`.dark` on `#app`)

```css
--color-bg:             #1e2022
--color-canvas:         #151515   /* also used as page-body background in dark */
--color-sec-bg:         #292C30   /* thead bg in dark */
--color-text:           #e5e7eb
--color-body:           #c5c5c5
--color-medium:         #c5c5c5
--color-muted:          #9ca3af
--color-border:         #2c2f35
--color-primary-lt:     #1a2d4a   /* row hover in dark */
```

---

## 3. Typography

| Element | Size | Weight | Color token |
|---|---|---|---|
| Customer name (first column) | 13px | 600 | `--color-text` |
| Column header label | 12px | 500 | `--color-medium` |
| Column header label (sorted) | 12px | 500 | `--color-primary` |
| Table cell value | 12px | 400 | `--color-body` |
| Empty cell dash | 12px | 400 | `--color-muted` |
| Paginator info ("Showing…") | 12px | 400 | `--color-muted` |
| Page number buttons | 12px | 500 | `--color-medium` |
| Toolbar button text | 13px | 500 | `--color-medium` |
| Search input text | 13px | 400 | `--color-body` |
| Dropdown label | 13px | 400 | `--color-body` |
| Dropdown section header | 11px | 600 | `--color-muted` (uppercase) |
| "Rows per page" label | 12px | 400 | `--color-muted` |

Font family: `Roboto, system-ui, sans-serif` — loaded via Google Fonts at weights 300/400/500/600/700.

---

## 4. Spacing & Sizing

| Token | Value | Used for |
|---|---|---|
| Page padding | 12px | `.page-body` padding all sides |
| Page gap | 8px | gap between toolbar and table card |
| Navbar height | 50px (`--navbar-h`) | fixed |
| Toolbar padding | 10px 16px | horizontal and vertical |
| Toolbar gap | 10px | gap between toolbar children |
| Table header row height | 40px (`min-height` on `.th-inner`) | |
| Table cell padding | 10px 14px | `.data-table td` |
| Table header inner padding | 10px 8px 10px 8px | `.th-inner` |
| Paginator padding | 10px 16px | |
| Paginator button size | 30×30px | `.pag-btn` |
| Toolbar button padding | 7px 14px | `.tb-btn` |
| Search input padding | 6px 10px | `.list-search` |
| Customer label dot size | 8×8px | `.cust-label-dot` |
| Drag handle size | 10×14px (svg) | column drag icon |
| Column resizer width | 5px | `.col-resizer` |
| Row action button size | 28×28px | `.row-action` |

---

## 5. Border Radius

| Element | Radius |
|---|---|
| Toolbar card | 8px |
| Table card | 8px |
| Toolbar buttons (`.tb-btn`) | 4px |
| Search input | 4px |
| Paginator page buttons | 4px |
| Labels dropdown menu | 6px |
| Row action button | 50% (circle) |
| Apply button in dropdown | 4px |
| Customer label dot | 50% |

---

## 6. Shadows

| Use | Value |
|---|---|
| Labels dropdown menu | `0 4px 24px rgba(0,0,0,0.16)` (`--shadow-card`) |
| Focus ring on inputs | `0 0 0 3px rgba(26,80,163,0.2)` (`--shadow-focus`) |

---

## 7. Icons — Inline SVG Only

All icons must be inline `<svg>`. The `stroke-width` standard is `1.8` for nav/UI icons, `2` for paginator arrows.

### Channel icons in table headers (12×12px)

| Channel | SVG description |
|---|---|
| Phone / Voice | `stroke` phone receiver path — `stroke="#555"` |
| Web | `stroke` globe with horizontal line + curved paths |
| Facebook | `fill="#1877F2"` Facebook "f" circle path |
| Twitter | `fill="#1DA1F2"` Twitter bird path |
| Telegram | `fill="#2CA5E0"` Telegram circle path |
| Email | `stroke="#555"` envelope rect + polyline |
| LinkedIn | `fill="#0A66C2"` LinkedIn square path |
| Instagram | `fill="url(#ig)"` Instagram camera path with gradient defs |
| WhatsApp | `fill="#25D366"` WhatsApp W path |
| YouTube | `fill="#FF0000"` YouTube play button |
| Viber | `fill="#7360f2"` |

### UI icons in toolbar (14×14px)

| Button | Icon |
|---|---|
| Search | circle + line (magnifier) |
| Advanced Filter | funnel polygon |
| Column Preference | three lines with dots |
| Filter Across Labels | tag/label path |
| Chevron (dropdown) | `polyline points="6 9 12 15 18 9"` |

### Paginator navigation (14×14px, `stroke-width="2"`)

| Button | Icon |
|---|---|
| First page | `<<` double chevron left |
| Prev page | `<` single chevron left |
| Next page | `>` single chevron right |
| Last page | `>>` double chevron right |

### Sort arrows (8×5px per arrow, stacked vertically, 1px gap)

Two separate `<svg>` elements inside `.sort-icon`:
- Up: `<path d="M4 0L8 5H0Z"/>` (filled triangle pointing up)
- Down: `<path d="M4 5L0 0H8Z"/>` (filled triangle pointing down)

Both start at `opacity: 0.35`. When a sort state is active: `.sort-icon.asc` → up arrow full opacity, down arrow 0.3. `.sort-icon.desc` → down arrow full opacity, up arrow 0.3.

### Drag handle (10×14px)

Six dots in 2-column grid (3 rows × 2 cols), `<circle r="1.2">` at positions (3,2)(7,2)(3,7)(7,7)(3,12)(7,12). `fill="#888"`, `opacity: 0.35`. `cursor: grab` on the container.

### Row action (View Profile, 16×16px)

Person icon: `fill="none" stroke="currentColor" stroke-width="1.8"`, `<path d="M20 21v-2a4 4 0 00-4-4H8…"/>` + `<circle cx="12" cy="7" r="4"/>`.

---

## 8. Component Specifications

### 8.1 Navbar

Identical to `SKILL-v2`. Height: 50px. Background: `--color-bg`. The active page icon should have `.active` class which gives it `background: --color-primary-lt`. All icons are 20×20px inline SVG with `stroke="#1a50a3" stroke-width="1.8"`.

### 8.2 Toolbar

```
.list-toolbar {
  background: --color-bg
  border: 1px solid --color-border
  border-radius: 8px
  padding: 10px 16px
  display: flex
  align-items: center
  gap: 10px
}
```

Children (left to right):
1. **Search input** (`.list-search`) — flex with magnifier icon, `min-width: 240px`, outlined border that gains focus ring on `:focus-within`
2. **`<div class="toolbar-space">` (flex:1)** — pushes right controls to the right
3. **Advanced Filter button** (`.tb-btn`) — funnel icon + text, toggles `.active` class
4. **Column Preference button** (`.tb-btn`) — list icon + text, toggles `.active` class
5. **Filter Across Labels** (`.labels-dropdown`) — dropdown trigger + floating menu

**Toolbar button states:**

| State | Border | Text | Background |
|---|---|---|---|
| Default | `--color-border-i` | `--color-medium` | `--color-bg` |
| Hover | `--color-primary` | `--color-primary` | `--color-primary-lt` |
| Active (`.active`) | `--color-primary` | `--color-primary` | `--color-primary-lt` |

### 8.3 Search Input

```
.list-search {
  display: flex
  align-items: center
  gap: 6px
  border: 1px solid --color-border-i
  border-radius: 4px
  padding: 6px 10px
  min-width: 240px
}
.list-search:focus-within {
  border-color: --color-primary
  box-shadow: --shadow-focus
}
```

- Leading magnifier SVG: 14×14px, `stroke="#aaaaaa"`
- Input: `font-size: 13px`, no border, transparent background, placeholder uses `--color-ph`

### 8.4 Filter Across Labels Dropdown

**Trigger** (`.labels-trigger`): Styled same as `.tb-btn`. Contains: tag icon (14px) + text label + chevron (12px, `transition: transform 0.2s`). Gains `.open` class when menu is open (same as `.active` visual style). Chevron rotates 180° when open.

**Menu** (`.labels-menu`): `position: absolute; right: 0; top: calc(100% + 4px)`. `display: none` by default; `display: block` when `.open`. `min-width: 210px`. `box-shadow: --shadow-card`. `border-radius: 6px`.

**Menu contents:**
1. Section header: "Labels" in 11px/600/uppercase/muted
2. Label options (`.label-option`): `<label>` with checkbox + color dot (10×10 circle) + label name
3. Footer: Clear button (text button) + Apply button (primary solid)

**Selecting labels**: Updates text in trigger to `"Labels (N)"`. Apply triggers table filter. Clear resets all checkboxes and text to `"Filter Across Labels"`.

**Dismiss**: Click outside the dropdown component (captured via `document.addEventListener('click', ...)`).

### 8.5 Data Table

```
.data-table {
  width: 100%
  border-collapse: collapse
  table-layout: fixed    /* required for resize */
}
thead {
  position: sticky
  top: 0
  z-index: 20
}
```

**Header cell (`<th>`):**
- `background: --color-sec-bg`
- `border-bottom: 2px solid --color-border`
- `border-right: 1px solid --color-border`
- `padding: 0` (inner div handles padding)
- `user-select: none`

**Header cell inner (`.th-inner`):**
- `display: flex; align-items: center; gap: 4px`
- `padding: 10px 8px; min-height: 40px`
- Three children: `.col-drag` | `.col-sort-trigger` | (`.col-resizer` is absolute)

**Sort trigger (`.col-sort-trigger`):**
- `display: flex; align-items: center; gap: 4px; flex: 1; cursor: pointer`
- Children: `.col-label` (flex:1, truncate) | `.col-ch-icon` (channel svg) | `.sort-icon` (arrows)

**Active sort state:**
- `th.sorted .col-label { color: --color-primary }`
- `.sort-icon.asc` / `.sort-icon.desc` as described in Section 7

**Body cell (`<td>`):**
- `padding: 10px 14px`
- `border-bottom: 1px solid --color-border`
- `border-right: 1px solid --color-border`
- `font-size: 12px`
- `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`

**Row hover:**
```css
.data-table tbody tr:hover td {
  background: --color-primary-lt  /* #ECF3FF */
}
```
On hover, the `.row-action` button in the Actions cell becomes visible (`opacity: 0 → 1`).

**Last row:** `border-bottom: none` on `td`.
**Last column:** `border-right: none` on both `th` and `td`.

### 8.6 Customer Name Cell (First Column)

```html
<td>
  <div class="cust-cell">
    <span class="cust-name">John Tylor</span>
    <div class="cust-labels">
      <span class="cust-label-dot" style="background: #ff6767" title="VIP"></span>
      <span class="cust-label-dot" style="background: #1a50a3" title="Enterprise"></span>
    </div>
  </div>
</td>
```

- `.cust-cell`: `flex-direction: column; gap: 2px`
- `.cust-name`: `font-size: 13px; font-weight: 600; color: --color-text`
- `.cust-labels`: `display: flex; gap: 4px; margin-top: 3px`
- `.cust-label-dot`: `width: 8px; height: 8px; border-radius: 50%`

**Standard label colours:**

| Label | Color |
|---|---|
| VIP | `#ff6767` (--color-error) |
| Premium | `#fdb635` (--color-warn) |
| Support | `#26c98c` (--color-success) |
| Enterprise | `#1a50a3` (--color-primary) |
| Trial | `#9b59b6` |

Custom labels use any hex colour passed from the data. Always include a `title` attribute on the dot for accessibility.

### 8.7 Empty Cell

When a field has no value, render:
```html
<span class="cell-empty">—</span>
```
Style: `color: --color-muted; font-size: 12px`. Never leave a cell blank — always show the dash.

### 8.8 Column Drag Handle

```css
.col-drag {
  width: 14px; height: 20px
  cursor: grab
  opacity: 0.35
  border-radius: 2px
}
.col-drag:hover { opacity: 0.75; background: rgba(0,0,0,0.06) }
.col-drag:active { cursor: grabbing }
```

On `mousedown` on `.col-drag`, the parent `<th>` gets `.dragging` class (`opacity: 0.45`). The column being dragged-over gets `.drag-over` class (`border-left: 2px solid --color-primary`). On `mouseup` the header order changes and the corresponding tbody cells are reordered to match.

### 8.9 Column Resize Handle

```css
.col-resizer {
  position: absolute
  right: 0; top: 0; bottom: 0
  width: 5px
  cursor: col-resize
  background: transparent
}
.col-resizer:hover { background: rgba(26,80,163,0.35) }
```

On `mousedown` on `.col-resizer`: capture start X + start width, set `body.is-resizing` (`cursor: col-resize !important`). On `mousemove` update `th.style.width`. On `mouseup` clear state. Minimum column width: 60px.

### 8.10 Actions Column

- `width: 56px`
- Header: centered label "Action" only (no drag handle, no sort, no resize)
- Cell (`.actions-cell`): `text-align: center`
- Contains `.row-action` button (28×28px circle, `opacity: 0`) revealed on row hover
- Button icon: person/profile SVG (16×16, `stroke="currentColor" stroke-width="1.8"`)

### 8.11 Paginator

```
.paginator {
  display: flex
  align-items: center
  gap: 6px
  padding: 10px 16px
  border-top: 1px solid --color-border
  background: --color-bg
  flex-shrink: 0
}
```

Children (left to right):
1. **`.pag-info`** — `"Showing X–Y of Z entries"`, 12px/muted
2. **`<div class="pag-space">` (flex:1)** — spacer
3. **First page button** — double-chevron-left SVG
4. **Prev page button** — single-chevron-left SVG
5. **Page number buttons** — rendered dynamically; active page gets `.active` class (primary solid bg)
6. **Next page button** — single-chevron-right SVG
7. **Last page button** — double-chevron-right SVG
8. **`.pag-rpp`** — "Rows per page" label + `<select>` with options 10/25/50/100

**Page button states:**

| State | Border | Color | Background |
|---|---|---|---|
| Default | `--color-border` | `--color-medium` | `--color-bg` |
| Hover (enabled) | `--color-primary` | `--color-primary` | `--color-primary-lt` |
| Active (current page) | `--color-primary` | `#fff` | `--color-primary` |
| Disabled | `--color-border` | `--color-medium` | `--color-bg`, `opacity: 0.35` |

**Ellipsis between pages:** `<span class="pag-gap">…</span>` — 12px/muted, no border.

**Page number window logic** (when total pages > 7):
- Always show page 1 and last page
- Show current ± 1 in the middle
- Show `…` gaps as needed

---

## 9. Toolbar Interaction States

| Action | Visual feedback |
|---|---|
| Search input focus | Border changes to `--color-primary`, `--shadow-focus` appears |
| Button hover | Border + text both go to `--color-primary`, bg to `--color-primary-lt` |
| Button active/toggled | Same as hover, persists until clicked again |
| Labels dropdown open | Trigger gains `.open` class, chevron rotates 180° |
| Column sorted | Header label turns `--color-primary`, relevant sort arrow goes full opacity |
| Row hover | Row bg → `--color-primary-lt`, action button becomes visible |
| Column resize in progress | `body.is-resizing` (`cursor: col-resize` globally) |
| Column drag in progress | `body.is-dragging` (`cursor: grabbing` globally), dragging th at 45% opacity, drop target gets left border |

---

## 10. WCAG Compliance Rules

1. All interactive elements must have `aria-label` or `title` if icon-only.
2. Search input must have `aria-label="Search customers"`.
3. Sort buttons must convey sorted state (use `aria-sort` on `<th>` in production Angular code; in static template the visual indicator is sufficient).
4. Label dots must have `title` attribute with the label name.
5. Paginator buttons must have `title` attribute.
6. Minimum text size: 12px for all rendered text.
7. Color is never the only indicator — empty cells use a dash character, not just styling.
8. Row hover action button has `opacity: 0` → `1` transition; ensure it is still focusable via keyboard in production.
9. Disabled paginator buttons use `opacity: 0.35` plus `cursor: not-allowed`.
10. The `--color-ts` (`#646464`) is the minimum allowed color for body text on white backgrounds (contrast ratio ≥ 4.5:1).

---

## 11. File Structure

```
Expertflow Template/
├── list-view-template.html   ← THIS template (all-in-one, no external deps)
├── SKILL-list.md             ← THIS skill file
├── agent-desk-v2-template.html
├── SKILL-v2.md
└── icons/                    ← Only used by agent-desk-v2-template.html
```

`list-view-template.html` is fully self-contained: CSS, HTML, and JS in one file. No external assets. Only dependency is the Google Fonts `<link>` for Roboto (gracefully degrades to `system-ui`).

---

## 12. JavaScript Behaviour Reference

The following functions are implemented in `list-view-template.html`:

| Function | Description |
|---|---|
| `renderTable()` | Renders current page slice into `<tbody>`, updates paginator |
| `updatePaginator(total)` | Updates info text, button disabled states, page number buttons |
| `goPage(dir)` | Navigate: `'first'`, `'prev'`, `'next'`, `'last'` |
| `goToPage(n)` | Jump to specific page number |
| `changeRpp()` | Rows-per-page select change handler |
| `handleSearch()` | Live search on name/email/phone, calls `applyFilters()` |
| `applyFilters()` | Combines search + label filters, re-sorts, resets to page 1 |
| `sortBy(col)` | Toggle sort direction on a column, updates header classes |
| `doSort()` | Performs the actual array sort on `filtered` |
| `toggleLabelsMenu()` | Open/close labels dropdown, animate chevron |
| `updateLabels()` | Read checked checkboxes into `activeLabels` array |
| `clearLabels()` | Uncheck all, reset label text |
| `applyLabels()` | Apply + close dropdown |
| `viewProfile(id)` | Row action handler (wire up to route in production) |

**Column resize** — `mousedown` on `.col-resizer` → track `mousemove` for width delta → `mouseup` to release.

**Column drag** — `mousedown` on `.col-drag` → track target `<th>` on `mousemove` → `mouseup` reorders both `<thead>` columns and all `<tbody>` cells at matching indices.

---

## 13. Usage Guide — When to Use This Template

Use `list-view-template.html` as the base whenever building any of the following in ExpertFlow:

- **Phonebook / Customer list** — the primary use case (replicated from `List.htm`)
- **Contact directory** — any screen listing people/companies with channel identifiers
- **Report / data grid** — tabular data with sort, filter, pagination
- **Queue list** — rows with status columns and row-level actions
- **Agent list / supervisor view** — rows with status badges instead of label dots
- **Configuration tables** — e.g., routing rules, IVR menus listed in rows

**What to keep the same for all list screens:**
- Navbar (identical, no changes)
- Page body background (`--color-primary-lt`)
- Toolbar structure (search + spacer + action buttons)
- Table card with sticky header
- Paginator at the bottom of the card
- Row hover behaviour (row tints `--color-primary-lt`, action revealed)

**What to customise per screen:**
- Column set (add/remove/rename columns as needed)
- Channel icons in headers (only include channels relevant to the data)
- Label colours (use semantic colours matching the business domain)
- Row action icon (person for contacts, eye for view-only, pencil for editable rows)
- Empty-state message inside tbody
- Rows-per-page default (25 is standard; 10 for dense/complex rows)

---

## 14. Known Constraints

1. **No checkbox selection.** The current template does not include row checkboxes for bulk selection. If needed, add a 40px checkbox column as the first column with a "select all" header checkbox.
2. **No inline editing.** Cells are display-only. For editable rows, trigger a slide-in panel or modal on action button click.
3. **Column order is persisted only in DOM.** Drag-reorder updates the DOM only; it is not saved to localStorage or server. Add persistence if required.
4. **Table is not virtualized.** The `renderTable()` function renders a page slice into DOM on each page change. For very large row heights or complex cell content, consider virtual scrolling.
5. **Instagram gradient SVG.** The `linearGradient` is defined inline in the `<svg>`. If multiple Instagram icons appear on the same page, use unique `id` values for each gradient (`id="ig-1"`, `id="ig-2"`, etc.) to avoid gradient ID collision.
6. **Dark mode page body.** In dark mode, `--color-primary-lt` becomes `#1a2d4a` which is the page background. The toolbar and table card remain `--color-bg` (`#1e2022`).
