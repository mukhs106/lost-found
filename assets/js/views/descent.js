/**
 * DESCENT.JS - Descent View (Perspective Cone Navigation)
 *
 * PLACEHOLDER VERSION - Full implementation in Phase 6
 *
 * This view will eventually feature:
 * - One-point perspective (vanishing point at center)
 * - Concentric rings of images (uniform sizing)
 * - Zoom into layers
 * - Orbit/rotation on drag
 * - Controlled overlap
 *
 * For now: Simple concentric layout to test the architecture
 */

const DescentView = {
    container: null,
    canvas: null,

    /**
     * Initialize Descent view
     */
    init() {
        console.log('[DescentView] Initializing...');
        this.container = DOM.select('#viewContainer');
        this.render();
    },

    /**
     * Render view with current filtered images
     */
    render() {
        console.log('[DescentView] Rendering with', AppState.filteredImages.length, 'images');

        // Clear container
        DOM.empty(this.container);

        // Create centered container
        const centerContainer = DOM.create('div', {
            style: `
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                overflow-y: auto;
                padding: 24px;
            `
        });

        // Create concentric rings container (PLACEHOLDER)
        const ringsContainer = DOM.create('div', {
            style: `
                position: relative;
                width: 600px;
                height: 600px;
            `
        });

        // Distribute images in simple rings
        this.distributeInRings(ringsContainer, AppState.filteredImages);

        centerContainer.appendChild(ringsContainer);
        this.container.appendChild(centerContainer);
    },

    /**
     * Distribute images in concentric rings (PLACEHOLDER - simple version)
     */
    distributeInRings(container, images) {
        const centerX = 300;
        const centerY = 300;
        const numRings = Math.min(4, Math.ceil(images.length / 6));
        const maxRadius = 250;

        images.forEach((memory, index) => {
            const ring = Math.floor(index / 6);
            const positionInRing = index % 6;
            const radius = ((ring + 1) / numRings) * maxRadius;
            const angle = (positionInRing / 6) * Math.PI * 2;

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const imageElement = this.createImageElement(memory, x, y, ring);
            container.appendChild(imageElement);
        });
    },

    /**
     * Create image element positioned in ring (PLACEHOLDER)
     */
    createImageElement(memory, x, y, ring) {
        const size = 80; // Uniform size for all rings

        const container = DOM.create('div', {
            style: `
                position: absolute;
                left: ${x - size / 2}px;
                top: ${y - size / 2}px;
                width: ${size}px;
                height: ${size}px;
                cursor: pointer;
                transition: transform 150ms ease;
            `,
            onClick: () => ImageDetail.open(memory.id)
        });

        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.1)';
            container.style.zIndex = '10';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
            container.style.zIndex = '1';
        });

        const img = DOM.create('img', {
            src: ImageUtils.getUrl(memory.filename),
            alt: memory.title,
            style: 'width: 100%; height: 100%; object-fit: contain;'
        });

        container.appendChild(img);

        return container;
    },

    /**
     * Destroy view (cleanup)
     */
    destroy() {
        DOM.empty(this.container);
    }
};
