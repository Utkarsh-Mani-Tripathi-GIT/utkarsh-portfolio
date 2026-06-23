"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickmanGame } from "./StickmanGame";
import { Download, Play, X, Code, ExternalLink, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardSpotlight } from "@/components/ui/card-spotlight";

interface ProjectDetails {
  problem: string;
  solution: string;
  workflow?: string;
  challenges?: string;
  metrics?: string;
  impact: string;
  status?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  isPlayable: boolean;
  emoji: string;
  image: string | null;
  github: string;
  download: string | null;
  liveUrl: string | null;
  badge: string | null;
  isMultiverseLauncher?: boolean;
  details: ProjectDetails;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "legal-observatory",
    title: "National Legal Observatory",
    description: "An independent legal research platform and academic journal covering constitutional law, judicial judgments, public policy, and civil rights — built for my friend Bhoomija Khanna, a law student and the platform's founder & chief editor. I'm the tech guy.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    isPlayable: false,
    emoji: "⚖️",
    image: "/images/screenshot-nlo.png",
    github: "https://github.com/Utkarsh-Mani-Tripathi-GIT/legal-observatory",
    download: null,
    liveUrl: "https://legal-observatory.vercel.app/",
    badge: null,
    details: {
      problem: "Legal research and constitutional critiques are locked behind proprietary, expensive paywalls, or distributed in slow offline formats, restricting access to crucial public policy discourse.",
      solution: "Designed and built an open-access Next.js publishing journal with real-time markdown ingestion, strict editorial access control, and dynamic search.",
      workflow: "Enables lawyers, judges, students, and academics to submit manuscripts. Built a multi-stage editorial review system (Draft -> Editorial Board Review -> Revision -> Live). ISSN licensing process is currently active.",
      metrics: "40+ active readers/users, 11 subscribers, contributors include active Judges and Lawyers.",
      impact: "Provides a credible, live publishing channel for constitutional law reviews, establishing a citation-ready online resource."
    }
  },
  {
    id: "stickman-runner",
    title: "Stickman Runner: Multiverse",
    description: "A high-fidelity recreation of my Python game. Features dynamic day/night transitions, duck/slide mechanics, screen shake, and enemy spaceships.",
    tech: ["React", "Canvas", "Game Engine", "GSAP"],
    isPlayable: true,
    emoji: "🕷️",
    image: "/images/screenshot-stickman.png",
    github: "https://github.com/Utkarsh-Mani-Tripathi-GIT/stickman-runner-python",
    download: "https://github.com/Utkarsh-Mani-Tripathi-GIT/stickman-runner-python/archive/refs/heads/master.zip",
    liveUrl: null,
    badge: null,
    details: {
      problem: "Desktop games written in Python/Pygame have high friction for sharing, requiring local interpreter installation and package setups.",
      solution: "Re-engineered the game loop, physics engine, and rendering logic from scratch in TypeScript using HTML5 Canvas and GSAP.",
      challenges: "Synchronizing state updates with browser animation frames (requestAnimationFrame) and maintaining input lag under 5ms on mobile touch events.",
      impact: "Eliminated installation friction entirely. Playable instantly from the portfolio in any browser.",
      status: "Fully playable web build."
    }
  },
  {
    id: "ultimate-runner",
    title: "Ultimate Runner",
    description: "A hybrid infinite runner combining the depth of Temple Run with the energy of Subway Surfers. Currently in active development — featuring 3D lanes, power-ups, and dynamic obstacle generation.",
    tech: ["Game Dev", "Python", "In Progress"],
    isPlayable: false,
    emoji: "🔨",
    image: null,
    github: "https://github.com/Utkarsh-Mani-Tripathi-GIT/Ultimate Runner",
    download: null,
    liveUrl: null,
    badge: "In Development",
    details: {
      problem: "Infinite runners depend on seamless rendering and obstacle generation, but naive game loops quickly bottleneck CPU performance.",
      solution: "Engineered a custom Python game engine implementing object-pooling for obstacles and procedural lane generation.",
      challenges: "Developing predictive collision detection algorithms to resolve high-speed corner cases without stuttering.",
      impact: "Demonstrates advanced software engineering concepts, memory optimization, and physics engines in Python.",
      status: "Prototype completed, active desktop development."
    }
  },
  {
    id: "3d-multiverse",
    title: "3D Connection Multiverse",
    description: "An interactive, custom 3D web projection matrix inspired by the Obsidian Mind Map, visualizing the neural connections between my technical skills, completed projects, academic credentials, and professional experiences. Features responsive spring rotation, drag physics, and immersive node navigation. Regularly updated.",
    tech: ["HTML5 Canvas", "3D Projection", "Custom Physics", "Vector Math"],
    isPlayable: false,
    emoji: "🕸️",
    image: "/images/screenshot-multiverse.png",
    github: "https://github.com/Utkarsh-Mani-Tripathi-GIT/obsidian-brain",
    download: null,
    liveUrl: null,
    badge: "Interactive Experience",
    isMultiverseLauncher: true,
    details: {
      problem: "Traditional text-based resumes and static grids fail to show the complex, interconnected relationships between skills, real projects, and field experiences.",
      solution: "Developed a custom 3D canvas graph engine inspired by the Obsidian Graph View, rendering node hierarchies connected by organic, sagging spider web links with perspective-scaling typography.",
      workflow: "Calculates real-time 3D rotation using trigonometric transformation matrices, projected onto a 2D canvas with depth sorting (back-to-front rendering) and drag-to-spin interactivity.",
      metrics: "Seamless 60 FPS rendering on modern browsers with instant state transition to selected project context.",
      impact: "Creates an immersive, theme-coherent interactive map that elevates portfolio engagement and visually proves mathematical and graphics programming competence."
    }
  }
];

export const ProjectsSection = ({ onLaunch3D }: { onLaunch3D?: () => void }) => {
  const [playingGame, setPlayingGame] = useState(false);
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
    <section id="projects" className="scroll-mt-28 py-20 md:py-32 container mx-auto px-6">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10"
        >
          <div className="space-y-4">
            <span className="text-spidey-red font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">What I&apos;ve Built</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
              Featured <br /> <span className="text-spidey-red">Projects</span>
            </h2>
          </div>
        </motion.div>

        <div className="max-w-4xl space-y-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <CardSpotlight
                id={project.id}
                className={cn(
                  "group relative p-6 md:p-10 rounded-2xl transition-all duration-500 overflow-hidden min-h-[350px] flex items-center",
                  activeHighlight === project.id
                    ? "border-spidey-red bg-spidey-red/5 shadow-[0_0_35px_rgba(255,42,42,0.4)] scale-[1.01]"
                    : "border-white/10 hover:border-spidey-red/50"
                )}
              >
                {/* Full-width image background for project card */}
                {project.image && (
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl select-none pointer-events-none">
                    <img 
                      src={project.image} 
                      alt="" 
                      className="w-full h-full object-cover object-top opacity-20 group-hover:opacity-35 transition-all duration-700 group-hover:scale-[1.02]" 
                    />
                    {/* Radial/Linear overlay to keep text extremely readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95 md:hidden block" />
                  </div>
                )}

                <div className="flex flex-col gap-8 relative z-10 w-full">
                  <div className="space-y-6 md:space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-6xl font-black text-text-primary uppercase italic leading-tight group-hover:text-spidey-red transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {project.tech.map((t, j) => (
                          <span key={j} className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-text-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm md:text-lg leading-relaxed max-w-xl">
                      {project.description}
                    </p>

                    <div className="border-t border-white/5 pt-4 space-y-3 text-xs md:text-sm">
                      {project.details && (
                        <>
                          <div>
                            <span className="font-black uppercase tracking-wider text-spidey-red text-[10px] block mb-0.5">Problem:</span>
                            <span className="text-text-secondary">{project.details.problem}</span>
                          </div>
                          <div>
                            <span className="font-black uppercase tracking-wider text-emerald-500 text-[10px] block mb-0.5">Solution:</span>
                            <span className="text-text-secondary">{project.details.solution}</span>
                          </div>
                          {project.details.workflow && (
                            <div>
                              <span className="font-black uppercase tracking-wider text-amber-500 text-[10px] block mb-0.5">Workflow & Status:</span>
                              <span className="text-text-secondary">{project.details.workflow}</span>
                            </div>
                          )}
                          {project.details.challenges && (
                            <div>
                              <span className="font-black uppercase tracking-wider text-amber-500 text-[10px] block mb-0.5">Challenges:</span>
                              <span className="text-text-secondary">{project.details.challenges}</span>
                            </div>
                          )}
                          {project.details.metrics && (
                            <div>
                              <span className="font-black uppercase tracking-wider text-indigo-400 text-[10px] block mb-0.5">Current Metrics:</span>
                              <span className="text-text-secondary">{project.details.metrics}</span>
                            </div>
                          )}
                          <div>
                            <span className="font-black uppercase tracking-wider text-spidey-red text-[10px] block mb-0.5">Impact:</span>
                            <span className="text-text-secondary">{project.details.impact}</span>
                          </div>
                          {project.details.status && (
                            <div>
                              <span className="font-black uppercase tracking-wider text-text-muted text-[10px] block mb-0.5">Status:</span>
                              <span className="text-text-secondary">{project.details.status}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                      {project.isPlayable && (
                        <button 
                          onClick={() => setPlayingGame(true)}
                          className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-spidey-red text-white font-black uppercase tracking-widest text-[10px] md:text-xs rounded-sm shadow-[0_10px_30px_rgba(255,42,42,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-3"
                        >
                          <Play size={14} fill="currentColor" />
                          Play
                        </button>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-spidey-red text-white font-black uppercase tracking-widest text-[10px] md:text-xs rounded-sm shadow-[0_10px_30px_rgba(255,42,42,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-3"
                        >
                          <ExternalLink size={14} />
                          Live Site
                        </a>
                      )}
                      
                      {project.download && (
                        <a 
                          href={project.download}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-glass-bg border border-text-primary/10 text-text-primary font-black uppercase tracking-widest text-[10px] md:text-xs rounded-sm hover:bg-text-primary hover:text-background transition-all flex items-center justify-center gap-3"
                        >
                          <Download size={14} />
                          Source
                        </a>
                      )}

                      {project.isMultiverseLauncher && onLaunch3D && (
                        <button 
                          onClick={onLaunch3D}
                          className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-spidey-red text-white font-black uppercase tracking-widest text-[10px] md:text-xs rounded-sm shadow-[0_10px_30px_rgba(255,42,42,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-3"
                        >
                          <Eye size={14} />
                          Launch Multiverse
                        </button>
                      )}

                      <a 
                        href={project.github}
                        target="_blank"
                        className="p-3 md:p-4 bg-glass-bg border border-text-primary/10 text-text-primary rounded-sm hover:text-spidey-red hover:border-spidey-red/50 transition-colors flex items-center justify-center"
                        title="View GitHub Repository"
                      >
                        <Code size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {playingGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6"
          >
             <button 
               onClick={() => setPlayingGame(false)}
               className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[2001]"
             >
                <X size={32} />
             </button>
             
             <div className="w-full max-w-5xl space-y-4 md:space-y-8">
                <div className="text-center space-y-2 md:space-y-4">
                   <h2 className="text-3xl md:text-7xl font-black italic uppercase tracking-tighter text-white">Stickman Runner</h2>
                   <p className="text-spidey-red font-bold uppercase tracking-[0.4em] text-[8px] md:text-[10px]">Multiverse Experiment</p>
                </div>
                <StickmanGame />
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">
                   <span className="flex items-center gap-2">Jump: Tap Screen / Space</span>
                   <span className="flex items-center gap-2">Duck: Hold Button / Down</span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
