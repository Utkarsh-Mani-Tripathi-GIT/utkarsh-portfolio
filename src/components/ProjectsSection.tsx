"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickmanGame } from "./StickmanGame";
import { Download, Play, X, Code } from "lucide-react";

const PROJECTS = [
  {
    title: "Stickman Runner: Multiverse",
    description: "A high-fidelity recreaton of my Python game. Features dynamic day/night transitions, duck/slide mechanics, screen shake, and enemy spaceships.",
    tech: ["React", "Canvas", "Game Engine", "GSAP"],
    isPlayable: true,
    github: "https://github.com/Utkarsh-Mani-Tripathi-GIT/stickman-runner-python",
    download: "https://github.com/Utkarsh-Mani-Tripathi-GIT/stickman-runner-python/archive/refs/heads/main.zip",
  }
];

export const ProjectsSection = () => {
  const [playingGame, setPlayingGame] = useState(false);

  return (
    <section id="projects" className="py-20 md:py-32 container mx-auto px-6">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10"
        >
          <div className="space-y-4">
            <span className="text-spidey-red font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Sole Focus</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
              Featured <br /> <span className="text-spidey-red">Game</span>
            </h2>
          </div>
        </motion.div>

        <div className="max-w-4xl">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl hover:border-spidey-red/50 transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 relative z-10">
                <div className="flex-1 space-y-6 md:space-y-8">
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

                  <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                    <button 
                      onClick={() => setPlayingGame(true)}
                      className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-spidey-red text-white font-black uppercase tracking-widest text-[10px] md:text-xs rounded-sm shadow-[0_10px_30px_rgba(255,42,42,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-3"
                    >
                      <Play size={14} fill="currentColor" />
                      Play
                    </button>
                    
                    <a 
                      href={project.download}
                      className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] md:text-xs rounded-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
                    >
                      <Download size={14} />
                      Source
                    </a>

                    <a 
                      href={project.github}
                      target="_blank"
                      className="p-3 md:p-4 bg-white/5 border border-white/10 text-white rounded-sm hover:text-spidey-red transition-colors flex items-center justify-center"
                      title="View GitHub Repository"
                    >
                      <Code size={18} />
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-72 aspect-video lg:aspect-square bg-black/40 rounded-xl border border-white/5 flex items-center justify-center group-hover:border-spidey-red/20 transition-colors overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-spidey-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="text-4xl md:text-6xl group-hover:scale-125 transition-transform duration-500 select-none">🕷️</span>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-spidey-red/5 blur-[120px] rounded-full group-hover:bg-spidey-red/10 transition-colors" />
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
