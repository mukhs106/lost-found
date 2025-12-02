/**
 * APP.JS - Application Entry Point
 *
 * Orchestrates the entire application:
 * - Initializes constellation positions
 * - Sets up event listeners
 * - Manages view switching
 * - Coordinates filters and rendering
 */

// Global application state
let currentView = 'clinical';
let currentImages = imageData;

/**
 * PURPOSE: Initialize the application
 * HOW: Sets up event listeners, calculates positions, renders initial view
 * INPUT: None
 * OUTPUT: Fully initialized application
 */
function initApp() {
  console.log('Lost—Found: Personal Archive');
  console.log(`Loaded ${imageData.length} images`);

  // Pre-calculate constellation positions for thematic view
  calculateConstellationPositions(imageData);

  // Set up all event listeners
  setupEventListeners();

  // Render initial view (clinical grid)
  renderCurrentView(imageData);

  // Update image count
  updateImageCount(imageData.length, imageData.length);
}

/**
 * PURPOSE: Set up all DOM event listeners
 * HOW: Attaches listeners to buttons, inputs, and keyboard
 * INPUT: None
 * OUTPUT: Event listeners attached
 */
function setupEventListeners() {
  // Filter panel toggle
  const filterToggle = document.getElementById('filter-toggle');
  const filterPanel = document.getElementById('filter-panel');
  if (filterToggle) {
    filterToggle.addEventListener('click', () => {
      filterPanel.classList.toggle('collapsed');
    });
  }

  // View mode switches
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentView = e.target.dataset.view;

      // Update active button state
      document.querySelectorAll('.view-mode-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      // Re-render with current images
      renderCurrentView(currentImages);
    });
  });

  // Thematic category checkboxes
  document.querySelectorAll('input[name="thematic"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      updateFilter('thematic', e.target.value, e.target.checked);
    });
  });

  // Compliance radio buttons
  document.querySelectorAll('input[name="compliance"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateFilter('compliance', e.target.value);
    });
  });

  // Performance checkboxes
  document.querySelectorAll('input[name="performance"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      updateFilter('performance', e.target.value, e.target.checked);
    });
  });

  // Audience checkboxes
  document.querySelectorAll('input[name="audience"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      updateFilter('audience', e.target.value, e.target.checked);
    });
  });

  // Time slider (with debounce for performance)
  const timeSlider = document.getElementById('time-slider');
  if (timeSlider) {
    timeSlider.addEventListener('input', debounce((e) => {
      const endYear = parseInt(e.target.value);
      updateFilter('timeRange', { start: 1990, end: endYear });
      document.getElementById('time-range-display').textContent = `1990 — ${endYear}`;
    }, 300));
  }

  // Reset filters button
  const resetBtn = document.getElementById('reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }

  // Info toggle
  const infoToggle = document.getElementById('info-toggle');
  const infoPanel = document.getElementById('info-panel');
  if (infoToggle && infoPanel) {
    infoToggle.addEventListener('click', () => {
      infoPanel.classList.toggle('visible');
    });

    const infoClose = document.getElementById('info-close');
    if (infoClose) {
      infoClose.addEventListener('click', () => {
        infoPanel.classList.remove('visible');
      });
    }
  }

  // Modal overlay click to close
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') {
        closeModal();
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      const infoPanel = document.getElementById('info-panel');
      if (infoPanel) infoPanel.classList.remove('visible');
    }
  });

  // Zoom controls (placeholder - implement as needed)
  const zoomIn = document.getElementById('zoom-in');
  const zoomOut = document.getElementById('zoom-out');
  if (zoomIn) {
    zoomIn.addEventListener('click', () => {
      console.log('Zoom in clicked');
      // Implement zoom functionality if needed
    });
  }
  if (zoomOut) {
    zoomOut.addEventListener('click', () => {
      console.log('Zoom out clicked');
      // Implement zoom functionality if needed
    });
  }
}

/**
 * PURPOSE: Render the current view with given images
 * HOW: Calls appropriate view renderer based on currentView
 * INPUT: images (filtered array)
 * OUTPUT: Updates canvas with rendered view
 */
function renderCurrentView(images) {
  currentImages = images;

  const canvas = document.getElementById('main-canvas');
  canvas.innerHTML = '';

  // Route to appropriate view renderer
  switch(currentView) {
    case 'clinical':
      renderGrid(images);
      break;
    case 'evolutionary':
      renderTimeline(images);
      break;
    case 'thematic':
      renderConstellation(images);
      break;
  }

  // Update image count
  updateImageCount(images.length, imageData.length);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
