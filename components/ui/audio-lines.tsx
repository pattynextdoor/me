"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AudioLinesHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AudioLinesProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const makeLineVariants = (delay: number): Variants => ({
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.4,
      delay,
      opacity: { duration: 0.1, delay },
    },
  },
});

const AudioLinesIcon = forwardRef<AudioLinesHandle, AudioLinesProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path animate={controls} d="M2 10v3" variants={makeLineVariants(0)} />
          <motion.path animate={controls} d="M6 6v11" variants={makeLineVariants(0.08)} />
          <motion.path animate={controls} d="M10 3v18" variants={makeLineVariants(0.16)} />
          <motion.path animate={controls} d="M14 8v7" variants={makeLineVariants(0.24)} />
          <motion.path animate={controls} d="M18 5v13" variants={makeLineVariants(0.32)} />
          <motion.path animate={controls} d="M22 10v3" variants={makeLineVariants(0.4)} />
        </svg>
      </div>
    );
  }
);

AudioLinesIcon.displayName = "AudioLinesIcon";

export { AudioLinesIcon };
