/**
 * DRIFT.JS - Drift View (Infinite Pan Navigation)
 *
 * Features:
 * - Large canvas (5x viewport in all directions)
 * - Pan in all directions (up, down, left, right)
 * - Simple grid layout (full implementation Phase 5)
 * - Drag to pan
 */

const DriftView = {
    container: null,
    canvas: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,

    /**
     * Initialize Drift view
     */
    init() {
        console.log('[DriftView] Initializing...');
        this.container = DOM.select('#viewContainer');
        this.render();
        this.attachEventListeners();
    },

    /**
     * Attach event listeners for pan functionality
     */
    attachEventListeners() {
        const viewContainer = this.container;

        // Mouse down - start dragging
        viewContainer.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.pageX - viewContainer.offsetLeft;
            this.startY = e.pageY - viewContainer.offsetTop;
            this.scrollLeft = viewContainer.scrollLeft;
            this.scrollTop = viewContainer.scrollTop;
            viewContainer.style.cursor = 'grabbing';
        });

        // Mouse leave - stop dragging
        viewContainer.addEventListener('mouseleave', () => {
            this.isDragging = false;
            viewContainer.style.cursor = 'grab';
        });

        // Mouse up - stop dragging
        viewContainer.addEventListener('mouseup', () => {
            this.isDragging = false;
            viewContainer.style.cursor = 'grab';
        });

        // Mouse move - pan
        viewContainer.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - viewContainer.offsetLeft;
            const y = e.pageY - viewContainer.offsetTop;
            const walkX = (x - this.startX) * 2; // Scroll speed
            const walkY = (y - this.startY) * 2;
            viewContainer.scrollLeft = this.scrollLeft - walkX;
            viewContainer.scrollTop = this.scrollTop - walkY;
        });

        // Touch support
        viewContainer.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            const touch = e.touches[0];
            this.startX = touch.pageX - viewContainer.offsetLeft;
            this.startY = touch.pageY - viewContainer.offsetTop;
            this.scrollLeft = viewContainer.scrollLeft;
            this.scrollTop = viewContainer.scrollTop;
        });

        viewContainer.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        viewContainer.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const touch = e.touches[0];
            const x = touch.pageX - viewContainer.offsetLeft;
            const y = touch.pageY - viewContainer.offsetTop;
            const walkX = (x - this.startX) * 2;
            const walkY = (y - this.startY) * 2;
            viewContainer.scrollLeft = this.scrollLeft - walkX;
            viewContainer.scrollTop = this.scrollTop - walkY;
        });
    },

    /**
     * Render view with current filtered images
     */
    render() {
        console.log('[DriftView] Rendering with', AppState.filteredImages.length, 'images');

        // Clear container
        DOM.empty(this.container);

        // Set container to allow scrolling in all directions
        this.container.style.overflow = 'auto';
        this.container.style.cursor = 'grab';

        // Create large canvas (5x viewport size)
        const canvas = DOM.create('div', {
            style: `
                width: ${window.innerWidth * 5}px;
                height: ${window.innerHeight * 5}px;
                position: relative;
                background-color: var(--color-bg);
            `
        });

        // Distribute images across the canvas
        this.distributeImages(canvas, AppState.filteredImages);

        this.container.appendChild(canvas);

        // Center the view
        this.container.scrollLeft = (canvas.offsetWidth - this.container.offsetWidth) / 2;
        this.container.scrollTop = (canvas.offsetHeight - this.container.offsetHeight) / 2;
    },

    /**
     * Distribute images across canvas (PLACEHOLDER - simple scattered layout)
     */
    distributeImages(canvas, images) {
        const canvasWidth = canvas.offsetWidth || window.innerWidth * 5;
        const canvasHeight = canvas.offsetHeight || window.innerHeight * 5;
        const imageSize = 150;
        const padding = 50;

        images.forEach((memory, index) => {
            // Random position with some spacing
            const x = MathUtils.random(padding, canvasWidth - imageSize - padding);
            const y = MathUtils.random(padding, canvasHeight - imageSize - padding);

            const container = this.createImageContainer(memory, x, y, imageSize);
            canvas.appendChild(container);
        });
    },

    /**
     * Create image container at specific position
     */
    createImageContainer(memory, x, y, size) {
        const container = DOM.create('div', {
            style: `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
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
            style: 'width: 100%; height: 100%; object-fit: contain; pointer-events: none;'
        });

        container.appendChild(img);

        return container;
    },

    /**
     * Destroy view (cleanup)
     */
    destroy() {
        DOM.empty(this.container);
        this.container.style.overflow = 'hidden';
        this.container.style.cursor = 'default';
    }
};
