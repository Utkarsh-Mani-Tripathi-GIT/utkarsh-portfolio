"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Shield, Target, Cpu, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILLS = [
  { id: "react-nextjs", name: "React & Next.js", icon: Code, color: "text-electric-blue", desc: "Currently learning and building responsive frontends with React 19 and Next.js App Router." },
  { id: "python-c", name: "Python / C", icon: Target, color: "text-spidey-red", desc: "Writing efficient scripts, automation tools, and backend logic — the languages I started with." },
  { id: "backend-apis", name: "Backend & Databases", icon: Brain, color: "text-neon-purple", desc: "Building RESTful APIs with Node.js and Express. Good with SQL basics, MongoDB, and server logic." },
  { id: "ai-automation", name: "AI & Automation", icon: Cpu, color: "text-electric-blue", desc: "Integrating Gemini API, LLMs, and AI tools into real products. Prompt engineering and agentic workflows." },
  { id: "git-devops", name: "Git & Deployments", icon: Zap, color: "text-spidey-red", desc: "Version control with Git, Vercel deployments, and keeping things actually shipping." },
  { id: "voice-over", name: "Voice Over", icon: Cpu, color: "text-neon-purple", desc: "Years of professional voice work across commercial and media projects, freelancing unofficially." },
  { id: "camera-production", name: "Camera & Production", icon: Target, color: "text-electric-blue", desc: "On-set camera ops, BTS, and content production for video creators." },
  { id: "team-leadership", name: "Team Leadership", icon: Shield, color: "text-text-muted", desc: "Managing crews and collaborators across creative and technical projects." },
  { id: "problem-solving", name: "Problem Solving", icon: Brain, color: "text-spidey-red", desc: "Breaking down hard problems — whether it's a system design challenge or figuring out a shot on set." },
];

export const SkillsSection = () => {
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
    <section id="skills" className="scroll-mt-28 py-20 md:py-32 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-2 mb-12 md:mb-20"
        >
          <span className="text-spidey-red font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Abilities</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
            The Powers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.id}
              id={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group p-6 md:p-8 glass rounded-xl md:rounded-2xl transition-all duration-500 hover:-translate-y-2 border",
                activeHighlight === skill.id
                  ? "border-spidey-red bg-spidey-red/5 shadow-[0_0_25px_rgba(255,42,42,0.25)] scale-[1.01]"
                  : "border-white/5 hover:border-spidey-red/50"
              )}
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className={cn("p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 shrink-0", skill.color)}>
                  <skill.icon size={24} />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-lg md:text-xl font-black italic uppercase text-text-primary group-hover:text-spidey-red transition-colors leading-tight">
                    {skill.name}
                  </h3>
                  <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
