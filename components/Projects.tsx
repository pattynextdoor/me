"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInVariants } from "@/lib/animations";

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  background: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  blurb?: string;
}

const projects: Project[] = [
  {
    id: "stocking-fish",
    name: "Stocking Fish",
    tagline: "Your virtual aquarium planner",
    description:
      "An intelligent stocking calculator that helps aquarists design balanced freshwater communities with real-time stocking levels, compatibility checks, and water parameter guidance.",
    tags: [
      "React",
      "TypeScript",
      "Supabase",
      "Clerk",
    ],
    background: "#f8f9fa",
    href: "https://stocking.fish",
    image: "/stocking-fish-preview.mp4",
    imageAlt: "Stocking Fish application interface",
    blurb:
      "Stocking Fish turns years of aquarium obsession into a friendly tool that helps hobbyists plan healthy, beautiful freshwater tanks before adding a single fish.",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const Wrapper: React.ElementType = project.href ? motion.a : motion.div;

  return (
    <motion.article
      ref={ref}
      className="group relative z-10"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="py-12 grid md:grid-cols-12 gap-8 md:gap-12 items-stretch">
        {/* Meta */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="text-sm font-mono text-gray-500">01</div>
          <p className="text-sm text-gray-600 max-w-xs">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="chip"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Project focus: ${tag}`}
              >
                <span className="chip-dot" />
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Visual card */}
        <div className="md:col-span-8">
          <Wrapper
            href={project.href}
            className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8E6DD] focus-visible:ring-[#0EA5E9] rounded-2xl"
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
          >
            <div
              className="relative h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300"
              style={{
                background: project.background,
              }}
            >
              {project.image ? (
                <div className="relative w-full h-full">
                  {project.image.endsWith('.mp4') ? (
                    <video
                      src={project.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-top"
                      aria-label={project.imageAlt ?? `${project.name} interface preview`}
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.imageAlt ?? `${project.name} interface screenshot`}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                  {/* Subtle overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Project title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <p className="text-xs font-medium tracking-[0.2em] text-white/60 uppercase mb-2">
                      Selected Project
                    </p>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-base md:text-lg text-white/90 max-w-md">
                      {project.tagline}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full px-8 md:px-12">
                  <div className="space-y-4">
                    <p className="text-xs font-medium tracking-[0.25em] text-gray-500 uppercase">
                      Selected Project
                    </p>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Wrapper>
        </div>
      </div>

      {/* Divider */}
      <div className="relative w-full h-px bg-gray-300" />
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-28 px-4 md:px-8 lg:px-9 relative overflow-hidden bg-[#E8E6DD]"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <div>
            <p className="text-sm font-medium text-gray-600 mb-4">
              A snapshot of work beyond production apps.
            </p>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900">
              Projects
            </h2>
          </div>
          {projects[0]?.blurb && (
            <p className="text-base md:text-lg text-gray-600 max-w-xl">
              {projects[0].blurb}
            </p>
          )}
        </motion.div>

        <div className="space-y-6 relative z-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
