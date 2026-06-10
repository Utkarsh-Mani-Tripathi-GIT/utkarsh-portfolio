"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlitchText } from "./GlitchText";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden px-4">
      
      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-4 md:space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-2"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-spidey-red overflow-hidden shadow-[0_0_30px_rgba(255,42,42,0.3)]">
              <img src="/images/avatar.jpg" alt="Utkarsh Mani Tripathi" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <div className="inline-block px-4 py-1.5 border border-spidey-red/50 rounded-full bg-spidey-red/5 backdrop-blur-sm">
             <span className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.3em] md:tracking-[0.4em] text-spidey-red leading-tight">
               Builder · Engineer · Creator
             </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic uppercase tracking-tighter text-white flex flex-col leading-[0.85]">
            <motion.span 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
               Utkarsh
            </motion.span>
            <motion.span 
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.7, duration: 0.8 }}
               className="text-spidey-red"
            >
               <GlitchText text="Mani" />
            </motion.span>
            <motion.span 
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.9, duration: 0.8 }}
            >
               Tripathi
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-text-secondary text-base md:text-xl max-w-2xl mx-auto font-medium px-4"
          >
            B.Tech CSE student building full-stack products, AI-powered tools, and anything worth shipping — from Delhi NCR.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="pt-6 md:pt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
             <Link 
               href="/projects"
               className="w-full sm:w-auto px-8 py-4 bg-spidey-red text-white font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-text-primary hover:text-background transition-all duration-300 shadow-[8px_8px_0_rgba(225,29,46,0.3)] text-center"
             >
                Launch Project
             </Link>
             <Link 
               href="/about"
               className="w-full sm:w-auto px-8 py-4 border-2 border-text-primary/10 text-text-primary font-black uppercase tracking-widest text-[10px] md:text-xs hover:border-spidey-red transition-all duration-300 text-center"
             >
                The Origin
             </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
