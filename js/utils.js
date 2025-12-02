/**
 * UTILS.JS - Helper Functions
 *
 * Collection of utility functions used throughout the application:
 * - Compliance dot rendering
 * - Color indicator selection
 * - Modal layout detection
 * - Debouncing
 * - Image count updates
 * - Constellation position calculation
 */

/**
 * PURPOSE: Render compliance score as visual dots (●○○○○)
 * HOW: Converts 0-1 score to filled/empty dots (5 total)
 * INPUT: score (0-1 or null)
 * OUTPUT: HTML string with dots
 */
function renderComplianceDots(score) {
  if (score === null) return '<span class="no-score">—</span>';

  const totalDots = 5;
  const filledDots = Math.round(score * totalDots);

  let html = '<span class="compliance-dots">';
  for (let i = 0; i < totalDots; i++) {
    html += i < filledDots ? '●' : '○';
  }
  html += '</span>';
  return html;
}

/**
 * PURPOSE: Get color indicator for image based on themes
 * HOW: Maps thematic categories to accent colors
 * INPUT: img object
 * OUTPUT: hex color code string
 */
function getIndicatorColor(img) {
  if (img.thematic.categories.includes('nostalgia')) {
    return '#5C4742'; // Brown
  } else if (img.thematic.categories.includes('belonging') ||
             img.thematic.categories.includes('play')) {
    return '#3A5A40'; // Green
  } else {
    return '#2B4C5F'; // Blue
  }
}

/**
 * PURPOSE: Determine modal layout based on image aspect ratio
 * HOW: Portrait ratios get vertical layout, others horizontal
 * INPUT: aspectRatio string (e.g., "2:3", "16:9")
 * OUTPUT: "vertical" or "horizontal"
 */
function getModalLayout(aspectRatio) {
  if (aspectRatio === "9:16" || aspectRatio === "2:3") {
    return "vertical";
  } else {
    return "horizontal";
  }
}

/**
 * PURPOSE: Debounce function calls to improve performance
 * HOW: Delays function execution until after wait time has elapsed
 * INPUT: func (function to debounce), wait (milliseconds)
 * OUTPUT: debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * PURPOSE: Update the image count display
 * HOW: Sets text content of #image-count element
 * INPUT: filtered (number), total (number)
 * OUTPUT: Updates DOM
 */
function updateImageCount(filtered, total) {
  const countElement = document.getElementById('image-count');
  if (countElement) {
    countElement.textContent = `Showing: ${filtered} of ${total}`;
  }
}

/**
 * PURPOSE: Calculate constellation positions for thematic view
 * HOW: Places images based on weighted theme positions with randomness
 * INPUT: images array
 * OUTPUT: images array with position property added
 */
function calculateConstellationPositions(images) {
  // Theme anchor positions in the constellation space
  const themePositions = {
    notes: { x: 200, y: 300 },
    moments: { x: 600, y: 300 },
    faces: { x: 400, y: 100 },
    nostalgia: { x: 200, y: 500 },
    play: { x: 600, y: 500 },
    belonging: { x: 800, y: 300 },
    change: { x: 400, y: 500 },
    limbo: { x: 400, y: 700 }
  };

  images.forEach(img => {
    // Skip if position already calculated
    if (img.position) return;

    let x = 0, y = 0;

    // Calculate weighted average position based on themes
    for (let theme in img.thematic.thematic_weights) {
      const weight = img.thematic.thematic_weights[theme];
      if (themePositions[theme]) {
        x += themePositions[theme].x * weight;
        y += themePositions[theme].y * weight;
      }
    }

    // Add random offset for organic feel
    x += (Math.random() - 0.5) * 30;
    y += (Math.random() - 0.5) * 30;

    img.position = { x, y };
  });

  return images;
}
