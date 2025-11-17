"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInVariants, containerVariants, itemVariants } from "@/lib/animations";

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/pattynextdoor",
    icon: "→",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/patricktumbucon",
    icon: "→",
  },
  {
    name: "Email",
    href: "mailto:patricktumbucon@gmail.com",
    icon: "→",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 px-4 md:px-8 lg:px-9">
      <div className="max-w-[1200px] mx-auto w-full" ref={ref}>
        <motion.div
          className="text-center space-y-12"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text">
              Get In Touch
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto text-balance">
              Hit me up if want to show me a cool gig, discuss freshwater aquascapes, or fight me in Guilty Gear Strive.
            </p>
          </div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 bg-dark/50 backdrop-blur-sm border border-border rounded-lg transition-all duration-300"
                style={{
                  borderColor: 'rgba(30, 62, 98, 1)',
                }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  borderColor: 'rgb(190, 49, 68)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-base font-display font-medium text-text transition-colors duration-300"
                    style={{
                      color: '#D9D9D9'
                    }}
                  >
                    {link.name}
                  </span>
                  <motion.span
                    className="text-lg"
                    style={{ color: 'rgb(190, 49, 68)' }}
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.icon}
                  </motion.span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 pt-8 border-t border-border text-center text-text/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p>© {new Date().getFullYear()} Patrick Tumbucon. Built with Next.js & Framer Motion.</p>
        </motion.footer>
      </div>
    </section>
  );
}
