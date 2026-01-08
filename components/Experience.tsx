"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { JSX, useRef } from "react";
import { fadeInVariants } from "@/lib/animations";
import { SiAmazon } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaGlobe } from "react-icons/fa";
import { ImLibrary } from "react-icons/im";

interface ExperienceItem {
  number: string;
  company: string;
  role: string;
  description: (string | JSX.Element)[];
  focusAreas: string[];
  icon: JSX.Element;
}

// Separate component for each experience item to properly use hooks
function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={itemRef}
      className="group relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative line */}
      <div className="absolute left-0 top-0 w-full h-px bg-border" />

      <div className="py-16 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Number */}
        <div className="md:col-span-2">
          <div className="text-sm font-mono text-text/60">{exp.number}</div>
        </div>

        {/* Content */}
        <div className="md:col-span-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Company & Role */}
            <div className="flex items-center gap-5 md:gap-6">
              <div
                className="text-text/70 flex-shrink-0 flex items-center justify-center leading-none"
                style={{
                  willChange: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {exp.icon}
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-text mb-2">
                  {exp.company}
                </h3>
                <p className="text-base text-text/70">{exp.role}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              {exp.description.map((paragraph, pIndex) => (
                <motion.p
                  key={pIndex}
                  className="text-text/80 text-base leading-relaxed max-w-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.3 + pIndex * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Focus Areas */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-sm font-medium text-text/60 mb-3 uppercase tracking-wide">
                Focus Areas
              </div>
              <div className="flex flex-wrap gap-2">
                {exp.focusAreas.map((area, aIndex) => (
                  <motion.span
                    key={area}
                    className="chip"
                    initial={{ opacity: 0, y: 6 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, delay: 0.45 + aIndex * 0.05 }}
                    aria-label={`Focus area: ${area}`}
                  >
                    <span className="chip-dot" />
                    {area}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const experiences: ExperienceItem[] = [
  {
    number: "2026",
    company: "Guild",
    role: "Senior Software Engineer - Full-Stack",
    description: [
      <>
        Starting February 2026, I'll be joining{" "}
        <a
          href="https://guild.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-medium underline hover:text-accent/80 transition-colors"
        >
          Guild
        </a>{" "}
        as a Senior Software Engineer, working in a full-stack capacity to help build solutions that enable career mobility for America's workforce.
      </>,
      <>
        I'm excited to bring my experience in distributed systems and cross-functional collaboration to Guild's mission of making education and career advancement accessible to working adults.
      </>,
    ],
    focusAreas: [
      "Full-Stack Development",
      "Distributed Systems",
      "Cross-functional Collaboration"
    ],
    icon: <ImLibrary size={40} />,
  },
  {
    number: "2021 - 2025",
    company: "Microsoft Azure",
    role: "Software Engineer II - Identity Governance",
    description: [
      "I've been building premium features across the stack to support Entra ID Admins with keeping their organizations secure. Identity Governance is the framework for managing and securing identities (whether user, app or agent) and their access to resources. My extended tenure in Identity has allowed me to form deep understandings of our Governance products and exercise my opinionated views in my work.",
      "This role has been a mix of deep technical work, cross-team collaboration, mentoring juniors and interns, and finding creative solutions to supporting new identities. "
    ],
    focusAreas: [
      "Cross-functional Leadership",
      "Distributed Systems",
      "Mentoring",
      "Azure",
      "React",
      "Typescript",
      "C#",
      "Scala"
    ],
    icon: <VscAzure size={40} />,
  },
  {
    number: "2019 - 2021",
    company: "Amazon.com",
    role: "Software Development Engineer I - Compliance",
    description: [
      "I built ML-powered systems which identified seller risk in support of EU anti-money laundering and counter terrorist financing initiatives. Doing so as a junior engineer under Amazon's scale was a challenge, but allowed me to develop good habits that I still apply through my career.",
      "One thing about starting your career at Amazon - you learn at the speed of light. 🧑‍🚀"
    ],
    focusAreas: [
      "Performance Optimization",
      "Distributed Systems",
      "Data Cleaning",
      "AWS",
      "DevOps",
      "Java",
      "Scala",
      "React",
      "Typescript",
      "Python"
    ],
    icon: <SiAmazon size={40} />,
  },
  {
    number: "2018",
    company: "Esri",
    role: "Technical SEO Intern",
    description: [
      <>
        I worked on optimizing SEO for many of{" "}
        <a
          href="https://esri.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-medium underline hover:text-accent/80 transition-colors"
        >
          Esri
        </a>
        's landing sites. Through following SEO best practices, I was able to collaborate with developers to implement structured data.
      </>,
      "This was a fun opportunity to dip my toes into working in an office for the first time."
    ],
    focusAreas: [
      "Technical SEO",
      "Structured Data",
      "Eating snacks"
    ],
    icon: <FaGlobe size={40} />,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Scroll-based animation for flip down effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });

  // Flip animation - rotates from -90deg (flipped up) to 0deg (normal)
  // Completes the flip in the first 75% of scroll progress
  const rotateX = useTransform(scrollYProgress, [0, 0.75], [-90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.75], [0, 0.5, 1]);

  // Y-axis translation to enhance 3D depth during flip
  const translateY = useTransform(scrollYProgress, [0, 0.4, 0.75], [100, -50, 0]);

  // Drop shadow that appears during flip for 3D depth
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.75], [0, 0.9, 0.4]);
  const shadowBlur = useTransform(scrollYProgress, [0, 0.4, 0.75], [0, 80, 40]);
  const shadowY = useTransform(scrollYProgress, [0, 0.4, 0.75], [0, 60, 25]);

  const boxShadow = useTransform(
    [shadowY, shadowBlur, shadowOpacity],
    ([y, blur, opacity]) => `0px ${y}px ${blur}px rgba(0, 0, 0, ${opacity})`
  );

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      style={{
        rotateX,
        translateY,
        opacity,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        transformOrigin: "top center",
        boxShadow,
      }}
      className="min-h-screen py-32 px-4 md:px-8 lg:px-9 relative overflow-hidden rounded-t-[40px] md:rounded-t-[60px] bg-dark"
    >
      <div className="max-w-[1400px] mx-auto w-full" ref={ref}>
        {/* Intro text */}
        <motion.div
          className="mb-20 relative z-10"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <p className="text-sm font-medium text-text/70 mb-6">
            Shipping solutions across the stack.
          </p>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-text">
            Experience
          </h2>
          <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[rgb(210,69,88)] via-[rgb(230,109,120)] to-[rgb(210,69,88)] shadow-[0_8px_24px_rgba(210,69,88,0.3)]" />
        </motion.div>

        {/* Experience items */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}

          {/* Bottom line */}
          <div className="relative w-full h-px bg-border" />
        </div>

      </div>
    </motion.section>
  );
}
