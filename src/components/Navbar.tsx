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
              "text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full transition-all duration-300 relative",
              pathname === link.path 
                ? "text-white shadow-[0_0_15px_rgba(255,42,42,0.3)]" 
                : "text-text-muted hover:text-white"
            )}
          >
            {pathname === link.path && (
              <motion.span
                layoutId="activeNavTab"
                className="absolute inset-0 bg-spidey-red rounded-full -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
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

      {/* Header Controls (Socials, Resume, Search) */}
      <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
        <a 
          href="https://github.com/Utkarsh-Mani-Tripathi-GIT" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm text-text-muted hover:text-white transition-colors"
          title="GitHub Profile"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>

        <a 
          href="https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm text-text-muted hover:text-white transition-colors"
          title="LinkedIn Profile"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>

        <a 
          href="/Utkarsh_Mani_Tripathi_Resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-[8px] md:text-[10px] uppercase tracking-widest font-black px-3 py-2 md:px-5 md:py-2.5 bg-text-primary text-background rounded-sm hover:bg-spidey-red hover:text-white transition-all duration-300"
        >
          Resume
        </a>

        <button
          onClick={handleOpenSearch}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm text-text-muted hover:text-spidey-red transition-colors"
          aria-label="Search"
          title="Search (Cmd+K)"
        >
          <Search size={16} />
        </button>
        
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
