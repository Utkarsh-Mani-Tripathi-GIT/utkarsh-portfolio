"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EXPERIENCE = [
  { 
    id: "nlo-flagship",
    title: "Flagship Lead Developer & Architect", 
    org: "National Legal Observatory", 
    date: "2024 - Present",
    desc: "Architected and shipped a Next.js legal research platform. Engineered a multi-stage review process (Draft to Live Publishing), live search, and database access for Judges and Lawyers. Platform has 40+ active users and 11 active subscribers.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "System Architecture"],
    link: "https://legal-observatory.vercel.app/"
  },
  { 
    id: "exp-coaching",
    title: "Athletics Coach & Team Lead", 
    org: "GBL (Gurugram Basketball League) Team", 
    date: "Mar 2024 - Nov 2024",
    desc: "Led and coached an 11-player basketball squad, implementing training schedules, offensive plays, and game strategies. Fostered collaboration, high-agency decision-making, and structural leadership.",
    tech: ["Leadership", "Team Operations", "Strategic Planning", "Coaching"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/"
  },
  { 
    id: "crossover-voice",
    title: "Voice Production & Industry Operator", 
    org: "Voice Over Production", 
    date: "Nov 2019 - Present",
    desc: "Completed 200+ voice production projects for 70–90 clients. Recorded and produced high-profile campaigns for Sunfeast ('Dil Maange More'), Man of Action, and ongoing content for Brazzers, managing the full recording process and client operations.",
    tech: ["Audio Production", "Client Operations", "Workflow Management"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/"
  },
  { 
    id: "voice-ai-training",
    title: "Voice AI & Operations Trainer", 
    org: "Voice AI Operations", 
    date: "Mar 2025 - Nov 2025",
    desc: "Managed and trained 30+ voice artists to adapt performance standards for AI model training pipelines in parallel with other voice over projects (including Pokémon UNITE) via Crossover Media. Managed a team of 5 audio editors to compile high-quality vocal datasets.",
    tech: ["AI Voice Models", "Team Leadership", "Editor Management", "Quality Assurance"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/"
  },
  { 
    id: "flipkart-samarth",
    title: "Operations & Tech Support Intern", 
    org: "Flipkart Samarth", 
    date: "Feb 2025 - Apr 2025",
    desc: "Provided key operational support and system troubleshooting for seller onboarding workflows. Assisted staff with technical support, ensuring system uptime and efficient operations.",
    tech: ["System Troubleshooting", "Operations Support", "Workflow Management"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/"
  },
  { 
    id: "crossover-camera",
    title: "Paid Production & Camera Operator", 
    org: "Camera Crew (Freelance)", 
    date: "2025",
    desc: "Collaborated within an 18-member production crew on paid multi-city video projects. Operated advanced cameras, managed BTS documentation, and handled on-set technical coordination.",
    tech: ["Video Production", "Editing", "Team Collaboration", "Multi-city Production"],
    link: "https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/"
  },
  { 
    id: "software-development",
    title: "Software & Automation Developer", 
    org: "Independent Products", 
    date: "2024 - Present",
    desc: "Built local automation systems integrating Gemma models, Siri, and Alexa APIs. Designed smart-room controls for household appliances (lights, fan, AC, purifier, lock, projector, sound systems). Developed custom python automation scripts.",
    tech: ["Local AI", "Gemma", "Home Automation APIs", "Python Scripting"],
    link: "https://github.com/Utkarsh-Mani-Tripathi-GIT"
  },
];

export const ExperienceSection = () => {
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
    <section id="experience" className="scroll-mt-28 py-20 md:py-32 container mx-auto px-6 overflow-hidden">
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
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className={cn(
                  "relative group pl-6 sm:pl-8 py-4 rounded-xl border border-transparent transition-all duration-500",
                  activeHighlight === item.id
                    ? "border-spidey-red/40 bg-spidey-red/5 shadow-[0_0_25px_rgba(255,42,42,0.25)] scale-[1.01]"
                    : ""
                )}
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
