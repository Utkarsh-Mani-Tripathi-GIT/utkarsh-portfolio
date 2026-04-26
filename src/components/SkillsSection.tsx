"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Shield, Target, Cpu, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILLS = [
  { name: "Python / C", icon: Code, color: "text-spidey-red", desc: "Developing efficient backend systems and automation scripts." },
  { name: "Backend Dev", icon: Brain, color: "text-electric-blue", desc: "Building RESTful APIs with Node.js, Express, and MongoDB." },
  { name: "Voice Over", icon: Cpu, color: "text-neon-purple", desc: "Professional voice modulation and creative performance." },
  { name: "Project Management", icon: Shield, color: "text-text-muted", desc: "Ensuring timely delivery and high-quality creative outputs." },
  { name: "Team Leadership", icon: Zap, color: "text-spidey-red", desc: "Mentoring teams and leading collaborative projects." },
  { name: "Problem Solving", icon: Target, color: "text-electric-blue", desc: "Applying analytical expertise to tech projects." },
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
