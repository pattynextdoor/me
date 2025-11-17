"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);

      // Check if we're in the Experience section (light mode area)
      const experienceSection = document.getElementById("experience");
      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect();
        // Consider in light section if the section occupies significant viewport
        setIsLightSection(rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(30, 30, 30, 0)", isLightSection ? "rgba(232, 230, 221, 0.7)" : "rgba(30, 30, 30, 0.7)"]
  );

  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"]);

  const links = [
    { href: "#about", label: "About Me" },
    { href: "#experience", label: "Experience" },
    { href: '#contact', label: "Contact" }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-6 px-4">
        <div
          className={`px-6 md:px-8 py-4 rounded-full w-full md:w-auto max-w-[calc(100%-2rem)] md:max-w-5xl border backdrop-blur-[32px] transition-colors duration-500 ${
            isLightSection && isScrolled
              ? 'bg-white/50 border-black/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]'
              : isScrolled
              ? 'bg-[rgba(11,25,44,0.4)] border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'
              : 'bg-[rgba(11,25,44,0.3)] border-white/5'
          }`}
          style={{
            backdropFilter: 'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#"
              className="text-xl font-display font-semibold transition-colors duration-500 flex-shrink-0"
              style={{
                color: isLightSection && isScrolled ? "#0B192C" : "#D9D9D9",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              PT
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith('http') && {
                    target: "_blank",
                    rel: "noopener noreferrer"
                  })}
                  className="transition-colors duration-500 hover:text-accent"
                  style={{
                    color: isLightSection && isScrolled ? "#4B5563" : "rgba(217, 217, 217, 0.8)",
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://linkedin.com/in/patricktumbucon"
                className="px-4 py-2 text-white rounded-lg font-medium"
                style={{ backgroundColor: 'rgb(190, 49, 68)' }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(210, 69, 88)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                target="_blank"
              >
                LinkedIn
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-full h-0.5 rounded-full transition-colors duration-500"
                style={{
                  backgroundColor: isLightSection && isScrolled ? "#0B192C" : "#D9D9D9",
                }}
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 7 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-0.5 rounded-full transition-colors duration-500"
                style={{
                  backgroundColor: isLightSection && isScrolled ? "#0B192C" : "#D9D9D9",
                }}
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-0.5 rounded-full transition-colors duration-500"
                style={{
                  backgroundColor: isLightSection && isScrolled ? "#0B192C" : "#D9D9D9",
                }}
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -7 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-primary/95 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col p-6 gap-1">
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    {...(link.href.startsWith('http') && {
                      target: "_blank",
                      rel: "noopener noreferrer"
                    })}
                    className="px-4 py-4 text-text/90 hover:text-accent hover:bg-text/5 rounded-xl transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/resume.pdf"
                  download
                  className="px-4 py-4 mt-2 bg-accent text-white rounded-xl font-medium text-center hover:bg-accent/90 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05 }}
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
