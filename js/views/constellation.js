/**
 * CONSTELLATION.JS - Thematic Constellation View
 *
 * Renders images clustered by thematic categories.
 * Features:
 * - Images positioned based on thematic weights
 * - Theme labels visible
 * - Opacity varies by compliance score
 * - Organic clustering with randomness
 */

/**
 * PURPOSE: Render images in thematic constellation layout
 * HOW: Places images based on weighted theme positions
 * INPUT: images (filtered array)
 * OUTPUT: Updates #main-canvas with constellation view
 */
function renderConstellation(images) {
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

  // Calculate positions if not already done
  if (!images[0].position || images[0].position.x === undefined) {
    images = calculateConstellationPositions(images);
  }

  // Create constellation container
  const constellationView = document.createElement('div');
  constellationView.className = 'constellation-view';

  const constellationCanvas = document.createElement('div');
  constellationCanvas.className = 'constellation-canvas';

  // Theme anchor positions (same as in utils.js)
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

  // Add theme labels
  Object.keys(themePositions).forEach(theme => {
    const label = document.createElement('div');
    label.className = 'theme-label';
    label.textContent = theme;
    label.style.left = `${themePositions[theme].x - 20}px`;
    label.style.top = `${themePositions[theme].y - 30}px`;
    constellationCanvas.appendChild(label);
  });

  // Position each image
  images.forEach(img => {
    const constellationImage = document.createElement('div');
    constellationImage.className = 'constellation-image';

    // Position based on calculated x, y
    constellationImage.style.left = `${img.position.x - 50}px`;
    constellationImage.style.top = `${img.position.y - 50}px`;

    // Opacity based on compliance score
    if (img.brand_compliance.overall_score !== null) {
      if (img.brand_compliance.overall_score >= 0.75) {
        constellationImage.style.opacity = '1.0';
      } else if (img.brand_compliance.overall_score >= 0.50) {
        constellationImage.style.opacity = '0.85';
      } else {
        constellationImage.style.opacity = '0.6';
      }
    }

    // Image element
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.title;
    imgEl.loading = 'lazy';

    constellationImage.appendChild(imgEl);
    constellationImage.onclick = () => openModal(img.id);

    constellationCanvas.appendChild(constellationImage);
  });

  constellationView.appendChild(constellationCanvas);
  canvas.appendChild(constellationView);
}
