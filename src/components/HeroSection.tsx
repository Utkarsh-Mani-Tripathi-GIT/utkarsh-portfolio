"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlitchText } from "./GlitchText";
import Link from "next/link";
import { MagneticButton } from "./MagneticButton";
import { ParallaxHeroImages } from "./ui/parallax-hero-images";


const backgroundImages = [
  "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=400&q=80", // Spiderman top-left
  "https://github-readme-activity-graph.vercel.app/graph?username=Utkarsh-Mani-Tripathi-GIT&bg_color=0a0a0f&color=ff2a2a&line=ff2a2a&point=ffffff&area=true&hide_border=true", // Real-time GitHub Activity/Repo Graph
  "/images/workspace-ml.png", // Workspace dual monitor ML setup
  "/images/workspace-neon.png", // Workspace purple neon coding setup
  "/images/screenshot-nlo.png", // Screenshot of NLO project
  "/images/code-1.png", // User's own code screenshot 1
  "/images/code-2.png", // User's own code screenshot 2
  "/images/developer-tools.png"  // Developer Tools icon matrix
];

export const HeroSection = () => {
  return (
    <section id="home" className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Subtle Floating Multiverse Parallax Images */}
      <ParallaxHeroImages images={backgroundImages} className="opacity-15 pointer-events-none" />
      
      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-3 md:space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-1"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-spidey-red overflow-hidden shadow-[0_0_20px_rgba(255,42,42,0.3)]">
              <img src="/images/avatar.jpg" alt="Utkarsh Mani Tripathi" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <div className="inline-block px-3 py-1 border border-spidey-red/50 rounded-full bg-spidey-red/5 backdrop-blur-sm">
             <span className="text-[7px] md:text-[9px] uppercase font-black tracking-[0.25em] md:tracking-[0.35em] text-spidey-red leading-none">
               Product Builder · Automation Specialist
             </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white flex flex-col leading-[0.85] my-1">
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
            className="text-text-secondary text-sm md:text-lg max-w-xl mx-auto font-medium px-4 leading-normal"
          >
            Full Stack Product Builder and Automation Engineer building systems, products, and experiences that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="pt-4 md:pt-6 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
             <MagneticButton>
               <Link 
                 href="/projects"
                 title="View my projects"
                 className="w-full sm:w-auto px-6 py-3 bg-spidey-red text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-text-primary hover:text-background transition-all duration-300 shadow-[6px_6px_0_rgba(225,29,46,0.3)] text-center block"
               >
                  Launch Project
               </Link>
             </MagneticButton>
             <MagneticButton>
               <Link 
                 href="/about"
                 title="Read about my origin story"
                 className="w-full sm:w-auto px-6 py-3 border-2 border-text-primary/10 text-text-primary font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:border-spidey-red transition-all duration-300 text-center block"
               >
                  The Origin
               </Link>
             </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
