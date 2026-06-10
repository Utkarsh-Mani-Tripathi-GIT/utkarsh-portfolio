"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Shield, Target, Cpu, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILLS = [
  { name: "React & Next.js", icon: Code, color: "text-electric-blue", desc: "Building responsive, performant frontends and fullstack apps with React 19 and Next.js App Router." },
  { name: "Python / C", icon: Target, color: "text-spidey-red", desc: "Writing efficient scripts, automation tools, and backend logic — the languages I started with." },
  { name: "Backend & APIs", icon: Brain, color: "text-neon-purple", desc: "Building RESTful APIs with Node.js, Express, and MongoDB. Auth, DB design, and server logic." },
  { name: "AI & Automation", icon: Cpu, color: "text-electric-blue", desc: "Integrating Gemini API, LLMs, and AI tools into real products. Prompt engineering and agentic workflows." },
  { name: "SQL & Databases", icon: Shield, color: "text-text-muted", desc: "Schema design and queries in PostgreSQL and Supabase. Comfortable with NoSQL (MongoDB) too." },
  { name: "Git & DevOps", icon: Zap, color: "text-spidey-red", desc: "Version control, CI/CD workflows, Vercel deployments, and keeping things actually shipping." },
  { name: "Voice Over", icon: Cpu, color: "text-neon-purple", desc: "Years of professional voice work across commercial and media projects with Crossover Media." },
  { name: "Camera & Production", icon: Target, color: "text-electric-blue", desc: "On-set camera ops, BTS, and content production for video creators." },
  { name: "Team Leadership", icon: Shield, color: "text-text-muted", desc: "Managing crews and collaborators across creative and technical projects." },
  { name: "Problem Solving", icon: Brain, color: "text-spidey-red", desc: "Breaking down hard problems — whether it's a system design challenge or figuring out a shot on set." },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 md:py-32 container mx-auto px-6">
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
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 md:p-8 glass rounded-xl md:rounded-2xl hover:border-spidey-red/50 transition-all duration-500 hover:-translate-y-2"
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
