"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { staggerContainer, fadeScaleIn, rowHover } from "@/lib/animations";

interface ProjectItem {
  name: string;
  description: string;
  color: string;
  href?: string;
  icon: string;
}

const projects: ProjectItem[] = [
  {
    name: "tp",
    description: "Teleport anywhere in or between projects. My rendition of zoxide.",
    color: "#3B82F6",
    icon: "compass",
    href: "https://github.com/ptumbucon/tp",
  },
  {
    name: "ditto",
    description: "A personal dotfile manager that supports hooks. My rendition of GNU Stow.",
    color: "#8B5CF6",
    icon: "files",
    href: "https://github.com/ptumbucon/ditto",
  },
  {
    name: "uberfetch",
    description: "Arcane shapes in your terminal! My rendition of neofetch.",
    color: "#F97316",
    icon: "terminal",
    href: "https://github.com/ptumbucon/uberfetch",
  },
  {
    name: "Conclave",
    description: "Digs through your meetings and arcanely visualizes connections between them.",
    color: "#06B6D4",
    icon: "brain-circuit",
  },
  {
    name: "Vex Dashboard",
    description: "WebGL-powered singularity dashboard for my Openclaw agent.",
    color: "#EC4899",
    icon: "sparkles",
  },
  {
    name: "MeetingMind",
    description: "Obsidian plugin that turns messy transcripts into linked notes and action items.",
    color: "#22C55E",
    icon: "lightbulb",
    href: "https://meetingmind.me",
  },
  {
    name: "Stocking Fish",
    description: "Modern webapp for planning aquarium livestocking. My rendition of aqadvisor.",
    color: "#14B8A6",
    icon: "fish",
    href: "https://stocking.fish",
  },
  {
    name: "LFG Bot",
    description: "Discord bot for my FGC community. Slash commands for LFG and room threads.",
    color: "#EF4444",
    icon: "gamepad-2",
  },
];

function ProjectIcon({ color }: { color: string }) {
  return (
    <span
      className="w-4 h-4 flex items-center justify-center text-sm flex-shrink-0"
      style={{ color }}
      aria-hidden="true"
    >
      &#x2726;
    </span>
  );
}

function ProjectRow({ item }: { item: ProjectItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const Wrapper = item.href ? motion.a : motion.div;
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="flex items-center gap-3 py-2 -mx-3 px-3 rounded-md cursor-pointer"
      variants={fadeScaleIn}
      whileHover={rowHover}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ProjectIcon color={item.color} />
      <span className="text-[15px] font-medium text-primary flex-shrink-0">
        {item.name}
      </span>
      <span className="text-[14px] text-secondary truncate">
        {item.description}
      </span>
    </Wrapper>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      className="py-10"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <div className="w-full h-px bg-border mb-8" />
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-tertiary mb-4">
        Projects
      </h2>
      <div>
        {projects.map((item) => (
          <ProjectRow key={item.name} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
