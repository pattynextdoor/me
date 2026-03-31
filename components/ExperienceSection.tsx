"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { cascadeContainer, fadeScaleIn, rowHover } from "@/lib/animations";

// Experience: 4 animated rows, starts after Header's 3 items (0.24s offset)
const experienceContainer = cascadeContainer(0.24);

// Official Azure "A" logo with gradient (matches Paper design)
function AzureLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="az-a" x1="58.97" y1="12.28" x2="30.59" y2="84.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#114A8B" />
          <stop offset="1" stopColor="#0669BC" />
        </linearGradient>
        <linearGradient id="az-b" x1="60" y1="52" x2="53" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopOpacity="0.3" />
          <stop offset="0.07" stopOpacity="0.2" />
          <stop offset="0.32" stopOpacity="0.1" />
          <stop offset="0.62" stopOpacity="0.05" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="az-c" x1="50" y1="10" x2="60" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3CCBF4" />
          <stop offset="1" stopColor="#2892DF" />
        </linearGradient>
      </defs>
      <path d="M33.34 6.54h26.04L32.37 86.45a4.15 4.15 0 0 1-3.93 2.83H8.15a4.15 4.15 0 0 1-3.93-5.47L29.4 9.37a4.15 4.15 0 0 1 3.94-2.83z" fill="url(#az-a)" />
      <path d="M71.17 60.26H41.29a1.91 1.91 0 0 0-1.3 3.31l26.53 24.76a4.17 4.17 0 0 0 2.85 1.12h23.59L71.17 60.26z" fill="url(#az-c)" />
      <path d="M33.34 6.54a4.12 4.12 0 0 0-3.94 2.88L4.25 84.32a4.14 4.14 0 0 0 3.91 5.5h20.79a4.44 4.44 0 0 0 3.41-2.9l5.01-14.78 17.91 16.71a4.24 4.24 0 0 0 2.67.97h23.62L62.29 60.26H37.59L53.23 6.54H33.34z" fill="url(#az-b)" />
      <path d="M66.6 9.37a4.14 4.14 0 0 0-3.93-2.83H33.65a4.15 4.15 0 0 1 3.93 2.83l25.18 74.44a4.15 4.15 0 0 1-3.93 5.47h29.02a4.15 4.15 0 0 0 3.93-5.47L66.6 9.37z" fill="url(#az-c)" />
    </svg>
  );
}


// Logo renderer - handles both image and component logos
function LogoImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} />;
}

interface ExperienceItem {
  company: string;
  title: string;
  dates: string;
  brandColor: string;
  logo: "guild" | "azure" | "amazon" | "esri";
  href?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Guild",
    title: "Senior Software Engineer",
    dates: "2026 - Present",
    brandColor: "#E8722A",
    logo: "guild",
    href: "https://guild.com",
  },
  {
    company: "Microsoft Azure",
    title: "Software Engineer II",
    dates: "2021 - 2025",
    brandColor: "#0078D4",
    logo: "azure",
    href: "https://azure.microsoft.com",
  },
  {
    company: "Amazon",
    title: "SDE I",
    dates: "2019 - 2021",
    brandColor: "#FF9900",
    logo: "amazon",
    href: "https://amazon.com",
  },
  {
    company: "Esri",
    title: "Technical SEO Intern",
    dates: "2018",
    brandColor: "#007AC2",
    logo: "esri",
    href: "https://esri.com",
  },
];

function CompanyLogo({ logo, brandColor }: { logo: ExperienceItem["logo"]; brandColor: string }) {
  const cls = "w-5 h-5 flex-shrink-0 mt-[2px]";
  switch (logo) {
    case "guild":
      return <LogoImage src="/logos/guild.png" alt="Guild logo" className={`${cls} rounded-sm`} />;
    case "azure":
      return <AzureLogo className={cls} />;
    case "amazon":
      return <LogoImage src="/logos/amazon.svg" alt="Amazon logo" className={cls} />;
    case "esri":
      return <Globe className={cls} color={brandColor} strokeWidth={1.5} />;
  }
}

function ExperienceRow({ item }: { item: ExperienceItem }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 py-4 -mx-3 px-3 rounded-md cursor-pointer"
      variants={fadeScaleIn}
      whileHover={rowHover}
    >
      <CompanyLogo logo={item.logo} brandColor={item.brandColor} />

      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-primary block">
          {item.company}
        </span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span
            className="text-[13px] leading-none"
            style={{ color: item.brandColor }}
            aria-hidden="true"
          >
            &#x2234;
          </span>
          <span className="text-[13px] text-secondary">
            {item.title}
          </span>
        </div>
      </div>

      <span className="text-xs text-tertiary flex-shrink-0 tabular-nums mt-[2px]">
        {item.dates}
      </span>
    </motion.a>
  );
}

export default function ExperienceSection() {
  return (
    <motion.section
      className="py-6"
      variants={experienceContainer}
    >
      <div className="w-full h-px bg-border mb-6" />
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
