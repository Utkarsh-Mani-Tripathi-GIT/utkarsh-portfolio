"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { CityBackground } from "@/components/CityBackground";
import { Navbar } from "@/components/Navbar";
import { SearchEngine } from "@/components/SearchEngine";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navProgress, setNavProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    // Initial site load timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Lock scrolling on Home page completely
    if (pathname === "/") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [pathname]);

  useEffect(() => {
    // On navigation route change, trigger a snappy glowing progress bar
    if (!loading) {
      setNavVisible(true);
      setNavProgress(20);
      
      const timer1 = setTimeout(() => setNavProgress(65), 80);
      const timer2 = setTimeout(() => {
        setNavProgress(100);
        const timer3 = setTimeout(() => {
          setNavVisible(false);
          setNavProgress(0);
        }, 150);
        return () => clearTimeout(timer3);
      }, 250);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [pathname, loading]);

  useEffect(() => {
    // Web Audio API Mechanical Keyboard Sound Synthesizer
    let audioCtx: AudioContext | null = null;
    const ignoredKeys = ["Control", "Shift", "Alt", "Meta", "CapsLock", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    const playKeySound = () => {
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        const now = audioCtx.currentTime;

        // 1. High frequency tick (Cherry MX tactile feedback contact)
        const clickOsc = audioCtx.createOscillator();
        const clickGain = audioCtx.createGain();
        clickOsc.type = "sine";
        clickOsc.frequency.setValueAtTime(1700 + Math.random() * 500, now);
        clickOsc.frequency.exponentialRampToValueAtTime(150, now + 0.007);
        
        clickGain.gain.setValueAtTime(0.04, now);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.007);

        clickOsc.connect(clickGain);
        clickGain.connect(audioCtx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.007);

        // 2. Main lower-frequency "clack" (Keycap bottoming out)
        const clackOsc = audioCtx.createOscillator();
        const clackGain = audioCtx.createGain();
        
        clackOsc.type = "triangle";
        const baseFreq = 165 + Math.random() * 35; // Randomize pitch slightly
        clackOsc.frequency.setValueAtTime(baseFreq, now);
        clackOsc.frequency.linearRampToValueAtTime(baseFreq - 25, now + 0.032);

        clackGain.gain.setValueAtTime(0.09, now);
        clackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

        clackOsc.connect(clackGain);
        clackGain.connect(audioCtx.destination);
        clackOsc.start(now);
        clackOsc.stop(now + 0.032);

        // 3. Noise burst for natural mechanical switch housing rattle
        const bufferSize = audioCtx.sampleRate * 0.01;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = "lowpass";
        noiseFilter.frequency.setValueAtTime(800, now);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.025, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        
        noiseNode.start(now);
        noiseNode.stop(now + 0.01);

      } catch (error) {
        console.warn("Failed to play mechanical key sound:", error);
      }
    };

    // Keyboard shortcuts for search trigger & sound player
    const handleKeyDown = (e: KeyboardEvent) => {
      // Play sound for all valid typing inputs
      if (!ignoredKeys.includes(e.key) && !e.metaKey && !e.ctrlKey) {
        playKeySound();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    // Custom event to trigger from anywhere (Navbar buttons)
    const handleOpenSearchEvent = () => {
      setSearchOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-engine", handleOpenSearchEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-engine", handleOpenSearchEvent);
    };
  }, []);

  return (
    <>
      {/* Top Navigation Progress Bar */}
      {navVisible && (
        <div 
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-spidey-red via-electric-blue to-spidey-red shadow-[0_0_12px_rgba(255,42,42,0.8),0_0_20px_rgba(0,174,239,0.8)] z-[9999] transition-all duration-200 ease-out"
          style={{ width: `${navProgress}%` }}
        />
      )}

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loader" 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <SkeletonLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className={`relative min-h-screen ${pathname === "/" ? "h-screen overflow-hidden" : ""}`}
        >
          <CityBackground />
          <Navbar />
          <main className="relative z-10 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
          
          <SearchEngine isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </motion.div>
      )}
    </>
  );
}
