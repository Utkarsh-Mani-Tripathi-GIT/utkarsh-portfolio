"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [rotation, setRotation] = useState(0);
  const [isOverNav, setIsOverNav] = useState(false);
  const [isOverContact, setIsOverContact] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const springConfig = { damping: 45, stiffness: 180, mass: 2.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    let lastX = 0;
    let lastY = 0;
    let moveTimeout: NodeJS.Timeout;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsMoving(true);

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => setIsMoving(false), 100);

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setRotation(angle + 90);
      }

      lastX = e.clientX;
      lastY = e.clientY;

      if (e.clientY < 120) setIsOverNav(true);
      else setIsOverNav(false);

      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setIsOverContact(true);
        } else {
          setIsOverContact(false);
        }
      } else {
        setIsOverContact(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearTimeout(moveTimeout);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Spider Crawler */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          rotate: rotation,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isOverContact || isOverNav ? 0 : 0.6,
          scale: isOverContact || isOverNav ? 0 : 1,
        }}
      >
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-spidey-red drop-shadow-[0_0_8px_rgba(255,42,42,0.35)] ${isMoving ? "spider-moving" : ""}`}>
          {/* Main Body */}
          <ellipse cx="50" cy="60" rx="16" ry="24" />
          <circle cx="50" cy="36" r="14" />
          
          {/* Eyes */}
          <circle cx="44" cy="32" r="3" fill="white" />
          <circle cx="56" cy="32" r="3" fill="white" />

          {/* Legs */}
          <g stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" className="spider-legs">
            <path d="M35 35 Q15 10 5 45" />
            <path d="M35 55 Q10 50 2 80" />
            <path d="M35 75 Q15 95 10 115" />
            
            <path d="M65 35 Q85 10 95 45" />
            <path d="M65 55 Q90 50 98 80" />
            <path d="M65 75 Q85 95 90 115" />
          </g>
        </svg>
      </motion.div>
      
      {/* Ripple Trail */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 border border-spidey-red rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isOverContact || isOverNav ? 0 : 0.4,
          scale: isOverContact || isOverNav ? 0 : 1,
        }}
      />
    </>
  );
};
