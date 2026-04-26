"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SECTIONS = ["/", "/about", "/experience", "/projects", "/skills", "/contact"];

export const CityBackground = () => {
  const pathname = usePathname();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const idx = SECTIONS.indexOf(pathname);
    if (idx !== -1) setActiveIdx(idx);
  }, [pathname]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {/* Horizontal Building Track */}
      <motion.div 
        animate={{ x: `-${activeIdx * 100}vw` }}
        transition={{ duration: 1.5, ease: [0.645, 0.045, 0.355, 1] }}
        className="flex h-full w-[600%]"
      >
        {SECTIONS.map((_, i) => (
          <div key={i} className="w-screen h-full flex-shrink-0 relative">
             <div className="absolute inset-0 flex items-end justify-center">
                <div 
                  className="w-full sm:w-[90%] md:w-[85%] h-[90%] border-x border-t border-white/5 sm:rounded-t-[4rem] shadow-[0_-40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden transition-colors duration-500"
                  style={{ 
                    background: `linear-gradient(to bottom, var(--building-top), var(--building-bottom))` 
                  }}
                >
                   {/* Window Patterns */}
                   <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-10 gap-2 sm:gap-4 p-6 sm:p-12 opacity-5">
                      {Array.from({ length: 60 }).map((_, j) => (
                         <div key={j} className="h-3 sm:h-4 bg-text-muted/20 rounded-sm" />
                      ))}
                   </div>
                   
                   {/* Neon Glow */}
                   <motion.div 
                     animate={{ opacity: [0.1, 0.3, 0.1] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 bg-spidey-red/5 blur-3xl"
                   />
                   
                   {/* Top LED Line */}
                   <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-1000 ${activeIdx === i ? "bg-spidey-red shadow-[0_0_50px_rgba(255,42,42,1)]" : "bg-white/5"}`} />
                </div>
             </div>
          </div>
        ))}
      </motion.div>

      {/* Global Background Scanlines */}
      <div className="scanlines" />
    </div>
  );
};
