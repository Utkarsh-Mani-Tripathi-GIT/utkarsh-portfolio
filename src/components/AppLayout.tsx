"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { CityBackground } from "@/components/CityBackground";
import { CustomCursor } from "@/components/CustomCursor";
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
    // Keyboard shortcuts for search trigger
    const handleKeyDown = (e: KeyboardEvent) => {
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
          className="relative min-h-screen"
        >
          <CityBackground />
          <CustomCursor />
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
