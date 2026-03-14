"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeScaleIn } from "@/lib/animations";

export default function Header() {
  return (
    <motion.header
      className="pt-16 pb-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeScaleIn} className="flex items-center justify-between mb-8">
        <h1 className="text-[36px] font-semibold tracking-[-0.04em] text-primary leading-none">
          Patrick Tumbucon
        </h1>
        <nav>
          <a
            href="/blog"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            Blog
          </a>
        </nav>
      </motion.div>

      <motion.p variants={fadeScaleIn} className="text-sm text-tertiary mb-6">
        Seattle, WA
      </motion.p>

      <motion.p
        variants={fadeScaleIn}
        className="text-sm leading-relaxed text-secondary max-w-[480px]"
      >
        I build things that are useful to me. I enjoy thematic flair,
        delightful QoL, and shifting parts of a design in a bold direction.
      </motion.p>
    </motion.header>
  );
}
