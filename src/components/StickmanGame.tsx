"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export const StickmanGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [showInstall, setShowInstall] = useState(false);

  const keysRef = useRef({ space: false, down: false });
  const gameStateRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);
  const deathCountRef = useRef(0);

  const W = 1000, H = 562;
  const GRAVITY = 0.75, JUMP = -14, GROUND = H - 80, BASE_SPD = 6;

  const initGame = useCallback(() => ({
    p: { x: 80, y: GROUND - 60, w: 44, h: 60, vy: 0, jumping: false },
    obs: [] as any[], ships: [] as any[],
    frame: 0, score: 0, shake: 0, speed: BASE_SPD, dead: false,
  }), []);

  const start = useCallback(() => {
    gameStateRef.current = initGame();
    keysRef.current = { space: false, down: false };
    setScore(0);
    setGameOver(false);
    setShowInstall(false);
    setIsPlaying(true);
  }, [initGame]);

  // Draw a proper stickman (line-based, matching the Python original)
  const drawStickman = (ctx: CanvasRenderingContext2D, x: number, y: number, h: number, frame: number, jumping: boolean) => {
    const BLUE = "#1458d2";  // STICKMAN_BODY from Python
    const HEAD_COL = "#2d2d32"; // STICKMAN_HEAD
    const lw = 3;
    ctx.lineCap = "round";
    ctx.lineWidth = lw;

    if (h <= 35) {
      // DUCKING pose — horizontal body
      const headX = x + 38, headY = y + 6;
      // Head
      ctx.strokeStyle = HEAD_COL;
      ctx.beginPath(); ctx.arc(headX, headY, 6, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(headX + 3, headY - 1, 2, 0, Math.PI * 2); ctx.fill();
      // Horizontal body
      ctx.strokeStyle = BLUE;
      ctx.beginPath(); ctx.moveTo(x + 10, y + 10); ctx.lineTo(x + 34, y + 8); ctx.stroke();
      // Arms (tucked)
      ctx.beginPath(); ctx.moveTo(x + 16, y + 10); ctx.lineTo(x + 6, y + 4); ctx.stroke();
      // Legs (tucked under)
      const fi = frame % 2;
      ctx.beginPath(); ctx.moveTo(x + 10, y + 10); ctx.lineTo(x + 4, fi === 0 ? y + 22 : y + 25); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + 10, y + 10); ctx.lineTo(x + 14, fi === 0 ? y + 23 : y + 19); ctx.stroke();
    } else if (jumping) {
      // JUMPING pose — arms up, legs bent
      const cx = x + 22;
      // Head
      ctx.strokeStyle = HEAD_COL;
      ctx.beginPath(); ctx.arc(cx, y + 8, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(cx + 3, y + 6, 2, 0, Math.PI * 2); ctx.fill();
      // Spine
      ctx.strokeStyle = BLUE;
      ctx.beginPath(); ctx.moveTo(cx, y + 15); ctx.lineTo(cx, y + 34); ctx.stroke();
      // Arms raised up
      ctx.beginPath(); ctx.moveTo(cx, y + 20); ctx.lineTo(cx - 11, y + 9); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, y + 20); ctx.lineTo(cx + 11, y + 9); ctx.stroke();
      // Legs bent
      ctx.beginPath(); ctx.moveTo(cx, y + 34); ctx.lineTo(cx - 8, y + 42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 8, y + 42); ctx.lineTo(cx - 4, y + 50); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, y + 34); ctx.lineTo(cx + 8, y + 42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 8, y + 42); ctx.lineTo(cx + 4, y + 50); ctx.stroke();
    } else {
      // RUNNING pose — animated arms & legs
      const cx = x + 22;
      const fi = Math.floor(frame / 6) % 4;
      // Leg keyframes (knee, foot offsets from hip)
      const legs = [
        [[-5,10],[-9,20]], [[6,10],[11,18]],
        [[-2,10],[-3,20]], [[2,10],[3,20]],
        [[6,10],[11,18]],  [[-5,10],[-9,20]],
        [[2,10],[3,20]],   [[-2,10],[-3,20]],
      ];
      const arms = [[[9,11],[-7,13]],[[3,13],[-3,13]],[[-7,13],[9,11]],[[-3,13],[3,13]]];

      // Head
      ctx.strokeStyle = HEAD_COL;
      ctx.beginPath(); ctx.arc(cx, y + 8, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(cx + 3, y + 7, 2, 0, Math.PI * 2); ctx.fill();
      // Spine
      ctx.strokeStyle = BLUE;
      ctx.beginPath(); ctx.moveTo(cx, y + 15); ctx.lineTo(cx, y + 34); ctx.stroke();
      // Arms
      const arm = arms[fi];
      ctx.beginPath(); ctx.moveTo(cx, y + 20); ctx.lineTo(cx + arm[0][0], y + 20 + arm[0][1]); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, y + 20); ctx.lineTo(cx + arm[1][0], y + 20 + arm[1][1]); ctx.stroke();
      // Legs (2 segments each: hip→knee, knee→foot)
      for (let i = 0; i < 2; i++) {
        const [kn, ft] = legs[fi * 2 + i];
        ctx.beginPath(); ctx.moveTo(cx, y + 34); ctx.lineTo(cx + kn[0], y + 34 + kn[1]); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + kn[0], y + 34 + kn[1]); ctx.lineTo(cx + ft[0], y + 34 + ft[1]); ctx.stroke();
      }
    }
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const gs = gameStateRef.current;
    if (!gs) return;

    const loop = () => {
      const keys = keysRef.current;
      const p = gs.p;

      // Duck
      if (keys.down) { p.h = 30; } else { p.h = 60; }

      // Jump
      if (keys.space && !p.jumping) {
        p.vy = JUMP; p.jumping = true; keys.space = false;
      }

      p.vy += GRAVITY; p.y += p.vy;
      if (p.y > GROUND - p.h) {
        if (p.jumping && p.vy > 2) gs.shake = 4;
        p.y = GROUND - p.h; p.vy = 0; p.jumping = false;
      }

      gs.speed = Math.min(BASE_SPD + gs.score * 0.15, 18);
      gs.frame++;

      // Spawn
      const rate = Math.max(50, 90 - gs.score * 2);
      if (gs.frame % rate === 0) {
        if (Math.random() > 0.3) {
          const oh = 30 + Math.random() * 35;
          gs.obs.push({ x: W + 20, y: GROUND - oh, w: 50 + Math.random() * 35, h: oh, t: "b" });
        } else {
          gs.obs.push({ x: W + 20, y: GROUND - 85 - Math.random() * 40, w: 45, h: 10, t: "m" });
        }
      }
      if (gs.frame % 400 === 0 && gs.score > 5) {
        gs.ships.push({ x: W, y: 70 + Math.random() * 100, w: 90, h: 35, ft: 0 });
      }

      // Move obstacles
      for (let i = gs.obs.length - 1; i >= 0; i--) {
        const o = gs.obs[i];
        o.x -= gs.speed;
        if (p.x + 6 < o.x + o.w && p.x + p.w - 6 > o.x && p.y + 4 < o.y + o.h && p.y + p.h > o.y) {
          gs.dead = true; gs.shake = 15;
        }
        if (o.x + o.w < 0) { gs.obs.splice(i, 1); gs.score++; setScore(gs.score); }
      }

      // Move ships
      for (let i = gs.ships.length - 1; i >= 0; i--) {
        const s = gs.ships[i]; s.x -= 1.5; s.ft++;
        if (s.ft % 150 === 0) {
          gs.obs.push({ x: s.x + 10, y: s.y + s.h, w: 35, h: 10, t: "m", enemy: true });
          gs.shake = 3;
        }
        if (s.x < -100) gs.ships.splice(i, 1);
      }

      if (gs.shake > 0) { gs.shake *= 0.88; if (gs.shake < 0.3) gs.shake = 0; }

      if (gs.dead) {
        cancelAnimationFrame(animFrameRef.current);
        deathCountRef.current++;
        setDeaths(deathCountRef.current);
        if (deathCountRef.current >= 2) { setShowInstall(true); }
        setGameOver(true);
        render(ctx, gs); return;
      }

      render(ctx, gs);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    const render = (ctx: CanvasRenderingContext2D, gs: any) => {
      const p = gs.p;
      // Sky gradient (day→night)
      const t = Math.min(gs.score / 30, 1);
      ctx.fillStyle = `rgb(${Math.floor(10 + t * 5)},${Math.floor(10 + t * 5)},${Math.floor(15 + t * 20)})`;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      if (gs.shake > 0.5) ctx.translate((Math.random() - 0.5) * gs.shake * 2, (Math.random() - 0.5) * gs.shake * 2);

      // Stars
      if (gs.score > 10) {
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        for (let i = 0; i < 20; i++) {
          ctx.fillRect((i * 137 + gs.frame * 0.1) % W, (i * 97) % (GROUND - 50), 2, 2);
        }
      }

      // Ground
      ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();
      // Ground dash marks
      ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 1;
      for (let i = 0; i < W; i += 30) {
        const ox = (i - gs.frame * gs.speed * 0.3) % W;
        if (ox > 0) { ctx.beginPath(); ctx.moveTo(ox, GROUND + 5); ctx.lineTo(ox + 12, GROUND + 5); ctx.stroke(); }
      }

      // Player
      drawStickman(ctx, p.x, p.y, p.h, gs.frame, p.jumping);

      // Obstacles
      for (const o of gs.obs) {
        if (o.t === "b") {
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fillRect(o.x, o.y, o.w, o.h);
          ctx.fillStyle = "#0a0a0a";
          for (let wy = 0; wy < Math.floor(o.h / 16); wy++)
            for (let wx = 0; wx < Math.floor(o.w / 18); wx++)
              ctx.fillRect(o.x + 4 + wx * 18, o.y + 4 + wy * 16, 7, 7);
        } else {
          ctx.fillStyle = o.enemy ? "#e63228" : "#ffc81e";
          ctx.fillRect(o.x, o.y, o.w, o.h);
          ctx.fillStyle = o.enemy ? "rgba(230,50,40,0.2)" : "rgba(255,200,30,0.2)";
          ctx.fillRect(o.x + o.w, o.y - 2, 18, o.h + 4);
        }
      }

      // Spaceships
      for (const s of gs.ships) {
        ctx.fillStyle = "#5a5f6e";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y + s.h / 2);
        ctx.lineTo(s.x + 20, s.y); ctx.lineTo(s.x + s.w - 10, s.y);
        ctx.lineTo(s.x + s.w, s.y + s.h / 2);
        ctx.lineTo(s.x + s.w - 10, s.y + s.h); ctx.lineTo(s.x + 20, s.y + s.h);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#a0d2ff";
        ctx.fillRect(s.x + s.w - 18, s.y + 8, 10, s.h - 16);
        ctx.fillStyle = "rgba(255,100,20,0.5)";
        ctx.fillRect(s.x - 12, s.y + 8, 14, s.h - 16);
      }

      // HUD
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "bold 11px monospace"; ctx.textAlign = "left";
      ctx.fillText("SCORE", 20, 28);
      ctx.fillStyle = "white"; ctx.font = "bold 26px monospace";
      ctx.fillText(String(gs.score), 20, 54);

      ctx.restore();
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, gameOver]);

  // Keyboard
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); if (!isPlaying || gameOver) { start(); return; } keysRef.current.space = true; }
      if (e.code === "ArrowDown" || e.code === "ShiftLeft") { e.preventDefault(); keysRef.current.down = true; }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") keysRef.current.space = false;
      if (e.code === "ArrowDown" || e.code === "ShiftLeft") keysRef.current.down = false;
    };
    window.addEventListener("keydown", dn); window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", dn); window.removeEventListener("keyup", up); };
  }, [isPlaying, gameOver, start]);

  const tap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.duck-btn')) return;
    e.preventDefault();
    if (!isPlaying || gameOver) { start(); return; }
    keysRef.current.space = true;
  }, [isPlaying, gameOver, start]);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-2xl overflow-hidden cursor-pointer touch-none select-none shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/5"
      onClick={tap} onTouchStart={tap}>
      <canvas ref={canvasRef} width={W} height={H} className="w-full h-full block" />

      {/* Start Screen */}
      {!isPlaying && !gameOver && !showInstall && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-center z-10">
          <h3 className="text-white font-black text-3xl sm:text-4xl md:text-6xl uppercase italic tracking-tighter mb-3">Stickman Runner</h3>
          <p className="text-[#1458d2] font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-8">Multiverse Edition</p>
          <div className="px-8 py-3 bg-[#1458d2] text-white font-black uppercase tracking-widest text-[10px] md:text-xs rounded animate-pulse">
            Tap / Click / Space to Start
          </div>
          <div className="hidden md:flex gap-6 mt-6">
            <div className="text-center"><div className="px-3 py-1.5 border border-white/20 rounded text-white text-[10px] font-bold mb-1">SPACE / ↑</div><p className="text-[8px] text-white/40 uppercase">Jump</p></div>
            <div className="text-center"><div className="px-3 py-1.5 border border-white/20 rounded text-white text-[10px] font-bold mb-1">↓ / SHIFT</div><p className="text-[8px] text-white/40 uppercase">Duck</p></div>
          </div>
        </div>
      )}

      {/* Game Over */}
      {gameOver && !showInstall && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-10">
          <h3 className="text-white font-black text-4xl md:text-7xl uppercase italic tracking-tighter mb-2">Game Over</h3>
          <p className="text-white/50 font-bold mb-6 uppercase tracking-widest text-sm">Score: {score}</p>
          <button onClick={(e) => { e.stopPropagation(); start(); }}
            className="px-10 py-3 bg-[#1458d2] text-white font-black uppercase tracking-[0.2em] text-xs rounded hover:scale-105 transition-transform shadow-xl">
            Play Again
          </button>
        </div>
      )}

      {/* Install Prompt (after 2 deaths) */}
      {showInstall && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl z-20 p-6 text-center">
          <div className="max-w-sm space-y-6">
            <div className="w-16 h-16 mx-auto bg-[#1458d2]/20 rounded-2xl flex items-center justify-center border border-[#1458d2]/30">
              <span className="text-3xl">🎮</span>
            </div>
            <h3 className="text-white font-black text-2xl md:text-3xl uppercase italic tracking-tight leading-tight">
              Want the <span className="text-[#1458d2]">Full</span> Experience?
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              The Python version has day/night transitions, spaceships, power-ups, sound effects, and way more intensity. Download it free on GitHub.
            </p>
            <a href="https://github.com/Utkarsh-Mani-Tripathi-GIT/stickman-runner-python/archive/refs/heads/master.zip"
              target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block w-full py-4 bg-[#1458d2] text-white font-black uppercase tracking-widest text-xs rounded-lg hover:scale-[1.02] transition-transform shadow-[0_10px_30px_rgba(20,88,210,0.4)]">
              ⬇ Download Python Game
            </a>
            <a href="https://github.com/Utkarsh-Mani-Tripathi-GIT/stickman-runner-python" target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block w-full py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-lg hover:border-[#1458d2]/50 transition-colors">
              View on GitHub
            </a>
            <button onClick={(e) => { e.stopPropagation(); setShowInstall(false); start(); }}
              className="text-white/30 text-[10px] uppercase tracking-widest font-bold hover:text-white/60 transition-colors pt-2">
              No thanks, keep playing →
            </button>
          </div>
        </div>
      )}

      {/* Mobile Duck Button */}
      {isPlaying && !gameOver && (
        <div className="absolute bottom-4 right-4 pointer-events-auto md:hidden z-20">
          <button
            onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); keysRef.current.down = true; }}
            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); keysRef.current.down = false; }}
            className="duck-btn w-16 h-16 bg-[#1458d2]/80 rounded-full border-4 border-white/30 flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
            <span className="text-white font-black italic uppercase text-[9px]">DUCK</span>
          </button>
        </div>
      )}
    </div>
  );
};
