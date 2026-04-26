"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onComplete, 1000); // Allow exit animation to finish
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
        >
          <div className="relative">
            {/* Animated Web Logo */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
              <motion.path
                d="M100 10 L100 190 M10 100 L190 100 M35 35 L165 165 M165 35 L35 165"
                stroke="white"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M100 60 L130 80 L140 100 L130 120 L100 140 L70 120 L60 100 L70 80 Z"
                stroke="var(--spidey-red)"
                strokeWidth="2"
                initial={{ pathLength: 0, scale: 0.8 }}
                animate={{ pathLength: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              />
              <motion.path
                d="M100 30 L150 60 L170 100 L150 140 L100 170 L50 140 L30 100 L50 60 Z"
                stroke="var(--spidey-red)"
                strokeWidth="1"
                opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
              />
            </svg>

            {/* Glitchy Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-text-primary font-mono tracking-widest uppercase text-sm"
            >
              Initializing Multiverse
            </motion.div>
          </div>
          
          {/* Scanline Effect */}
          <div className="scanlines" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
