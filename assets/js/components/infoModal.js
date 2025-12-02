/**
 * INFOMODAL.JS - Information Modal Component
 *
 * Handles the information modal that displays:
 * - Project description
 * - Navigation instructions
 * - How to use filters
 *
 * Opens via the "i" button in header.
 * Closes via X button, ESC key, or overlay click.
 */

const InfoModal = {
    elements: {},

    /**
     * Initialize info modal
     */
    init() {
        console.log('[InfoModal] Initializing...');

        // Cache DOM elements
        this.cacheElements();

        // Attach event listeners
        this.attachEventListeners();

        console.log('[InfoModal] Initialized');
    },

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            modal: DOM.select('#infoModal'),
            openButton: DOM.select('#infoButton'),
            closeButton: DOM.select('#infoModalClose'),
            overlay: DOM.select('#infoModalOverlay')
        };
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Open modal
        this.elements.openButton.addEventListener('click', () => {
            this.open();
        });

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
            if (e.key === 'Escape' && AppState.ui.isInfoModalOpen) {
                this.close();
            }
        });
    },

    /**
     * Open modal
     */
    open() {
        DOM.show(this.elements.modal);
        AppState.update({
            ui: { isInfoModalOpen: true }
        });
        console.log('[InfoModal] Opened');
    },

    /**
     * Close modal
     */
    close() {
        DOM.hide(this.elements.modal);
        AppState.update({
            ui: { isInfoModalOpen: false }
        });
        console.log('[InfoModal] Closed');
    }
};
