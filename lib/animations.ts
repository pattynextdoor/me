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
  backgroundColor: "#111111",
  scale: 1.005,
  transition: { duration: 0.15 },
};
