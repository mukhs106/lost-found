/**
 * GRID.JS - Clinical Grid View
 *
 * Renders images in a responsive grid layout.
 * Features:
 * - 4 columns on desktop, responsive on mobile
 * - Shows thumbnail, title, year, compliance dots
 * - Hover scale effect
 * - Click to open modal
 */

/**
 * PURPOSE: Render images in clinical grid layout
 * HOW: Creates grid container with image tiles
 * INPUT: images (filtered array)
 * OUTPUT: Updates #main-canvas with grid view
 */
function renderGrid(images) {
  const canvas = document.getElementById('main-canvas');
  canvas.className = 'main-canvas';
  canvas.innerHTML = '';

  // Handle empty state
  if (images.length === 0) {
    canvas.innerHTML = `
      <div class="no-results">
        <p>No images match current filters.</p>
        <p style="margin-top: 12px; opacity: 0.5;">Try adjusting or resetting filters.</p>
      </div>
    `;
    return;
  }

  // Create grid container
  const gridView = document.createElement('div');
  gridView.className = 'grid-view';

  // Create tiles for each image
  images.forEach(img => {
    const tile = document.createElement('div');
    tile.className = 'grid-tile';
    tile.onclick = () => openModal(img.id);

    // Image element
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.title;
    imgEl.loading = 'lazy';

    // Info section
    const info = document.createElement('div');
    info.className = 'grid-tile-info';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = img.title;

    const year = document.createElement('div');
    year.className = 'year';
    year.textContent = img.year;

    const compliance = document.createElement('div');
    compliance.className = 'compliance';
    compliance.innerHTML = renderComplianceDots(img.brand_compliance.overall_score);

    // Assemble tile
    info.appendChild(title);
    info.appendChild(year);
    info.appendChild(compliance);

    tile.appendChild(imgEl);
    tile.appendChild(info);
    gridView.appendChild(tile);
  });

  canvas.appendChild(gridView);
}
