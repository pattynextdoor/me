import type { Variants, Transition } from "framer-motion";

// Spring config for entrance animations
export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Stagger container for section entrance
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Factory for cascading stagger containers — each section starts after
// the previous one's children have begun appearing, creating a single
// top-to-bottom waterfall across the whole page.
export function cascadeContainer(delayOffset: number): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delayOffset,
        staggerChildren: 0.08,
      },
    },
  };
}

// Fade + slight scale entrance for individual items
export const fadeScaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

// Hover interaction for list rows
export const rowHover = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  x: 4,
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
};
