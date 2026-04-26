"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const NYCParallax = () => {
  const { scrollYProgress } = useScroll();
  const [mouseX, setMouseX] = React.useState(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rise animations: buildings start lower and move up
  // Static positions for buildings in swing mode
  const yBg = "20%";
  const yMid = "40%";
  const yFore = "60%";
  
  // Spidey swing based on mouse
  const spideyX = mouseX * 200;
  const spideyRotate = mouseX * 45;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-secondary-bg to-background opacity-90" />
      
      {/* Background Layer: Far Buildings */}
      <motion.div
        style={{ y: yBg }}
        className="absolute bottom-0 w-full h-full opacity-10"
      >
        <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full h-auto fill-text-muted">
          <rect x="100" y="300" width="120" height="500" />
          <rect x="300" y="200" width="100" height="600" />
          <rect x="550" y="350" width="150" height="450" />
          <rect x="850" y="250" width="120" height="550" />
          <rect x="1100" y="300" width="140" height="500" />
        </svg>
      </motion.div>

      {/* Middle Layer: Closer Buildings with Windows */}
      <motion.div
        style={{ y: yMid }}
        className="absolute bottom-0 w-full h-full opacity-30"
      >
        <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full h-auto">
          <g className="fill-secondary-bg">
            <rect x="0" y="400" width="180" height="400" />
            <rect x="220" y="350" width="140" height="450" />
            <rect x="420" y="300" width="220" height="500" />
            <rect x="700" y="380" width="180" height="420" />
            <rect x="950" y="320" width="250" height="480" />
            <rect x="1250" y="380" width="140" height="420" />
          </g>
          {/* Neon Windows */}
          <rect x="450" y="320" width="8" height="8" className="fill-electric-blue animate-pulse" />
          <rect x="470" y="320" width="8" height="8" className="fill-electric-blue" />
          <rect x="1000" y="340" width="8" height="8" className="fill-neon-purple" />
          <rect x="1020" y="340" width="8" height="8" className="fill-neon-purple animate-pulse" />
        </svg>
      </motion.div>

      {/* Foreground Layer: Silhouettes */}
      <motion.div
        style={{ y: yFore }}
        className="absolute bottom-0 w-full h-full opacity-60"
      >
        <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full h-auto fill-black">
          <rect x="50" y="600" width="250" height="200" />
          <rect x="350" y="550" width="180" height="250" />
          <rect x="600" y="580" width="350" height="220" />
          <rect x="1050" y="530" width="280" height="270" />
        </svg>
      </motion.div>

      {/* Bottom Mist */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};
