"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpideyMask } from "@/components/SpideyMask";

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
            <SpideyMask className="w-32 h-32 md:w-48 md:h-48 text-spidey-red drop-shadow-[0_0_15px_rgba(225,29,46,0.8)] mx-auto" animate={true} drawDuration={1.5} />

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
