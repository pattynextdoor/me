# Personal Portfolio - Patrick Tumbucon

A modern, animated portfolio website built with Next.js, TypeScript, and Framer Motion.

## Features

- **Glass-morphism Navigation** - Sticky header with frosted glass effect on scroll
- **Animated Gradient Background** - Smooth, continuously animating background
- **Scroll Animations** - Beautiful fade-in and stagger effects using Framer Motion
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Theme** - High-contrast color scheme with coral accents
- **Performance Optimized** - Next.js font optimization and image handling

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Inter](https://fonts.google.com/specimen/Inter) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) - Typography

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

> Tip: If you prefer npm scripts, `npm run dev` is an alias for the same command.

### Build

```bash
npx next build
npx next start
```

> Tip: If you prefer npm scripts, `npm run build && npm start` does the same.

## Customization

### Update Personal Information

Edit the following files to personalize the site:

- **Navigation links**: [components/Navigation.tsx](components/Navigation.tsx)
- **Hero section**: [components/Hero.tsx](components/Hero.tsx)
- **About content**: [components/About.tsx](components/About.tsx)
- **Experience timeline**: [components/Experience.tsx](components/Experience.tsx)
- **Contact links**: [components/Contact.tsx](components/Contact.tsx)

### Color Scheme

Modify the color palette in [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  primary: "#1E1E1E",    // Background
  text: "#D9D9D9",       // Text color
  accent: "#FF5948",     // Coral accent
  secondary: "#4d65ff",  // Blue accent
  dark: "#101011",       // Darker background
  border: "#222222",     // Border color
}
```

### Animation Settings

Customize animation variants in [lib/animations.ts](lib/animations.ts).

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── AnimatedBackground.tsx
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   └── Contact.tsx
├── lib/
│   └── animations.ts       # Framer Motion variants
└── public/                 # Static assets
```

## Design Inspiration

This portfolio draws inspiration from:
- Function Health - Glass-morphism navigation
- Inga Hampton - Animated gradients
- Telkom-OT - Color schemes and animations
- Astra Lab - Layout and structure

## License

MIT
