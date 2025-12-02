/**
 * TIMELINE.JS - Evolutionary Timeline View
 *
 * Renders images on a timeline based on year and compliance score.
 * Features:
 * - Horizontal axis = time (year)
 * - Vertical axis = compliance score (high at top, low at bottom)
 * - Scrollable horizontal canvas
 * - Small thumbnail images (80x80px)
 */

/**
 * PURPOSE: Render images in evolutionary timeline layout
 * HOW: Positions images based on year (x) and compliance (y)
 * INPUT: images (filtered array)
 * OUTPUT: Updates #main-canvas with timeline view
 */
function renderTimeline(images) {
  const canvas = document.getElementById('main-canvas');
  canvas.className = 'main-canvas';
  canvas.innerHTML = '';

  // Handle empty state
  if (images.length === 0) {
    canvas.innerHTML = `
      <div class="no-results">
        <p>No images match current filters.</p>
      </div>
    `;
    return;
  }

  // Create timeline container
  const timelineView = document.createElement('div');
  timelineView.className = 'timeline-view';

  const timelineCanvas = document.createElement('div');
  timelineCanvas.className = 'timeline-canvas';

  // Calculate canvas dimensions
  const minYear = Math.min(...images.map(img => img.year));
  const maxYear = Math.max(...images.map(img => img.year));
  const yearRange = maxYear - minYear || 1;
  const canvasWidth = Math.max(1200, yearRange * 80);
  const canvasHeight = 560;

  timelineCanvas.style.width = `${canvasWidth}px`;
  timelineCanvas.style.height = `${canvasHeight}px`;

  // Position each image
  images.forEach(img => {
    const timelineImage = document.createElement('div');
    timelineImage.className = 'timeline-image';

    // X position: based on year
    const yearProgress = (img.year - minYear) / yearRange;
    const x = yearProgress * (canvasWidth - 100) + 50;

    // Y position: based on compliance score (inverted - high score = top)
    let y;
    if (img.brand_compliance.overall_score !== null) {
      const complianceProgress = img.brand_compliance.overall_score;
      y = (1 - complianceProgress) * (canvasHeight - 100) + 20;
    } else {
      // Pre-guideline images go in the middle
      y = canvasHeight / 2;
    }

    timelineImage.style.left = `${x}px`;
    timelineImage.style.top = `${y}px`;

    // Image element
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.title;
    imgEl.loading = 'lazy';

    timelineImage.appendChild(imgEl);
    timelineImage.onclick = () => openModal(img.id);

    timelineCanvas.appendChild(timelineImage);
  });

  timelineView.appendChild(timelineCanvas);
  canvas.appendChild(timelineView);
}
