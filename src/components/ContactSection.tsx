"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-32 container mx-auto px-6 relative">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left: Spider-Signal Visual */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
          <div className="absolute inset-0 bg-spidey-red/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 border-2 border-spidey-red/30 rounded-full"
          />
          <div className="absolute inset-4 border border-spidey-red/20 rounded-full" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-20 h-20 md:w-32 md:h-32 fill-spidey-red drop-shadow-[0_0_15px_rgba(225,29,46,0.8)]">
               <path d="M100 20 C110 40 130 50 150 60 C140 80 140 100 150 120 C130 130 110 140 100 160 C90 140 70 130 50 120 C60 100 60 80 50 60 C70 50 90 40 100 20 Z" />
            </svg>
          </div>
        </div>

        {/* Right: Form / Info */}
        <div className="flex-1 space-y-8 md:space-y-12 w-full">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
              The Signal
            </h2>
            <p className="text-text-secondary text-sm md:text-lg">
              Ready to collaborate in this universe or the next? Let's build something spectacular.
            </p>
          </div>

          <form className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-3 md:px-6 md:py-4 text-text-primary text-sm placeholder:text-text-muted focus:border-spidey-red transition-colors outline-none"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-3 md:px-6 md:py-4 text-text-primary text-sm placeholder:text-text-muted focus:border-spidey-red transition-colors outline-none"
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-3 md:px-6 md:py-4 text-text-primary text-sm placeholder:text-text-muted focus:border-spidey-red transition-colors outline-none resize-none"
            />
            
            <motion.a
              href="mailto:Utkarshmanitripathi2006@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-3 w-full bg-spidey-red text-white font-black uppercase tracking-widest py-4 md:py-5 rounded-sm hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-sm"
            >
              <span>Send Signal</span>
              <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
            </motion.a>
          </form>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 pt-8 border-t border-white/10">
             <a href="https://github.com/Utkarsh-Mani-Tripathi-GIT" target="_blank" className="text-text-muted hover:text-spidey-red transition-colors font-black uppercase tracking-widest text-[9px] md:text-xs">Github</a>
             <a href="https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/" target="_blank" className="text-text-muted hover:text-spidey-red transition-colors font-black uppercase tracking-widest text-[9px] md:text-xs">LinkedIn</a>
             <a href="https://x.com/utkarshmanitr11" target="_blank" className="text-text-muted hover:text-spidey-red transition-colors font-black uppercase tracking-widest text-[9px] md:text-xs">Twitter</a>
          </div>
        </div>
      </div>
    </section>
  );
};
