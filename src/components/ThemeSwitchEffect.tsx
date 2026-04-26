"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import confetti from "canvas-confetti";

export const ThemeSwitchEffect = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lastTheme, setLastTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    setLastTheme(theme);
  }, []);

  useEffect(() => {
    if (mounted && lastTheme !== undefined && theme !== lastTheme) {
      // Trigger particles on theme change
      const colors = theme === "dark" ? ["#FF2A2A", "#8A2BE2"] : ["#007AFF", "#E11D2E"];
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true
      });
      
      setLastTheme(theme);
    }
  }, [theme, mounted, lastTheme]);

  if (!mounted) return null;
  return null;
};
