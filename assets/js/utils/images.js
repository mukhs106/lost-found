/**
 * IMAGES.JS - Image Loading & Management Utilities
 *
 * Handles image loading, lazy loading, and caching.
 * Ensures SVGs are loaded efficiently and aspect ratios are preserved.
 */

const ImageUtils = {
    // Cache for loaded images
    cache: new Map(),

    // Base path for images
    basePath: 'assets/images/',

    /**
     * Load image and cache it
     * @param {String} filename - Image filename
     * @returns {Promise<String>} Image URL
     */
    async load(filename) {
        const url = this.basePath + filename;

        // Return from cache if already loaded
        if (this.cache.has(filename)) {
            return this.cache.get(filename);
        }

        // Load image
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.cache.set(filename, url);
                resolve(url);
            };
            img.onerror = () => {
                console.error(`[ImageUtils] Failed to load: ${filename}`);
                reject(new Error(`Failed to load ${filename}`));
            };
            img.src = url;
        });
    },

    /**
     * Preload multiple images
     * @param {Array<String>} filenames - Array of filenames
     * @returns {Promise<Array>} Array of URLs
     */
    async preloadMultiple(filenames) {
        return Promise.all(filenames.map(filename => this.load(filename)));
    },

    /**
     * Get image URL (synchronous, assumes already loaded)
     * @param {String} filename
     * @returns {String} URL
     */
    getUrl(filename) {
        return this.basePath + filename;
    },

    /**
     * Create image element with proper attributes
     * @param {Object} memory - Memory object from data
     * @param {Object} options - { width, height, className }
     * @returns {Element} Image element
     */
    createImageElement(memory, options = {}) {
        const img = DOM.create('img', {
            src: this.getUrl(memory.filename),
            alt: memory.title,
            className: options.className || 'memory-image',
            dataset: {
                id: memory.id
            }
        });

        if (options.width) img.style.width = options.width + 'px';
        if (options.height) img.style.height = options.height + 'px';

        return img;
    },

    /**
     * Create image container (for absolute positioning)
     * @param {Object} memory - Memory object
     * @param {Object} position - { x, y, width, height, zIndex }
     * @param {Function} onClick - Click handler
     * @returns {Element} Container div
     */
    createImageContainer(memory, position, onClick) {
        const container = DOM.create('div', {
            className: 'memory-image',
            style: `
                left: ${position.x}px;
                top: ${position.y}px;
                width: ${position.width}px;
                height: ${position.height}px;
                z-index: ${position.zIndex || 1};
            `,
            dataset: {
                id: memory.id
            },
            onClick: () => onClick(memory.id)
        });

        const img = DOM.create('img', {
            src: this.getUrl(memory.filename),
            alt: memory.title
        });

        container.appendChild(img);
        return container;
    },

    /**
     * Lazy load images in viewport
     * Uses Intersection Observer for performance
     * @param {Array<Element>} images - Array of image elements
     */
    lazyLoad(images) {
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before entering viewport
        });

        images.forEach(img => observer.observe(img));
    },

    /**
     * Get natural aspect ratio of an image
     * @param {String} filename
     * @returns {Promise<Number>} Aspect ratio (width/height)
     */
    async getAspectRatio(filename) {
        const url = this.getUrl(filename);
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const ratio = img.naturalWidth / img.naturalHeight;
                resolve(ratio);
            };
            img.onerror = () => {
                // Default to 4:3 if load fails
                resolve(4 / 3);
            };
            img.src = url;
        });
    },

    /**
     * Clear cache (useful for memory management)
     */
    clearCache() {
        this.cache.clear();
        console.log('[ImageUtils] Cache cleared');
    }
};
