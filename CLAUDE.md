# CLAUDE.md - AI Assistant Development Guide

**Last Updated**: December 2, 2025
**Project**: Lost & Found: An Atlas of Being
**Tech Stack**: Vanilla HTML/CSS/JavaScript (No frameworks)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Codebase Structure](#codebase-structure)
4. [Key Conventions](#key-conventions)
5. [State Management](#state-management)
6. [View System](#view-system)
7. [Component System](#component-system)
8. [Data Structure](#data-structure)
9. [Styling & Design System](#styling--design-system)
10. [Development Workflow](#development-workflow)
11. [Common Tasks](#common-tasks)
12. [Performance Considerations](#performance-considerations)

---

## Project Overview

**Lost & Found** is an intimate, explorable digital archive that transforms personal photographs and written reflections into an interactive visualization spanning 1990-2024. It's a minimalist, poetic web-based archive with no build process, no dependencies, and no frameworks.

### Core Philosophy
- **Pure vanilla JavaScript** - Maximum control, zero dependencies
- **Minimalism as contemplation** - Remove unnecessary elements
- **60fps performance** - GPU-accelerated animations
- **Grayscale aesthetic** - Courier New typography throughout
- **Responsive design** - Desktop, tablet, mobile support

### Two Navigation Modes
1. **Drift View** - Wandering through scattered memories with momentum-based panning/zooming
2. **Descent View** - Layered rings of memory in a perspective cone with rotation/zoom

---

## Architecture

### Application Flow
```
index.html (Entry Point)
    ↓
main.js (App Orchestrator)
    ↓
├── state.js (Single Source of Truth)
├── data.js (Memory Collection)
├── components/ (UI Components)
│   ├── filterPanel.js
│   ├── infoModal.js
│   └── imageDetail.js
├── views/ (Render Modes)
│   ├── drift.js
│   └── descent.js
└── utils/ (Helpers)
    ├── dom.js
    ├── math.js
    └── images.js
```

### Key Principles
1. **No build process** - Just open `index.html` in a browser
2. **Global namespace pattern** - Each file exports one object (e.g., `AppState`, `DriftView`)
3. **Event-driven architecture** - State changes trigger re-renders
4. **Separation of concerns** - Views handle rendering, components handle UI, state handles data
5. **Functional utilities** - Pure functions in `utils/`

---

## Codebase Structure

```
lost-found/
├── index.html                 # Main entry point (203 lines)
├── README.md                  # User-facing documentation
├── CLAUDE.md                  # This file (AI assistant guide)
│
├── assets/
│   ├── css/
│   │   ├── reset.css         # CSS reset (normalize browser defaults)
│   │   ├── variables.css     # Design tokens (colors, spacing, typography)
│   │   ├── base.css          # Global typography and base styles
│   │   ├── layout.css        # Grid-based layout system
│   │   ├── components.css    # Component-specific styles
│   │   └── responsive.css    # Media queries for mobile/tablet
│   │
│   ├── js/
│   │   ├── main.js           # App initialization and orchestration (93 lines)
│   │   ├── data.js           # Memory collection (30 entries, 339 lines)
│   │   ├── state.js          # Centralized state management (159 lines)
│   │   │
│   │   ├── utils/
│   │   │   ├── dom.js        # DOM manipulation helpers
│   │   │   ├── math.js       # Math/physics utilities (distance, random, clamp)
│   │   │   └── images.js     # Image loading utilities
│   │   │
│   │   ├── components/
│   │   │   ├── filterPanel.js    # Filter UI and logic (237 lines)
│   │   │   ├── infoModal.js      # Information modal (91 lines)
│   │   │   └── imageDetail.js    # Image detail view (188 lines)
│   │   │
│   │   └── views/
│   │       ├── drift.js      # Drift view with gravity wells (422 lines)
│   │       └── descent.js    # Descent view with perspective (398 lines)
│   │
│   └── images/
│       └── image001-030.svg  # 30 placeholder SVG images
```

### File Loading Order (Critical)
The order in `index.html` matters because there's no module system:

```html
<!-- CSS Files -->
<link rel="stylesheet" href="assets/css/reset.css">
<link rel="stylesheet" href="assets/css/variables.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/layout.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/responsive.css">

<!-- JavaScript Files -->
<script src="assets/js/data.js"></script>           <!-- Must load first (MEMORIES, QUICK_JUMP_PRESETS) -->
<script src="assets/js/state.js"></script>          <!-- Depends on data.js -->
<script src="assets/js/utils/dom.js"></script>
<script src="assets/js/utils/math.js"></script>
<script src="assets/js/utils/images.js"></script>
<script src="assets/js/components/filterPanel.js"></script>
<script src="assets/js/components/infoModal.js"></script>
<script src="assets/js/components/imageDetail.js"></script>
<script src="assets/js/views/drift.js"></script>
<script src="assets/js/views/descent.js"></script>
<script src="assets/js/main.js"></script>           <!-- Must load last (orchestrates everything) -->
```

**IMPORTANT**: Never change this order without understanding dependencies.

---

## Key Conventions

### 1. Global Namespace Pattern
Each JavaScript file exports exactly one object to the global scope:

```javascript
// state.js
const AppState = {
    viewMode: 'drift',
    filters: { /* ... */ },
    // ...
};

// drift.js
const DriftView = {
    init() { /* ... */ },
    render() { /* ... */ },
    destroy() { /* ... */ }
};
```

### 2. Naming Conventions
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MEMORIES`, `QUICK_JUMP_PRESETS`)
- **Objects**: `PascalCase` (e.g., `AppState`, `DriftView`, `FilterPanel`)
- **Functions/Methods**: `camelCase` (e.g., `init`, `render`, `onStateChange`)
- **CSS Variables**: `--kebab-case` (e.g., `--color-gray`, `--space-lg`)
- **DOM IDs**: `camelCase` (e.g., `viewContainer`, `filterPanel`)
- **Data Attributes**: `data-kebab-case` (e.g., `data-view="drift"`, `data-preset="notes-to-self"`)

### 3. File Conventions
- **One concern per file** - Each file handles one thing
- **Comprehensive JSDoc comments** - Every file starts with a comment block
- **Console logging** - Use `console.log('[ModuleName] Message')` for debugging
- **No side effects on load** - Files define objects but don't execute (except `state.js` auto-initializes)

### 4. Comment Style
```javascript
/**
 * FILENAME.JS - Brief Description
 *
 * Longer explanation of what this file does,
 * key features, and important notes.
 */

/**
 * Function description
 * @param {Type} paramName - Description
 * @returns {Type} Description
 */
```

### 5. Code Organization
Each module follows this pattern:
```javascript
const ModuleName = {
    // State/properties
    someState: null,

    // Initialization
    init() { /* ... */ },

    // Public methods
    publicMethod() { /* ... */ },

    // Private/internal methods
    _internalMethod() { /* ... */ },

    // Event handlers
    onEventName() { /* ... */ },

    // Cleanup
    destroy() { /* ... */ }
};
```

---

## State Management

### Centralized State (`state.js`)
All application state lives in `AppState` object - single source of truth.

```javascript
const AppState = {
    viewMode: 'drift',              // 'drift' | 'descent'
    filters: {
        selectedThemes: [],         // Array of theme strings
        timelineRange: {            // Year range
            start: 1990,
            end: 2024
        },
        quickJump: null             // Active preset key or null
    },
    ui: {
        selectedImageId: null,      // Currently selected image ID
        isInfoModalOpen: false,
        isDetailModalOpen: false
    },
    filteredImages: []              // Computed based on filters
};
```

### State Updates (Reactive Pattern)
Components subscribe to state changes:

```javascript
// Subscribe to changes
AppState.subscribe((state) => {
    // React to state changes
    console.log('State changed:', state);
});

// Update state (triggers notifications)
AppState.update({
    viewMode: 'descent',
    filters: {
        selectedThemes: ['notes', 'moments']
    }
});
```

### Key Methods
- `AppState.subscribe(callback)` - Subscribe to state changes, returns unsubscribe function
- `AppState.update(updates)` - Update state and notify subscribers
- `AppState.computeFilteredImages()` - Recompute filtered images based on current filters
- `AppState.applyQuickJump(presetKey)` - Apply a preset filter combination
- `AppState.clearFilters()` - Reset all filters to defaults
- `AppState.getMemoryById(id)` - Get memory object by ID

### Filter Logic
- **Themes**: OR logic - match ANY selected theme
- **Timeline**: Inclusive range - `year >= start && year <= end`
- **Quick Jump**: Preset combinations of themes/timeline
- **Memory State**: Removed in recent update (all memories shown)

---

## View System

Views handle rendering the main canvas area. Only one view is active at a time.

### View Lifecycle
```javascript
// View interface (both Drift and Descent implement this)
{
    init()      // Initialize view, create DOM, attach listeners
    render()    // Render/update based on AppState.filteredImages
    destroy()   // Cleanup: remove DOM, cancel animations, detach listeners
}
```

### View Switching
Handled by `App.switchView()` in `main.js`:
1. Destroy current view (cleanup)
2. Initialize new view
3. New view renders based on current state

### Drift View (`drift.js`)
**Features**:
- 5x viewport size canvas (infinite scroll feel)
- 8-12 gravity wells (attraction points)
- 90% of images cluster around wells
- 10% wander freely (not clustered)
- Momentum/inertia physics on drag
- Controlled overlap (minimum spacing)
- 60fps performance via `requestAnimationFrame`

**Key Implementation Details**:
```javascript
const DriftView = {
    gravityWells: [],           // Array of {x, y, strength, radius}
    velocityX: 0,               // Momentum tracking
    velocityY: 0,
    momentumRAF: null,          // Animation frame ID

    generateGravityWells()      // Create 8-12 random wells
    positionImages()            // Place images with gravity + controlled overlap
    attachEventListeners()      // Drag, momentum, image clicks
    applyMomentum()            // requestAnimationFrame loop for inertia
};
```

**Physics Parameters**:
- Canvas: `window.innerWidth * 5` x `window.innerHeight * 5`
- Gravity wells: 8-12, min 400px apart
- Image size: 80px
- Min spacing: 20px between images
- Friction: 0.95 (momentum decay)
- Hover scale: 1.2x

### Descent View (`descent.js`)
**Features**:
- Perspective cone layout (concentric rings)
- Outer rings = recent/surface memories
- Inner rings = deeper/older memories
- Uniform 80px image sizing (depth via position, not size)
- Horizontal drag = rotate 360°
- Vertical drag = zoom in/out (0.5x to 3x)
- Mouse wheel = alternative zoom
- Z-index depth management (inner rings on top)
- Touch support

**Key Implementation Details**:
```javascript
const DescentView = {
    rotation: 0,                // Current rotation angle
    zoom: 1.0,                  // Current zoom level (0.5 - 3.0)
    rotationVelocity: 0,        // Rotation momentum
    rotationRAF: null,          // Animation frame ID

    positionImages()            // Distribute images across rings
    attachEventListeners()      // Drag, zoom, rotation
    applyRotation()            // Update transform during animation
};
```

**Layout Parameters**:
- Ring count: Based on image count (max 6 rings)
- Image size: Uniform 80px (all rings)
- Angle offset: ±0.1 radians (organic feel)
- Radius offset: ±10px
- Zoom range: 0.5x to 3x
- Friction: 0.95

---

## Component System

Components manage discrete UI elements and their behavior.

### Component Lifecycle
```javascript
{
    init()      // Initialize component, attach event listeners
    open()      // Open modal/panel (if applicable)
    close()     // Close modal/panel (if applicable)
    destroy()   // Cleanup (rarely used, components persist)
}
```

### Filter Panel (`filterPanel.js`)
**Location**: Bottom-right, collapsible
**Features**:
- View mode toggle (Drift/Descent)
- Theme checkboxes (8 themes)
- Timeline range sliders (dual slider, 1990-2024)
- Quick Jump presets (6 buttons)
- Filter count display
- Collapse/expand with tab
- Clear all filters

**Key Methods**:
```javascript
FilterPanel.init()                  // Attach all event listeners
FilterPanel.updateFilterCount()     // Update "Showing X of Y" display
FilterPanel.syncWithState()         // Sync UI with AppState (after quick jump)
```

**Event Flow**:
1. User interacts with filter UI
2. Component updates `AppState` via `AppState.update()`
3. State change triggers notification
4. All subscribed components react

### Info Modal (`infoModal.js`)
**Trigger**: "i" button in header
**Content**: Project description, navigation instructions
**Features**:
- Overlay + centered modal
- Close via X button, overlay click, or Escape key
- Prevents body scroll when open

### Image Detail Modal (`imageDetail.js`)
**Trigger**: Click on any image
**Size**: 50-60% screen size
**Layout**: Split (image left, metadata right)
**Content**:
- Large image preview
- Title, year, memory state
- Theme tags
- Entry text (reflection)
- Note content (if applicable, for "notes" theme)

**Key Method**:
```javascript
ImageDetail.openWithId(imageId)     // Open modal with specific memory
```

---

## Data Structure

### Memory Object Schema
```javascript
{
    id: 1,                          // Unique identifier (Number)
    title: "Memory Title",          // Display title (String)
    filename: "image001.svg",       // Filename in assets/images/ (String)
    year: 1990,                     // Year (Number, 1990-2024)
    themes: ["moments", "play"],    // 1-3 themes (Array of Strings)
    entry: "Brief reflection...",   // Poetic description (String)
    memoryState: "found",           // "lost" | "found" (String)
    noteContent: null               // Long-form text or null (String | null)
}
```

### Available Themes
```javascript
"notes"      // Written reflections, textual memory
"moments"    // Captured instants, temporal markers
"faces"      // Portraits of self and others
"nostalgia"  // Longing for past selves and places
"play"       // Joy, spontaneity, lightness
"belonging"  // Connection to place, people, purpose
"change"     // Transformation, transition, evolution
"limbo"      // In-between states, uncertainty, waiting
```

### Quick Jump Presets
```javascript
const QUICK_JUMP_PRESETS = {
    'notes-to-self': {
        themes: ['notes']
    },
    'small-joys': {
        themes: ['play']
    },
    'heavy-shelf': {
        themes: ['change', 'limbo']
    },
    'before-me': {
        timelineRange: { start: 1990, end: 2000 }
    },
    'recently-found': {
        timelineRange: { start: 2020, end: 2024 }
    },
    'firsts-lasts': {
        themes: ['change', 'moments']
    }
};
```

### Adding New Memories
1. Add SVG file to `assets/images/` (e.g., `image031.svg`)
2. Add entry to `MEMORIES` array in `data.js`
3. Ensure `id` is unique and sequential
4. Choose 1-3 themes
5. If theme includes "notes", provide `noteContent`
6. Set `memoryState` to "lost" or "found"
7. Refresh page - no build step needed

---

## Styling & Design System

### Design Tokens (`variables.css`)
All design values are centralized in CSS custom properties:

```css
/* Colors (Grayscale only) */
--color-black: #000000;
--color-gray-darkest: #1a1a1a;
--color-gray-darker: #333333;
--color-gray-dark: #4d4d4d;
--color-gray: #666666;
--color-gray-medium: #999999;
--color-gray-light: #cccccc;
--color-gray-lighter: #e6e6e6;
--color-gray-lightest: #f5f5f5;
--color-white: #ffffff;

/* Typography */
--font-family: 'Courier New', Courier, monospace;
--font-size-xs: 10px;
--font-size-sm: 12px;
--font-size-base: 14px;
--font-size-md: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-base: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-xxl: 48px;

/* Layout */
--header-height: 60px;
--filter-panel-width: 280px;

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;

/* Z-Index */
--z-canvas: 1;
--z-header: 10;
--z-filter-panel: 10;
--z-modal-overlay: 100;
--z-modal-content: 101;
```

### CSS Architecture
1. **reset.css** - Normalize browser defaults
2. **variables.css** - Design tokens (use these, never hardcode values)
3. **base.css** - Global typography, html/body styles
4. **layout.css** - Grid system, header, main, aside positioning
5. **components.css** - Component-specific styles (modals, buttons, etc.)
6. **responsive.css** - Media queries for tablet/mobile

### Key Design Rules
- **Grayscale only** - No colors besides black/white/gray
- **Courier New everywhere** - Monospace font for all text
- **Generous whitespace** - Don't crowd elements
- **Subtle shadows** - Minimal, only where needed
- **Smooth transitions** - Use CSS variables for consistency
- **Mobile-first responsive** - Stack on mobile, side-by-side on desktop

### Grid Layout
```
┌─────────────────────────────────────────┐
│          Header (Fixed)                 │
├─────────────────────────────────────────┤
│                                         │
│     Canvas Area                         │
│     (Drift or Descent View)       ┌─────┤
│                                   │     │
│                                   │  F  │
│                                   │  i  │
│                                   │  l  │
│                                   │  t  │
│                                   │  e  │
│                                   │  r  │
│                                   │     │
└───────────────────────────────────┴─────┘
```

---

## Development Workflow

### Local Development
No build process required. Just open `index.html` in a browser.

**Recommended Local Server** (for better file loading):
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000

# VS Code
# Install "Live Server" extension
# Right-click index.html → "Open with Live Server"
```

Navigate to `http://localhost:8000`

### Git Workflow
This repository uses **feature branches** with a specific naming convention:

**Branch Pattern**: `claude/<description>-<session-id>`

**Current Branch**: `claude/claude-md-mip2436o7cb93s2l-018DRpchDyaBjC9fDymxcTT9`

**Commit Message Style**:
- Use imperative mood ("Add feature", not "Added feature")
- First line: Brief summary (50-72 chars)
- If needed, add detailed description after blank line
- Reference phase/feature in commits (e.g., "Phase 6: Complete Descent View...")

**Example Commits**:
```
Phase 5: Complete Drift View with gravity wells, momentum, and controlled overlap
Fix filter panel: proper collapse mechanism, correct dimensions, hide scrollbars
Implement user feedback: collapsible filters, infinite scroll, remove memory state
```

### Development Phases
- [x] **Phase 1-4**: Foundation (HTML/CSS, data, state, filters, modals)
- [x] **Phase 5**: Drift View (full implementation)
- [x] **Phase 6**: Descent View (full implementation)
- [ ] **Phase 7**: Polish & refinement
- [ ] **Phase 8**: Content population (real images/text)
- [ ] **Phase 9**: Final testing & launch

### Browser Testing
Test in:
- Chrome/Edge (primary target)
- Firefox
- Safari (especially for transforms/animations)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Performance Targets**:
- 60fps on desktop
- 30fps minimum on mobile
- <3 seconds initial load
- <1 second filter response

---

## Common Tasks

### Adding a New Memory
1. **Create SVG image** in `assets/images/image031.svg`
2. **Add entry to `data.js`**:
   ```javascript
   {
       id: 31,
       title: "Your Memory Title",
       filename: "image031.svg",
       year: 2024,
       themes: ["moments", "play"],
       entry: "Brief poetic reflection on this memory.",
       memoryState: "found",
       noteContent: null
   }
   ```
3. **Refresh page** - Memory appears automatically

### Adding a New Theme
1. **Add to `data.js`** theme list (in comment)
2. **Add checkbox to `index.html`** in theme grid:
   ```html
   <label class="checkbox-label">
       <input type="checkbox" name="theme" value="new-theme">
       <span>new-theme</span>
   </label>
   ```
3. **No JavaScript changes needed** - FilterPanel auto-detects

### Adding a New Quick Jump Preset
1. **Add to `QUICK_JUMP_PRESETS` in `data.js`**:
   ```javascript
   'preset-key': {
       themes: ['theme1', 'theme2'],
       timelineRange: { start: 2000, end: 2010 }
   }
   ```
2. **Add button to `index.html`**:
   ```html
   <button class="quick-jump-btn" data-preset="preset-key">
       Preset Name
   </button>
   ```
3. **FilterPanel auto-wires** event listeners

### Modifying View Behavior
1. **Locate view file** (`drift.js` or `descent.js`)
2. **Read JSDoc comments** to understand current logic
3. **Modify parameters** (e.g., gravity well count, zoom range)
4. **Test in browser** - changes apply on refresh
5. **Check console logs** for debugging info

### Changing Design Tokens
1. **Edit `variables.css`** - Never hardcode values
2. **Example**:
   ```css
   --color-gray: #666666;  /* Change to #555555 */
   --space-lg: 24px;       /* Change to 32px */
   ```
3. **Changes propagate globally** - All components update

### Debugging
**Console Logging Pattern**:
```javascript
console.log('[ModuleName] Event description', data);
```

**Check these logs**:
- `[App] Initialization complete` - App started
- `[State] Initialized with X total memories` - Data loaded
- `[DriftView] Initialized with X gravity wells` - View ready
- `[FilterPanel] Filter changed:` - Filter updates

**Common Issues**:
- **Images not appearing**: Check `filename` matches actual file in `assets/images/`
- **Filters not working**: Check console for state changes, verify `AppState.filteredImages`
- **View not rendering**: Check if `destroy()` was called, verify event listeners attached
- **Performance lag**: Check `requestAnimationFrame` loops, verify GPU acceleration

---

## Performance Considerations

### Critical Performance Rules
1. **Use `transform` for animations** - GPU-accelerated, never triggers reflow
   ```javascript
   element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
   ```

2. **Batch DOM reads/writes** - Avoid layout thrashing
   ```javascript
   // Bad
   element1.style.left = element2.offsetWidth + 'px';  // Read-write
   element3.style.left = element4.offsetWidth + 'px';  // Read-write

   // Good
   const width2 = element2.offsetWidth;  // Read
   const width4 = element4.offsetWidth;  // Read
   element1.style.left = width2 + 'px';  // Write
   element3.style.left = width4 + 'px';  // Write
   ```

3. **Use `requestAnimationFrame` for animations** - Syncs with display refresh
   ```javascript
   const animate = () => {
       // Update positions
       this.momentumRAF = requestAnimationFrame(animate);
   };
   requestAnimationFrame(animate);
   ```

4. **Cancel animations on destroy** - Prevent memory leaks
   ```javascript
   destroy() {
       if (this.momentumRAF) {
           cancelAnimationFrame(this.momentumRAF);
           this.momentumRAF = null;
       }
   }
   ```

5. **Event delegation** - Fewer event listeners
   ```javascript
   // Instead of adding listener to each image
   container.addEventListener('click', (e) => {
       if (e.target.classList.contains('memory-image')) {
           // Handle image click
       }
   });
   ```

6. **Debounce expensive operations** - E.g., resize events
   ```javascript
   let resizeTimeout;
   window.addEventListener('resize', () => {
       clearTimeout(resizeTimeout);
       resizeTimeout = setTimeout(() => {
           this.render();
       }, 200);
   });
   ```

### Current Optimizations
- **Drift View**: Transform-only updates during drag (no re-render)
- **Descent View**: Single transform combines rotation + zoom
- **Filter Panel**: Updates state once, then view re-renders once
- **Image Detail**: Reuses modal DOM, only updates content
- **SVG Images**: Scalable without quality loss, smaller filesize

---

## Testing & Validation

### Manual Testing Checklist
- [ ] All 30 memories visible in Drift view
- [ ] All 30 memories visible in Descent view
- [ ] View toggle switches correctly
- [ ] Each theme filter works independently
- [ ] Multiple themes combine (OR logic)
- [ ] Timeline sliders adjust range
- [ ] Timeline filters memories correctly
- [ ] All 6 Quick Jump presets work
- [ ] Clear All resets filters
- [ ] Filter count updates correctly
- [ ] Info modal opens/closes
- [ ] Image detail modal shows correct data
- [ ] Image detail modal for "notes" theme shows noteContent
- [ ] Drift view momentum feels natural
- [ ] Descent view rotation is smooth
- [ ] Descent view zoom responds correctly
- [ ] Images clickable in both views
- [ ] Filter panel collapses/expands
- [ ] Mobile responsive layout works
- [ ] No console errors

### Browser Console Checks
```javascript
// Verify data loaded
console.log(MEMORIES.length);  // Should be 30

// Verify state initialized
console.log(AppState.filteredImages.length);  // Should be 30 (no filters)

// Verify filter logic
AppState.update({ filters: { selectedThemes: ['notes'] } });
console.log(AppState.filteredImages.length);  // Should be memories with "notes" theme

// Verify view
console.log(App.currentView);  // Should be DriftView or DescentView
```

---

## AI Assistant Guidelines

### When Working on This Project

1. **Read Before Modifying**
   - Always read the file you're about to modify
   - Understand the existing pattern before changing
   - Maintain consistency with surrounding code

2. **Respect the Architecture**
   - Don't introduce dependencies/frameworks
   - Don't create build processes
   - Keep the global namespace pattern
   - Follow the file loading order

3. **Maintain the Style**
   - Use existing naming conventions
   - Add JSDoc comments for new functions
   - Console log with `[ModuleName]` prefix
   - Keep the minimalist aesthetic

4. **Test Thoroughly**
   - Manually test in browser after changes
   - Check console for errors
   - Verify state updates propagate
   - Test both Drift and Descent views

5. **Performance First**
   - Use transforms for positioning
   - Batch DOM operations
   - Use requestAnimationFrame for animations
   - Cancel animations on cleanup

6. **Ask Before Major Changes**
   - Changing architecture patterns
   - Adding external dependencies
   - Modifying design tokens significantly
   - Restructuring file organization

### Common Pitfalls to Avoid

- **Don't** hardcode values (use CSS variables)
- **Don't** skip cleanup in `destroy()` methods
- **Don't** break the file loading order
- **Don't** introduce colors outside grayscale palette
- **Don't** use different fonts (Courier New only)
- **Don't** add frameworks/libraries
- **Don't** create overly complex abstractions (keep it simple)
- **Don't** forget to update `filteredImages` when filters change
- **Don't** add event listeners without removing them on cleanup

### Debugging Tips

1. **Check console logs** - Each module logs initialization
2. **Inspect `AppState`** - Single source of truth for all state
3. **Verify file paths** - Relative to `index.html`
4. **Check event listeners** - Use browser DevTools to inspect
5. **Monitor requestAnimationFrame** - Ensure cleanup on destroy
6. **Test state changes** - Use browser console to manually update state

---

## Project Context & History

### Recent Updates
- **Phase 6** (Latest): Complete Descent View with perspective, rotation, and zoom
- **Phase 5**: Complete Drift View with gravity wells, momentum, controlled overlap
- **User Feedback**: Collapsible filters, removed memory state filter
- **Initial Release**: Phases 1-4 (Foundation, data, components)

### Known Limitations
- 30 sample memories (placeholder content)
- No lazy loading (all images load upfront)
- No backend/database (static data)
- No user accounts/personalization
- Desktop-optimized (mobile works but less polished)

### Future Considerations
- Real content population (actual photos, reflections)
- Lazy loading for performance at scale
- Keyboard navigation improvements
- Accessibility audit (ARIA labels, screen reader support)
- Animation preferences (respect prefers-reduced-motion)
- Export/share functionality
- Print styles

---

## Questions or Issues?

If you encounter something not covered in this guide:

1. **Check existing code** - Pattern likely exists elsewhere
2. **Read JSDoc comments** - Function-level documentation
3. **Review git history** - `git log` shows recent changes and reasoning
4. **Test in browser** - Console logs reveal runtime behavior
5. **Ask the user** - When in doubt, clarify requirements

---

**End of CLAUDE.md**

This document should be updated whenever significant architectural changes are made to the project.
