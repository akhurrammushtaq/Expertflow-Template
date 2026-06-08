---
name: expertflow-design-system-v2
description: >
  ExpertFlow Agent Desk v2 design system. Use this skill for ANY UI work on the
  ExpertFlow product. This is the single source of truth for agent-desk-v2-template.html.
  Read this fully before producing any output. Do not invent values — every token,
  radius, spacing, and component spec lives here.
source: Extracted from styles_42e89d2efdaa3f09.css (Angular production build) +
        agent-desk-v2-template.html (verified against live app)
license: Proprietary — ExpertFlow internal use only.
---

# ExpertFlow Design System v2

---

## ⛔ ABSOLUTE CONSTRAINTS — read first, follow always

1. **One canvas, one file.** Every output is `agent-desk-v2-template.html` with the feature integrated. Never produce a standalone component or a separate file.
2. **Zero invented values.** Every colour, font size, radius, shadow, and spacing must come from Section 2–6 of this document. If it isn't listed, ask before using it.
3. **Layout is locked.** Tab strip | Center pane | Right panel. No 4th column, no full-screen overlays that hide the shell, no new pages.
4. **Map to existing components.** Every new element maps to a spec in Section 8. New action → Button spec. New info display → Field spec. New right-panel section → Collapsible Section spec.
5. **All icons are inline SVG.** No icon font, no external image. Material Icons caused silent rendering failures — never use them.
6. **Light mode by default.** Dark mode tokens exist but only apply when `.dark` class is on `#app`.
7. **WCAG AA minimum.** Timestamps and muted text at 12px minimum. `#646464` is the floor for readable text on white.

---

## 1. Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  NAVBAR  — height: 50px, bg: #ffffff, border-bottom: 1px #ececec    │
├─ 4px gap (body margin-top: 4px, bg: #e8edf3 shows through) ─────────┤
├──────────┬─ 5px ─┬──────────────────────────┬─ 5px ─┬──────────────┤
│ TAB      │       │ MAIN COLUMN              │       │ RIGHT PANEL  │
│ STRIP    │  sep  │ ┌──────────────────────┐ │  sep  │ 315px        │
│ 260px    │       │ │ SHARED HEADER  50px  │ │       │ (resizable   │
│          │       │ │ spans full width     │ │       │  220–520px)  │
│          │       │ ├──────────────────────┤ │       │              │
│          │       │ │ CENTER PANE  flex:1  │ │       │ • Customer   │
│          │       │ │ messages             │ │       │   Info card  │
│          │       │ │ KB suggestions       │ │       │ • Conv Data  │
│          │       │ │ composer             │ │       │ • KB panel   │
│          │       │ └──────────────────────┘ │       │              │
└──────────┴───────┴──────────────────────────┴───────┴──────────────┘
```

### Panel placement rules

| Feature type | Panel | Placement |
|---|---|---|
| New channel action | CENTER | Chat toolbar button |
| New customer data field | RIGHT | Inside Customer Info card |
| New right-panel section | RIGHT | New collapsible section below KB |
| Global agent control | NAVBAR | Right zone, left of avatar |
| Confirmation / warning | CENTER | Modal overlay, 420px wide |
| Inline status event | CENTER | Centered pill in chat thread |
| Conversation filter | LEFT | Below header, above list |

---

## 2. Colour Tokens

### Light mode (default)

```css
/* Brand */
--color-primary:        #1a50a3
--color-primary-hover:  #1e5bb9
--color-primary-light:  #ECF3FF

/* Surfaces */
--color-bg:             #ffffff    /* panels, cards, bubbles */
--color-canvas:         #F3F6FA    /* app background, hover states */
--color-sep:            #e8edf3    /* 5px gap between panels */
--color-border-sec:     #F4F6F8    /* right panel section header bg */

/* Text */
--color-text:           #282828    /* primary headings */
--color-text-body:      #212121    /* body copy, messages */
--color-text-medium:    #555555    /* labels, nav items */
--color-text-muted:     #929292    /* captions, placeholders */
--color-text-ph:        #aaaaaa    /* input placeholders */
--color-text-ts:        #646464    /* timestamps — WCAG AA 5.9:1 */
--color-text-link:      #1a50a3    /* links, "See more", "Less" */

/* Borders */
--color-border:         #ececec    /* main dividers */
--color-border-panel:   #d1dced    /* KB cards, search, right panel cards */
--color-border-input:   #c5c5c5    /* composer textarea */

/* Semantic */
--color-success:        #26c98c    /* status ring green, Identified label */
--color-error:          #ff6767    /* badges, errors */
--color-warn:           #fdb635    /* away/hold ring, whisper accent */
--color-whisper:        #F6BF2C    /* whisper tag bg, whisper bubble border */

/* Bubbles */
--color-bubble-cust:    #EFEFEF
--color-bubble-agent:   #ECF3FF

/* Channels */
--color-wa:             #25D366    /* WhatsApp green */
--color-li:             #0A66C2    /* LinkedIn blue */
```

### Dark mode (`.dark` on `#app`)

```css
--color-bg:             #1e2022
--color-canvas:         #151515
--color-sep:            #151515
--color-text:           #e5e7eb
--color-text-body:      #c5c5c5
--color-text-medium:    #c5c5c5
--color-text-muted:     #9ca3af
--color-text-ts:        #9a9a9a
--color-border:         #2c2f35
--color-border-sec:     #292C30
--color-bubble-cust:    #292C30
--color-bubble-agent:   #1a2d4a
```

### Colour usage rules
- `#26c98c` — status rings and "Identified" label only. Never body text.
- `#ff6767` — notification badges and error states only.
- `#fdb635` — away/hold ring and whisper accent only.
- `#F6BF2C` — whisper tag background only.
- `#F4F6F8` — right panel section header backgrounds only.
- `#e8edf3` — panel separator gaps only.
- `#EBF2FF` — active conversation item background only.
- Never hardcode hex in component styles — always use the CSS variable.

---

## 3. Typography

**Font:** Roboto only. No other fonts.

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

| Role | Size | Weight | Colour token |
|---|---|---|---|
| Nav items, state pill, timer | 14px | 400 | `--color-text` |
| Logo wordmark | 20px | 700 | `--color-primary` |
| Logo subtitle | 11px | 400 | `#8d9192` |
| Section header title | 16px | 500 | `--color-text-medium` |
| Conversation name | 16px | 400 | `--color-text-body` |
| Chat header name | 14px | 500 | `--color-text` |
| Chat header status | 11px | 400 | `--color-success` |
| Tab labels | 14px | 400 | active: primary / inactive: `#4d4d4d` |
| Chat message text | 14px | 400 | `--color-text-body` |
| Timestamps | **12px min** | 400 | `--color-text-ts` (#646464) |
| KB card text | 12px | 400 | `#242424` |
| Field labels | 11–12px | 500 | `#9a9a9a` |
| Field values | 12–13px | 400 | `--color-text-body` |
| Channel chip | 12px | 400 | `--color-text-medium` |
| Customer card name | 15px | 600 | `--color-text` |
| Customer card Identified | 11px | 500 | `--color-success` |
| Section titles (card) | 13px | 500 | `--color-text` |
| View more / View less | 12px | 400 | `--color-text-muted` |

**Line height:** 1.4 universally.

---

## 4. Spacing

Base unit: **4px**. All spacing is a multiple of 4.

| Value | Used for |
|---|---|
| 4px | Icon-to-text gap, dot spacing |
| 6px | Badge padding, small gaps |
| 8px | Card padding, gap between items |
| 10px | Right panel section padding |
| 12px | Chat thread padding, field padding |
| 14px | Navbar padding horizontal |
| 4px | Gap below navbar (body margin-top) |
| 5px | Panel separator width (--sep-w) |

---

## 5. Border Radius

| Value | Applied to |
|---|---|
| 3px | KB search input, KB result cards |
| 4px | Toolbar buttons hover, tags, section header top corners |
| 6px | KB suggestion cards, modal panels, customer card |
| 10px | Chat bubble customer (right corners), customer info floating card |
| 50% | All avatars, status dots, send button, state check circle |
| 9999px | Composer input, channel chip, state pill, Less button |

**Bubble radii:**
- Customer bubble: `border-radius: 3px 10px 10px 10px`
- Agent bubble: `border-radius: 10px 3px 10px 10px`

---

## 6. Shadows & Focus

```css
/* Focus ring — all :focus-visible */
--shadow-focus: 0 0 0 3px rgba(26,80,163,0.2)

/* Floating cards (customer info peek/expanded) */
box-shadow: 0 4px 24px rgba(0,0,0,0.16)

/* No decorative shadows on panels or cards — borders only */
```

---

## 7. Icons

**Rule: All icons are inline SVG. Never use icon fonts.**

Material Icons caused silent rendering failures in this codebase — they are permanently banned.

| Size | Context | Stroke width |
|---|---|---|
| 16px | Channel identifier icons, card action buttons | filled paths |
| 18px | Left panel icons, collapse button | 1.8–2px |
| 20px | Navbar action icons | 1.8px |
| 22px | Toolbar icons | filled paths |
| 22px | Hamburger | 1.8px |

**Toolbar icon pattern:**
```html
<button class="tb" title="..." aria-label="...">
  <svg width="20" height="20" viewBox="...">
    <path class="tb-icon" d="..."/>
  </svg>
</button>
```
- `.tb-icon { fill: #555555 }` — normal state
- `.tb.act .tb-icon { fill: #fff }` — active state (button gets `background: #1a50a3; border-radius: 50%`)
- Never put a circle background path inside toolbar SVGs — the button CSS provides the active circle

**All icon-only buttons must have `aria-label` and `title`.**

---

## 8. Component Specifications

### 8.1 Navbar

```
height:           50px
background:       #ffffff
border-bottom:    1px solid #ececec   (subtle — not dark)
padding:          0 14px
gap:              6px

Left zone:
  Hamburger:      34×34px, bg #F3F6FA, border-radius 6px
  Logo SVG:       exact Frame_1000005863.svg (grid icon + blue chat circle + divider line)
  Separator:      1px #ececec, height 20px
  Subtitle:       "contact center software", 11px #8d9192

Right zone:
  Nav buttons:    32×32px, border-radius 6px, icon stroke #1a50a3
  State pill:     border 1.5px #d8dde6, border-radius pill, height 34px, 14px #282828
                  → green check circle (18px, bg #26c98c) + "Ready" + "00:03:46" + chevron
  Agent avatar:   34×34px circle, bg #e8edf3, border 1px #d0d7e2, text #1a50a3 13px/700
```

### 8.2 Tab Strip (Left Panel)

```
width:            260px
background:       #ffffff
right gap:        5px (margin-right: var(--sep-w))

Header:
  "Conversations" 16px/400 #555555
  + button:       28×28px circle, border 1.5px #555555

Item:
  padding:        8px 14px
  gap:            12px
  hover:          bg #F3F6FA
  active:         bg #EBF2FF + left border 3px #1a50a3 (inset)
  NO grey background fill on active — left border only

Avatar wrap:      46×46px (contains 40px avatar + ring + badge)
Avatar:           40×40px circle, initials, no fill (bg = #ffffff)

Avatar ring:      position absolute, inset 0, border 2.5px
  green ring:     #26c98c  (active/identified)
  yellow ring:    #fdb635  (away)
  red ring:       #ff6767  (busy)
  hold state:     avatar bg #fdb635, white pause icon inside

Badge:            16×16px circle, top-right of wrap
  grey:           bg #b0b8c8 (unread count)
  red:            bg #ff6767 (urgent)
  border:         2px solid #ffffff

Name:             16px/400 #212121
```

### 8.3 Shared Chat Header

```
height:           50px
background:       #ffffff
border-bottom:    1px solid #ececec
padding:          0 10px
gap:              8px
spans:            full width of main column (center + right)

Avatar:           34×34px circle, bg #1a50a3, white initials
                  green ring: border 2px #26c98c at inset -2px
                  cursor: pointer (triggers customer info card on hover)

Name:             14px/500 #282828
Status:           11px/400 #26c98c — always "Identified" for known contacts

ch-info:          flex:1; min-width:0; overflow:hidden  ← CRITICAL, prevents spread
toolbar:          flex-shrink:0  ← CRITICAL, prevents compression

Toolbar buttons:
  size:           30×30px, border-radius 6px
  icon:           22px SVG, .tb-icon fill #555555
  hover:          bg #F3F6FA
  active:         bg #1a50a3, border-radius 50%, .tb-icon fill #fff
  divider:        1px #ececec, height 20px, margin 0 2px

Toolbar order:
  Grid | divider | Chat(active) | Hold | Contact | Pause | Notes | Add contact | Exit
```

### 8.4 Message Bubbles

```
Customer bubble:
  background:     #EFEFEF
  border-radius:  3px 10px 10px 10px
  padding:        10px 12px
  max-width:      calc(100% - 80px)
  font:           14px/400 #212121
  Channel badge:  16×16px circle at top-left of avatar
    WhatsApp:     bg #25D366
    LinkedIn:     bg #0A66C2

Agent bubble:
  background:     #ECF3FF
  border-radius:  10px 3px 10px 10px
  padding:        10px 12px
  row direction:  row-reverse (avatar on right)

Whisper bubble:
  background:     rgba(246,191,44,0.15)
  border-left:    3px solid #F6BF2C
  label:          "Whisper" 11px/600 #a2851b

Quoted reply bar (inside agent bubble):
  border-left:    3px solid #26c98c
  background:     #d9eec8
  border-radius:  0 3px 0 0
  padding:        6px 10px
  font:           12px #3a5a2c

Timestamp:
  font-size:      12px  ← MINIMUM (WCAG AA)
  colour:         #646464
  float:          right, padding-right: 3em from text
  tick icons:     13px SVG double-check
    blue ticks:   stroke #1a50a3 (seen)
    grey ticks:   stroke #939393 (delivered)

Date divider:     centred pill — border 1px #ececec, border-radius 20px, 11px #929292
System event:     centred plain text — 12px #929292, no lines
```

### 8.5 KB Suggestion Cards (bottom of center)

```
background:       #ffffff
border:           1px solid #d1dced
border-radius:    6px
padding:          7px 12px
font:             14px/400 #212121

Less button:      bg #fff, border 1px #d1dced, border-radius pill
                  font 12px/400 #1a50a3, padding 3px 12px
```

### 8.6 Composer

```
border-top:       1px solid #ececec
background:       #ffffff
padding:          6px 10px 4px

Top row (left to right):
  Channel chip:   border 1px #dfdfdf, border-radius pill, 12px #555555
                  channel dot: 11×11px, border-radius 2px, bg = channel colour
  Customer tag:   bg #e8e8e8, border-radius 4px 4px 0 0, 12px #4b4b4b
  Whisper tag:    bg #F6BF2C, border-radius 4px 4px 0 0, 12px #000000

Input wrap:       border 1px #c5c5c5, border-radius pill, padding 6px 10px
Input:            14px #212121, transparent bg, resize none, auto-grow to 120px max
Icon buttons:     26×26px, border-radius 4px, stroke #2c3e50
Send button:      30×30px circle, bg #1a50a3, white SVG arrow

Bottom row:       typing dots (5px circles, black) + character counter (12px #818181)
```

### 8.7 Customer Info Card (floating)

```
Trigger:          Hover over JT avatar in chat header (top-left blue circle)
Positioning:      fixed, anchored via getBoundingClientRect() to avatar bottom
Shadow:           0 4px 24px rgba(0,0,0,0.16)
Border-radius:    10px
Background:       #ffffff

PEEK state (on hover):
  width:          280px
  Contents:
    - Avatar (42px, green ring) + name (15px/600) + Identified dots
    - Divider
    - 4 channel action buttons (call/chat/WA/email) — 36px circles, border 1px #ececec
    - Divider
    - 2×2 mini field grid (11px label, 13px/500 value)
    - "View more ↓" button (12px #929292)

EXPANDED state (on "View more" click):
  width:          300px
  max-height:     calc(100vh - 160px), overflow-y: auto
  Contents (same top) + :
    General Information section:
      bg: #F3F6FA, border-radius 6px
      2-column field grid: First Name, City, Registered plan, Role, Company, Address 1+2
    Channel Identifiers section:
      bg: #F3F6FA, border-radius 6px
      Rows: channel icon badges + number/email + copy button + quick-action icons
      Active row: bg #f0f4ff, border-radius 6px
    "View less ↑" button (12px #929292)

Dismiss:          click outside card or press Escape
Keep open:        hovering card itself keeps peek open (200ms leave delay)
```

### 8.8 Right Panel — Collapsible Sections

```
Section header:
  background:     #F4F6F8
  border:         1px solid #ececec
  border-radius:  4px 4px 0 0
  padding:        10px
  min-height:     40px
  margin-top:     4px
  title:          16px/500 #555555
  drag icon ⠿:   colour #a3b9da, cursor grab
  chevron:        16px SVG #9CA3AF, rotates -90deg when closed

Section body:
  border:         1px solid #ececec, border-top: none
  border-radius:  0 0 4px 4px

Vertical resizer between sections:
  height:         5px
  background:     #e8edf3
  cursor:         row-resize
  hover:          #c4cedb
```

### 8.9 Knowledgebase Panel

```
Search box:
  border:         1px solid #d1dced
  border-radius:  3px
  padding:        7px 8px
  icon:           14px SVG stroke #aaaaaa
  input:          11px #212121

Result card:
  border:         1px solid #d1dced
  border-radius:  3px
  padding:        8px
  text:           12px/400 #242424, line-height 1.6
  show more:      colour #1a50a3, font-weight 500
  Sources label:  12px/700 #555555
  Source link:    12px/400 #0052cc
```

### 8.10 Panel Resizer (center ↔ right)

```
width:            5px
background:       #e8edf3
cursor:           col-resize
hover/dragging:   #c4cedb

Grip handle:
  width:          4px, height 44px
  5 dots:         3×3px circles, #8a9ab0, gap 5px
  visible on hover/drag only
```

### 8.11 Buttons

```
Primary:    bg #1a50a3, text #fff, border-radius 4px, height 28px, 13px/400
            hover: bg #1e5bb9
Secondary:  bg #fff, text #212121, border 1px #dfdfdf, border-radius 4px, height 28px
Small:      height 22px, padding 2px 8px, 12px
Pill:       border-radius 9999px instead of 4px
Disabled:   opacity 0.45, pointer-events none
```

### 8.12 Modals / Dialogs

```
Overlay:    rgba(0,0,0,0.4)
Panel:      bg #fff, border-radius 6px, padding 20px, width 420px (small) / 560px (medium)
Title:      16px/500 #282828
Body:       14px/400 #212121
Footer:     flex row, gap 8px, justify flex-end → [Secondary Cancel] [Primary Confirm]
```

---

## 9. WCAG Rules (mandatory)

1. **Never** use `#26c98c`, `#ff6767`, or `#fdb635` as text colour — backgrounds/dots only.
2. **Timestamps and captions: 12px minimum.** Never 10px or 11px for time-critical readable text.
3. Every interactive element gets `:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(26,80,163,0.2) }`.
4. All icon-only buttons must have `aria-label` AND `title`.
5. Status must always be dot + text label — never colour alone.
6. Minimum contrast for body text: use `#212121` or `#555555`. `#646464` is the floor.

---

## 10. Known Bugs Fixed (never reintroduce)

| Bug | Root cause | Fix |
|---|---|---|
| Icons show as text (`expand_more`, `add`) | Material Icons font async failure | **All icons are inline SVG — no icon fonts ever** |
| Toolbar icons missing after active state | `.tb svg > path:first-child{display:none}` killed icon paths | Removed. Use `.tb-icon` class on paths instead |
| Active toolbar button = giant blue circle | Active state `fill:white` hit circle bg path inside SVG | No circle paths inside toolbar SVGs. Active circle = CSS on `.tb.act` |
| Header name spreads into toolbar | `ch-info` missing `min-width:0; overflow:hidden` + toolbar missing `flex-shrink:0` | Both required. Never remove these |
| Navbar border too dark | Wrong colour value | `border-bottom: 1px solid #ececec` |
| Date divider had red line | CSS artifact | Pill text only, no lines |
| Right panel had duplicate JT/name | Name was in both header and right panel | Name only in chat header. Right panel starts with sections |

---

## 11. File Structure

```
agent-desk-v2-template.html   ← single canvas, self-contained HTML
SKILL-v2.md                   ← this file (design system spec)
```

Source references (read-only, do not modify):
```
agent-desk-template.html      ← v1 original (untouched)
SKILL.md                      ← v1 design spec (untouched)
```

---

## 12. How to Use This Skill

**Before every response:**
1. Read this skill completely.
2. Load `agent-desk-v2-template.html` as the base canvas.
3. Identify which panel the feature belongs in (Section 1 table).
4. Map every new element to an existing component spec (Section 8).
5. Use only token values from Sections 2–6.
6. Produce one complete HTML file with the feature integrated.

**Prompt format:**
> "Using the ExpertFlow design system v2 and agent-desk-v2-template.html, add [feature]. It goes in [panel]. [Behaviour notes]."

**Examples:**
- "Add a video call button to the chat toolbar"
- "Add an outbound dialer panel when agent clicks the phone icon"
- "Add a Transfer confirmation modal"
- "Add a new CRM Data section to the right panel below Knowledgebase"
- "Show the agent status dropdown open with Ready, Out of Office, Lunch Break options"
- "Add a Missed calls tab to the left panel"

**What Claude never does:**
- Produces a partial component without the full template
- Invents a colour, font size, radius, or spacing value
- Adds a 4th column or new layout zone
- Uses icon fonts (Material Icons or any other)
- Outputs multiple files for one request
- Removes `min-width:0` from `.ch-info` or `flex-shrink:0` from `.toolbar`
