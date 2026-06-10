"use client";

import React from "react";
import { motion } from "framer-motion";

const EXPERIENCE = [
  { 
    title: "Camera Crew & Tech Lead", 
    org: "Crossover Media", 
    date: "2025 - Present",
    desc: "Managing camera operations, BTS documentation, and on-set tech for a content creator project. Handling equipment setup, shot composition, and post-production coordination across shoots.",
    tech: ["Camera Ops", "BTS", "Content Production", "On-set Tech"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/details/experience/"
  },
  { 
    title: "Software Development Intern", 
    org: "Flipkart Samarth", 
    date: "Feb 2025 - Apr 2025",
    desc: "Built and optimized backend systems using Node.js, Express.js, and MongoDB to streamline seller onboarding. Developed secure RESTful APIs to enhance database efficiency.",
    tech: ["Node.js", "Express", "MongoDB", "REST APIs"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/details/experience/?highlightedId=2633012074"
  },
  { 
    title: "Voice Over Artist", 
    org: "Crossover Media", 
    date: "Nov 2020 - Feb 2024",
    desc: "Delivered professional voice over work across commercial, creative, and media projects based out of Assam, Delhi, and Dehradun. Managed vocal delivery, modulation training, and team coordination.",
    tech: ["Audio Engineering", "Voice Modulation", "Project Management"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/details/experience/?highlightedId=2860457352"
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32 container mx-auto px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
        
        {/* Left: Sticky Title */}
        <div className="md:w-1/3 md:sticky md:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-spidey-red font-black uppercase tracking-[0.3em] text-xs">Timeline</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
              Experience
            </h2>
            <div className="w-16 md:w-20 h-1.5 md:h-2 bg-spidey-red" />
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="md:w-2/3 space-y-12 md:space-y-16">
          <div className="space-y-12 md:space-y-20">
            {EXPERIENCE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative group pl-6 sm:pl-8"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-spidey-red/20 group-hover:bg-spidey-red transition-colors duration-500" />
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-text-primary group-hover:text-spidey-red transition-colors uppercase italic leading-tight">{item.title}</h4>
                      <p className="text-[10px] md:text-sm uppercase tracking-widest font-black text-text-muted mt-1">{item.org}</p>
                    </div>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      className="text-[10px] md:text-xs font-black italic text-spidey-red bg-spidey-red/5 px-4 py-2 border border-spidey-red/20 rounded-full w-fit hover:bg-spidey-red hover:text-white transition-all whitespace-nowrap"
                    >
                      View Job Detail
                    </a>
                  </div>

                  <p className="text-text-secondary text-sm md:text-lg leading-relaxed max-w-3xl">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {item.tech.map((t, j) => (
                      <span key={j} className="text-[8px] md:text-[10px] font-black uppercase tracking-widest px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-text-muted group-hover:border-spidey-red/30 group-hover:text-text-secondary transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
