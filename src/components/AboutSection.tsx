"use client";

import React from "react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 container mx-auto px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
        
        {/* Left: Sticky Title */}
        <div className="md:w-1/3 md:sticky md:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-spidey-red font-black uppercase tracking-[0.3em] text-xs">Profile</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
              Who I Am
            </h2>
            <div className="w-16 md:w-20 h-1.5 md:h-2 bg-spidey-red" />
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="md:w-2/3 space-y-12 md:space-y-16">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="space-y-6 md:space-y-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-text-secondary font-medium leading-tight">
              I am a <span className="text-text-primary font-bold">Computer Science Engineering</span> student at GTB4CEC, Delhi — building things across <span className="text-text-primary font-bold">fullstack dev, AI, and whatever else needs building</span>.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Based in Haryana, roots in Bihar — I move between Delhi (college), Gurugram, and wherever the work is. I got into tech because I couldn&apos;t stop taking things apart to see how they worked. That curiosity turned into a career in making them work better.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Outside of code, I&apos;ve spent years doing voice over and production work with Crossover Media across Assam, Delhi, and Dehradun. Right now I&apos;m also the camera and BTS guy on a content creator project — because being useful beats being specialized.
            </p>
          </motion.div>

          <div className="space-y-8 md:space-y-12">
            <h3 className="text-text-primary font-black uppercase tracking-widest text-[10px] md:text-sm border-b border-text-primary/10 pb-4">Education</h3>
            <div className="space-y-8 md:space-y-12">
              {[
                { 
                  title: "B.Tech in CSE", 
                  org: "GTB4CEC - Rajouri Garden, Delhi", 
                  date: "2024 - Present",
                  desc: "Focused on building high-performance backend systems and automation."
                },
                { 
                  title: "Schooling (CBSE)", 
                  org: "Ryan International School - Gurugram", 
                  date: "Graduated 2024",
                  desc: "Science stream (PCM). Top performer and active in sports."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-2 group"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-white/5 pb-2 gap-1">
                    <h4 className="text-lg md:text-xl font-bold text-text-primary group-hover:text-spidey-red transition-colors">{item.title}</h4>
                    <span className="text-[10px] md:text-xs font-black italic text-spidey-red">{item.date}</span>
                  </div>
                  <p className="text-[9px] md:text-xs uppercase tracking-widest font-black text-text-muted leading-tight">{item.org}</p>
                  <p className="text-text-secondary text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
