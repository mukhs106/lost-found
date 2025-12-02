/**
 * IMAGEDETAIL.JS - Image Detail Modal Component
 *
 * Displays enlarged image with metadata:
 * - Title
 * - Year
 * - Memory state (lost/found)
 * - Themes (as pills)
 * - Entry text
 * - Note content (if applicable for "notes" theme)
 *
 * Layout: 60% image (left) | 40% metadata (right)
 * Size: 50-60% of screen (not full-screen)
 */

const ImageDetail = {
    elements: {},

    /**
     * Initialize image detail modal
     */
    init() {
        console.log('[ImageDetail] Initializing...');

        // Cache DOM elements
        this.cacheElements();

        // Attach event listeners
        this.attachEventListeners();

        console.log('[ImageDetail] Initialized');
    },

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            modal: DOM.select('#detailModal'),
            closeButton: DOM.select('#detailModalClose'),
            overlay: DOM.select('#detailModalOverlay'),

            // Content elements
            image: DOM.select('#detailImage'),
            title: DOM.select('#detailTitle'),
            year: DOM.select('#detailYear'),
            state: DOM.select('#detailState'),
            themes: DOM.select('#detailThemes'),
            entry: DOM.select('#detailEntry'),
            noteContent: DOM.select('#detailNoteContent')
        };
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close modal - X button
        this.elements.closeButton.addEventListener('click', () => {
            this.close();
        });

        // Close modal - overlay click
        this.elements.overlay.addEventListener('click', () => {
            this.close();
        });

        // Close modal - ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.ui.isDetailModalOpen) {
                this.close();
            }
        });
    },

    /**
     * Open modal with specific image
     * @param {Number} imageId - ID of image to display
     */
    open(imageId) {
        const memory = AppState.getMemoryById(imageId);
        if (!memory) {
            console.error(`[ImageDetail] Memory not found: ${imageId}`);
            return;
        }

        console.log(`[ImageDetail] Opening: ${memory.title}`);

        // Render content
        this.render(memory);

        // Show modal
        DOM.show(this.elements.modal);

        // Update state
        AppState.update({
            ui: {
                selectedImageId: imageId,
                isDetailModalOpen: true
            }
        });
    },

    /**
     * Close modal
     */
    close() {
        DOM.hide(this.elements.modal);

        AppState.update({
            ui: {
                selectedImageId: null,
                isDetailModalOpen: false
            }
        });

        console.log('[ImageDetail] Closed');
    },

    /**
     * Render image and metadata
     * @param {Object} memory - Memory object from data
     */
    render(memory) {
        // Set image
        this.elements.image.src = ImageUtils.getUrl(memory.filename);
        this.elements.image.alt = memory.title;

        // Set title
        DOM.setText(this.elements.title, memory.title);

        // Set year
        DOM.setText(this.elements.year, memory.year);

        // Set memory state
        DOM.setText(this.elements.state, `Memory: ${memory.memoryState}`);

        // Render theme pills
        this.renderThemes(memory.themes);

        // Set entry text
        DOM.setText(this.elements.entry, memory.entry);

        // Render note content if applicable
        this.renderNoteContent(memory);
    },

    /**
     * Render theme pills
     * @param {Array<String>} themes
     */
    renderThemes(themes) {
        // Clear existing themes
        DOM.empty(this.elements.themes);

        // Create pill for each theme
        themes.forEach(theme => {
            const pill = DOM.create('span', {
                className: 'theme-pill'
            }, theme);

            this.elements.themes.appendChild(pill);
        });
    },

    /**
     * Render note content (only for "notes" theme images)
     * @param {Object} memory
     */
    renderNoteContent(memory) {
        // Hide by default
        DOM.removeClass(this.elements.noteContent, 'visible');
        DOM.empty(this.elements.noteContent);

        // Show if noteContent exists
        if (memory.noteContent) {
            // Split into paragraphs
            const paragraphs = memory.noteContent.split('\n\n');

            paragraphs.forEach(text => {
                const p = DOM.create('p', {}, text.trim());
                this.elements.noteContent.appendChild(p);
            });

            DOM.addClass(this.elements.noteContent, 'visible');
        }
    }
};
