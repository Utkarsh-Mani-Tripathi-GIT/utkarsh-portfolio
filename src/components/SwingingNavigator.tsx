"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

// Dynamic Imports for Code Splitting (Optimizes performance and loading)
const HeroSection = dynamic(() => import("./HeroSection").then(m => m.HeroSection), { 
  loading: () => <div className="h-full w-full flex items-center justify-center text-white/10 uppercase font-black text-4xl italic">Home</div> 
});
const AboutSection = dynamic(() => import("./AboutSection").then(m => m.AboutSection), { 
  loading: () => <div className="h-full w-full flex items-center justify-center text-white/10 uppercase font-black text-4xl italic">Origin</div> 
});
const ExperienceSection = dynamic(() => import("./ExperienceSection").then(m => m.ExperienceSection), { 
  loading: () => <div className="h-full w-full flex items-center justify-center text-white/10 uppercase font-black text-4xl italic">Experience</div> 
});
const ProjectsSection = dynamic(() => import("./ProjectsSection").then(m => m.ProjectsSection), { 
  loading: () => <div className="h-full w-full flex items-center justify-center text-white/10 uppercase font-black text-4xl italic">Projects</div> 
});
const SkillsSection = dynamic(() => import("./SkillsSection").then(m => m.SkillsSection), { 
  loading: () => <div className="h-full w-full flex items-center justify-center text-white/10 uppercase font-black text-4xl italic">Skills</div> 
});
const ContactSection = dynamic(() => import("./ContactSection").then(m => m.ContactSection), { 
  loading: () => <div className="h-full w-full flex items-center justify-center text-white/10 uppercase font-black text-4xl italic">Contact</div> 
});

export const SECTIONS = [
  { id: "hero", label: "Home", component: HeroSection },
  { id: "about", label: "About", component: AboutSection },
  { id: "experience", label: "Experience", component: ExperienceSection },
  { id: "projects", label: "Projects", component: ProjectsSection },
  { id: "skills", label: "Skills", component: SkillsSection },
  { id: "contact", label: "Contact", component: ContactSection },
];

export const SwingingNavigator = () => {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  const spideyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleNav = (e: any) => {
      const idx = e.detail;
      if (typeof idx === 'number') navigateTo(idx);
    };

    window.addEventListener("swing-to", handleNav);
    return () => window.removeEventListener("swing-to", handleNav);
  }, [activeIdx, isSwinging]);

  const navigateTo = (idx: number) => {
    if (idx === activeIdx || isSwinging) return;
    setIsSwinging(true);
    
    const direction = idx > activeIdx ? 1 : -1;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIdx(idx);
        setIsSwinging(false);
        window.dispatchEvent(new CustomEvent("swing-complete", { detail: idx }));
      }
    });

    if (spideyRef.current) {
      tl.to(spideyRef.current, {
        x: direction * 150,
        y: -100,
        rotation: direction * 45,
        duration: 0.6,
        ease: "power2.in",
      })
      .to(spideyRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-hidden bg-background">
      <motion.div 
        ref={containerRef}
        animate={{ x: `-${activeIdx * 100}vw` }}
        transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
        className="flex h-full w-[600%]"
      >
        {SECTIONS.map((section, i) => (
          <div key={section.id} className="w-screen h-full flex-shrink-0 relative">
             <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
                <div 
                  className="w-[85%] h-[90%] border-x border-t border-white/5 rounded-t-[4rem] shadow-[0_-40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden transition-colors duration-500"
                  style={{ 
                    background: `linear-gradient(to bottom, var(--building-top), var(--building-bottom))` 
                  }}
                >
                   <div className="absolute inset-0 grid grid-cols-10 gap-4 p-12 opacity-5">
                      {Array.from({ length: 60 }).map((_, j) => (
                         <div key={j} className="h-4 bg-text-muted/20 rounded-sm" />
                      ))}
                   </div>
                   <motion.div 
                     animate={{ opacity: [0.1, 0.3, 0.1] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 bg-spidey-red/5 blur-3xl pointer-events-none"
                   />
                   <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-1000 ${activeIdx === i ? "bg-spidey-red shadow-[0_0_50px_rgba(255,42,42,1)]" : "bg-white/5"}`} />
                </div>
             </div>
             
             <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden pt-28 custom-scrollbar">
                <div className={`container mx-auto px-6 transition-all duration-1000 ${activeIdx === i ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-20 blur-xl"}`}>
                   <Suspense fallback={null}>
                      <section.component />
                   </Suspense>
                </div>
             </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {isSwinging && (
          <motion.div 
            ref={spideyRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-[100]"
          >
            <div className="absolute bottom-full left-1/2 w-[2px] h-[100vh] bg-gradient-to-t from-spidey-red/40 to-transparent origin-bottom" />
            <div className="w-16 h-16 bg-black rounded-full border-2 border-spidey-red flex items-center justify-center shadow-[0_0_30px_rgba(255,42,42,0.6)]">
               <span className="text-white text-2xl transform -rotate-45 italic font-black">🕷️</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-white/5 z-[200]">
         <motion.div 
           className="h-full bg-spidey-red shadow-[0_0_10px_rgba(255,42,42,0.8)]"
           animate={{ width: `${((activeIdx + 1) / SECTIONS.length) * 100}%` }}
         />
      </div>
    </div>
  );
};
