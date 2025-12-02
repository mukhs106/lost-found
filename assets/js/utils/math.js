/**
 * MATH.JS - Mathematical Utilities
 *
 * Helper functions for positioning, physics, and calculations.
 * Used primarily by Drift and Descent views.
 */

const MathUtils = {
    /**
     * Clamp value between min and max
     * @param {Number} value
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Linear interpolation
     * @param {Number} start
     * @param {Number} end
     * @param {Number} t - Progress (0-1)
     * @returns {Number}
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    },

    /**
     * Map value from one range to another
     * @param {Number} value
     * @param {Number} inMin
     * @param {Number} inMax
     * @param {Number} outMin
     * @param {Number} outMax
     * @returns {Number}
     */
    map(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },

    /**
     * Random number between min and max
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Random integer between min and max (inclusive)
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Calculate distance between two points
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Number}
     */
    distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Calculate angle between two points (in radians)
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Number}
     */
    angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },

    /**
     * Check if two rectangles overlap
     * @param {Object} rect1 - { x, y, width, height }
     * @param {Object} rect2 - { x, y, width, height }
     * @returns {Boolean}
     */
    rectsOverlap(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    },

    /**
     * Easing function - ease out cubic
     * @param {Number} t - Progress (0-1)
     * @returns {Number}
     */
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    },

    /**
     * Easing function - ease in out cubic
     * @param {Number} t - Progress (0-1)
     * @returns {Number}
     */
    easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    /**
     * Apply friction to velocity
     * @param {Number} velocity
     * @param {Number} friction - Friction coefficient (e.g., 0.95)
     * @returns {Number}
     */
    applyFriction(velocity, friction = 0.95) {
        return velocity * friction;
    },

    /**
     * Check if velocity is below threshold (essentially stopped)
     * @param {Number} velocity
     * @param {Number} threshold - Default 0.1
     * @returns {Boolean}
     */
    isStopped(velocity, threshold = 0.1) {
        return Math.abs(velocity) < threshold;
    },

    /**
     * Normalize vector
     * @param {Number} x
     * @param {Number} y
     * @returns {Object} { x, y }
     */
    normalize(x, y) {
        const length = Math.sqrt(x * x + y * y);
        if (length === 0) return { x: 0, y: 0 };
        return {
            x: x / length,
            y: y / length
        };
    },

    /**
     * Convert degrees to radians
     * @param {Number} degrees
     * @returns {Number}
     */
    degToRad(degrees) {
        return degrees * (Math.PI / 180);
    },

    /**
     * Convert radians to degrees
     * @param {Number} radians
     * @returns {Number}
     */
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    }
};
