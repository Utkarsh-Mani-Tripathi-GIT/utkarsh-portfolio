"use client";

import React from "react";
import { motion } from "framer-motion";

export const PortalTransition = ({ isActive }: { isActive: boolean }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 20 : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed inset-0 z-[5000] pointer-events-none flex items-center justify-center"
    >
      <div className="w-40 h-40 rounded-full bg-spidey-red mix-blend-difference shadow-[0_0_100px_rgba(225,29,46,0.8)]" />
      
      {/* RGB Split Rings */}
      <div className="absolute w-44 h-44 rounded-full border-4 border-spidey-blue opacity-50 blur-sm" />
      <div className="absolute w-44 h-44 rounded-full border-4 border-verse-purple opacity-50 blur-sm translate-x-1" />
    </motion.div>
  );
};
