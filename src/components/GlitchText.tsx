"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: any;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className,
  as: Component = "span",
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const redLayerRef = useRef<HTMLSpanElement>(null);
  const blueLayerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        defaults: { duration: 0.1, ease: "power4.inOut" },
      });

      tl.to([redLayerRef.current, blueLayerRef.current], {
        opacity: 1,
        duration: 0.05,
      })
        .to(redLayerRef.current, { x: -2, y: 1 })
        .to(blueLayerRef.current, { x: 2, y: -1 }, "<")
        .to(redLayerRef.current, { x: 2, y: -2 })
        .to(blueLayerRef.current, { x: -2, y: 2 }, "<")
        .to([redLayerRef.current, blueLayerRef.current], {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.05,
        });

      // Random glitch bursts
      const triggerRandomGlitch = () => {
        gsap.to(containerRef.current, {
          skewX: () => (Math.random() > 0.9 ? Math.random() * 20 - 10 : 0),
          duration: 0.1,
          onComplete: () => {
            gsap.to(containerRef.current, { skewX: 0, duration: 0.1 });
            setTimeout(triggerRandomGlitch, Math.random() * 3000 + 1000);
          },
        });
      };

      triggerRandomGlitch();
    });

    return () => ctx.revert();
  }, []);

  return (
    <Component
      ref={containerRef}
      className={cn("relative inline-block overflow-hidden", className)}
    >
      {/* Red Layer */}
      <span
        ref={redLayerRef}
        className="absolute inset-0 text-spidey-red opacity-0 mix-blend-screen pointer-events-none"
        aria-hidden="true"
      >
        {text}
      </span>
      
      {/* Main Text */}
      <span className="relative z-10">{text}</span>

      {/* Blue Layer */}
      <span
        ref={blueLayerRef}
        className="absolute inset-0 text-spidey-blue opacity-0 mix-blend-screen pointer-events-none"
        aria-hidden="true"
      >
        {text}
      </span>
    </Component>
  );
};
