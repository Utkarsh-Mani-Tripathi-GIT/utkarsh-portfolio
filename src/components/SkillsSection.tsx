"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Shield, Target, Cpu, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import BorderGlow from "@/components/BorderGlow";

const SKILLS = [
  { id: "react-nextjs", name: "React & Next.js", icon: Code, color: "text-electric-blue", desc: "Built flagship Next.js production platforms (NLO) and responsive SPAs using modern React hooks and UI design systems." },
  { id: "python-c", name: "Python / C", icon: Target, color: "text-spidey-red", desc: "Developed script-based automation engines, procedurally generated games, and custom workspace productivity utilities." },
  { id: "backend-apis", name: "Backend & Databases", icon: Brain, color: "text-neon-purple", desc: "Engineered secure REST APIs using Node.js & Express. Designed relational database schemas in PostgreSQL/Supabase and seller onboarding flows." },
  { id: "ai-automation", name: "AI & Automation", icon: Cpu, color: "text-electric-blue", desc: "Integrated Gemini/Gemma models. Programmed custom room controls (Siri/Alexa triggers for lights, AC, projectors, audio)." },
  { id: "git-devops", name: "Git & Deployments", icon: Zap, color: "text-spidey-red", desc: "Version control workflows with Git, CI/CD pipeline structures, and live deployments on Vercel and Netlify." },
  { id: "voice-over", name: "Voice Production & Training", icon: Cpu, color: "text-neon-purple", desc: "Managed vocal setups, acoustic editing, and trained 30+ voice actors for AI model dataset compilation." },
  { id: "camera-production", name: "Camera & Media Production", icon: Target, color: "text-electric-blue", desc: "Paid camera operator and tech lead in an 18-member crew for multi-city video production." },
  { id: "team-leadership", name: "Team Leadership", icon: Shield, color: "text-text-muted", desc: "Coached/led an 11-player basketball squad, trained 30+ voice artists, and directed a team of 5 audio editors." },
  { id: "problem-solving", name: "Problem Solving", icon: Brain, color: "text-spidey-red", desc: "Analyzing complex logic issues, profiling rendering bottlenecks, and optimizing local hardware network endpoints." },
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
              className="group transition-all duration-500 hover:-translate-y-2"
            >
              <BorderGlow
                glowColor="353 84 50"
                colors={['#E11D48', '#1e1b4b', '#ffffff']}
                borderRadius={16}
                glowRadius={40}
                glowIntensity={1.2}
                backgroundColor="rgba(255, 255, 255, 0.02)"
                className={cn(
                  "p-6 md:p-8 border border-white/5 backdrop-blur-md transition-all duration-500",
                  activeHighlight === skill.id
                    ? "border-spidey-red/80 bg-spidey-red/5 shadow-[0_0_25px_rgba(255,42,42,0.25)]"
                    : "hover:border-spidey-red/30"
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
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
