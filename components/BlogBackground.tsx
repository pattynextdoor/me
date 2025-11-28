"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// Subtle scroll-reactive background for blog pages
export default function BlogBackground() {
  const { scrollYProgress } = useScroll();

  // Very subtle scroll response: small vertical shift + gentle opacity change
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]); // was -20%
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 0.95, 0.85]);

  return (
    <motion.div
      aria-hidden
      style={{ y, opacity }}
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,101,0,0.22)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(11,25,44,0.9)_0,_#000_75%)]"
    />
  );
}
