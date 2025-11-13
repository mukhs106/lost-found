/**
 * FILTERPANEL.JS - Filter Panel Component
 *
 * Handles all filter interactions:
 * - View mode toggle (Drift/Descent)
 * - Theme selection
 * - Memory state control
 * - Timeline range
 * - Quick jump presets
 * - Clear all filters
 *
 * Updates AppState when filters change.
 */

const FilterPanel = {
    elements: {},

    /**
     * Initialize filter panel
     */
    init() {
        console.log('[FilterPanel] Initializing...');

        // Cache DOM elements
        this.cacheElements();

        // Attach event listeners
        this.attachEventListeners();

        // Subscribe to state changes
        AppState.subscribe(this.onStateChange.bind(this));

        // Initial render
        this.render();

        console.log('[FilterPanel] Initialized');
    },

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            // View toggle
            viewButtons: DOM.selectAll('.view-toggle-btn'),

            // Theme checkboxes
            themeCheckboxes: DOM.selectAll('input[name="theme"]'),

            // Memory state buttons
            stateButtons: DOM.selectAll('.state-btn'),

            // Timeline sliders
            timelineStart: DOM.select('#timelineRangeStart'),
            timelineEnd: DOM.select('#timelineRangeEnd'),
            timelineStartLabel: DOM.select('#timelineStart'),
            timelineEndLabel: DOM.select('#timelineEnd'),

            // Quick jump buttons
            quickJumpButtons: DOM.selectAll('.quick-jump-btn'),

            // Clear filters button
            clearButton: DOM.select('#clearFilters'),

            // Filter count
            filteredCount: DOM.select('#filteredCount'),
            totalCount: DOM.select('#totalCount')
        };
    },

    /**
     * Attach event listeners to all filter controls
     */
    attachEventListeners() {
        // View mode toggle
        this.elements.viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.handleViewChange(view);
            });
        });

        // Theme checkboxes
        this.elements.themeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.handleThemeChange();
            });
        });

        // Memory state buttons
        this.elements.stateButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const state = e.target.dataset.state;
                this.handleStateChange(state);
            });
        });

        // Timeline sliders
        this.elements.timelineStart.addEventListener('input', (e) => {
            this.handleTimelineChange();
        });

        this.elements.timelineEnd.addEventListener('input', (e) => {
            this.handleTimelineChange();
        });

        // Quick jump buttons
        this.elements.quickJumpButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.handleQuickJump(preset);
            });
        });

        // Clear filters
        this.elements.clearButton.addEventListener('click', () => {
            this.handleClearFilters();
        });
    },

    /**
     * Handle view mode change
     */
    handleViewChange(view) {
        AppState.update({ viewMode: view });
    },

    /**
     * Handle theme checkbox changes
     */
    handleThemeChange() {
        const selectedThemes = this.elements.themeCheckboxes
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        AppState.update({
            filters: {
                selectedThemes,
                quickJump: null // Clear quick jump when manually changing filters
            }
        });
    },

    /**
     * Handle memory state button clicks
     */
    handleStateChange(state) {
        AppState.update({
            filters: {
                memoryState: state,
                quickJump: null
            }
        });
    },

    /**
     * Handle timeline slider changes
     */
    handleTimelineChange() {
        let start = parseInt(this.elements.timelineStart.value);
        let end = parseInt(this.elements.timelineEnd.value);

        // Ensure start is always <= end
        if (start > end) {
            [start, end] = [end, start];
            this.elements.timelineStart.value = start;
            this.elements.timelineEnd.value = end;
        }

        // Update labels
        DOM.setText(this.elements.timelineStartLabel, start);
        DOM.setText(this.elements.timelineEndLabel, end);

        AppState.update({
            filters: {
                timelineRange: { start, end },
                quickJump: null
            }
        });
    },

    /**
     * Handle quick jump preset clicks
     */
    handleQuickJump(preset) {
        AppState.applyQuickJump(preset);
    },

    /**
     * Handle clear all filters
     */
    handleClearFilters() {
        AppState.clearFilters();
    },

    /**
     * React to state changes
     */
    onStateChange(state) {
        this.render();
    },

    /**
     * Render UI based on current state
     */
    render() {
        const state = AppState;

        // Update view buttons
        this.elements.viewButtons.forEach(btn => {
            if (btn.dataset.view === state.viewMode) {
                DOM.addClass(btn, 'active');
            } else {
                DOM.removeClass(btn, 'active');
            }
        });

        // Update theme checkboxes
        this.elements.themeCheckboxes.forEach(checkbox => {
            checkbox.checked = state.filters.selectedThemes.includes(checkbox.value);
        });

        // Update state buttons
        this.elements.stateButtons.forEach(btn => {
            if (btn.dataset.state === state.filters.memoryState) {
                DOM.addClass(btn, 'active');
            } else {
                DOM.removeClass(btn, 'active');
            }
        });

        // Update timeline sliders and labels
        this.elements.timelineStart.value = state.filters.timelineRange.start;
        this.elements.timelineEnd.value = state.filters.timelineRange.end;
        DOM.setText(this.elements.timelineStartLabel, state.filters.timelineRange.start);
        DOM.setText(this.elements.timelineEndLabel, state.filters.timelineRange.end);

        // Update quick jump buttons
        this.elements.quickJumpButtons.forEach(btn => {
            if (btn.dataset.preset === state.filters.quickJump) {
                DOM.addClass(btn, 'active');
            } else {
                DOM.removeClass(btn, 'active');
            }
        });

        // Update filter count
        DOM.setText(this.elements.filteredCount, state.filteredImages.length);
        DOM.setText(this.elements.totalCount, MEMORIES.length);
    }
};
