/**
 * DOM.JS - DOM Manipulation Utilities
 *
 * Helper functions for common DOM operations.
 * Keeps component code clean and DRY.
 */

const DOM = {
    /**
     * Select single element
     * @param {String} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {Element|null}
     */
    select(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Select all elements
     * @param {String} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {Array} Array of elements
     */
    selectAll(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    },

    /**
     * Create element with attributes and children
     * @param {String} tag - HTML tag name
     * @param {Object} attrs - Attributes object
     * @param {Array|String} children - Child elements or text
     * @returns {Element}
     */
    create(tag, attrs = {}, children = []) {
        const element = document.createElement(tag);

        // Set attributes
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else if (key.startsWith('on') && typeof value === 'function') {
                const eventName = key.substring(2).toLowerCase();
                element.addEventListener(eventName, value);
            } else {
                element.setAttribute(key, value);
            }
        });

        // Append children
        if (typeof children === 'string') {
            element.textContent = children;
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else if (child instanceof Element) {
                    element.appendChild(child);
                }
            });
        }

        return element;
    },

    /**
     * Add class to element
     * @param {Element} element
     * @param {String} className
     */
    addClass(element, className) {
        if (element) element.classList.add(className);
    },

    /**
     * Remove class from element
     * @param {Element} element
     * @param {String} className
     */
    removeClass(element, className) {
        if (element) element.classList.remove(className);
    },

    /**
     * Toggle class on element
     * @param {Element} element
     * @param {String} className
     */
    toggleClass(element, className) {
        if (element) element.classList.toggle(className);
    },

    /**
     * Show element (add 'active' class)
     * @param {Element} element
     */
    show(element) {
        if (element) {
            element.classList.add('active');
            element.setAttribute('aria-hidden', 'false');
        }
    },

    /**
     * Hide element (remove 'active' class)
     * @param {Element} element
     */
    hide(element) {
        if (element) {
            element.classList.remove('active');
            element.setAttribute('aria-hidden', 'true');
        }
    },

    /**
     * Remove all children from element
     * @param {Element} element
     */
    empty(element) {
        if (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    },

    /**
     * Set element's text content
     * @param {Element} element
     * @param {String} text
     */
    setText(element, text) {
        if (element) element.textContent = text;
    },

    /**
     * Set element's HTML content
     * @param {Element} element
     * @param {String} html
     */
    setHTML(element, html) {
        if (element) element.innerHTML = html;
    },

    /**
     * Get element's position relative to viewport
     * @param {Element} element
     * @returns {Object} { x, y, width, height }
     */
    getPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
        };
    }
};
