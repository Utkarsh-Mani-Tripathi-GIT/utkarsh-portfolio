"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Burst {
  id: number;
  x: number;
  y: number;
}

export const WebBurst = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newBurst = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setBursts((prev) => [...prev, newBurst]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{ left: burst.x, top: burst.y }}
          >
            {/* 8 Radial web strands */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-12 bg-white/40 origin-top"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-50%)`,
                }}
              />
            ))}
            {/* Central Glow */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-spidey-red/30 rounded-full blur-sm" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
