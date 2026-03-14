"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (no touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // Spring-based ring follow
    const animate = () => {
      const dx = mouse.current.x - ringPos.current.x;
      const dy = mouse.current.y - ringPos.current.y;

      // Spring physics: stiffness controls snap, damping controls smoothness
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Dot: exact cursor position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        <div
          style={{
            width: isClicking ? 4 : 6,
            height: isClicking ? 4 : 6,
            marginLeft: isClicking ? -2 : -3,
            marginTop: isClicking ? -2 : -3,
            backgroundColor: "#EDEDED",
            borderRadius: "50%",
            transition: "width 0.15s, height 0.15s, margin 0.15s",
          }}
        />
      </div>

      {/* Ring: follows with spring lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        <div
          style={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            marginLeft: isHovering ? -24 : -16,
            marginTop: isHovering ? -24 : -16,
            border: `1.5px solid ${isHovering ? "rgba(237, 237, 237, 0.5)" : "rgba(237, 237, 237, 0.2)"}`,
            borderRadius: "50%",
            backgroundColor: isHovering ? "rgba(237, 237, 237, 0.04)" : "transparent",
            transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), margin 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s",
          }}
        />
      </div>
    </>
  );
}
