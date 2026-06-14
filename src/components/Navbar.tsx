"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GlitchText } from "./GlitchText";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMobileMenuOpen(false); // Close menu on route change
  }, [pathname]);

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-search-engine"));
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] px-4 md:px-8 py-4 md:py-5 flex justify-between items-center bg-background/95 backdrop-blur-md border-b border-white/5">
      <div className="pointer-events-auto">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 group">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-spidey-red rounded-sm rotate-45 group-hover:rotate-180 transition-transform duration-500 flex items-center justify-center">
            <span className="-rotate-45 group-hover:rotate-[-180deg] transition-transform duration-500 text-white text-[10px] md:text-xs">🕷️</span>
          </div>
          <GlitchText text="UMT" className="text-text-primary" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-2 pointer-events-auto glass px-4 py-1.5 rounded-full items-center">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={cn(
              "text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full transition-all duration-300",
              pathname === link.path 
                ? "bg-spidey-red text-white shadow-[0_0_15px_rgba(255,42,42,0.3)]" 
                : "text-text-muted hover:text-white"
            )}
          >
            {link.name}
          </Link>
        ))}
        
        <div className="w-px h-3 bg-white/10 mx-1" />



        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-300 text-text-muted hover:text-spidey-red relative overflow-hidden flex items-center justify-center w-6 h-6"
          aria-label="Toggle theme"
          title="Toggle Light/Dark Mode"
        >
          {mounted && (
            <AnimatePresence mode="wait">
              <motion.div
                key={theme === "dark" ? "dark" : "light"}
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute"
              >
                {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
              </motion.div>
            </AnimatePresence>
          )}
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={handleOpenSearch}
          className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm text-white hover:text-spidey-red transition-colors"
          aria-label="Search"
          title="Search (Cmd+K)"
        >
          <Search size={18} />
        </button>

        <Link 
          href="/resume/OVERALL/full-resume.html" 
          className="text-[8px] md:text-[10px] uppercase tracking-widest font-black px-4 md:px-6 py-2.5 bg-text-primary text-background rounded-sm hover:bg-spidey-red hover:text-white transition-all duration-300"
        >
          Resume
        </Link>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm text-white"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[999] bg-background/95 backdrop-blur-2xl pointer-events-auto lg:hidden flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className={cn(
                      "text-4xl font-black italic uppercase tracking-tighter transition-colors",
                      pathname === link.path ? "text-spidey-red" : "text-text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10 flex items-center justify-between">
              <span className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em]">Theme</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold text-xs uppercase tracking-widest"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
