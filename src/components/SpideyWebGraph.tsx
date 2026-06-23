"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  link: string;
  category: string;
}

interface GraphLink {
  source: string;
  target: string;
}

const NODES: GraphNode[] = [
  // CENTER
  { id: "home", label: "Home", x: 0, y: 0, z: 0, color: "#e11d48", size: 28, link: "/", category: "hub" },
  
  // CATEGORIES
  { id: "projects", label: "Projects Overview", x: -80, y: 80, z: 50, color: "#0066cc", size: 18, link: "/projects", category: "category" },
  { id: "skills", label: "Skills & Abilities", x: 80, y: -80, z: -50, color: "#e11d48", size: 18, link: "/skills", category: "category" },
  { id: "experience", label: "Experiences", x: 120, y: 60, z: 20, color: "#1a1a2e", size: 18, link: "/experience", category: "category" },
  { id: "origin", label: "Origin Story", x: -120, y: -60, z: -20, color: "#ffffff", size: 18, link: "/about", category: "category" },

  // PROJECT LEAFS
  { id: "nlo", label: "National Legal Observatory", x: -160, y: 150, z: 80, color: "#cc0000", size: 12, link: "/projects?highlight=legal-observatory", category: "project" },
  { id: "stickman", label: "Stickman Runner", x: -220, y: 80, z: 40, color: "#0044aa", size: 12, link: "/projects?highlight=stickman-runner", category: "project" },
  { id: "ultimate", label: "Ultimate Runner", x: -140, y: 220, z: 10, color: "#ff3333", size: 12, link: "/projects?highlight=ultimate-runner", category: "project" },

  // EXPERIENCES LEAFS
  { id: "exp-camera", label: "Camera Crew & Tech Lead", x: 200, y: 120, z: 30, color: "#0a0a0a", size: 12, link: "/experience?highlight=crossover-camera", category: "experience" },
  { id: "exp-flipkart", label: "Software Intern (Flipkart)", x: 260, y: 40, z: -20, color: "#1a1a1a", size: 12, link: "/experience?highlight=flipkart-samarth", category: "experience" },
  { id: "exp-voice", label: "Voice Over Artist", x: 160, y: 180, z: 60, color: "#2a2a2a", size: 12, link: "/experience?highlight=crossover-voice", category: "experience" },

  // SKILLS LEAFS
  { id: "sk-react", label: "React & Next.js", x: 140, y: -180, z: -60, color: "#ff2222", size: 12, link: "/skills?highlight=react-nextjs", category: "skill" },
  { id: "sk-python", label: "Python & C Scripting", x: 220, y: -120, z: -80, color: "#0055bb", size: 12, link: "/skills?highlight=python-c", category: "skill" },
  { id: "sk-backend", label: "Backend & Databases", x: 80, y: -220, z: -40, color: "#dd1111", size: 12, link: "/skills?highlight=backend-apis", category: "skill" },
  { id: "sk-ai", label: "AI & Agents", x: 180, y: -200, z: -10, color: "#004499", size: 12, link: "/skills?highlight=ai-automation", category: "skill" },
  { id: "sk-git", label: "Git & DevOps", x: 240, y: -60, z: -30, color: "#ee2222", size: 12, link: "/skills?highlight=git-devops", category: "skill" },
  { id: "sk-audio", label: "Audio Production", x: 30, y: -180, z: -90, color: "#0066dd", size: 12, link: "/skills?highlight=voice-over", category: "skill" },
  { id: "sk-bts", label: "BTS Content Prod", x: -30, y: -220, z: -20, color: "#cc0000", size: 12, link: "/skills?highlight=camera-production", category: "skill" },
  { id: "sk-leadership", label: "Team Leadership", x: 250, y: -180, z: 40, color: "#0055cc", size: 12, link: "/skills?highlight=team-leadership", category: "skill" },
  { id: "sk-solving", label: "Technical Problem Solving", x: 110, y: -280, z: -100, color: "#ff3333", size: 12, link: "/skills?highlight=problem-solving", category: "skill" },

  // ORIGIN DETAILS
  { id: "edu-btech", label: "B.Tech in CSE", x: -200, y: -120, z: -60, color: "#e0e0e0", size: 12, link: "/about?highlight=btech-in-cse", category: "origin" },
  { id: "edu-school", label: "Ryan High Schooling", x: -160, y: -200, z: -40, color: "#d0d0d0", size: 12, link: "/about?highlight=ryan-schooling", category: "origin" },
  { id: "edu-resume", label: "Download Full Resume", x: -240, y: -40, z: -10, color: "#f0f0f0", size: 12, link: "/Utkarsh_Mani_Tripathi_Resume.pdf", category: "origin" }
];

const LINKS: GraphLink[] = [
  // CATEGORIES TO HUB
  { source: "projects", target: "home" },
  { source: "skills", target: "home" },
  { source: "experience", target: "home" },
  { source: "origin", target: "home" },

  // PROJECT LEAFS TO PROJECTS
  { source: "nlo", target: "projects" },
  { source: "stickman", target: "projects" },
  { source: "ultimate", target: "projects" },

  // EXPERIENCES LEAFS TO EXPERIENCE
  { source: "exp-camera", target: "experience" },
  { source: "exp-flipkart", target: "experience" },
  { source: "exp-voice", target: "experience" },

  // SKILLS LEAFS TO SKILLS
  { source: "sk-react", target: "skills" },
  { source: "sk-python", target: "skills" },
  { source: "sk-backend", target: "skills" },
  { source: "sk-ai", target: "skills" },
  { source: "sk-git", target: "skills" },
  { source: "sk-audio", target: "skills" },
  { source: "sk-bts", target: "skills" },
  { source: "sk-leadership", target: "skills" },
  { source: "sk-solving", target: "skills" },

  // ORIGIN LEAFS TO ORIGIN
  { source: "edu-btech", target: "origin" },
  { source: "edu-school", target: "origin" },
  { source: "edu-resume", target: "origin" },

  // INTERCONNECTED CROSS-LINKS (Obsidian style)
  { source: "nlo", target: "sk-react" },
  { source: "nlo", target: "sk-backend" },
  { source: "stickman", target: "sk-react" },
  { source: "stickman", target: "sk-python" },
  { source: "ultimate", target: "sk-python" },
  { source: "exp-camera", target: "sk-bts" },
  { source: "exp-voice", target: "sk-audio" },
  { source: "exp-flipkart", target: "sk-backend" },
  { source: "edu-btech", target: "sk-solving" }
];

export const SpideyWebGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Rotation angles (radians)
  const angleX = useRef(0.003);
  const angleY = useRef(0.003);

  // Mouse interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const currentAngleX = useRef(0.3); // Initial tilt
  const currentAngleY = useRef(0.4);

  // List of projected nodes to handle hit testing
  const projectedNodes = useRef<(GraphNode & { px: number; py: number; pSize: number })[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = (rect?.width || 800) * (window.devicePixelRatio || 1);
      canvas.height = (rect?.height || 600) * (window.devicePixelRatio || 1);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      // Clear with slight alpha to preserve trailing webs (optional, let's keep it clean black/transp)
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      const cx = canvas.width / (2 * (window.devicePixelRatio || 1));
      const cy = canvas.height / (2 * (window.devicePixelRatio || 1));

      // Auto-rotation when not dragging
      if (!isDragging.current) {
        currentAngleX.current += angleX.current;
        currentAngleY.current += angleY.current;
      }

      // Pre-calculate sin/cos
      const cosX = Math.cos(currentAngleX.current);
      const sinX = Math.sin(currentAngleX.current);
      const cosY = Math.cos(currentAngleY.current);
      const sinY = Math.sin(currentAngleY.current);

      // Dynamic size factor based on canvas size, capped at 1.2
      const sizeFactor = Math.min(Math.min(cx, cy) / 340, 1.2);

      // Project Nodes
      projectedNodes.current = NODES.map(node => {
        // Apply sizeFactor to coordinates before rotation
        const nx = node.x * sizeFactor;
        const ny = node.y * sizeFactor;
        const nz = node.z * sizeFactor;

        // Rotate around Y-axis
        let x1 = nx * cosY - nz * sinY;
        let z1 = nz * cosY + nx * sinY;

        // Rotate around X-axis
        let y2 = ny * cosX - z1 * sinX;
        let z2 = z1 * cosX + ny * sinX;

        // Perspective projection with larger distance to reduce distortion
        const distance = 800;
        const scale = distance / (distance + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;
        const pSize = Math.max(2, node.size * sizeFactor * scale);

        return { ...node, px, py, pSize, zDepth: z2 };
      });

      // Sort by depth (back-to-front rendering)
      projectedNodes.current.sort((a, b) => (b as any).zDepth - (a as any).zDepth);

      const nodeMap = new Map<string, typeof projectedNodes.current[0]>();
      projectedNodes.current.forEach(pn => nodeMap.set(pn.id, pn));

      // ─── DRAW SPIDER WEBS ──────────────────────────────────────────
      LINKS.forEach(link => {
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (!source || !target) return;

        // Main thread: Draw thin glowing curve
        ctx.beginPath();
        const midX = (source.px + target.px) / 2;
        const midY = (source.py + target.py) / 2;

        // Add a slight bend to make the web look organic/hanging
        const bendX = midX;
        const bendY = midY + 15 * (source.pSize / 12); // sag downward

        ctx.moveTo(source.px, source.py);
        ctx.quadraticCurveTo(bendX, bendY, target.px, target.py);

        const isHighlighted = hoveredNode && (hoveredNode.id === source.id || hoveredNode.id === target.id);
        
        ctx.lineWidth = isHighlighted ? 1.5 : 0.6;
        ctx.strokeStyle = isHighlighted ? "rgba(225, 29, 70, 0.85)" : "rgba(255, 255, 255, 0.22)";
        ctx.shadowColor = isHighlighted ? "#e11d48" : "rgba(255, 255, 255, 0.3)";
        ctx.shadowBlur = isHighlighted ? 10 : 3;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      });

      // ─── DRAW CONCENTRIC WEB RINGS (Doctor Strange / Spidey Web mesh) ───
      // We draw curved threads connecting lines at various radius increments (0.3, 0.6, 0.8)
      // This creates the exact "Spider Web network" look instead of just straight lines.
      const ringSteps = [0.35, 0.65, 0.85];
      const categories = ["projects", "skills", "experience", "origin"];

      categories.forEach(catId => {
        const catNode = nodeMap.get(catId);
        if (!catNode) return;

        // Find all child nodes linked to this category
        const children = projectedNodes.current.filter(n => n.category === catNode.id || n.category + "s" === catNode.id);
        if (children.length < 2) return;

        // Connect adjacent children with curved ring segments
        ringSteps.forEach(step => {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 0.4;
          ctx.shadowBlur = 0;

          for (let i = 0; i < children.length; i++) {
            const childA = nodeMap.get(children[i].id);
            const childB = nodeMap.get(children[(i + 1) % children.length].id);
            if (!childA || !childB) continue;

            const ax = catNode.px + (childA.px - catNode.px) * step;
            const ay = catNode.py + (childA.py - catNode.py) * step;
            const bx = catNode.px + (childB.px - catNode.px) * step;
            const by = catNode.py + (childB.py - catNode.py) * step;

            const mx = (ax + bx) / 2;
            const my = (ay + by) / 2;
            const bendX = mx + (catNode.px - mx) * 0.15; // bend slightly toward center
            const bendY = my + (catNode.py - my) * 0.15;

            if (i === 0) ctx.moveTo(ax, ay);
            ctx.quadraticCurveTo(bendX, bendY, bx, by);
          }
          ctx.stroke();
        });
      });

      // ─── DRAW NODES ──────────────────────────────────────────────
      projectedNodes.current.forEach(node => {
        const isHovered = hoveredNode?.id === node.id;
        
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.pSize + (isHovered ? 4 : 0), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        
        // Custom Spidey glow shadow
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered ? 25 : 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw node border
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.pSize + (isHovered ? 4 : 0), 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Node Label - show for all nodes
        const isLeafNode = node.category === "project" || node.category === "skill" || node.category === "experience" || node.category === "origin";
        ctx.font = isHovered ? "black italic 12px sans-serif" : (isLeafNode ? "italic 9px sans-serif" : "bold italic 10px sans-serif");
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.8)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Determine label position (top or bottom of the circle)
        const labelOnBottom = node.y >= 0;
        const txt = node.label;
        const textWidth = ctx.measureText(txt).width;
        const bgHeight = isLeafNode ? 12 : 14;
        
        let textY: number;
        let bgY: number;
        
        if (labelOnBottom) {
          textY = node.py + node.pSize + (isLeafNode ? 10 : 11);
          bgY = node.py + node.pSize + 4;
        } else {
          textY = node.py - node.pSize - (isLeafNode ? 10 : 11);
          bgY = node.py - node.pSize - (isLeafNode ? 16 : 18);
        }

        // Draw subtle dark background behind text for readability
        ctx.fillStyle = "rgba(10, 10, 10, 0.75)";
        ctx.fillRect(node.px - textWidth / 2 - 4, bgY, textWidth + 8, bgHeight);

        ctx.fillStyle = isHovered ? "#ff1a1a" : "#ffffff";
        ctx.fillText(txt, node.px, textY);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hoveredNode]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging.current) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      
      currentAngleY.current += deltaX * 0.007;
      currentAngleX.current += deltaY * 0.007;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    } else {
      // Hover hit detection
      let found: GraphNode | null = null;
      for (let i = projectedNodes.current.length - 1; i >= 0; i--) {
        const node = projectedNodes.current[i];
        const dx = x - node.px;
        const dy = y - node.py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= node.pSize + 6) {
          found = node;
          break;
        }
      }
      setHoveredNode(found);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleClick = () => {
    if (hoveredNode && !isDragging.current) {
      router.push(hoveredNode.link);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Mystical instructions overlay */}
      <div className="absolute top-4 left-6 z-10 pointer-events-none text-left space-y-1">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-spidey-red">Spidey Web Connection Matrix</p>
        <p className="text-[8px] font-bold uppercase tracking-wider text-text-muted">Click nodes to travel. Drag to rotate grid.</p>
      </div>

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        className={cn(
          "w-full h-full outline-none block",
          isDragging.current ? "cursor-grabbing" : "cursor-grab"
        )}
      />
    </div>
  );
};
