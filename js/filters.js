/**
 * FILTERS.JS - Filter State Management and Logic
 *
 * Manages filtering state and applies filters to image collection.
 * Handles:
 * - Thematic category filters
 * - Time range filtering
 * - Compliance level filtering
 * - Performance type filtering
 * - Audience context filtering
 */

// Global filter state object
const filterState = {
  thematic: [],                           // Array of selected theme strings
  timeRange: { start: 1990, end: 2025 }, // Year range
  compliance: "all",                      // "all" | "high" | "medium" | "low" | "deviant"
  performance: [],                        // Array of performance types
  audience: []                            // Array of audience contexts
};

/**
 * PURPOSE: Filter images based on current filter state
 * HOW: Iterates through images and checks each against filter conditions
 * INPUT: images (array), filters (filter state object)
 * OUTPUT: Filtered array of images
 */
function filterImages(images, filters) {
  return images.filter(img => {
    // Thematic categories - OR logic (match ANY selected theme)
    if (filters.thematic.length > 0) {
      const hasMatch = filters.thematic.some(theme =>
        img.thematic.categories.includes(theme)
      );
      if (!hasMatch) return false;
    }

    // Time range - inclusive
    if (img.year < filters.timeRange.start || img.year > filters.timeRange.end) {
      return false;
    }

    // Compliance level - only apply if score exists
    if (filters.compliance !== "all" && img.brand_compliance.overall_score !== null) {
      const score = img.brand_compliance.overall_score;
      if (filters.compliance === "high" && score < 0.75) return false;
      if (filters.compliance === "medium" && (score < 0.50 || score >= 0.75)) return false;
      if (filters.compliance === "low" && (score < 0.25 || score >= 0.50)) return false;
      if (filters.compliance === "deviant" && score >= 0.25) return false;
    }

    // Performance type
    if (filters.performance.length > 0) {
      const perfType = img.brand_compliance.ritual_behavioral.performance_type;
      if (!filters.performance.includes(perfType)) {
        return false;
      }
    }

    // Audience context
    if (filters.audience.length > 0) {
      const aud = img.brand_compliance.voice_audience.audience;
      if (!filters.audience.includes(aud)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * PURPOSE: Update a specific filter and re-render view
 * HOW: Modifies filterState, applies filters, triggers render
 * INPUT: filterType (string), value (varies), isChecked (boolean for checkboxes)
 * OUTPUT: Updates state and triggers view re-render
 */
function updateFilter(filterType, value, isChecked) {
  switch(filterType) {
    case 'thematic':
      if (isChecked) {
        filterState.thematic.push(value);
      } else {
        filterState.thematic = filterState.thematic.filter(t => t !== value);
      }
      break;

    case 'compliance':
      filterState.compliance = value;
      break;

    case 'performance':
      if (isChecked) {
        filterState.performance.push(value);
      } else {
        filterState.performance = filterState.performance.filter(p => p !== value);
      }
      break;

    case 'audience':
      if (isChecked) {
        filterState.audience.push(value);
      } else {
        filterState.audience = filterState.audience.filter(a => a !== value);
      }
      break;

    case 'timeRange':
      filterState.timeRange = value;
      break;
  }

  // Apply filters and re-render
  const filteredImages = filterImages(imageData, filterState);
  renderCurrentView(filteredImages);
}

/**
 * PURPOSE: Reset all filters to default state
 * HOW: Clears filterState and resets UI controls
 * INPUT: None
 * OUTPUT: Resets state and UI, triggers full re-render
 */
function resetFilters() {
  // Reset state
  filterState.thematic = [];
  filterState.timeRange = { start: 1990, end: 2025 };
  filterState.compliance = "all";
  filterState.performance = [];
  filterState.audience = [];

  // Reset UI controls
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('input[type="radio"]').forEach(rb => {
    rb.checked = rb.value === 'all';
  });

  const timeSlider = document.getElementById('time-slider');
  if (timeSlider) {
    timeSlider.value = 2025;
    filterState.timeRange.start = 1990;
  }

  document.getElementById('time-range-display').textContent = '1990 — 2025';

  // Re-render with all images
  renderCurrentView(imageData);
}
