"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HangingSpider } from "@/components/HangingSpider";

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const highlight = params.get("highlight");
    if (highlight) {
      const el = document.getElementById(highlight);
      if (el) {
        const timerScroll = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setActiveHighlight(highlight);
        }, 500);

        const timerFade = setTimeout(() => {
          setActiveHighlight(null);
        }, 4500);

        return () => {
          clearTimeout(timerScroll);
          clearTimeout(timerFade);
        };
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    
    // Simulate loading for snappy multiverse sync animation
    setTimeout(() => {
      setStatus("success");
      
      // Construct mailto link and trigger browser client
      const mailtoUrl = `mailto:Utkarshmanitripathi2006@gmail.com?subject=Signal from Portfolio: ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AReply to: ${encodeURIComponent(email)}`;
      window.location.href = mailtoUrl;
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      
      // Clear status after some time
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="scroll-mt-28 py-20 md:py-32 container mx-auto px-6 relative">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        <div className="flex flex-col items-center gap-6 md:gap-8 w-full md:w-auto shrink-0">
          {/* Left: Spider Logo */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0 flex items-center justify-center rounded-full border border-spidey-red/20 bg-background overflow-hidden"
          >
            <motion.img
              src="/images/spiderman-hanging.png"
              alt="Spiderman Hanging"
              className="w-[85%] h-[85%] object-contain relative z-10"
              variants={{
                hidden: { y: -300, opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 50, 
                    damping: 10,
                    duration: 1 
                  }
                }
              }}
            />
          </motion.div>

          {/* Direct channels removed for now */}
        </div>

        {/* Right: Form / Info */}
        <div className="flex-1 space-y-8 md:space-y-12 w-full">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
              The Signal
            </h2>
            <p className="text-text-secondary text-sm md:text-lg">
              Ready to collaborate in this universe or the next? Let&apos;s build something spectacular.
            </p>
          </div>

          <form onSubmit={handleSubmit} id="email" className={cn(
            "space-y-4 md:space-y-6 p-4 rounded-xl border border-transparent transition-all duration-500",
            activeHighlight === "email" ? "border-spidey-red/40 bg-spidey-red/5 shadow-[0_0_25px_rgba(255,42,42,0.25)] scale-[1.01]" : ""
          )}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading"}
                required
                className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-3 md:px-6 md:py-4 text-text-primary text-sm placeholder:text-text-muted focus:border-spidey-red transition-colors outline-none"
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
                className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-3 md:px-6 md:py-4 text-text-primary text-sm placeholder:text-text-muted focus:border-spidey-red transition-colors outline-none"
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "loading"}
              required
              className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-3 md:px-6 md:py-4 text-text-primary text-sm placeholder:text-text-muted focus:border-spidey-red transition-colors outline-none resize-none"
            />
            
            <button
              type="submit"
              disabled={status === "loading"}
              className="group flex items-center justify-center gap-3 w-full bg-spidey-red text-white font-black uppercase tracking-widest py-4 md:py-5 rounded-sm hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-sm cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <span>Broadcasting Signal...</span>
                  <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  <span>Send Signal</span>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500 animate-pulse text-center">
                SIGNAL BROADCASTED SUCCESSFULLY! REDIRECTING...
              </p>
            )}
            {status === "error" && (
              <p className="text-[10px] uppercase font-black tracking-widest text-spidey-red animate-pulse text-center">
                ERROR: ALL CHANNELS MUST BE FILLED.
              </p>
            )}
          </form>

          <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-4 pt-8 border-t border-white/10 w-full text-center">
             <a href="https://github.com/Utkarsh-Mani-Tripathi-GIT" target="_blank" className="text-text-muted hover:text-spidey-red transition-all font-black uppercase tracking-widest text-[9px] md:text-xs px-1 py-0.5 rounded border border-transparent" title="Visit GitHub Profile">Github</a>
             <a id="linkedin" href="https://www.linkedin.com/in/utkarsh-mani-tripathi-b48b3730a/" target="_blank" className={cn(
               "text-text-muted hover:text-spidey-red transition-all font-black uppercase tracking-widest text-[9px] md:text-xs px-1 py-0.5 rounded border border-transparent",
               activeHighlight === "linkedin" ? "border-spidey-red/40 bg-spidey-red/5 text-spidey-red shadow-[0_0_15px_rgba(255,42,42,0.2)]" : ""
             )} title="Visit LinkedIn Profile">LinkedIn</a>
             <a href="https://x.com/utkarshmanitr11" target="_blank" className="text-text-muted hover:text-spidey-red transition-all font-black uppercase tracking-widest text-[9px] md:text-xs px-1 py-0.5 rounded border border-transparent" title="Visit Twitter Profile">Twitter</a>
             <a href="https://www.instagram.com/jhandupatel.69" target="_blank" className="text-text-muted hover:text-spidey-red transition-all font-black uppercase tracking-widest text-[9px] md:text-xs px-1 py-0.5 rounded border border-transparent" title="Visit Instagram Profile">Instagram</a>
             <a id="whatsapp" href="https://wa.me/917065163175?text=hey%20i%20was%20just%20checking%20out%20your%20portfolio%20website%20and....." target="_blank" className={cn(
               "text-text-muted hover:text-spidey-red transition-all font-black uppercase tracking-widest text-[9px] md:text-xs px-1 py-0.5 rounded border border-transparent",
               activeHighlight === "whatsapp" ? "border-spidey-red/40 bg-spidey-red/5 text-spidey-red shadow-[0_0_15px_rgba(255,42,42,0.2)]" : ""
             )} title="Chat on WhatsApp">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
};
