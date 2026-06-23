"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const VerticalCurvedMarquee = () => {
  const [offset, setOffset] = useState(0);
  const pathId = "vertical-about-curve";

  useEffect(() => {
    let frame = 0;
    const step = () => {
      setOffset(prev => {
        const next = prev - 0.8; // scroll speed
        return next < -1000 ? 0 : next;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const text = "BUILDER • ENGINEER • CREATOR • SPIDER-MAN •";
  const repeatedText = `${text} ${text} ${text} ${text}`;

  return (
    <svg
      className="absolute top-0 left-0 w-[400px] h-full overflow-visible pointer-events-none select-none z-0"
      style={{ 
        WebkitMaskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
        maskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)"
      }}
    >
      <defs>
        {/* Curve goes from top-left, arches right, and goes back to bottom-left */}
        <path
          id={pathId}
          d="M 40,-100 Q 360,380 40,860"
          fill="none"
          stroke="transparent"
        />
      </defs>
      <text className="fill-white opacity-[0.06] font-black italic text-[7rem] tracking-wider uppercase leading-none">
        <textPath href={`#${pathId}`} startOffset={`${offset}px`}>
          {repeatedText}
        </textPath>
      </text>
    </svg>
  );
};

export const AboutSection = () => {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const highlight = params.get("highlight");
    if (highlight) {
      const el = document.getElementById(highlight);
      if (el) {
        const timerScroll = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setActiveHighlight(highlight);
        }, 500);

        const timerFade = setTimeout(() => {
          setActiveHighlight(null);
        }, 4500);

        return () => {
          clearTimeout(timerScroll);
          clearTimeout(timerFade);
        };
      }
    }
  }, []);

  return (
    <section id="about" className="relative scroll-mt-28 py-20 md:py-32 container mx-auto px-6 overflow-hidden">
      {/* Background Vertical Curved Loop Marquee */}
      <VerticalCurvedMarquee />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 relative z-10">
        
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
              I am a <span className="text-text-primary font-bold">High-Agency Product Builder</span> entering my 3rd year of Computer Science Engineering at GTB4CEC, Delhi — shipping systems across <span className="text-text-primary font-bold">software, automation, media, and research</span>.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Gurugram-based, college in Delhi — I got into tech because I couldn&apos;t stop taking things apart to see how they worked. That curiosity turned into building production-ready applications used by real users.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Outside of code, I have built real-world automation systems, trained voice artists, and produced professional media. My priority is always to build products that get used and solve actual problems — because being useful and shipping beats being specialized.
            </p>
          </motion.div>
 
          <div className="space-y-8 md:space-y-12">
            <h3 className="text-text-primary font-black uppercase tracking-widest text-[10px] md:text-sm border-b border-text-primary/10 pb-4">Education</h3>
            <div className="space-y-8 md:space-y-12">
              {[
                { 
                  id: "btech-in-cse",
                  title: "B.Tech in CSE (3rd Year)", 
                  org: "GTB4CEC - Rajouri Garden, Delhi", 
                  date: "2024 - Present",
                  desc: "Studying Computer Science, with an active focus on distributed systems, databases, automation scripting, and building real-world software products."
                },
                { 
                  id: "ryan-schooling",
                  title: "Schooling", 
                  org: "12th Grade", 
                  date: "2024",
                  desc: "Completed schooling and passed 12th Grade."
                }
              ].map((item, i) => (
                <motion.div
                  key={item.id}
                  id={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className={cn(
                    "space-y-2 group p-4 rounded-xl border border-transparent transition-all duration-500",
                    activeHighlight === item.id
                      ? "border-spidey-red/40 bg-spidey-red/5 shadow-[0_0_25px_rgba(255,42,42,0.25)] scale-[1.01]"
                      : ""
                  )}
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
