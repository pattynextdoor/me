"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeScaleIn, rowHover } from "@/lib/animations";

import { ZapIcon } from "@/components/ui/zap";
import { FileStackIcon } from "@/components/ui/file-stack";
import { TerminalIcon } from "@/components/ui/terminal";
import { BrainIcon } from "@/components/ui/brain";
import { SparklesIcon } from "@/components/ui/sparkles";
import { AudioLinesIcon } from "@/components/ui/audio-lines";
import { BookTextIcon } from "@/components/ui/book-text";
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
    name: "toph",
    description: "Terminal dashboard that monitors AI coding agents in real-time. btop for AI.",
    color: "#10B981",
    Icon: TerminalIcon,
    href: "https://patricktumbucon.com/toph",
  },
  {
    name: "tp",
    description: "Teleport anywhere in or between projects. My rendition of zoxide.",
    color: "#FACC15",
    Icon: ZapIcon,
    href: "https://github.com/pattynextdoor/tp",
  },
  {
    name: "ditto",
    description: "A personal dotfile manager that supports hooks. My rendition of GNU Stow.",
    color: "#8B5CF6",
    Icon: FileStackIcon,
    href: "https://github.com/pattynextdoor/ditto",
  },
  {
    name: "uberfetch",
    description: "Arcane shapes in your terminal! My rendition of neofetch.",
    color: "#F97316",
    Icon: SparklesIcon,
    href: "https://github.com/pattynextdoor/uberfetch",
  },
  {
    name: "Conclave",
    description: "Digs through your meetings and arcanely visualizes connections between them.",
    color: "#06B6D4",
    Icon: BrainIcon,
    href: "https://useconclave.com",
  },
  {
    name: "Vex Dashboard",
    description: "WebGL-powered singularity dashboard for my Openclaw agent.",
    color: "#EC4899",
    Icon: AudioLinesIcon,
    href: "https://github.com/pattynextdoor/vex-dashboard",
  },
  {
    name: "MeetingMind",
    description: "Obsidian plugin that turns messy transcripts into linked notes and action items.",
    color: "#22C55E",
    Icon: BookTextIcon,
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
    href: "https://github.com/pattynextdoor/lfg-bot",
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
      className="flex items-start gap-3 py-3 -mx-3 px-3 rounded-md cursor-pointer"
      variants={fadeScaleIn}
      whileHover={rowHover}
      onHoverStart={() => iconRef.current?.startAnimation()}
      onHoverEnd={() => iconRef.current?.stopAnimation()}
    >
      <span className="flex-shrink-0 mt-[2px]" style={{ color: item.color }}>
        <item.Icon ref={iconRef} size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-primary block">
          {item.name}
        </span>
        <span className="text-[13px] text-secondary mt-0.5 block">
          {item.description}
        </span>
      </div>
    </Wrapper>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      className="py-6"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <div className="w-full h-px bg-border mb-6" />
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
