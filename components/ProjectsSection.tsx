"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeScaleIn, rowHover } from "@/lib/animations";

import { CompassIcon } from "@/components/ui/compass";
import { FileStackIcon } from "@/components/ui/file-stack";
import { TerminalIcon } from "@/components/ui/terminal";
import { BrainIcon } from "@/components/ui/brain";
import { SparklesIcon } from "@/components/ui/sparkles";
import { ZapIcon } from "@/components/ui/zap";
import { FishSymbolIcon } from "@/components/ui/fish-symbol";
import { BotIcon } from "@/components/ui/bot";

interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ProjectItem {
  name: string;
  description: string;
  color: string;
  href?: string;
  Icon: React.ForwardRefExoticComponent<any>;
}

const projects: ProjectItem[] = [
  {
    name: "tp",
    description: "Teleport anywhere in or between projects. My rendition of zoxide.",
    color: "#3B82F6",
    Icon: CompassIcon,
    href: "https://github.com/ptumbucon/tp",
  },
  {
    name: "ditto",
    description: "A personal dotfile manager that supports hooks. My rendition of GNU Stow.",
    color: "#8B5CF6",
    Icon: FileStackIcon,
    href: "https://github.com/ptumbucon/ditto",
  },
  {
    name: "uberfetch",
    description: "Arcane shapes in your terminal! My rendition of neofetch.",
    color: "#F97316",
    Icon: TerminalIcon,
    href: "https://github.com/ptumbucon/uberfetch",
  },
  {
    name: "Conclave",
    description: "Digs through your meetings and arcanely visualizes connections between them.",
    color: "#06B6D4",
    Icon: BrainIcon,
  },
  {
    name: "Vex Dashboard",
    description: "WebGL-powered singularity dashboard for my Openclaw agent.",
    color: "#EC4899",
    Icon: SparklesIcon,
  },
  {
    name: "MeetingMind",
    description: "Obsidian plugin that turns messy transcripts into linked notes and action items.",
    color: "#22C55E",
    Icon: ZapIcon,
    href: "https://meetingmind.me",
  },
  {
    name: "Stocking Fish",
    description: "Modern webapp for planning aquarium livestocking. My rendition of aqadvisor.",
    color: "#14B8A6",
    Icon: FishSymbolIcon,
    href: "https://stocking.fish",
  },
  {
    name: "LFG Bot",
    description: "Discord bot for my FGC community. Slash commands for LFG and room threads.",
    color: "#EF4444",
    Icon: BotIcon,
  },
];

function ProjectRow({ item }: { item: ProjectItem }) {
  const iconRef = useRef<AnimatedIconHandle>(null);
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
      onHoverStart={() => iconRef.current?.startAnimation()}
      onHoverEnd={() => iconRef.current?.stopAnimation()}
    >
      <span className="flex-shrink-0" style={{ color: item.color }}>
        <item.Icon ref={iconRef} size={18} />
      </span>
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
