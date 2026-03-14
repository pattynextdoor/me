# Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the portfolio site as a dark, typography-driven single-column page inspired by Linear/Vercel/Alex Carpenter, using Geist Mono throughout, with animated project icons and subtle background texture.

**Architecture:** Single-column layout (~640px max-width, centered) on a near-black background (#0C0C0E). Framer Motion for entrance animations (fade+scale) and hover interactions only. Film grain CSS overlay + ink bleed canvas for atmospheric background. Blog routes preserved as-is with updated theme tokens.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion 12, Geist Mono font, lucide-animated icons

---

### Task 1: Install New Dependencies and Remove Unused Ones

**Files:**
- Modify: `package.json`

**Step 1: Install geist font package**

Run: `cd /Users/patty/dev/me && bun add geist`

**Step 2: Remove unused dependencies**

Run: `bun remove react-icons gsap`

**Step 3: Install lucide-animated icons**

We need 8 animated icons for the projects section. Install them via the shadcn pattern:

Run:
```bash
cd /Users/patty/dev/me
bunx shadcn@latest add "https://lucide-animated.com/c/compass"
bunx shadcn@latest add "https://lucide-animated.com/c/files"
bunx shadcn@latest add "https://lucide-animated.com/c/terminal"
bunx shadcn@latest add "https://lucide-animated.com/c/brain-circuit"
bunx shadcn@latest add "https://lucide-animated.com/c/sparkles"
bunx shadcn@latest add "https://lucide-animated.com/c/lightbulb"
bunx shadcn@latest add "https://lucide-animated.com/c/fish"
bunx shadcn@latest add "https://lucide-animated.com/c/gamepad-2"
```

Note: shadcn may prompt to create a `components.json` or similar config. Accept defaults. If the shadcn pattern doesn't work for lucide-animated, check https://lucide-animated.com for the correct install instructions and adapt.

**Step 4: Verify installation**

Run: `bun run build`
Expected: Build succeeds (may have warnings about unused imports in old components -- that's fine, we'll remove them soon).

**Step 5: Commit**

```bash
git add package.json bun.lockb components/ui
git commit -m "🔧 chore: swap dependencies for redesign

Add geist font, lucide-animated icons. Remove react-icons, gsap."
```

---

### Task 2: Update Fonts in Layout

**Why:** Replace Space Grotesk, Oxanium, and JetBrains Mono with Geist Mono as the single typeface for the entire site.

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Rewrite layout.tsx**

Replace the entire font setup. The `geist` package exports `GeistMono` from `geist/font/mono`.

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Patrick Tumbucon",
  description: "Personal portfolio of Patrick Tumbucon",
  keywords: ["Patrick Tumbucon", "Senior Software Engineer", "Full Stack Developer", "Portfolio"],
  metadataBase: new URL("https://patricktumbucon.com"),
  openGraph: {
    title: "Patrick Tumbucon - Software Engineer",
    description: "Patrick Tumbucon's personal website",
    url: "https://patricktumbucon.com",
    siteName: "Patrick Tumbucon",
    images: [
      {
        url: "/linkPreview.png",
        width: 1200,
        height: 630,
        alt: "Patrick Tumbucon - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Tumbucon - Software Engineer",
    description: "Personal website of Patrick Tumbucon, Software Engineer",
    images: ["/linkPreview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="font-mono bg-background text-primary antialiased">
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
```

Key changes:
- Single font import (`GeistMono`) replacing three fonts
- Removed `Navigation` component import (no more floating nav)
- Body uses `font-mono` (which will map to Geist Mono via the CSS variable)
- Body uses new color token class names (`bg-background text-primary`)

**Step 2: Verify the dev server starts**

Run: `bun run dev`
Expected: Page loads (will look broken because old components still reference removed fonts/colors -- that's expected).

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "🏗️ refactor(layout): replace fonts with Geist Mono

Single typeface for the entire site. Remove Navigation component
from layout (no more floating nav bar)."
```

---

### Task 3: Update Tailwind Theme Tokens and Global Styles

**Why:** Replace the old navy/maroon color palette with the new near-black/gray palette. Remove chip component styles (no longer used).

**Files:**
- Modify: `app/globals.css`

**Step 1: Rewrite globals.css**

```css
@import "tailwindcss";

@theme {
  --color-background: #0C0C0E;
  --color-primary: #EDEDED;
  --color-secondary: #888888;
  --color-tertiary: #555555;
  --color-border: #1A1A1A;
  --color-surface-hover: #111111;

  --font-family-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: rgba(237, 237, 237, 0.15);
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: var(--color-background);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-tertiary);
}
```

Key changes:
- New color tokens matching the design spec
- `--font-family-mono` set to use the Geist Mono CSS variable (injected by the `geist` package as `--font-geist-mono`)
- Removed chip component styles entirely
- Removed the catch-all `*` transition rule
- Added `::selection` styling

**Step 2: Verify**

Run: `bun run dev`
Expected: Dev server runs. Page background should now be near-black.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "🎨 style: update Tailwind theme to new dark palette

New color tokens: background (#0C0C0E), primary (#EDEDED),
secondary (#888888), tertiary (#555555), border (#1A1A1A).
Remove chip component styles."
```

---

### Task 4: Update Animation System

**Why:** Replace the old animation variants with a minimal spring-based system for entrance animations and hover interactions.

**Files:**
- Modify: `lib/animations.ts`

**Step 1: Rewrite animations.ts**

```ts
import type { Variants, Transition } from "framer-motion";

// Spring config for entrance animations
export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Stagger container for section entrance
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Fade + slight scale entrance for individual items
export const fadeScaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

// Hover interaction for list rows
export const rowHover = {
  backgroundColor: "#111111",
  scale: 1.005,
  transition: { duration: 0.15 },
};
```

**Step 2: Commit**

```bash
git add lib/animations.ts
git commit -m "♻️ refactor(animations): simplify to spring entrance + hover

Replace complex animation variants with minimal spring-based
system. Fade+scale entrance, stagger container, row hover."
```

---

### Task 5: Download Company Logos

**Why:** The experience section needs small brand-colored logos for each company. We'll use favicons/SVGs served locally.

**Files:**
- Create: `public/logos/guild.svg`
- Create: `public/logos/microsoft.svg`
- Create: `public/logos/amazon.svg`
- Create: `public/logos/esri.svg`

**Step 1: Create the logos directory**

Run: `mkdir -p /Users/patty/dev/me/public/logos`

**Step 2: Download or create simple SVG logos**

For each company, create a minimal SVG icon at ~20px display size. These should be simple, recognizable marks in the company's brand color.

- **Guild**: Use the favicon from guild.com or create a simple "G" mark. Brand color: use their actual brand color.
- **Microsoft Azure**: The Azure cross/cloud icon. Brand color: `#0078D4` (Azure blue).
- **Amazon**: The arrow/smile logo. Brand color: `#FF9900` (Amazon orange).
- **Esri**: The globe icon. Brand color: `#007AC2` (Esri teal/green).

Download favicons as a starting point:

Run:
```bash
cd /Users/patty/dev/me/public/logos
curl -L -o guild-favicon.png "https://guild.com/favicon.ico"
curl -L -o azure-favicon.png "https://azure.microsoft.com/favicon.ico"
curl -L -o amazon-favicon.png "https://www.amazon.com/favicon.ico"
```

Note: These may not work due to CDN restrictions. If downloads fail, create simple inline SVG components directly in the Experience component instead (colored circles with first letters, or use the `∴` symbol in brand colors as the only visual indicator). The `∴` approach is simpler and matches the design.

**Alternative approach (recommended):** Skip external logos entirely. Use the `∴` (therefore) symbol rendered in each company's brand color as the sole visual indicator. This is more "arcane" and distinctive, and avoids external asset dependencies.

**Step 3: Commit**

```bash
git add public/logos/
git commit -m "✨ feat: add company logo assets for experience section"
```

If using the `∴` approach instead, skip this task entirely -- the symbols will be inline in the Experience component.

---

### Task 6: Build the New Home Page Structure

**Why:** Replace the current multi-section page with the new single-column layout. This creates the shell that subsequent tasks will fill in.

**Files:**
- Modify: `app/page.tsx`
- Create: `components/Header.tsx`
- Create: `components/ExperienceSection.tsx`
- Create: `components/ProjectsSection.tsx`
- Create: `components/Footer.tsx`

**Step 1: Create Header component**

Create `components/Header.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeScaleIn } from "@/lib/animations";

export default function Header() {
  return (
    <motion.header
      className="pt-16 pb-12"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeScaleIn} className="flex items-center justify-between mb-8">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-primary">
          Patrick Tumbucon
        </h1>
        <nav className="flex items-center gap-6">
          <a
            href="/blog"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            Blog
          </a>
          <a
            href="https://github.com/ptumbucon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            GitHub
          </a>
        </nav>
      </motion.div>

      <motion.p variants={fadeScaleIn} className="text-sm text-tertiary mb-6">
        Seattle, WA
      </motion.p>

      <motion.p
        variants={fadeScaleIn}
        className="text-[15px] leading-relaxed text-secondary max-w-[480px]"
      >
        I build things that are useful to me. I enjoy thematic flair,
        delightful QoL, and shifting parts of a design in a bold direction.
      </motion.p>
    </motion.header>
  );
}
```

**Step 2: Create ExperienceSection component**

Create `components/ExperienceSection.tsx`:

```tsx
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
      {/* Brand-colored therefore symbol */}
      <span
        className="text-base leading-[1.4] flex-shrink-0 mt-[1px]"
        style={{ color: item.brandColor }}
        aria-hidden="true"
      >
        ∴
      </span>

      {/* Company + Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-medium text-primary">
            {item.company}
          </span>
          <span className="text-tertiary text-[13px]">·</span>
          <span className="text-[14px] text-secondary">
            {item.title}
          </span>
        </div>
      </div>

      {/* Dates */}
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
```

**Step 3: Create ProjectsSection component**

Create `components/ProjectsSection.tsx`:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { staggerContainer, fadeScaleIn, rowHover } from "@/lib/animations";

interface ProjectItem {
  name: string;
  description: string;
  color: string;
  href?: string;
  icon: string; // lucide-animated component name
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

// Dynamic icon import component
// lucide-animated icons are installed to components/ui/ via shadcn
// Each icon exports an AnimatedIcon component
function ProjectIcon({ name, color }: { name: string; color: string }) {
  // Fallback: colored circle with first letter
  // Replace this with actual lucide-animated imports once installed
  return (
    <span
      className="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-sm flex-shrink-0"
      style={{ color }}
    >
      {name === "compass" && "⊕"}
      {name === "files" && "⊞"}
      {name === "terminal" && ">_"}
      {name === "brain-circuit" && "⊛"}
      {name === "sparkles" && "✦"}
      {name === "lightbulb" && "◉"}
      {name === "fish" && "◈"}
      {name === "gamepad-2" && "⊠"}
    </span>
  );
}

function ProjectRow({ item }: { item: ProjectItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const Wrapper = item.href ? motion.a : motion.div;
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="flex items-start gap-3 py-2 -mx-3 px-3 rounded-md cursor-pointer"
      variants={fadeScaleIn}
      whileHover={rowHover}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Colored icon */}
      <div className="mt-[2px]">
        <ProjectIcon name={item.icon} color={item.color} />
      </div>

      {/* Name */}
      <span className="text-[15px] font-medium text-primary flex-shrink-0">
        {item.name}
      </span>

      {/* Description */}
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
```

Note: The `ProjectIcon` component uses Unicode fallbacks. Once lucide-animated icons are installed (Task 1), replace this with actual animated icon imports. The exact import pattern depends on how lucide-animated installs -- likely as React components in `components/ui/`.

**Step 4: Create Footer component**

Create `components/Footer.tsx`:

```tsx
import { headers } from "next/headers";

async function getCommitHash(): Promise<string> {
  return process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev";
}

export default async function Footer() {
  const commitHash = await getCommitHash();

  return (
    <footer className="py-10">
      <div className="w-full h-px bg-border mb-8" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ptumbucon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ptumbucon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ptumbucon@gmail.com"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            Email
          </a>
        </div>
        <span className="text-xs text-tertiary tabular-nums">
          {commitHash}
        </span>
      </div>
    </footer>
  );
}
```

Note: Footer is a Server Component (no "use client" directive) since it just reads an env var. The `VERCEL_GIT_COMMIT_SHA` is automatically available in Vercel deployments. Locally it will show "dev".

**Step 5: Rewrite page.tsx**

```tsx
import Header from "@/components/Header";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-w-[640px] mx-auto px-6">
      <Header />
      <ExperienceSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
```

**Step 6: Verify**

Run: `bun run dev`
Expected: Page renders with the new single-column layout. Name, bio, experience list, projects list, and footer all visible. Animations play on load/scroll.

**Step 7: Commit**

```bash
git add app/page.tsx components/Header.tsx components/ExperienceSection.tsx components/ProjectsSection.tsx components/Footer.tsx
git commit -m "✨ feat: build new single-column portfolio layout

New components: Header, ExperienceSection, ProjectsSection, Footer.
Single-column ~640px layout. Minimal typography-driven design."
```

---

### Task 7: Integrate Lucide-Animated Icons

**Why:** Replace the Unicode fallback icons in ProjectsSection with actual animated lucide icons that play on hover.

**Files:**
- Modify: `components/ProjectsSection.tsx`

**Step 1: Check what lucide-animated installed**

Run: `ls /Users/patty/dev/me/components/ui/`

This should show the installed lucide-animated icon components. Note the exact file names and export patterns.

**Step 2: Update ProjectIcon component**

Replace the `ProjectIcon` function in `components/ProjectsSection.tsx` with imports of the actual lucide-animated components. The exact code depends on how they installed, but it will look something like:

```tsx
import { Compass } from "@/components/ui/compass";
import { Files } from "@/components/ui/files";
import { Terminal } from "@/components/ui/terminal";
import { BrainCircuit } from "@/components/ui/brain-circuit";
import { Sparkles } from "@/components/ui/sparkles";
import { Lightbulb } from "@/components/ui/lightbulb";
import { Fish } from "@/components/ui/fish";
import { Gamepad2 } from "@/components/ui/gamepad-2";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  compass: Compass,
  files: Files,
  terminal: Terminal,
  "brain-circuit": BrainCircuit,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  fish: Fish,
  "gamepad-2": Gamepad2,
};

function ProjectIcon({ name, color, animate }: { name: string; color: string; animate?: boolean }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />;
}
```

Adapt import paths and props based on the actual installed components. lucide-animated icons typically accept an `animate` or `isAnimating` prop to trigger the animation on hover.

**Step 3: Wire up hover animation**

In `ProjectRow`, pass the `isHovered` state to `ProjectIcon` to trigger the icon animation:

```tsx
<ProjectIcon name={item.icon} color={item.color} animate={isHovered} />
```

**Step 4: Verify**

Run: `bun run dev`
Expected: Project rows show colored animated icons. Icons animate when hovered.

**Step 5: Commit**

```bash
git add components/ProjectsSection.tsx
git commit -m "✨ feat(projects): integrate lucide-animated icons

Replace Unicode fallbacks with actual animated icons.
Icons animate on row hover."
```

---

### Task 8: Remove Old Components

**Why:** Clean up the codebase by removing components that are no longer used.

**Files:**
- Delete: `components/Navigation.tsx`
- Delete: `components/Hero.tsx`
- Delete: `components/AnimatedName.tsx`
- Delete: `components/AnimatedBackground.tsx`
- Delete: `components/About.tsx`
- Delete: `components/Experience.tsx`
- Delete: `components/Projects.tsx`
- Delete: `components/Contact.tsx`
- Delete: `components/BlogBackground.tsx`

**Step 1: Remove old component files**

Run:
```bash
cd /Users/patty/dev/me
rm components/Navigation.tsx components/Hero.tsx components/AnimatedName.tsx components/AnimatedBackground.tsx components/About.tsx components/Experience.tsx components/Projects.tsx components/Contact.tsx components/BlogBackground.tsx
```

**Step 2: Verify no remaining imports reference these files**

Run: `grep -r "from.*components/\(Navigation\|Hero\|AnimatedName\|AnimatedBackground\|About\|Experience\|Projects\|Contact\|BlogBackground\)" --include="*.tsx" --include="*.ts" app/ components/ lib/`

Expected: No results (all references should already be removed from earlier tasks). If any remain, update those files.

**Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "🔥 refactor: remove old portfolio components

Remove Navigation, Hero, AnimatedName, AnimatedBackground,
About, Experience, Projects, Contact, BlogBackground."
```

---

### Task 9: Update Blog Styling

**Why:** Blog pages reference old color tokens (`text-text`, `bg-dark`, `border-border`, `font-display`) that no longer exist. Update to new tokens.

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `components/MDXComponents.tsx`
- Modify: `components/PostCard.tsx`

**Step 1: Update blog index page**

In `app/blog/page.tsx`, update class names:
- `text-text/70` -> `text-secondary`

```tsx
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing, notes, and case studies.",
};

export default async function BlogIndex() {
  const { isEnabled } = await draftMode();
  const posts = getAllPosts({ includeDrafts: isEnabled });

  return (
    <section className="max-w-[640px] mx-auto px-6 pt-20 pb-16">
      <a
        href="/"
        className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4 mb-8 inline-block"
      >
        &larr; Back
      </a>
      <h1 className="text-2xl font-semibold mb-6">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-secondary">No posts yet.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}
```

**Step 2: Update blog post page**

In `app/blog/[slug]/page.tsx`, replace old token references:
- `font-display` -> remove (Geist Mono is the only font now)
- `text-text` -> `text-primary`
- `text-text/60` -> `text-tertiary`
- `border-border/40` -> `border-border`
- `bg-dark/40` -> `bg-background`

```tsx
// In the return JSX, update the header section:
<section className="relative px-6 pt-20 pb-16">
  <article className="max-w-[640px] mx-auto space-y-8">
    <a
      href="/blog"
      className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4 mb-4 inline-block"
    >
      &larr; Blog
    </a>
    <header className="space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
        {frontmatter.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-tertiary">
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{Math.ceil(readingTime.minutes)} min read</span>
      </div>

      {frontmatter.coverImage && frontmatter.coverImage.startsWith("/") && (
        <div className="mt-6 overflow-hidden rounded-lg border border-border">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            width={1280}
            height={720}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}
    </header>

    {content}
  </article>
</section>
```

**Step 3: Update MDXComponents.tsx**

Replace all old token references in `components/MDXComponents.tsx`:
- `font-display` -> remove
- `text-text` -> `text-primary`
- `text-text/80` -> `text-secondary`
- `text-text/60` -> `text-tertiary`
- `border-border/60` -> `border-border`
- `bg-dark/60` -> `bg-surface-hover`
- `bg-dark/80` -> `bg-[#151517]`
- `text-accent` -> `text-primary underline`
- `decoration-accent/60` -> `decoration-tertiary`
- `decoration-accent` -> `decoration-primary`
- `font-mono` -> can remain (it's now the site font)

Update each component's className. The key replacements:

```tsx
// h1
"text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6"

// h2
"text-2xl md:text-3xl font-semibold text-primary mt-10 mb-4"

// h3
"text-xl md:text-2xl font-semibold text-primary mt-8 mb-3"

// p
"text-base leading-relaxed text-secondary"

// ul, ol
"list-disc list-outside ml-6 space-y-1 text-base leading-relaxed text-secondary"

// blockquote
"border-l-4 border-border pl-4 text-secondary italic"

// code (inline)
"text-sm bg-surface-hover border border-border rounded px-1.5 py-0.5"

// pre
"text-sm bg-[#151517] border border-border rounded-lg p-4 overflow-auto"

// hr
"my-10 border-t border-border"

// a (non-heading)
"text-primary underline underline-offset-2 decoration-tertiary hover:decoration-primary"

// img
"rounded-lg border border-border"
```

**Step 4: Read and update PostCard.tsx**

Read `components/PostCard.tsx` first, then update its color tokens similarly.

**Step 5: Verify**

Run: `bun run dev`
Navigate to `/blog` and a blog post. Expected: Blog pages render with the new dark theme, readable text, proper contrast.

**Step 6: Commit**

```bash
git add app/blog/ components/MDXComponents.tsx components/PostCard.tsx
git commit -m "💄 style(blog): update blog pages to new color tokens

Replace old text-text/bg-dark/font-display references with
new primary/secondary/tertiary/border tokens."
```

---

### Task 10: Background Texture - Film Grain

**Why:** Add a subtle CSS-based film grain overlay across the entire page for atmospheric texture.

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Add film grain CSS to globals.css**

Add this after the existing styles:

```css
/* Film grain overlay */
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
}

.grain-overlay::before {
  content: "";
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.08;
  pointer-events: none;
  z-index: 9999;
  animation: grain 8s steps(10) infinite;
}
```

**Step 2: Add grain-overlay class to body in layout.tsx**

Update the `<body>` tag:

```tsx
<body className="font-mono bg-background text-primary antialiased grain-overlay">
```

**Step 3: Verify**

Run: `bun run dev`
Expected: Subtle grain texture visible over the entire page. Should be barely noticeable (~8% opacity).

**Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "✨ feat: add film grain CSS overlay

Subtle animated noise texture at 8% opacity for atmospheric
depth. CSS-only, no canvas or WebGL needed."
```

---

### Task 11: Background Texture - Ink Bleed (Canvas)

**Why:** Add a scroll-aware ink bleed effect -- dark splotches that bloom and dissolve on the background. This is the "arcane" atmospheric element.

**Files:**
- Create: `components/InkBleed.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create InkBleed component**

Create `components/InkBleed.tsx`:

```tsx
"use client";

import { useEffect, useRef, useCallback } from "react";

interface Bleed {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  phase: "grow" | "dissolve";
  speed: number;
  born: number;
}

export default function InkBleed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bleedsRef = useRef<Bleed[]>([]);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);

  const createBleed = useCallback((width: number, height: number): Bleed => {
    return {
      x: Math.random() * width,
      y: Math.random() * height + scrollYRef.current,
      radius: 0,
      maxRadius: 80 + Math.random() * 120,
      opacity: 0,
      phase: "grow",
      speed: 0.3 + Math.random() * 0.4,
      born: Date.now(),
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Seed initial bleeds
    for (let i = 0; i < 2; i++) {
      bleedsRef.current.push(createBleed(canvas.width, canvas.height));
    }

    let lastFrame = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(animate);

      if (!isVisible) return;
      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bleeds = bleedsRef.current;

      // Spawn new bleeds if under cap
      if (bleeds.length < 3 && Math.random() < 0.005) {
        bleeds.push(createBleed(canvas.width, canvas.height));
      }

      for (let i = bleeds.length - 1; i >= 0; i--) {
        const b = bleeds[i];

        if (b.phase === "grow") {
          b.radius += b.speed;
          b.opacity = Math.min(0.08, b.opacity + 0.001);
          if (b.radius >= b.maxRadius) {
            b.phase = "dissolve";
          }
        } else {
          b.opacity -= 0.0008;
          b.radius += b.speed * 0.3;
          if (b.opacity <= 0) {
            bleeds.splice(i, 1);
            continue;
          }
        }

        // Scroll-relative Y position
        const drawY = b.y - scrollYRef.current;

        // Only draw if on screen
        if (drawY > -b.radius && drawY < canvas.height + b.radius) {
          const gradient = ctx.createRadialGradient(
            b.x, drawY, 0,
            b.x, drawY, b.radius
          );
          // Slightly lighter than bg for tonal variation
          gradient.addColorStop(0, `rgba(20, 20, 24, ${b.opacity})`);
          gradient.addColorStop(0.6, `rgba(16, 16, 20, ${b.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(12, 12, 14, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(b.x, drawY, b.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [createBleed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
```

**Step 2: Add InkBleed to layout.tsx**

Import and render InkBleed in the body, before `<main>`:

```tsx
import InkBleed from "@/components/InkBleed";

// In the body:
<body className="font-mono bg-background text-primary antialiased grain-overlay">
  <InkBleed />
  <main className="relative z-10">{children}</main>
  <Analytics />
</body>
```

The `z-10` on main ensures content renders above the ink bleed canvas.

**Step 3: Verify**

Run: `bun run dev`
Expected: Very subtle dark-on-dark splotches bloom and dissolve on the background. Effect is barely noticeable. Canvas pauses when tab is not visible.

**Step 4: Commit**

```bash
git add components/InkBleed.tsx app/layout.tsx
git commit -m "✨ feat: add ink bleed canvas background effect

Scroll-aware dark splotches that bloom and dissolve at ~8%
opacity. Throttled to 30fps, pauses when tab hidden."
```

---

### Task 12: Final Polish and Build Verification

**Files:**
- Possibly modify: various files for cleanup

**Step 1: Run lint**

Run: `bun run lint`
Expected: No errors. Fix any that appear.

**Step 2: Run production build**

Run: `bun run build`
Expected: Build succeeds with no errors.

**Step 3: Test in browser**

Run: `bun run dev`

Verify:
- [ ] Page loads with near-black background
- [ ] Geist Mono font renders for all text
- [ ] Header shows name (36px), location, bio
- [ ] "Blog" and "GitHub" links work in header
- [ ] Experience section shows 4 rows with `∴` symbols in brand colors
- [ ] Projects section shows 8 rows with colored icons
- [ ] Icons animate on hover (if lucide-animated integrated)
- [ ] Rows highlight on hover (subtle background shift)
- [ ] Footer shows GitHub, LinkedIn, Email links + commit hash
- [ ] Film grain visible but subtle
- [ ] Ink bleed splotches visible but subtle
- [ ] Page entrance animation plays (staggered fade+scale)
- [ ] Sections animate in on scroll
- [ ] Blog index page renders correctly
- [ ] Blog post pages render correctly with new theme
- [ ] Mobile layout works (single column naturally responsive)

**Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "💄 style: final polish and cleanup for redesign"
```

---

## Summary of File Changes

### New Files
- `components/Header.tsx`
- `components/ExperienceSection.tsx`
- `components/ProjectsSection.tsx`
- `components/Footer.tsx`
- `components/InkBleed.tsx`
- `public/logos/` (optional, only if using downloaded logos)

### Modified Files
- `package.json` (deps)
- `app/layout.tsx` (font, remove nav, add grain+inkbleed)
- `app/globals.css` (theme tokens, grain CSS)
- `app/page.tsx` (new layout)
- `lib/animations.ts` (simplified)
- `app/blog/page.tsx` (token updates)
- `app/blog/[slug]/page.tsx` (token updates)
- `components/MDXComponents.tsx` (token updates)
- `components/PostCard.tsx` (token updates)

### Deleted Files
- `components/Navigation.tsx`
- `components/Hero.tsx`
- `components/AnimatedName.tsx`
- `components/AnimatedBackground.tsx`
- `components/About.tsx`
- `components/Experience.tsx`
- `components/Projects.tsx`
- `components/Contact.tsx`
- `components/BlogBackground.tsx`
