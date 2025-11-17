"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { JSX, useRef } from "react";
import { fadeInVariants } from "@/lib/animations";
import { SiAmazon } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaGlobe } from "react-icons/fa";

interface ExperienceItem {
  number: string;
  company: string;
  role: string;
  description: string[];
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
      <div className="absolute left-0 top-0 w-full h-px bg-gray-300" />

      <div className="py-16 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Number */}
        <div className="md:col-span-2">
          <div className="text-sm font-mono text-gray-400">{exp.number}</div>
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
            <div className="flex items-start gap-4">
              <div className="text-gray-700 mt-1 flex-shrink-0">
                {exp.icon}
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                  {exp.company}
                </h3>
                <p className="text-base text-gray-600">{exp.role}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              {exp.description.map((paragraph, pIndex) => (
                <motion.p
                  key={pIndex}
                  className="text-gray-700 text-base leading-relaxed max-w-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.3 + pIndex * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const experiences: ExperienceItem[] = [
  {
    number: "2021 - Present",
    company: "Microsoft Azure",
    role: "Software Engineer II - Identity Governance",
    description: [
      "I've been building premium features across the stack to support Entra ID Admins with keeping their organizations secure. Identity Governance is the framework for managing and securing identities (whether user, app or agent) and their access to resources. My extended tenure in Identity has allowed me to form deep understandings of our Governance products and exercise my opinionated views in my work.",
      "This role has been a mix of deep technical work, cross-team collaboration, mentoring juniors and interns, and finding creative solutions to supporting new identities. "
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
    icon: <SiAmazon size={40} />,
  },
  {
    number: "2018",
    company: "Esri",
    role: "Technical SEO Intern",
    description: [
      "I worked on optimizing SEO for many of Esri's landing sites. Through following SEO best practices, I was able to collaborate with developers to implement structured data.",
      "Some days I miss being an intern..."
    ],
    icon: <FaGlobe size={40} />,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Scroll-based animation for background transition
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#0B192C", "#E8E6DD"]
  );

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      style={{ backgroundColor }}
      className="min-h-screen py-32 px-4 md:px-8 lg:px-9 relative overflow-hidden rounded-t-[40px] md:rounded-t-[60px]"
    >
      <div className="max-w-[1400px] mx-auto w-full" ref={ref}>
        {/* Intro text */}
        <motion.div
          className="mb-20 relative z-10"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <p className="text-sm font-medium text-gray-600 mb-6">
            Shipping solutions across the stack.
          </p>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900">
            Experience
          </h2>
        </motion.div>

        {/* Experience items */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}

          {/* Bottom line */}
          <div className="relative w-full h-px bg-gray-300" />
        </div>

      </div>
    </motion.section>
  );
}
