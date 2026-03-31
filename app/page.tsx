"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <motion.div
      className="max-w-[640px] mx-auto px-6"
      initial="hidden"
      animate="show"
    >
      <Header />
      <ExperienceSection />
      <ProjectsSection />
      <Footer />
    </motion.div>
  );
}
