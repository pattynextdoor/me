"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeScaleIn, rowHover } from "@/lib/animations";

interface ExperienceItem {
  company: string;
  title: string;
  dates: string;
  brandColor: string;
  href?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Guild",
    title: "Senior Software Engineer",
    dates: "2026 - Present",
    brandColor: "#2D6A4F",
    href: "https://guild.com",
  },
  {
    company: "Microsoft Azure",
    title: "Software Engineer II",
    dates: "2021 - 2025",
    brandColor: "#0078D4",
    href: "https://azure.microsoft.com",
  },
  {
    company: "Amazon",
    title: "SDE I",
    dates: "2019 - 2021",
    brandColor: "#FF9900",
    href: "https://amazon.com",
  },
  {
    company: "Esri",
    title: "Technical SEO Intern",
    dates: "2018",
    brandColor: "#007AC2",
    href: "https://esri.com",
  },
];

function ExperienceRow({ item }: { item: ExperienceItem }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 py-3 -mx-3 px-3 rounded-md cursor-pointer"
      variants={fadeScaleIn}
      whileHover={rowHover}
    >
      <span
        className="text-base leading-[1.4] flex-shrink-0 mt-[1px]"
        style={{ color: item.brandColor }}
        aria-hidden="true"
      >
        &#x2234;
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-medium text-primary">
            {item.company}
          </span>
          <span className="text-tertiary text-[13px]">&middot;</span>
          <span className="text-[14px] text-secondary">
            {item.title}
          </span>
        </div>
      </div>

      <span className="text-[13px] text-tertiary flex-shrink-0 tabular-nums">
        {item.dates}
      </span>
    </motion.a>
  );
}

export default function ExperienceSection() {
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
        Experience
      </h2>
      <div>
        {experiences.map((item) => (
          <ExperienceRow key={item.company} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
