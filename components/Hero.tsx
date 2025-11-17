"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";
import AnimatedName from "./AnimatedName";
import AnimatedBackground from "./AnimatedBackground";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-9 relative" ref={ref}>
      <AnimatedBackground />
      <motion.div
        className="max-w-[1200px] w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div variants={itemVariants} className="space-y-8">
          <AnimatedName />

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-display text-text/80"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            Full Stack Software Engineer
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-text/70 max-w-2xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          >
           "I don't know, but I'll figure it out."
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.9 }}
          >
            <motion.a
              href="#about"
              className="px-8 py-4 text-white rounded-lg font-medium text-lg"
              style={{ backgroundColor: 'rgb(190, 49, 68)' }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgb(210, 69, 88)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 text-text rounded-lg font-medium text-lg"
              style={{ borderColor: 'rgba(217, 217, 217, 0.3)' }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgb(190, 49, 68)',
                color: 'rgb(190, 49, 68)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
