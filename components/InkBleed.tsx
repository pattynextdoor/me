"use client";

import { useEffect, useRef, useCallback } from "react";

interface Bleed {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  phase: "grow" | "dissolve";
  speed: number;
}

export default function InkBleed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bleedsRef = useRef<Bleed[]>([]);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);

  const createBleed = useCallback((width: number, height: number): Bleed => {
    return {
      x: Math.random() * width,
      y: Math.random() * height + scrollYRef.current,
      radius: 0,
      maxRadius: 80 + Math.random() * 120,
      opacity: 0,
      phase: "grow",
      speed: 0.3 + Math.random() * 0.4,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Seed initial bleeds
    for (let i = 0; i < 2; i++) {
      bleedsRef.current.push(createBleed(canvas.width, canvas.height));
    }

    let lastFrame = 0;
    const frameInterval = 1000 / 30; // 30fps cap

    const animate = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(animate);

      if (!isVisible) return;
      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bleeds = bleedsRef.current;

      // Spawn new bleeds if under cap
      if (bleeds.length < 3 && Math.random() < 0.005) {
        bleeds.push(createBleed(canvas.width, canvas.height));
      }

      for (let i = bleeds.length - 1; i >= 0; i--) {
        const b = bleeds[i];

        if (b.phase === "grow") {
          b.radius += b.speed;
          b.opacity = Math.min(0.08, b.opacity + 0.001);
          if (b.radius >= b.maxRadius) {
            b.phase = "dissolve";
          }
        } else {
          b.opacity -= 0.0008;
          b.radius += b.speed * 0.3;
          if (b.opacity <= 0) {
            bleeds.splice(i, 1);
            continue;
          }
        }

        // Scroll-relative Y position
        const drawY = b.y - scrollYRef.current;

        // Only draw if on screen
        if (drawY > -b.radius && drawY < canvas.height + b.radius) {
          const gradient = ctx.createRadialGradient(
            b.x, drawY, 0,
            b.x, drawY, b.radius
          );
          gradient.addColorStop(0, `rgba(20, 20, 24, ${b.opacity})`);
          gradient.addColorStop(0.6, `rgba(16, 16, 20, ${b.opacity * 0.5})`);
          gradient.addColorStop(1, "rgba(12, 12, 14, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(b.x, drawY, b.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [createBleed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
