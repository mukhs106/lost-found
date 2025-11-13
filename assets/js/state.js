/**
 * STATE.JS - Centralized State Management
 *
 * This module manages the application's state and provides a reactive
 * pattern for components to subscribe to state changes.
 *
 * The state object is the single source of truth for:
 * - Current view mode (drift/descent)
 * - Active filters (themes, memory state, timeline, quick jump)
 * - UI state (selected image, modal visibility)
 * - Filtered image list
 */

const AppState = {
    // Current view mode
    viewMode: 'drift', // 'drift' | 'descent'

    // Filter state
    filters: {
        selectedThemes: [], // Array of selected theme strings
        timelineRange: { start: 1990, end: 2024 }, // Year range
        quickJump: null // Currently active preset (if any)
    },

    // UI state
    ui: {
        selectedImageId: null, // ID of currently selected image
        isInfoModalOpen: false, // Info modal visibility
        isDetailModalOpen: false // Detail modal visibility
    },

    // Computed state (updated when filters change)
    filteredImages: [],

    // Subscribers - components that need to react to state changes
    subscribers: [],

    /**
     * Subscribe to state changes
     * @param {Function} callback - Function to call when state changes
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    },

    /**
     * Notify all subscribers of state change
     */
    notify() {
        this.subscribers.forEach(callback => callback(this));
    },

    /**
     * Update state and notify subscribers
     * @param {Object} updates - Partial state updates
     */
    update(updates) {
        // Deep merge updates into state
        if (updates.filters) {
            this.filters = { ...this.filters, ...updates.filters };
        }
        if (updates.ui) {
            this.ui = { ...this.ui, ...updates.ui };
        }
        if (updates.viewMode !== undefined) {
            this.viewMode = updates.viewMode;
        }

        // Recompute filtered images if filters changed
        if (updates.filters || updates.viewMode !== undefined) {
            this.computeFilteredImages();
        }

        // Notify subscribers
        this.notify();
    },

    /**
     * Compute filtered images based on current filter state
     */
    computeFilteredImages() {
        let filtered = [...MEMORIES];

        // Filter by themes (OR logic - match ANY selected theme)
        if (this.filters.selectedThemes.length > 0) {
            filtered = filtered.filter(memory =>
                memory.themes.some(theme =>
                    this.filters.selectedThemes.includes(theme)
                )
            );
        }

        // Filter by timeline range
        filtered = filtered.filter(memory =>
            memory.year >= this.filters.timelineRange.start &&
            memory.year <= this.filters.timelineRange.end
        );

        this.filteredImages = filtered;
    },

    /**
     * Apply a quick jump preset
     * @param {String} presetKey - Key from QUICK_JUMP_PRESETS
     */
    applyQuickJump(presetKey) {
        const preset = QUICK_JUMP_PRESETS[presetKey];
        if (!preset) return;

        const updates = {
            filters: {
                quickJump: presetKey,
                selectedThemes: preset.themes || [],
                timelineRange: preset.timelineRange || { start: 1990, end: 2024 }
            }
        };

        this.update(updates);
    },

    /**
     * Clear all filters
     */
    clearFilters() {
        this.update({
            filters: {
                selectedThemes: [],
                timelineRange: { start: 1990, end: 2024 },
                quickJump: null
            }
        });
    },

    /**
     * Get memory by ID
     * @param {Number} id - Memory ID
     * @returns {Object|null} Memory object or null
     */
    getMemoryById(id) {
        return MEMORIES.find(memory => memory.id === id) || null;
    },

    /**
     * Initialize state (compute initial filtered images)
     */
    init() {
        this.computeFilteredImages();
        console.log(`[State] Initialized with ${MEMORIES.length} total memories`);
        console.log(`[State] ${this.filteredImages.length} memories visible after initial filters`);
    }
};

// Initialize state when script loads
AppState.init();
