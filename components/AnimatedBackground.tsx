"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// Exact color palette from reference
const COLORS = {
  purple: { r: 47, g: 27, b: 65 },
  maroon: { r: 135, g: 35, b: 65 },
  red: { r: 190, g: 49, b: 68 },
  orange: { r: 240, g: 89, b: 65 },
};

interface Point {
  baseX: number;
  baseY: number;
  z: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const timeRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const gyroRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < 768; // Mobile breakpoint
    let isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    // Mouse interaction handlers - use window for global tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    // Gyroscope handler for mobile devices
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // beta: front-back tilt (-180 to 180)
        // gamma: left-right tilt (-90 to 90)
        // Map to screen coordinates
        const x = ((e.gamma + 90) / 180) * width; // -90 to 90 -> 0 to width
        const y = ((e.beta + 90) / 180) * height; // Use -90 to 90 range for better control

        gyroRef.current = {
          x: Math.max(0, Math.min(width, x)),
          y: Math.max(0, Math.min(height, y)),
          isActive: true
        };
      }
    };

    // Add mouse event listeners to window for better tracking
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    } else {
      // Request permission for gyroscope on iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    // Setup canvas
    const setupCanvas = () => {
      // Lower DPR on mobile for better performance
      const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : (window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    // Optimized particle grid for better performance
    const initPoints = () => {
      const points: Point[] = [];
      // Adjust spacing based on device - more spacing (fewer particles) on mobile
      const spacing = isMobile ? (isLowEnd ? 28 : 24) : (isLowEnd ? 22 : 18);
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({
            baseX: i * spacing,
            baseY: j * spacing,
            z: 0,
          });
        }
      }

      pointsRef.current = points;
    };

    // Color mapping - more vibrant and accurate to reference
    const getColor = (z: number) => {
      // Normalize between -60 and 60 for tighter color range
      const normalized = Math.max(0, Math.min(1, (z + 60) / 120));

      if (normalized < 0.2) {
        // Deep purple valleys
        return {
          r: COLORS.purple.r,
          g: COLORS.purple.g,
          b: COLORS.purple.b,
          a: 0.7,
        };
      } else if (normalized < 0.4) {
        // Purple to maroon transition
        const t = (normalized - 0.2) / 0.2;
        return {
          r: COLORS.purple.r + (COLORS.maroon.r - COLORS.purple.r) * t,
          g: COLORS.purple.g + (COLORS.maroon.g - COLORS.purple.g) * t,
          b: COLORS.purple.b + (COLORS.maroon.b - COLORS.purple.b) * t,
          a: 0.85,
        };
      } else if (normalized < 0.7) {
        // Maroon to red - main body of waves
        const t = (normalized - 0.4) / 0.3;
        return {
          r: COLORS.maroon.r + (COLORS.red.r - COLORS.maroon.r) * t,
          g: COLORS.maroon.g + (COLORS.red.g - COLORS.maroon.g) * t,
          b: COLORS.maroon.b + (COLORS.red.b - COLORS.maroon.b) * t,
          a: 1.0,
        };
      } else {
        // Red to orange peaks - brightest parts
        const t = (normalized - 0.7) / 0.3;
        return {
          r: COLORS.red.r + (COLORS.orange.r - COLORS.red.r) * t,
          g: COLORS.red.g + (COLORS.orange.g - COLORS.red.g) * t,
          b: COLORS.red.b + (COLORS.orange.b - COLORS.red.b) * t,
          a: 1.0,
        };
      }
    };

    // Higher viewing angle - topographical map view
    const project = (point: Point) => {
      const perspective = 400; // Higher perspective for top-down view
      const scale = perspective / (perspective + point.z);

      const normalizedY = point.baseY / height;

      // Moderate perspective for topographical look
      const depthEffect = Math.pow(normalizedY, 1.2);
      const verticalShift = point.z * (0.8 + depthEffect * 1.5);

      // Less compression for more readable topographical view
      const compressedY = point.baseY * (0.6 + normalizedY * 0.4);

      return {
        x: point.baseX,
        y: compressedY - verticalShift,
        scale: scale * (0.6 + normalizedY * 0.4),
      };
    };

    // Animation loop
    const animate = () => {
      // Slower animation on mobile for better performance
      timeRef.current += isMobile ? 0.003 : 0.005;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const points = pointsRef.current;
      const time = timeRef.current;

      // Wave equations - right to left motion with topographical feel
      // Reduced wave complexity on mobile for better performance
      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        // Calculate vertical position factor (0 to 1 from top to bottom)
        const verticalFactor = point.baseY / height;

        // Create wave bands that only affect certain vertical regions
        // Top band (0 to 0.3) - strong waves
        const topBandStrength = Math.max(0, 1 - (verticalFactor / 0.3));

        // Middle band (0.3 to 0.7) - medium waves
        const midBandStrength = verticalFactor > 0.3 && verticalFactor < 0.7
          ? 1 - Math.abs((verticalFactor - 0.5) / 0.2)
          : 0;

        // Bottom band (0.7 to 1.0) - light waves
        const bottomBandStrength = Math.max(0, (verticalFactor - 0.7) / 0.3);

        // Mouse/Gyroscope interaction effect - gravity pull
        let mouseInfluence = 0;
        const interactionSource = isMobile ? gyroRef.current : mouseRef.current;

        if (interactionSource.isActive) {
          const dx = point.baseX - interactionSource.x;
          const dy = point.baseY - interactionSource.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 250; // Influence radius

          if (distance < maxDistance) {
            // Inverse square falloff for gravity-like effect
            const influence = Math.pow(1 - (distance / maxDistance), 2);
            // Pull particles up (positive z-value) based on proximity
            mouseInfluence = influence * 60; // Strong pull effect
          }
        }

        // Primary horizontal wave - moving right to left (positive time direction)
        const wave1 = Math.sin(point.baseX * 0.012 + time * 2.2) * 35 * topBandStrength;

        // Diagonal wave from top-right to bottom-left (middle region)
        const wave2 = Math.sin((point.baseX * 0.009 - point.baseY * 0.004) + time * 1.8) * 28 * midBandStrength;

        // Diagonal wave from bottom-right to top-left (bottom region)
        const wave3 = Math.cos((point.baseX * 0.008 + point.baseY * 0.006) + time * 1.4) * 20 * bottomBandStrength;

        // Complex angled wave - varying angles from right side (skip on low-end mobile)
        const wave4 = (isMobile && isLowEnd) ? 0 : Math.sin((point.baseX * 0.01 + point.baseY * 0.003) + time * 2.0) * 25 * (topBandStrength * 0.5 + midBandStrength * 0.5);

        // Additional wave with different angle for more variation
        const wave5 = Math.sin((point.baseX * 0.006 + point.baseY * 0.008) - time * 1.6) * 15 * bottomBandStrength;

        point.z = wave1 + wave2 + wave3 + wave4 + wave5 + mouseInfluence;
      }

      // Render particles - optimized
      const particlesToRender = [];

      // Collect visible particles first
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const projected = project(point);

        if (projected.y > -300 && projected.y < height + 300) {
          particlesToRender.push({ point, projected });
        }
      }

      // Render in batches for better performance
      for (let i = 0; i < particlesToRender.length; i++) {
        const { point, projected } = particlesToRender[i];
        const color = getColor(point.z);
        const size = Math.max(1.0, 2.0 * projected.scale);

        // Simplified rendering - solid squares instead of gradients for performance
        const colorStr = `rgba(${Math.floor(color.r)}, ${Math.floor(color.g)}, ${Math.floor(color.b)}, ${color.a})`;
        ctx.fillStyle = colorStr;
        ctx.fillRect(
          projected.x - size,
          projected.y - size,
          size * 2,
          size * 2
        );
      }


      rafRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Recalculate mobile status on resize (handles device rotation)
      isMobile = width < 768;
      setupCanvas();
      initPoints();
    };

    // Initialize
    setupCanvas();
    initPoints();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      } else {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "#000000", pointerEvents: "auto" }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
    </motion.div>
  );
}
