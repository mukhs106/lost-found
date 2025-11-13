/**
 * DESCENT.JS - Descent View (Infinite Pan Navigation)
 *
 * Features:
 * - Concentric rings layout
 * - Pan in all directions (up, down, left, right)
 * - Uniform image sizing
 * - Drag to pan
 */

const DescentView = {
    container: null,
    canvas: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,

    /**
     * Initialize Descent view
     */
    init() {
        console.log('[DescentView] Initializing...');
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
        console.log('[DescentView] Rendering with', AppState.filteredImages.length, 'images');

        // Clear container
        DOM.empty(this.container);

        // Set container to allow scrolling in all directions
        this.container.style.overflow = 'auto';
        this.container.style.cursor = 'grab';

        // Create large canvas to allow panning
        const canvas = DOM.create('div', {
            style: `
                width: ${Math.max(window.innerWidth * 3, 1800)}px;
                height: ${Math.max(window.innerHeight * 3, 1800)}px;
                position: relative;
                background-color: var(--color-bg);
            `
        });

        // Create centered rings container
        const ringsContainer = DOM.create('div', {
            style: `
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 800px;
                height: 800px;
            `
        });

        // Distribute images in concentric rings
        this.distributeInRings(ringsContainer, AppState.filteredImages);

        canvas.appendChild(ringsContainer);
        this.container.appendChild(canvas);

        // Center the view
        this.container.scrollLeft = (canvas.offsetWidth - this.container.offsetWidth) / 2;
        this.container.scrollTop = (canvas.offsetHeight - this.container.offsetHeight) / 2;
    },

    /**
     * Distribute images in concentric rings (PLACEHOLDER - simple version)
     */
    distributeInRings(container, images) {
        const centerX = 400;
        const centerY = 400;
        const numRings = Math.min(5, Math.ceil(images.length / 8));
        const maxRadius = 350;
        const imageSize = 80; // Uniform size for all images

        images.forEach((memory, index) => {
            const ring = Math.floor(index / 8);
            const positionInRing = index % 8;
            const imagesInRing = Math.min(8, images.length - ring * 8);
            const radius = ((ring + 1) / (numRings + 1)) * maxRadius;
            const angle = (positionInRing / imagesInRing) * Math.PI * 2;

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const imageElement = this.createImageElement(memory, x, y, imageSize);
            container.appendChild(imageElement);
        });
    },

    /**
     * Create image element positioned in ring
     */
    createImageElement(memory, x, y, size) {
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
            container.style.transform = 'scale(1.15)';
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
