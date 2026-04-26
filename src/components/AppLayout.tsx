"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { CityBackground } from "@/components/CityBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeSwitchEffect } from "@/components/ThemeSwitchEffect";
import { Navbar } from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial site load timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
          <ThemeSwitchEffect />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10 w-full">
            {children}
          </main>
        </motion.div>
      )}
    </>
  );
}
