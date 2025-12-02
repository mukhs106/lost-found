# Lost & Found: An Atlas of Being

An intimate, explorable digital archive that transforms personal photographs and written reflections into an interactive visualization spanning 1990-2024.

## Overview

This is a minimalist, poetic web-based archive featuring two distinct navigation modes:

- **Drift View**: Wander through scattered memories with momentum-based panning and zooming
- **Descent View**: Look down into layered rings of memory in a perspective cone

## Technical Stack

- **Pure HTML/CSS/JavaScript** - No frameworks, maximum control
- **SVG Images** - Scalable, efficient, aspect-ratio preserved
- **60fps Performance** - GPU-accelerated animations
- **Grayscale Design** - Courier New typography throughout
- **Responsive** - Desktop, tablet, and mobile support

## Project Structure

```
lost-found/
├── index.html                 # Main entry point
├── README.md                  # This file
├── assets/
│   ├── css/
│   │   ├── reset.css         # CSS reset
│   │   ├── variables.css     # Design tokens
│   │   ├── base.css          # Typography, global styles
│   │   ├── layout.css        # Grid-based layout
│   │   ├── components.css    # Component styles
│   │   └── responsive.css    # Media queries
│   ├── js/
│   │   ├── main.js           # Application initialization
│   │   ├── data.js           # Image metadata (30 entries)
│   │   ├── state.js          # State management
│   │   ├── utils/
│   │   │   ├── dom.js        # DOM manipulation helpers
│   │   │   ├── math.js       # Math/physics utilities
│   │   │   └── images.js     # Image loading utilities
│   │   ├── components/
│   │   │   ├── filterPanel.js    # Filter UI and logic
│   │   │   ├── infoModal.js      # Information modal
│   │   │   └── imageDetail.js    # Image detail view
│   │   └── views/
│   │       ├── descent.js    # Descent view (placeholder)
│   │       └── drift.js      # Drift view (placeholder)
│   └── images/
│       ├── placeholder.svg   # SVG placeholder template
│       └── image001-030.svg  # 30 placeholder images
```

## Getting Started

### Local Development

Simply open `index.html` in a modern web browser. No build process required.

For best results, use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server -p 8000

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000`

## Features

### Current (Phase 1-4)
- ✅ Complete HTML/CSS foundation
- ✅ Filter panel with all controls
- ✅ Info modal with project description
- ✅ Image detail modal (50-60% screen size)
- ✅ Placeholder view modes (simple layouts)
- ✅ 30 sample memories with metadata
- ✅ Reactive state management
- ✅ View mode toggle (Drift/Descent)
- ✅ Theme filtering (8 categories)
- ✅ Memory state filter (lost/found/both)
- ✅ Timeline range slider
- ✅ Quick jump presets
- ✅ Filter count display

### Coming (Phase 5-9)
- ⏳ Full Drift view with momentum physics
- ⏳ Full Descent view with perspective
- ⏳ Controlled overlap algorithm
- ⏳ Lazy loading for performance
- ⏳ Polish and animations
- ⏳ Real content population

## Data Structure

### Adding New Images

1. **Add SVG file** to `assets/images/` (e.g., `image031.svg`)

2. **Add entry to data.js**:

```javascript
{
    id: 31,
    title: "Your Memory Title",
    filename: "image031.svg",
    year: 2024,
    themes: ["moments", "play"],  // 1-3 themes
    entry: "Brief poetic reflection on this memory.",
    memoryState: "found",  // "lost" or "found"
    noteContent: null  // String for "notes" theme, null otherwise
}
```

3. **Refresh** - The new memory will appear in the archive

### Themes

- **notes** - Written reflections, textual memory
- **moments** - Captured instants, temporal markers
- **faces** - Portraits of self and others
- **nostalgia** - Longing for past selves and places
- **play** - Joy, spontaneity, lightness
- **belonging** - Connection to place, people, purpose
- **change** - Transformation, transition, evolution
- **limbo** - In-between states, uncertainty, waiting

### Quick Jump Presets

Pre-configured filter combinations:
- **Notes to Self** - Written reflections
- **Small Joys** - Moments of play
- **The Heavy Shelf** - Difficult memories
- **Before Me** - Distant past (1990-2000)
- **Recently Found** - Recent integrations (2020-2024)
- **Firsts & Lasts** - Transitions and changes

## Design Philosophy

- **Minimalism as contemplation** - Remove all unnecessary elements
- **Grayscale palette** - Focus on form and content
- **Courier New** - Evokes typewriters, notebooks, archives
- **Generous whitespace** - Breathing room for reflection
- **Smooth motion** - Organic, not mechanical
- **Aspect ratio preservation** - Never stretch or distort

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Targets

- **60fps** on desktop
- **30fps** minimum on mobile
- **<3 seconds** initial load
- **<1 second** filter response

## Development Roadmap

- [x] Phase 1: Foundation (HTML/CSS structure)
- [x] Phase 2: Data & State (data.js, state.js)
- [x] Phase 3: Filter Panel & Info Modal
- [x] Phase 4: Image Detail View
- [ ] Phase 5: Drift View (full implementation)
- [ ] Phase 6: Descent View (full implementation)
- [ ] Phase 7: Polish & Refinement
- [ ] Phase 8: Content Population
- [ ] Phase 9: Final Testing & Launch

## License

Personal project - All rights reserved

## Credits

Concept, design, and development: [Your Name]
Built with vanilla JavaScript, no frameworks.

---

**Version**: 2.0 (Phase 1-4 Complete)
**Last Updated**: November 13, 2025
