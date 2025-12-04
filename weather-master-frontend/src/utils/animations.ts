import { gsap } from 'gsap';

/**
 * Fade in element with optional scale
 */
export const fadeIn = (
    element: HTMLElement | null,
    duration: number = 0.6,
    delay: number = 0
) => {
    if (!element) return;

    gsap.fromTo(
        element,
        { opacity: 0, scale: 0.95 },
        {
            opacity: 1,
            scale: 1,
            duration,
            delay,
            ease: 'power2.out',
        }
    );
};

/**
 * Slide in from direction
 */
export const slideIn = (
    element: HTMLElement | null,
    direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom',
    duration: number = 0.6,
    delay: number = 0
) => {
    if (!element) return;

    const directions = {
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        top: { x: 0, y: -50 },
        bottom: { x: 0, y: 50 },
    };

    const { x, y } = directions[direction];

    gsap.fromTo(
        element,
        { opacity: 0, x, y },
        {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
        }
    );
};

/**
 * Stagger animation for multiple elements
 */
export const staggerIn = (
    elements: HTMLElement[] | NodeListOf<Element>,
    duration: number = 0.5,
    stagger: number = 0.1,
    delay: number = 0
) => {
    if (!elements || elements.length === 0) return;

    gsap.fromTo(
        elements,
        { opacity: 0, y: 30, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            stagger,
            delay,
            ease: 'power2.out',
        }
    );
};

/**
 * Scale animation on hover (for interactive elements)
 */
export const scaleOnHover = (element: HTMLElement | null) => {
    if (!element) return;

    element.addEventListener('mouseenter', () => {
        gsap.to(element, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
};

/**
 * Rotate element (for icons)
 */
export const rotateIcon = (
    element: HTMLElement | null,
    rotation: number = 180,
    duration: number = 0.5
) => {
    if (!element) return;

    gsap.to(element, {
        rotation,
        duration,
        ease: 'power2.inOut',
    });
};

/**
 * Progress bar animation
 */
export const animateProgressBar = (
    element: HTMLElement | null,
    targetWidth: string,
    duration: number = 1
) => {
    if (!element) return;

    gsap.fromTo(
        element,
        { width: '0%' },
        {
            width: targetWidth,
            duration,
            ease: 'power2.out',
        }
    );
};

/**
 * Page entrance animation sequence
 */
export const pageEntranceSequence = (elements: {
    title?: HTMLElement | null;
    subtitle?: HTMLElement | null;
    searchBar?: HTMLElement | null;
}) => {
    const { title, subtitle, searchBar } = elements;

    if (title) {
        gsap.fromTo(
            title,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
    }

    if (subtitle) {
        fadeIn(subtitle, 0.6, 0.4);
    }

    if (searchBar) {
        gsap.fromTo(
            searchBar,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: 'back.out(1.2)' }
        );
    }
};
