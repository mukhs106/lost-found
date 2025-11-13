/**
 * MAIN.JS - Application Entry Point
 *
 * Initializes all components and manages view switching.
 * This is the orchestrator that ties everything together.
 */

const App = {
    currentView: null,

    /**
     * Initialize application
     */
    init() {
        console.log('='.repeat(50));
        console.log('Lost & Found: An Atlas of Being');
        console.log('='.repeat(50));

        // Initialize components
        this.initComponents();

        // Subscribe to state changes
        AppState.subscribe(this.onStateChange.bind(this));

        // Render initial view
        this.switchView(AppState.viewMode);

        console.log('[App] Initialization complete');
        console.log('='.repeat(50));
    },

    /**
     * Initialize all components
     */
    initComponents() {
        console.log('[App] Initializing components...');

        // Initialize UI components
        FilterPanel.init();
        InfoModal.init();
        ImageDetail.init();

        console.log('[App] Components initialized');
    },

    /**
     * React to state changes
     */
    onStateChange(state) {
        // Switch view if view mode changed
        if (state.viewMode !== this.currentViewMode) {
            this.switchView(state.viewMode);
        } else if (this.currentView) {
            // Re-render current view if filters changed
            this.currentView.render();
        }
    },

    /**
     * Switch between Drift and Descent views
     * @param {String} viewMode - 'drift' or 'descent'
     */
    switchView(viewMode) {
        console.log(`[App] Switching to ${viewMode} view`);

        // Destroy current view
        if (this.currentView) {
            this.currentView.destroy();
        }

        // Initialize new view
        if (viewMode === 'drift') {
            this.currentView = DriftView;
        } else if (viewMode === 'descent') {
            this.currentView = DescentView;
        }

        this.currentViewMode = viewMode;

        // Initialize and render new view
        if (this.currentView) {
            this.currentView.init();
        }
    }
};

/**
 * Start application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
