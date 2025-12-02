/**
 * DRIFT.JS - Drift View (Full Implementation)
 *
 * Features:
 * - Gravity well clustering (8-12 attraction points)
 * - 10% wandering images (not clustered)
 * - Momentum/inertia physics
 * - Controlled overlap (minimum spacing)
 * - Pan in all directions
 * - Smooth 60fps performance
 */

const DriftView = {
    container: null,
    canvas: null,

    // Pan state
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,

    // Momentum state
    velocityX: 0,
    velocityY: 0,
    lastX: 0,
    lastY: 0,
    momentumRAF: null,

    // Canvas dimensions
    canvasWidth: 0,
    canvasHeight: 0,

    // Gravity wells
    gravityWells: [],

    /**
     * Initialize Drift view
     */
    init() {
        console.log('[DriftView] Initializing full implementation...');
        this.container = DOM.select('#viewContainer');

        // Calculate canvas size
        this.canvasWidth = window.innerWidth * 5;
        this.canvasHeight = window.innerHeight * 5;

        // Generate gravity wells
        this.generateGravityWells();

        // Render
        this.render();

        // Attach event listeners
        this.attachEventListeners();

        console.log('[DriftView] Initialized with', this.gravityWells.length, 'gravity wells');
    },

    /**
     * Generate gravity well positions (8-12 attraction points)
     */
    generateGravityWells() {
        const numWells = MathUtils.randomInt(8, 12);
        this.gravityWells = [];

        const padding = 300;
        const minDistance = 400; // Minimum distance between wells

        for (let i = 0; i < numWells; i++) {
            let attempts = 0;
            let x, y;
            let valid = false;

            // Find position that doesn't overlap with existing wells
            while (!valid && attempts < 50) {
                x = MathUtils.random(padding, this.canvasWidth - padding);
                y = MathUtils.random(padding, this.canvasHeight - padding);

                // Check distance from other wells
                valid = this.gravityWells.every(well => {
                    const dist = MathUtils.distance(x, y, well.x, well.y);
                    return dist >= minDistance;
                });

                attempts++;
            }

            if (valid) {
                this.gravityWells.push({
                    x: x,
                    y: y,
                    strength: MathUtils.random(0.7, 1.0), // Attraction strength
                    radius: MathUtils.random(200, 400) // Influence radius
                });
            }
        }

        console.log(`[DriftView] Generated ${this.gravityWells.length} gravity wells`);
    },

    /**
     * Attach event listeners for pan and momentum
     */
    attachEventListeners() {
        const viewContainer = this.container;

        // Mouse down - start dragging
        viewContainer.addEventListener('mousedown', (e) => {
            // Don't start drag if clicking on an image
            if (e.target.tagName === 'IMG' || e.target.classList.contains('memory-image-container')) {
                return;
            }

            this.isDragging = true;
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.lastX = e.pageX;
            this.lastY = e.pageY;
            this.scrollLeft = viewContainer.scrollLeft;
            this.scrollTop = viewContainer.scrollTop;
            this.velocityX = 0;
            this.velocityY = 0;

            // Stop any existing momentum
            if (this.momentumRAF) {
                cancelAnimationFrame(this.momentumRAF);
                this.momentumRAF = null;
            }

            viewContainer.style.cursor = 'grabbing';
        });

        // Mouse leave - stop dragging but apply momentum
        viewContainer.addEventListener('mouseleave', () => {
            if (this.isDragging) {
                this.isDragging = false;
                viewContainer.style.cursor = 'grab';
                this.startMomentum();
            }
        });

        // Mouse up - stop dragging and apply momentum
        viewContainer.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                viewContainer.style.cursor = 'grab';
                this.startMomentum();
            }
        });

        // Mouse move - pan and track velocity
        viewContainer.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();

            const x = e.pageX;
            const y = e.pageY;

            // Calculate velocity for momentum
            this.velocityX = x - this.lastX;
            this.velocityY = y - this.lastY;

            // Pan the view
            const walkX = (x - this.startX);
            const walkY = (y - this.startY);
            viewContainer.scrollLeft = this.scrollLeft - walkX;
            viewContainer.scrollTop = this.scrollTop - walkY;

            this.lastX = x;
            this.lastY = y;
        });

        // Touch support
        viewContainer.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'IMG' || e.target.classList.contains('memory-image-container')) {
                return;
            }

            this.isDragging = true;
            const touch = e.touches[0];
            this.startX = touch.pageX;
            this.startY = touch.pageY;
            this.lastX = touch.pageX;
            this.lastY = touch.pageY;
            this.scrollLeft = viewContainer.scrollLeft;
            this.scrollTop = viewContainer.scrollTop;
            this.velocityX = 0;
            this.velocityY = 0;

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

            const touch = e.touches[0];
            const x = touch.pageX;
            const y = touch.pageY;

            this.velocityX = x - this.lastX;
            this.velocityY = y - this.lastY;

            const walkX = (x - this.startX);
            const walkY = (y - this.startY);
            viewContainer.scrollLeft = this.scrollLeft - walkX;
            viewContainer.scrollTop = this.scrollTop - walkY;

            this.lastX = x;
            this.lastY = y;
        });
    },

    /**
     * Start momentum/inertia animation
     */
    startMomentum() {
        const viewContainer = this.container;
        const friction = 0.95; // Friction coefficient
        const stopThreshold = 0.1;

        const animate = () => {
            // Apply friction
            this.velocityX = MathUtils.applyFriction(this.velocityX, friction);
            this.velocityY = MathUtils.applyFriction(this.velocityY, friction);

            // Apply velocity to scroll
            viewContainer.scrollLeft -= this.velocityX;
            viewContainer.scrollTop -= this.velocityY;

            // Continue if still moving
            if (!MathUtils.isStopped(this.velocityX, stopThreshold) ||
                !MathUtils.isStopped(this.velocityY, stopThreshold)) {
                this.momentumRAF = requestAnimationFrame(animate);
            } else {
                this.momentumRAF = null;
            }
        };

        // Only start if there's significant velocity
        if (Math.abs(this.velocityX) > stopThreshold || Math.abs(this.velocityY) > stopThreshold) {
            this.momentumRAF = requestAnimationFrame(animate);
        }
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

        // Create large canvas
        const canvas = DOM.create('div', {
            style: `
                width: ${this.canvasWidth}px;
                height: ${this.canvasHeight}px;
                position: relative;
                background-color: var(--color-bg);
            `
        });

        // Position images with gravity wells and controlled overlap
        const positions = this.calculateImagePositions(AppState.filteredImages);

        // Create image elements
        positions.forEach(({ memory, x, y, size }) => {
            const container = this.createImageContainer(memory, x, y, size);
            canvas.appendChild(container);
        });

        this.container.appendChild(canvas);

        // Center the view
        this.container.scrollLeft = (this.canvasWidth - this.container.offsetWidth) / 2;
        this.container.scrollTop = (this.canvasHeight - this.container.offsetHeight) / 2;
    },

    /**
     * Calculate image positions using gravity wells
     */
    calculateImagePositions(images) {
        const positions = [];
        const imageSize = 150;
        const minSpacing = 20; // Minimum spacing between image centers

        // Determine which images are wanderers (10%)
        const numWanderers = Math.floor(images.length * 0.1);
        const wandererIndices = new Set();
        while (wandererIndices.size < numWanderers && wandererIndices.size < images.length) {
            wandererIndices.add(MathUtils.randomInt(0, images.length - 1));
        }

        images.forEach((memory, index) => {
            const isWanderer = wandererIndices.has(index);
            let x, y;
            let attempts = 0;
            let valid = false;

            while (!valid && attempts < 100) {
                if (isWanderer) {
                    // Wanderers go anywhere
                    x = MathUtils.random(100, this.canvasWidth - imageSize - 100);
                    y = MathUtils.random(100, this.canvasHeight - imageSize - 100);
                } else {
                    // Attracted to nearest gravity well
                    const well = this.gravityWells[index % this.gravityWells.length];

                    // Random position within well's radius
                    const angle = MathUtils.random(0, Math.PI * 2);
                    const distance = MathUtils.random(0, well.radius) * well.strength;

                    x = well.x + Math.cos(angle) * distance;
                    y = well.y + Math.sin(angle) * distance;

                    // Keep within bounds
                    x = MathUtils.clamp(x, 100, this.canvasWidth - imageSize - 100);
                    y = MathUtils.clamp(y, 100, this.canvasHeight - imageSize - 100);
                }

                // Check spacing from other images (controlled overlap)
                valid = positions.every(pos => {
                    const dist = MathUtils.distance(x, y, pos.x, pos.y);
                    return dist >= minSpacing;
                });

                attempts++;
            }

            // If we couldn't find valid position, use it anyway (rare)
            if (!valid && attempts >= 100) {
                console.warn(`[DriftView] Could not find valid position for image ${memory.id}`);
            }

            positions.push({
                memory,
                x,
                y,
                size: imageSize,
                isWanderer
            });
        });

        return positions;
    },

    /**
     * Create image container at specific position
     */
    createImageContainer(memory, x, y, size) {
        const container = DOM.create('div', {
            className: 'memory-image-container',
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
        // Cancel any ongoing momentum animation
        if (this.momentumRAF) {
            cancelAnimationFrame(this.momentumRAF);
            this.momentumRAF = null;
        }

        DOM.empty(this.container);
        this.container.style.overflow = 'hidden';
        this.container.style.cursor = 'default';

        // Clear state
        this.gravityWells = [];
        this.velocityX = 0;
        this.velocityY = 0;
    }
};
