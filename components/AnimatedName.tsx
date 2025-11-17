"use client";

import { motion } from "framer-motion";

export default function AnimatedName() {
  // Letter animation variants (stagger each letter with slide up)
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.44, 0, 0.56, 1] as [number, number, number, number],
      },
    }),
  };

  const firstName = "Patrick".toUpperCase();
  const lastName = "Tumbucon".toUpperCase();
  const firstNameLetters = firstName.split("");
  const lastNameLetters = lastName.split("");

  return (
    <div className="relative">
      <motion.div
        className="relative inline-block"
        initial="hidden"
        animate="visible"
      >
        {/* First Name */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-signature font-bold leading-tight">
          {firstNameLetters.map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              custom={i}
              variants={letterVariants}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-text to-text/60"
              style={{
                fontFamily: "var(--font-signature)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Last Name */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-signature font-bold leading-tight">
          {lastNameLetters.map((letter, i) => (
            <motion.span
              key={`last-${i}`}
              custom={firstNameLetters.length + i}
              variants={letterVariants}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-text to-text/60"
              style={{
                fontFamily: "var(--font-signature)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Modern accent bar that grows from left to right */}
        <motion.div
          className="absolute -bottom-2 left-0 h-1 rounded-full"
          style={{ backgroundColor: 'rgb(190, 49, 68)' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1] as [number, number, number, number],
          }}
        />
      </motion.div>
    </div>
  );
}
