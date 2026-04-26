"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_PHASES = [
  "Initializing Multiverse...",
  "Calibrating Web-Shooters...",
  "Loading NYC Assets...",
  "Stabilizing Timeline...",
];

export const SkeletonLoader = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % LOADING_PHASES.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[2000] bg-black flex flex-center items-center justify-center overflow-hidden">
      {/* Background Halftone Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none grayscale" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      {/* Dynamic Grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
         <div className="absolute inset-0 border-[0.5px] border-white/10" style={{ backgroundSize: '100px 100px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)' }} />
      </div>

      <div className="relative text-center space-y-12 max-w-md px-6">
        {/* Animated Spidey Logo */}
        <div className="relative inline-block">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-spidey-red rounded-xl rotate-45 flex items-center justify-center shadow-[0_0_50px_rgba(255,42,42,0.5)] border-2 border-white"
          >
             <span className="text-white text-5xl font-black -rotate-45 italic">🕷️</span>
          </motion.div>
          
          {/* Pulsing Rings */}
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-spidey-red rounded-xl rotate-45 -z-10"
          />
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white font-black italic uppercase tracking-[0.4em] text-[10px]"
            >
              {LOADING_PHASES[phase]}
            </motion.p>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 2.5, ease: "easeInOut" }}
               className="h-full bg-spidey-red shadow-[0_0_15px_rgba(255,42,42,1)]"
             />
          </div>
        </div>

        {/* Glitched Name */}
        <div className="pt-4">
           <h2 className="text-white/20 font-black text-4xl md:text-6xl uppercase italic tracking-tighter select-none">
             Utkarsh
           </h2>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-spidey-red opacity-50" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-spidey-red opacity-50" />
    </div>
  );
};
