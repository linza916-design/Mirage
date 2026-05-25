import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface SplashProps {
  onExplore: () => void;
}

export const SplashView: React.FC<SplashProps> = ({ onExplore }) => {
  return (
    <div className="relative min-h-screen bg-[#fcf8f7] flex flex-col justify-between items-center px-6 py-12 overflow-hidden select-none">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-300/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-indigo-100/30 blur-[100px] pointer-events-none" />

      {/* Decorative Atelier Frame */}
      <div className="w-full max-w-md flex justify-between items-center text-[10px] tracking-[0.3em] text-[#8a817c] uppercase font-sans font-bold">
        <span>EST. 2026</span>
        <span>MIRAGE ATELIER</span>
        <span>PARIS • NY</span>
      </div>

      {/* Main Branding Block */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-md z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          {/* Subtle floral/geometric soft glowing vector line art */}
          <div className="absolute -top-16 text-rose-500/60 animate-pulse">
            <Sparkles size={32} className="stroke-[1px]" />
          </div>

          <h1 className="font-serif text-6xl font-black italic tracking-tighter text-[#1a1a1a] leading-tight uppercase">
            Mirage
          </h1>

          <span className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#eeeae6] to-transparent my-6" />

          <p className="font-sans text-xs md:text-sm text-[#8a817c] tracking-[0.18em] leading-relaxed max-w-[280px] font-medium">
            LUXURY BEAUTY & COUTURE RITUALS
          </p>
        </motion.div>
      </div>

      {/* CTA Layer */}
      <div className="w-full max-w-md flex flex-col items-center gap-6 z-10">
        <p className="text-[11px] text-[#8a817c] font-mono tracking-wider max-w-[280px] text-center leading-relaxed">
          Experience highly-personalized skin-mapping and TikTok modern social
          beauty curation.
        </p>

        <motion.button
          id="splash-explore-button"
          onClick={onExplore}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="group relative w-full h-14 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-full font-sans text-xs font-semibold tracking-[0.2em] uppercase flex justify-center items-center shadow-lg overflow-hidden cursor-pointer transition-colors"
        >
          {/* Soft light shimmer */}
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          <span className="flex items-center gap-2">
            Enter the Ritual
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </motion.button>

        <span className="text-[9px] text-stone-400 tracking-widest uppercase font-mono mt-2">
          Secure Full-Stack Node Environment
        </span>
      </div>
    </div>
  );
};
