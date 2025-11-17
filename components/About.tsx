"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { fadeInVariants } from "@/lib/animations";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 20
  });

  // Detect if on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5
    mouseX.set((x / width) - 0.5);
    mouseY.set((y / height) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Gyroscope support for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // beta: front-back tilt (-180 to 180)
        // gamma: left-right tilt (-90 to 90)
        // Normalize to -0.5 to 0.5 range for parallax effect
        const normalizedX = Math.max(-0.5, Math.min(0.5, e.gamma / 45)); // Narrower range for subtler effect
        const normalizedY = Math.max(-0.5, Math.min(0.5, (e.beta - 90) / 45));

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
      }
    };

    // Use DeviceOrientation API (most compatible on mobile)
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // iOS 13+ requires permission
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS devices or older iOS
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [isMobile, mouseX, mouseY]);

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4 md:px-8 lg:px-9 rounded-t-[40px] md:rounded-t-[60px] relative overflow-hidden bg-gradient-to-b from-primary/50 to-primary/80">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217, 217, 217, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 217, 217, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,101,0,0.05)_0%,transparent_5%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto w-full relative z-10" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side: Image and About Me */}
          <div className="space-y-8">
            {/* Profile Image */}
            <motion.div
              className="relative"
              variants={fadeInVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative w-full aspect-square max-w-[240px] mx-auto md:mx-0 cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Decorative border */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl blur-xl" />

                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-accent/20">
                  <img
                    src="/profile.png"
                    alt="Patrick Tumbucon"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'drop-shadow(2px 0px 0px rgba(255,0,0,0.4)) drop-shadow(-2px 0px 0px rgba(0,255,255,0.4))'
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* About Me Text */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-display font-bold text-text"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                About Me
              </motion.h2>

              <div className="space-y-4 text-text/80 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                    Welcome to my corner of the internet. I'm an experienced software engineer who tricks rocks into thinking, whether those rocks support data pipelines, API's, or visual end user experiences.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Growing up, I always dreamed of being on the computer. Whether that was through annoying Clippy on Windows Vista, losing myself in Adventure Quest and Maplestory, or trying to find the <i>perfect</i> font family for my school PowerPoint, I figured myself a digital aficionado.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  But I didn't know that coding would be my career until I took Mr. Blattner's <i>Intro to Java Programming</i> class in high school. I didn't even know it paid well, I just knew I had to do it for the rest of my life.
                </motion.p>

              </div>
            </motion.div>
          </div>

          {/* Right side: When I'm not coding */}
          <motion.div
            className="space-y-4 bg-dark/50 backdrop-blur-sm rounded-2xl p-8 border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-display font-semibold text-text mb-4">
              When I'm not coding
            </h3>

            <ul className="space-y-3 text-text/70">
              {[
                "🐕 Nature walks with my corgi",
                "🐠 Maintaining my 2 freshwater aquariums",
                "🎮 Gaming and being a part of the local FGC",
                "🎶 Enjoying live music and festivals",
                "🍰 Baking desserts from TikTok",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
