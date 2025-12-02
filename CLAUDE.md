# CLAUDE.md - AI Assistant Development Guide

**Last Updated**: December 2, 2025
**Project**: Lost—Found: A Personal Archive
**Type**: Thesis Project - Interactive Digital Archive
**Tech Stack**: Pure Vanilla HTML/CSS/JavaScript (No frameworks)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Conceptual Framework](#conceptual-framework)
3. [Architecture](#architecture)
4. [Codebase Structure](#codebase-structure)
5. [Key Conventions](#key-conventions)
6. [Data Structure](#data-structure)
7. [View System](#view-system)
8. [Filter System](#filter-system)
9. [Styling & Design System](#styling--design-system)
10. [Common Tasks](#common-tasks)

---

## Project Overview

**Lost—Found** is a thesis project examining personal branding and identity construction through Alice Marwick's self-branding theory. It transforms 112 personal photographs (1990-2025) into an interactive digital archive.

### Purpose

- **Analytical tool** for examining personal images against brand guidelines
- **Performance record** of identity construction over time
- **Self-reflection invitation** about authenticity vs. performance
- **Data visualization** where contradictions illuminate complexity

### Critical Principle

**Contradictions are valuable data, not errors.** Images scoring below 50% are highlighted as contradictions - the most honest documentation of tension between brand and humanity.

### Technical Philosophy

- **Pure vanilla JavaScript** - Zero dependencies
- **No build process** - Open index.html in browser
- **Extensively documented** - For non-technical audiences
- **Minimalist aesthetic** - Black on white, clean design

---

## Conceptual Framework

### Self-Branding Scoring (Alice Marwick)

1. **Visual Identity** (40%) - Color palette, composition, lighting
2. **Behavioral Alignment** (30%) - Authenticity vs. performance, rituals
3. **Voice/Audience Alignment** (30%) - Audience context, vulnerability

**Overall Score** = Weighted average (0-100%)

### Compliance Levels

- **High (75-100%)**: Strong brand adherence
- **Medium (50-74%)**: Adequate alignment
- **Low (25-49%)**: Significant contradiction
- **Deviant (0-24%)**: Complete violation
- **Pre-guideline (null)**: Before guidelines existed (pre-2016)

### Three Viewing Modes

1. **Clinical Grid** - Objective 4-column grid display
2. **Evolutionary Timeline** - Year (x-axis) × Compliance (y-axis)
3. **Thematic Constellation** - Force-directed clustering by themes

---

## Architecture

### Application Flow

```
index.html (Landing) → archive.html (Main app)
    ↓
app.js (Orchestrator)
    ↓
├── data.js (112 image entries)
├── utils.js (Helpers)
├── filters.js (State & logic)
├── modal.js (Detail view)
└── views/
    ├── grid.js
    ├── timeline.js
    └── constellation.js
```

### Key Principles

1. **No module system** - Files load via `<script>` tags in order
2. **Global namespace** - Each file exports functions/objects
3. **Event-driven** - Filter changes trigger re-renders
4. **Separation of concerns** - Views render, filters manage state

---

## Codebase Structure

```
lost-found/
├── index.html                 # Landing page
├── archive.html               # Main archive interface
├── CLAUDE.md                  # This file
│
├── css/
│   ├── reset.css             # Browser normalization
│   ├── typography.css        # Font styles
│   ├── layout.css            # Grid, panels, responsive
│   ├── components.css        # Modal, info panel
│   └── views.css             # Grid, timeline, constellation
│
├── js/
│   ├── data.js               # 112 image entries
│   ├── utils.js              # Helper functions
│   ├── filters.js            # Filter state & logic
│   ├── modal.js              # Image detail modal
│   ├── app.js                # Initialization & orchestration
│   └── views/
│       ├── grid.js           # Clinical grid renderer
│       ├── timeline.js       # Timeline renderer
│       └── constellation.js  # Constellation renderer
│
└── images/
    ├── 2025/ ... 1990/       # Images by year
```

### Critical: File Loading Order

```html
<script src="js/data.js"></script>           <!-- FIRST -->
<script src="js/utils.js"></script>
<script src="js/filters.js"></script>
<script src="js/modal.js"></script>
<script src="js/views/grid.js"></script>
<script src="js/views/timeline.js"></script>
<script src="js/views/constellation.js"></script>
<script src="js/app.js"></script>            <!-- LAST -->
```

**Changing order will break the app** (no module system).

---

## Key Conventions

### Naming

- **Variables**: `camelCase` (`currentView`, `filterState`)
- **Functions**: `camelCase` (`renderGrid`, `openModal`)
- **CSS Variables**: `--kebab-case` (`--color-text`)
- **DOM IDs/Classes**: `kebab-case` (`filter-panel`, `grid-view`)

### Documentation Style

```javascript
/**
 * PURPOSE: What this does and why
 * HOW: Brief logic explanation
 * INPUT: parameter (type) - description
 * OUTPUT: What it returns/produces
 */
function exampleFunction(parameter) {
  // Implementation
}
```

### Console Logging

Use for debugging: `console.log('Lost—Found:', value);`

---

## Data Structure

### Image Object Schema

```javascript
{
  // Basic
  id: "img_001",
  src: "images/2023/filename.jpg",
  title: "Image Title",
  year: 2023,
  date: "2023-03-15",
  aspect_ratio: "2:3",  // "1:1", "3:2", "2:3", "16:9", "9:16"

  // Thematic
  thematic: {
    categories: ["moments", "belonging"],     // 1-3 themes
    emotional_tags: ["routine"],
    lost_found: "found",                      // "lost" | "found"
    thematic_weights: { moments: 0.6, belonging: 0.4 }  // Must sum to 1.0
  },

  // Brand Compliance
  brand_compliance: {
    overall_score: 0.87,                      // 0-1 or null
    visual_identity: {
      score: 0.90,
      color_palette: "compliant",             // "compliant" | "deviant" | "n/a"
      composition: "strong",
      lighting: "signature"
    },
    ritual_behavioral: {
      score: 0.85,
      authenticity: 0.75,
      ritual_documentation: 1.0,
      ritual_name: "Morning Protocol",
      performance_type: "ambiguous"           // "authentic" | "performed" | "ambiguous"
    },
    voice_audience: {
      score: 0.85,
      audience: "solitude",                   // See audience options
      audience_match: 1.0,
      vulnerability_tone: "aligned",
      tone_score: 0.70
    }
  },

  // Context
  context: {
    location_type: "private",
    photographer: "self",
    intention: "documentation"
  },

  // Additional
  notes: "Personal reflection...",
  contradictions: ["Visual: ...", "Behavioral: ..."],  // Array or null
  position: null,                             // Calculated for constellation
  color_palette: ["#2B4C5F"],
  visual_similarity_ids: ["img_034"]
}
```

### Thematic Categories (8)

- **notes**: observations, fragments
- **moments**: fleeting captures
- **faces**: portraits, identity work
- **nostalgia**: memory, longing
- **play**: joy, experimentation
- **belonging**: connection, home
- **change**: transformation
- **limbo**: in-between states

### Audience Options

- solitude, intimate_circle, trusted_few, familial, extended_network, public

### Performance Types

- authentic, performed, ambiguous

---

## View System

### Clinical Grid (`grid.js`)

**Layout**: Responsive grid
- 4 columns (desktop 1200px+)
- 3 columns (tablet 768-1199px)
- 2 columns (mobile 480-767px)
- 1 column (<480px)

**Display**: Thumbnail (300px tall), title, year, compliance dots

**Interaction**: Hover scale 1.05, click opens modal

### Evolutionary Timeline (`timeline.js`)

**Layout**: Horizontal scrollable canvas
- X-axis: Year (left to right)
- Y-axis: Compliance (high at top, inverted)
- Canvas: Adaptive width (min 1200px), 560px height

**Display**: 80×80px thumbnails

**Positioning**:
```javascript
x = (year - minYear) / yearRange * canvasWidth
y = (1 - complianceScore) * canvasHeight  // Inverted
// Pre-guideline (null) → middle
```

### Thematic Constellation (`constellation.js`)

**Layout**: Fixed 800px height canvas

**Theme Anchors**:
```javascript
notes: {200, 300}, moments: {600, 300}, faces: {400, 100}
nostalgia: {200, 500}, play: {600, 500}, belonging: {800, 300}
change: {400, 500}, limbo: {400, 700}
```

**Positioning**: Weighted average of theme positions + randomness

**Opacity**: High (1.0), Medium (0.85), Low/Deviant (0.6)

---

## Filter System

### Filter State

```javascript
const filterState = {
  thematic: [],                          // Selected themes
  timeRange: { start: 1990, end: 2025 },
  compliance: "all",                     // "all"|"high"|"medium"|"low"|"deviant"
  performance: [],
  audience: []
};
```

### Filter Logic

1. **Thematic**: OR logic (match ANY)
2. **Time**: Inclusive range
3. **Compliance**: Only if score exists
4. **Performance/Audience**: Match selected

### Update Flow

1. User interacts → Event listener
2. Call `updateFilter(type, value, isChecked)`
3. Update `filterState`
4. Call `filterImages(imageData, filterState)`
5. Call `renderCurrentView(filtered)`
6. Update count

---

## Styling & Design System

### Design Tokens

```css
--color-text: #1a1a1a;
--color-bg: #ffffff;
--color-panel: #fafafa;
--color-border: #e0e0e0;
--color-accent-blue: #2B4C5F;
--color-accent-green: #3A5A40;
--color-accent-brown: #5C4742;
```

### Typography

- **Font**: Arial Narrow, Arial, sans-serif
- **Base**: 12px, line-height 1.5
- **Sizes**: 10px (small), 12px (body), 14px (title), 16px (modal), 18px (headings)

### Key Rules

1. Grayscale only (except accent indicators)
2. Minimal decoration
3. Generous whitespace
4. Subtle interactions (150ms transitions)
5. Responsive mobile-first

---

## Common Tasks

### Adding an Image Entry

1. Add image file to `images/YEAR/filename.jpg`
2. Add entry to `imageData` array in `data.js` (follow schema)
3. Ensure `thematic_weights` sum to 1.0
4. Refresh page

### Expanding to 112 Images

**Current**: 3 sample entries
**Needed**: 109 more entries

**Tips**:
- Mix compliance levels (~30% high, ~30% medium, ~20% low, ~10% deviant, ~10% pre-guideline)
- Use all 8 themes
- Vary audiences, performance types, aspect ratios
- Add meaningful contradictions for low scores
- Add personal notes for authenticity

### Modifying a View

1. Open view file (`grid.js`, `timeline.js`, `constellation.js`)
2. Read function documentation
3. Modify rendering logic
4. Test in browser (refresh)

### Debugging

```javascript
// Check data loaded
console.log(imageData.length);  // Should be 112

// Check filter state
console.log(filterState);

// Check filtered results
console.log(currentImages.length);

// Test constellation positions
calculateConstellationPositions(imageData);
console.log(imageData[0].position);
```

---

## Testing Checklist

- [ ] 112 entries in data.js (currently only 3!)
- [ ] All image files exist and paths correct
- [ ] Thematic_weights sum to 1.0 for each entry
- [ ] Clinical grid displays 4 columns (desktop)
- [ ] Timeline positions by year/compliance
- [ ] Constellation clusters by theme
- [ ] All filters work (thematic, time, compliance, performance, audience)
- [ ] Reset button clears all filters
- [ ] Modal opens with correct data
- [ ] Modal adapts layout to aspect ratio
- [ ] ESC key closes modal
- [ ] Filter count updates
- [ ] Responsive on mobile (768px, 480px)

---

## Deployment

1. Complete all 112 entries in `data.js`
2. Replace placeholder images with real images
3. Test locally with `python -m http.server 8000`
4. Deploy to GitHub Pages, Netlify, or Vercel
5. Test on production URL
6. Verify mobile on real devices

---

## AI Assistant Guidelines

### Do

- Read files before modifying
- Maintain documentation style (PURPOSE/HOW/INPUT/OUTPUT)
- Test in browser after changes
- Keep global namespace pattern
- Use design tokens (CSS variables)
- Handle empty states
- Add null checks for compliance scores

### Don't

- Break script loading order
- Add external libraries/frameworks
- Add colors outside defined palette
- Hardcode values
- Skip function documentation
- Change `thematic_weights` without ensuring sum = 1.0

### Important Notes

- **data.js currently has only 3 entries** - needs 109 more
- **No build process** - just open HTML files
- **Extensively document** for non-technical audiences
- **Contradictions are features** - highlight, don't hide

---

**End of CLAUDE.md**

Update this document when architecture or conventions change.
