# Portfolio Redesign

## Visual Foundation

**Theme:** Dark, Linear/Vercel-inspired.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0A0A0B` | Page background |
| Text primary | `#EDEDED` | Headings, names, project titles |
| Text secondary | `#888888` | Descriptions, bio, roles |
| Text tertiary | `#555555` | Dates, labels, meta |
| Border | `#1A1A1A` | Section dividers, subtle lines |
| Accent | Per-item | Company brand colors, project icon colors only |

**Typography:** System font stack. Hierarchy does all the work.

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Name (nav) | 18-20px | Semibold | Primary |
| Section labels | 14px | Semibold | Tertiary, uppercase, tracked |
| Bio | 16px | Regular | Secondary |
| List items | 15px | Medium | Primary (name), Secondary (description) |
| Meta (dates) | 14px | Regular | Tertiary |

**Layout:** Single column, max-width ~640px, centered. Generous vertical spacing. Horizontal rules as section dividers.

---

## Page Structure

### Navigation (sticky top)

Minimal bar, full-width with content constrained to ~640px center.

- Left: "Patrick Tumbucon" (text, links to top)
- Right: "Blog" + "GitHub" (text links)
- Subtle `border-bottom: 1px solid #1A1A1A`
- No hamburger menu needed at this content density

### Header

Directly below nav. No hero, no animation, no buttons.

```
Patrick Tumbucon
Seattle, WA

I build things that are useful to me. I enjoy thematic flair,
delightful QoL, and shifting parts of a design in a bold direction.
```

- Name: rendered in nav, not repeated as a large heading
- Location: 14px, tertiary color
- Bio: 16px, secondary color

### Experience

Section label: `EXPERIENCE` (14px, semibold, uppercase, tertiary, tracked)

Flat list. Each row:

```
[Brand-color logo]  Company · Title                    Date range
```

| Logo Color | Company | Title | Dates |
|------------|---------|-------|-------|
| Guild brand | Guild | Senior Software Engineer | 2026 - Present |
| Azure blue | Microsoft Azure | Software Engineer II | 2021 - 2025 |
| Amazon orange | Amazon | SDE I | 2019 - 2021 |
| Esri green | Esri | Technical SEO Intern | 2018 |

- Logo: ~20px, rendered in company's actual brand color
- Company + title: primary color, 15px
- Dates: right-aligned, tertiary color, 14px
- Rows separated by subtle borders or spacing

### Projects

Section label: `PROJECTS` (same style as Experience)

Flat list. Each row:

```
[Colored animated icon]  Project Name    One-line description
```

| Icon (lucide-animated) | Color | Project | Description |
|------------------------|-------|---------|-------------|
| `compass` / `navigation` | `#3B82F6` (blue) | tp | Teleport anywhere in or between projects. My rendition of zoxide. |
| `files` / `copy` | `#8B5CF6` (violet) | ditto | A personal dotfile manager that supports hooks. My rendition of GNU Stow. |
| `terminal` | `#F97316` (orange) | uberfetch | Arcane shapes in your terminal! My rendition of neofetch. |
| `brain-circuit` / `network` | `#06B6D4` (cyan) | Conclave | Digs through your meetings and arcanely visualizes connections between them. |
| `sparkles` | `#EC4899` (pink) | Vex Dashboard | WebGL-powered singularity dashboard for my Openclaw agent. |
| `lightbulb` | `#22C55E` (green) | MeetingMind | Obsidian plugin that turns messy transcripts into linked notes and action items. |
| `fish` | `#14B8A6` (teal) | Stocking Fish | Modern webapp for planning aquarium livestocking. My rendition of aqadvisor. |
| `gamepad-2` / `swords` | `#EF4444` (red) | LFG Bot | Discord bot for my FGC community. Slash commands for LFG and room threads. |

- Icons animate on hover (lucide-animated default behavior)
- Project name: primary color, 15px, medium weight
- Description: secondary color, 14px
- Each row links to repo or live site

### Footer

Separated by top border.

- Social links: GitHub, LinkedIn, Email (text links, secondary color)
- Version/commit hash (tertiary color, small) -- Alex Carpenter-style developer touch

---

## Animation UX

### Page Load: Staggered Entrance

Sections animate in sequentially top-to-bottom on load (~100ms stagger between sections).

**Entrance animation:** Fade in + slight scale (opacity 0 -> 1, scale 0.98 -> 1.0). Elements materialize into place.

### Scroll: Sections Animate In

Sections below the fold use the same fade+scale entrance, triggered once when they enter the viewport. Each section only animates once (no replay on re-entry).

### Hover Interactions

| Element | Hover behavior |
|---------|---------------|
| Experience/project rows | Subtle background shift (`#0A0A0B` -> `#111111`) + very slight scale (~1.005-1.01) |
| Lucide-animated icons | Play icon animation (built-in behavior) |
| Nav links, footer links | Simple underline appears |

### Timing & Easing

- **Curve:** Spring physics with subtle overshoot. Playful, things have weight.
- **Framer Motion spring config:** `{ stiffness: 300, damping: 20 }` (or similar -- tunable)
- **Stagger delay:** ~100ms between sections on load
- **Hover transitions:** ~150ms for background/scale shifts

### Background Texture

Two layers that work together:

**Layer 1: Film grain (CSS)**
- Static noise overlay across the entire page
- ~8-10% opacity
- CSS-based (no canvas needed), using a small tiled noise image or SVG filter

**Layer 2: Ink bleed (WebGL/Canvas)**
- Dark-on-dark splotches that slowly bloom outward and dissolve, like ink dropped in water
- Very slow lifecycle: each bleed takes ~8-15 seconds to expand and fade
- 2-3 bleeds active at any given time, random positions
- ~8-10% opacity, barely distinguishable from the background
- The grain layer warps subtly in bleed areas, like heat distortion -- the texture is alive but you can't quite tell why
- **Scroll-aware:** Effect intensifies slightly or shifts as the user scrolls, like moving through layers of atmosphere. Scroll position influences bleed spawn rate, drift direction, or distortion intensity.
- Colors: slightly lighter or slightly cooler than `#0A0A0B` -- not colored, just tonal variation in the dark

**Performance:** Must be lightweight. Target <5% GPU usage. Use requestAnimationFrame with throttling. Pause when tab is not visible.

### What's Removed

- Canvas particle background (AnimatedBackground)
- 3D card tilt effect (mouse/gyroscope parallax)
- Scroll-based 3D flip animation (Experience section rotateX)
- Per-paragraph staggered fade-ins
- Chip hover animations
- Button scale animations

---

## Technical Notes

- **Framework:** Next.js (keep existing)
- **Styling:** Tailwind CSS (keep existing, update theme tokens)
- **Animation:** Framer Motion (keep, but drastically reduced usage -- entrance animations + hover only)
- **Icons (projects):** `lucide-animated` -- installed via shadcn pattern (`pnpm dlx shadcn add @lucide-animated/{icon-name}`)
- **Icons (experience):** Company SVG logos or simple icon components in brand colors
- **Fonts:** System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- **Blog:** Keep existing blog route and functionality
- **Remove:** AnimatedBackground, AnimatedName, 3D tilt logic, scroll-based flip, chip components, react-icons

## Design Inspirations

- [linear.app](https://linear.app) -- Dark palette, refined spacing, subtle color moments
- [alexcarpenter.me](https://alexcarpenter.me) -- Typography-driven, single column, resume structure, version in footer
- [antfu.me](https://antfu.me) -- Project list format, conversational bio
- [vercel.com](https://vercel.com) -- Near-black background, clean type hierarchy
