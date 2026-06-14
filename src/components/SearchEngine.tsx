"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft, Sparkles, FolderCode, Briefcase, Award, GraduationCap, Phone, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchItem {
  id: string;
  category: "projects" | "skills" | "experience" | "about" | "contact";
  title: string;
  subtitle?: string;
  description: string;
  keywords: string[];
  route: string;
  emoji?: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Projects
  {
    id: "stickman-runner",
    category: "projects",
    title: "Stickman Runner: Multiverse",
    subtitle: "React · Canvas · GSAP",
    description: "High-fidelity recreation of a Python runner game with day/night cycles, spaceships, and duck mechanics.",
    keywords: ["stickman", "game", "runner", "canvas", "gsap", "play"],
    route: "/projects?highlight=stickman-runner",
    emoji: "🎮",
    icon: FolderCode,
  },
  {
    id: "legal-observatory",
    category: "projects",
    title: "National Legal Observatory",
    subtitle: "Next.js · Supabase · Tailwind",
    description: "Independent legal research platform covering constitutional review, judgments, and policies.",
    keywords: ["legal", "observatory", "bhoomija", "khanna", "law", "supabase", "journal", "academic"],
    route: "/projects?highlight=legal-observatory",
    emoji: "⚖️",
    icon: FolderCode,
  },
  {
    id: "ultimate-runner",
    category: "projects",
    title: "Ultimate Runner (In Dev)",
    subtitle: "Python · Game Dev",
    description: "Hybrid infinite runner combining Temple Run and Subway Surfers mechanics in active Python development.",
    keywords: ["ultimate", "runner", "python", "game", "3d", "active", "dev"],
    route: "/projects?highlight=ultimate-runner",
    emoji: "🔨",
    icon: FolderCode,
  },
  // Experience
  {
    id: "crossover-camera",
    category: "experience",
    title: "Camera Crew & Tech Lead",
    subtitle: "Unofficial Freelance (2025 - Present)",
    description: "Managing camera ops, BTS, and set tech for production shoots in Gurugram.",
    keywords: ["crossover", "camera", "tech", "bts", "shoot", "video", "production"],
    route: "/experience?highlight=crossover-camera",
    emoji: "🎥",
    icon: Briefcase,
  },
  {
    id: "flipkart-samarth",
    category: "experience",
    title: "Software Development Intern",
    subtitle: "Flipkart Samarth (Feb 2025 - Apr 2025)",
    description: "Built Express & MongoDB APIs optimizing seller onboarding.",
    keywords: ["flipkart", "samarth", "intern", "node", "mongodb", "express", "api", "backend"],
    route: "/experience?highlight=flipkart-samarth",
    emoji: "🛒",
    icon: Briefcase,
  },
  {
    id: "crossover-voice",
    category: "experience",
    title: "Voice Over Artist",
    subtitle: "Unofficial Freelance (Nov 2020 - Feb 2024)",
    description: "Professional voice overs and modulation across Assam, Delhi, and Dehradun.",
    keywords: ["voice", "over", "artist", "crossover", "audio", "mic", "delivery"],
    route: "/experience?highlight=crossover-voice",
    emoji: "🎙️",
    icon: Briefcase,
  },
  // Skills
  {
    id: "skill-react",
    category: "skills",
    title: "React & Next.js 19",
    subtitle: "Frontend Frameworks",
    description: "Building responsive web interfaces, fullstack features, and dynamic animations.",
    keywords: ["react", "next", "next.js", "frontend", "web", "tailwind", "tsx"],
    route: "/skills?highlight=react-nextjs",
    emoji: "💻",
    icon: Award,
  },
  {
    id: "skill-python",
    category: "skills",
    title: "Python & C Programming",
    subtitle: "Scripting & Core logic",
    description: "Automation, scripts, game logic, and writing optimized code since the start.",
    keywords: ["python", "c", "script", "automation", "core", "logic"],
    route: "/skills?highlight=python-c",
    emoji: "🐍",
    icon: Award,
  },
  {
    id: "skill-backend",
    category: "skills",
    title: "Backend & REST APIs",
    subtitle: "Node.js · Express · MongoDB",
    description: "Structuring server routing, user auth, and scalable database connections.",
    keywords: ["backend", "api", "rest", "node", "express", "mongodb", "auth"],
    route: "/skills?highlight=backend-apis",
    emoji: "🧱",
    icon: Award,
  },
  {
    id: "skill-ai",
    category: "skills",
    title: "AI & Automation Workflows",
    subtitle: "LLM Orchestration",
    description: "Integrating Gemini API, prompt engineering, and building agentic coding setups.",
    keywords: ["ai", "gemini", "automation", "llm", "prompt", "agentic"],
    route: "/skills?highlight=ai-automation",
    emoji: "🤖",
    icon: Award,
  },
  {
    id: "skill-production",
    category: "skills",
    title: "Camera & Video Production",
    subtitle: "Creative Media",
    description: "Camera operator, BTS captures, visual composition, and production handling.",
    keywords: ["camera", "video", "production", "crew", "shoot", "lens"],
    route: "/skills?highlight=camera-production",
    emoji: "🎬",
    icon: Award,
  },
  // About
  {
    id: "about-cse",
    category: "about",
    title: "B.Tech CSE Student",
    subtitle: "GTB4CEC, Delhi (2024 - Present)",
    description: "Studying Computer Science Engineering in Delhi; building tech tools and platforms.",
    keywords: ["cse", "college", "gtb", "gtb4cec", "delhi", "btech", "degree"],
    route: "/about?highlight=btech-in-cse",
    emoji: "🎓",
    icon: GraduationCap,
  },
  {
    id: "about-location",
    category: "about",
    title: "Gurugram Base",
    subtitle: "Location & College Roots",
    description: "Always based in Gurugram, traveling to Rajouri Garden, Delhi for college.",
    keywords: ["gurugram", "delhi", "location", "ncr", "home"],
    route: "/about",
    emoji: "📍",
    icon: GraduationCap,
  },
  // Contact
  {
    id: "contact-whatsapp",
    category: "contact",
    title: "WhatsApp Channel",
    subtitle: "+91 7065163175",
    description: "Direct chat starting with 'hey i was just checking out your portfolio website and.....'",
    keywords: ["whatsapp", "chat", "phone", "number", "msg", "text"],
    route: "/contact?highlight=whatsapp",
    emoji: "💬",
    icon: Phone,
  },
  {
    id: "contact-linkedin",
    category: "contact",
    title: "LinkedIn Profile",
    subtitle: "Utkarsh Mani Tripathi",
    description: "Professional networking profile highlighting engineering and media details.",
    keywords: ["linkedin", "profile", "connect", "jobs", "network"],
    route: "/contact?highlight=linkedin",
    emoji: "👔",
    icon: Phone,
  },
  {
    id: "contact-email",
    category: "contact",
    title: "Email Dispatch",
    subtitle: "Utkarshmanitripathi2006@gmail.com",
    description: "Send a direct project query or signal to my primary inbox.",
    keywords: ["email", "mail", "gmail", "inbox", "send"],
    route: "/contact?highlight=email",
    emoji: "✉️",
    icon: Phone,
  },
];

export const SearchEngine = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items
  const filtered = SEARCH_ITEMS.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelectItem = (item: SearchItem) => {
    router.push(item.route);
    onClose();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelectItem(filtered[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-10">
        {/* Backdrop filter overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#0A0A0F]/95 border-2 border-spidey-red/40 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,42,42,0.25)] flex flex-col max-h-[80vh] z-10"
        >
          {/* Halftone BG Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '16px 16px' }} />

          {/* Search bar input container */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 relative z-10">
            <Search className="text-spidey-red" size={20} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search anything about Utkarsh... (projects, skills, contact)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white placeholder-text-muted focus:outline-none text-base font-semibold uppercase italic tracking-wide"
            />
            <button 
              onClick={onClose} 
              className="p-1 text-text-muted hover:text-spidey-red hover:bg-white/5 rounded transition-colors"
              title="Close Search Engine"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 max-h-[50vh] scrollbar-thin scrollbar-thumb-white/10">
            {filtered.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Sparkles className="mx-auto text-spidey-red/50 animate-pulse" size={36} />
                <p className="text-text-muted text-xs uppercase tracking-widest font-black italic">
                  NO DIMENSION MATCHES YOUR QUERY
                </p>
                <p className="text-[10px] text-text-muted/60">
                  Try searching for: "Stickman", "Supabase", "LinkedIn", "Next.js"
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon || FolderCode;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all duration-200 border ${
                        isSelected
                          ? "bg-spidey-red border-spidey-red shadow-[0_0_15px_rgba(255,42,42,0.3)] text-white"
                          : "bg-white/5 border-white/5 text-text-secondary hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`p-2 rounded shrink-0 ${
                          isSelected ? "bg-white/10 text-white" : "bg-white/5 text-spidey-red"
                        }`}>
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs uppercase font-black italic tracking-wider ${
                              isSelected ? "text-white" : "text-text-primary"
                            }`}>
                              {item.title}
                            </span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-[0.15em] border shrink-0 ${
                              isSelected ? "bg-white/20 border-white/10 text-white" : "bg-white/5 border-white/5 text-text-muted"
                            }`}>
                              {item.category}
                            </span>
                          </div>
                          {item.subtitle && (
                            <p className={`text-[9px] uppercase tracking-widest font-semibold leading-none ${
                              isSelected ? "text-white/80" : "text-text-muted"
                            }`}>
                              {item.subtitle}
                            </p>
                          )}
                          <p className={`text-xs leading-normal line-clamp-1 ${
                            isSelected ? "text-white/90" : "text-text-secondary"
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator */}
                      {isSelected && (
                        <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-white/80 shrink-0 select-none">
                          <span>Open</span>
                          <CornerDownLeft size={10} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-5 py-3 border-t border-white/10 bg-black/40 flex justify-between items-center text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-text-muted select-none">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="px-1 py-0.5 bg-white/10 rounded">↑↓</span> Navigate</span>
              <span className="flex items-center gap-1"><span className="px-1 py-0.5 bg-white/10 rounded">Enter</span> Select</span>
            </div>
            <span className="flex items-center gap-1"><span className="px-1 py-0.5 bg-white/10 rounded">Esc</span> Close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
