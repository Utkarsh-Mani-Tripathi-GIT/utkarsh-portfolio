"use client";

import { useState, useEffect } from "react";
import { ProjectsSection } from "@/components/ProjectsSection";

import { SpideyWebGraph } from "@/components/SpideyWebGraph";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"list" | "3d">("list");

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (viewMode === "3d") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (nav) nav.style.display = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (nav) nav.style.display = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (nav) nav.style.display = "";
    };
  }, [viewMode]);

  return (
    <div className="pt-24 bg-background text-text-primary min-h-screen overflow-x-hidden flex flex-col items-center pb-20">
      
      <div className="w-full max-w-7xl px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center py-10 md:py-16 space-y-4">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black italic uppercase tracking-tighter text-white">
                  My Multiverse <span className="text-spidey-red">Missions</span>
                </h1>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-spidey-red">
                  PLEASE HIRE ME
                </p>
              </div>
              <div className="w-full relative z-10 bg-background">
                <ProjectsSection onLaunch3D={() => setViewMode("3d")} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="3d-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 w-screen h-screen z-[1050] bg-black overflow-hidden flex flex-col items-center justify-center"
            >
              {/* Doctor Strange Portal sparks border covering the full screen edges */}
              <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,#e11d48,#ea580c,#e11d48)] blur-2xl animate-[spin_20s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-0 opacity-10 bg-[conic-gradient(from_0deg,#00ffff,#e11d48,#00ffff)] blur-3xl animate-[spin_30s_linear_infinite] pointer-events-none" />
              
              {/* Floating Return Button */}
              <button
                onClick={() => setViewMode("list")}
                className="absolute top-6 right-6 z-50 px-5 py-2.5 bg-black/60 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-spidey-red hover:border-spidey-red/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-2 pointer-events-auto"
              >
                <Grid size={12} />
                List View
              </button>

              {/* Fullscreen Canvas Container */}
              <div className="relative w-full h-full">
                <SpideyWebGraph />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
