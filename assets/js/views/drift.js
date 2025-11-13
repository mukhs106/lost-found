/**
 * DRIFT.JS - Drift View (Infinite Scroll Navigation)
 *
 * PLACEHOLDER VERSION - Full implementation in Phase 5
 *
 * This view will eventually feature:
 * - Large canvas (3x viewport)
 * - Scattered images with gravity well clustering
 * - Pan and zoom with momentum/inertia
 * - Controlled overlap
 *
 * For now: Simple grid layout to test the architecture
 */

const DriftView = {
    container: null,
    canvas: null,

    /**
     * Initialize Drift view
     */
    init() {
        console.log('[DriftView] Initializing...');
        this.container = DOM.select('#viewContainer');
        this.render();
    },

    /**
     * Render view with current filtered images
     */
    render() {
        console.log('[DriftView] Rendering with', AppState.filteredImages.length, 'images');

        // Clear container
        DOM.empty(this.container);

        // Create simple grid layout (PLACEHOLDER)
        const grid = DOM.create('div', {
            style: `
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 24px;
                padding: 24px;
                overflow-y: auto;
                height: 100%;
            `
        });

        // Add images in grid
        AppState.filteredImages.forEach(memory => {
            const container = this.createImageContainer(memory);
            grid.appendChild(container);
        });

        this.container.appendChild(grid);
    },

    /**
     * Create image container (PLACEHOLDER - simple version)
     */
    createImageContainer(memory) {
        const container = DOM.create('div', {
            style: `
                cursor: pointer;
                transition: transform 150ms ease;
            `,
            onClick: () => ImageDetail.open(memory.id)
        });

        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.05)';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
        });

        const img = DOM.create('img', {
            src: ImageUtils.getUrl(memory.filename),
            alt: memory.title,
            style: 'width: 100%; height: auto; object-fit: contain;'
        });

        const caption = DOM.create('div', {
            style: `
                font-size: 12px;
                margin-top: 8px;
                color: #666;
            `
        }, memory.title);

        container.appendChild(img);
        container.appendChild(caption);

        return container;
    },

    /**
     * Destroy view (cleanup)
     */
    destroy() {
        DOM.empty(this.container);
    }
};
