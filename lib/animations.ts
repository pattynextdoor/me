// Reusable Framer Motion animation variants
import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0.001, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.44, 0, 0.56, 1] as const, // cubic-bezier from Inga Hampton
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.44, 0, 0.56, 1] as const,
    },
  },
};

export const navVariants = {
  top: {
    backgroundColor: "rgba(30, 30, 30, 0)",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    backdropFilter: "blur(10px)",
  },
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeInOut" },
};

export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1, ease: "easeInOut" },
};
