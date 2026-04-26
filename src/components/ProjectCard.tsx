"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  link?: string;
  github?: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  image,
  link,
  github,
  index,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full aspect-[4/5] bg-secondary-bg border-2 border-white/10 hover:border-spidey-red/50 transition-colors duration-500 overflow-hidden cursor-pointer"
    >
      {/* Background Texture / Image */}
      <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        {/* Placeholder image or solid color with halftone */}
        <div className={cn("w-full h-full halftone-bg bg-[#1A1A24] flex items-center justify-center")}>
           <span className="text-text-muted text-6xl font-black italic opacity-20">{title.split(' ')[0]}</span>
        </div>
      </div>

      {/* Comic Style Label */}
      <div className="absolute top-4 right-4 z-20">
         <div className="bg-spidey-red text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 -skew-x-12 shadow-[4px_4px_0_white]">
            Mission {index + 1}
         </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 transform translate-z-20">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-text-primary italic group-hover:text-spidey-red transition-colors duration-300">
            {title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="text-[10px] font-bold text-text-muted border border-white/10 px-2 py-0.5 uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>

          <div className="pt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            {link && (
              <a href={link} target="_blank" className="p-2 bg-white text-black rounded-full hover:bg-spidey-red hover:text-white transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" className="p-2 bg-white text-black rounded-full hover:bg-spidey-red hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-spidey-red to-spidey-blue opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
    </motion.div>
  );
};
