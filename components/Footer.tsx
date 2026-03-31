"use client";

import { motion } from "framer-motion";
import { cascadeContainer, fadeScaleIn } from "@/lib/animations";

// Footer: 1 animated child, starts after Projects' 9 items end (~1.28s)
const footerContainer = cascadeContainer(1.28);

export default function Footer() {
  const commitHash = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev";

  return (
    <motion.footer
      className="py-6"
      variants={footerContainer}
    >
      <div className="w-full h-px bg-border mb-6" />
      <motion.div variants={fadeScaleIn} className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/pattynextdoor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/patricktumbucon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="mailto:patricktumbucon@gmail.com"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            Email
          </a>
        </div>
        <span className="text-xs text-tertiary tabular-nums">
          {commitHash}
        </span>
      </motion.div>
    </motion.footer>
  );
}
