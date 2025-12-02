/**
 * MODAL.JS - Image Detail Modal
 *
 * Handles opening and closing the detailed image modal.
 * Displays:
 * - Full-size image
 * - Metadata (title, year, themes, compliance)
 * - Notes and contradictions
 * - Color-coded indicator
 */

/**
 * PURPOSE: Open modal with specific image details
 * HOW: Finds image data, generates HTML, displays modal overlay
 * INPUT: imageId (string)
 * OUTPUT: Shows modal with image details
 */
function openModal(imageId) {
  const img = imageData.find(item => item.id === imageId);
  if (!img) return;

  const layout = getModalLayout(img.aspect_ratio);
  const indicatorColor = getIndicatorColor(img);

  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-close" onclick="closeModal()">×</div>
    <div class="modal-indicator" style="background-color: ${indicatorColor}"></div>

    <div class="modal-content ${layout}">
      <div class="modal-image">
        <img src="${img.src}" alt="${img.title}">
      </div>

      <div class="modal-metadata">
        <h2>${img.title}</h2>
        <div class="year">${img.year}</div>

        <div class="metadata-section">
          <label>Thematic</label>
          <div class="value">${img.thematic.categories.join(', ')}</div>
          ${img.thematic.emotional_tags.length > 0 ?
            `<div class="value" style="opacity: 0.7; margin-top: 4px;">${img.thematic.emotional_tags.join(', ')}</div>`
            : ''}
          ${img.thematic.lost_found ?
            `<div class="value" style="opacity: 0.7; margin-top: 4px; font-style: italic;">${img.thematic.lost_found}</div>`
            : ''}
        </div>

        <div class="metadata-section">
          <label>Brand Compliance</label>
          <div class="compliance-display">
            ${renderComplianceDots(img.brand_compliance.overall_score)}
            <span>${img.brand_compliance.overall_score !== null ? Math.round(img.brand_compliance.overall_score * 100) + '%' : '—'}</span>
          </div>
        </div>

        ${img.notes ? `
        <div class="metadata-section">
          <label>Notes</label>
          <div class="value">${img.notes}</div>
        </div>
        ` : ''}

        ${img.contradictions && img.contradictions.length > 0 ? `
        <div class="metadata-section">
          <label>Contradictions</label>
          <div class="value" style="color: #e74c3c;">
            ${img.contradictions.map(c => `• ${c}`).join('<br>')}
          </div>
        </div>
        ` : ''}

        ${img.brand_compliance.overall_score === null ? `
        <div class="metadata-section">
          <label>Note</label>
          <div class="value" style="opacity: 0.7;">Pre-guideline era — no compliance scoring</div>
        </div>
        ` : ''}
      </div>
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

/**
 * PURPOSE: Close the modal
 * HOW: Removes visible class, resets body scroll
 * INPUT: None
 * OUTPUT: Hides modal
 */
function closeModal() {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('modal-overlay');

  overlay.classList.remove('visible');

  setTimeout(() => {
    document.body.style.overflow = '';
  }, 300);
}
