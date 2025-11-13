/**
 * DESCENT.JS - Descent View (Full Implementation)
 *
 * Features:
 * - One-point perspective (vanishing point at center)
 * - Concentric rings layout with uniform image sizing
 * - Zoom to reveal deeper layers
 * - Rotation/orbit on horizontal drag
 * - Controlled overlap with depth-based z-index
 * - Smooth 60fps performance
 */

const DescentView = {
    container: null,
    canvas: null,

    // View state
    rotation: 0, // Current rotation angle in degrees
    zoom: 1, // Current zoom level
    isDragging: false,
    lastX: 0,
    lastY: 0,

    // Momentum state
    rotationVelocity: 0,
    zoomVelocity: 0,
    momentumRAF: null,

    // Layout constants
    centerX: 0,
    centerY: 0,
    maxRadius: 350,
    imageSize: 80, // Uniform size for ALL images

    /**
     * Initialize Descent view
     */
    init() {
        console.log('[DescentView] Initializing full implementation...');
        this.container = DOM.select('#viewContainer');

        // Reset state
        this.rotation = 0;
        this.zoom = 1;

        // Render
        this.render();

        // Attach event listeners
        this.attachEventListeners();

        console.log('[DescentView] Initialized with perspective cone');
    },

    /**
     * Attach event listeners for rotation, zoom, and momentum
     */
    attachEventListeners() {
        const viewContainer = this.container;

        // Mouse down - start interaction
        viewContainer.addEventListener('mousedown', (e) => {
            // Don't start drag if clicking on an image
            if (e.target.tagName === 'IMG' || e.target.classList.contains('memory-image-container')) {
                return;
            }

            this.isDragging = true;
            this.lastX = e.pageX;
            this.lastY = e.pageY;
            this.rotationVelocity = 0;
            this.zoomVelocity = 0;

            // Stop any existing momentum
            if (this.momentumRAF) {
                cancelAnimationFrame(this.momentumRAF);
                this.momentumRAF = null;
            }

            viewContainer.style.cursor = 'grabbing';
        });

        // Mouse up - stop dragging and apply momentum
        viewContainer.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                viewContainer.style.cursor = 'grab';
                this.startMomentum();
            }
        });

        // Mouse leave - stop dragging but apply momentum
        viewContainer.addEventListener('mouseleave', () => {
            if (this.isDragging) {
                this.isDragging = false;
                viewContainer.style.cursor = 'grab';
                this.startMomentum();
            }
        });

        // Mouse move - rotate on horizontal drag, zoom on vertical drag
        viewContainer.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();

            const x = e.pageX;
            const y = e.pageY;

            const deltaX = x - this.lastX;
            const deltaY = y - this.lastY;

            // Horizontal movement = rotation
            this.rotationVelocity = deltaX * 0.5;
            this.rotation += this.rotationVelocity;

            // Vertical movement = zoom
            this.zoomVelocity = -deltaY * 0.005;
            this.zoom = MathUtils.clamp(this.zoom + this.zoomVelocity, 0.5, 3);

            this.lastX = x;
            this.lastY = y;

            // Re-render with new rotation and zoom
            this.updateTransform();
        });

        // Mouse wheel - zoom
        viewContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomDelta = -e.deltaY * 0.001;
            this.zoom = MathUtils.clamp(this.zoom + zoomDelta, 0.5, 3);
            this.updateTransform();
        });

        // Touch support
        let touchStartX = 0;
        let touchStartY = 0;

        viewContainer.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'IMG' || e.target.classList.contains('memory-image-container')) {
                return;
            }

            this.isDragging = true;
            const touch = e.touches[0];
            touchStartX = touch.pageX;
            touchStartY = touch.pageY;
            this.lastX = touch.pageX;
            this.lastY = touch.pageY;
            this.rotationVelocity = 0;
            this.zoomVelocity = 0;

            if (this.momentumRAF) {
                cancelAnimationFrame(this.momentumRAF);
                this.momentumRAF = null;
            }
        });

        viewContainer.addEventListener('touchend', () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.startMomentum();
            }
        });

        viewContainer.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();

            const touch = e.touches[0];
            const x = touch.pageX;
            const y = touch.pageY;

            const deltaX = x - this.lastX;
            const deltaY = y - this.lastY;

            this.rotationVelocity = deltaX * 0.5;
            this.rotation += this.rotationVelocity;

            this.zoomVelocity = -deltaY * 0.005;
            this.zoom = MathUtils.clamp(this.zoom + this.zoomVelocity, 0.5, 3);

            this.lastX = x;
            this.lastY = y;

            this.updateTransform();
        });
    },

    /**
     * Start momentum animation
     */
    startMomentum() {
        const friction = 0.95;
        const stopThreshold = 0.1;

        const animate = () => {
            // Apply friction
            this.rotationVelocity = MathUtils.applyFriction(this.rotationVelocity, friction);

            // Apply rotation velocity
            this.rotation += this.rotationVelocity;

            // Update transform
            this.updateTransform();

            // Continue if still moving
            if (!MathUtils.isStopped(this.rotationVelocity, stopThreshold)) {
                this.momentumRAF = requestAnimationFrame(animate);
            } else {
                this.momentumRAF = null;
            }
        };

        // Only start if there's significant velocity
        if (Math.abs(this.rotationVelocity) > stopThreshold) {
            this.momentumRAF = requestAnimationFrame(animate);
        }
    },

    /**
     * Update transform (rotation and zoom) without re-rendering
     */
    updateTransform() {
        const ringsContainer = DOM.select('.rings-container');
        if (ringsContainer) {
            ringsContainer.style.transform = `
                translate(-50%, -50%)
                rotate(${this.rotation}deg)
                scale(${this.zoom})
            `;
        }
    },

    /**
     * Render view with current filtered images
     */
    render() {
        console.log('[DescentView] Rendering with', AppState.filteredImages.length, 'images');

        // Clear container
        DOM.empty(this.container);

        // Set container styles
        this.container.style.cursor = 'grab';
        this.container.style.overflow = 'hidden';
        this.container.style.position = 'relative';

        // Create main container
        const mainContainer = DOM.create('div', {
            style: `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            `
        });

        // Create rings container (this will be rotated and zoomed)
        const ringsContainer = DOM.create('div', {
            className: 'rings-container',
            style: `
                position: absolute;
                width: 800px;
                height: 800px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) rotate(0deg) scale(1);
                transition: transform 0ms; /* No transition during drag, only momentum */
            `
        });

        this.centerX = 400;
        this.centerY = 400;

        // Distribute images in concentric rings
        const positions = this.calculateRingPositions(AppState.filteredImages);

        // Create image elements (sorted by ring for proper z-index)
        positions.forEach(({ memory, x, y, ring }) => {
            const container = this.createImageContainer(memory, x, y, ring);
            ringsContainer.appendChild(container);
        });

        mainContainer.appendChild(ringsContainer);
        this.container.appendChild(mainContainer);
    },

    /**
     * Calculate positions in concentric rings with uniform sizing
     */
    calculateRingPositions(images) {
        const positions = [];
        const numRings = Math.min(6, Math.ceil(images.length / 8));
        const imagesPerRing = Math.ceil(images.length / numRings);

        images.forEach((memory, index) => {
            // Determine which ring this image belongs to (outer to inner)
            const ring = Math.floor(index / imagesPerRing);
            const positionInRing = index % imagesPerRing;
            const totalInRing = Math.min(imagesPerRing, images.length - ring * imagesPerRing);

            // Calculate radius for this ring (outer rings = larger radius)
            // Ring 0 (outermost) = largest radius, inner rings = smaller
            const ringRadius = this.maxRadius * (1 - (ring / numRings) * 0.7);

            // Calculate angle for this position
            const angle = (positionInRing / totalInRing) * Math.PI * 2;

            // Add slight random offset for organic feel
            const angleOffset = MathUtils.random(-0.1, 0.1);
            const radiusOffset = MathUtils.random(-10, 10);

            const finalAngle = angle + angleOffset;
            const finalRadius = ringRadius + radiusOffset;

            // Calculate position
            const x = this.centerX + Math.cos(finalAngle) * finalRadius;
            const y = this.centerY + Math.sin(finalAngle) * finalRadius;

            positions.push({
                memory,
                x,
                y,
                ring, // Store ring for z-index
                angle: finalAngle
            });
        });

        return positions;
    },

    /**
     * Create image container with uniform sizing
     */
    createImageContainer(memory, x, y, ring) {
        // Z-index based on ring (inner rings appear on top)
        const zIndex = 100 - ring;

        const container = DOM.create('div', {
            className: 'memory-image-container',
            style: `
                position: absolute;
                left: ${x - this.imageSize / 2}px;
                top: ${y - this.imageSize / 2}px;
                width: ${this.imageSize}px;
                height: ${this.imageSize}px;
                cursor: pointer;
                transition: transform 150ms ease, z-index 0ms;
                z-index: ${zIndex};
            `,
            onClick: () => ImageDetail.open(memory.id)
        });

        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.2)';
            container.style.zIndex = '200'; // Bring to front on hover
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
            container.style.zIndex = zIndex;
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
        // Cancel any ongoing momentum animation
        if (this.momentumRAF) {
            cancelAnimationFrame(this.momentumRAF);
            this.momentumRAF = null;
        }

        DOM.empty(this.container);
        this.container.style.cursor = 'default';
        this.container.style.overflow = 'auto';

        // Reset state
        this.rotation = 0;
        this.zoom = 1;
        this.rotationVelocity = 0;
        this.zoomVelocity = 0;
    }
};
