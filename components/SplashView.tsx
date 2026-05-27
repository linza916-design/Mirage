"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface SplashProps {
  onExplore: () => void;
}

export const SplashView: React.FC<SplashProps> = ({ onExplore }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fff6f9] to-[#faf3ff] flex flex-col justify-between items-center px-8 py-14 select-none">
      {/* Luxury ambient blur glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[520px] h-[520px] rounded-full bg-rose-200/40 blur-[180px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[480px] h-[480px] rounded-full bg-violet-200/30 blur-[170px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.55),transparent_65%)]" />

      {/* floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -18, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white/60 backdrop-blur-sm"
          style={{
            width: 6 + i,
            height: 6 + i,
            top: `${10 + i * 8}%`,
            left: `${10 + i * 7}%`,
          }}
        />
      ))}

      {/* Top Frame */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg flex justify-between items-center text-[10px] tracking-[0.35em] uppercase text-[#9d8e93] font-semibold"
      >
        <span>EST. 2026</span>
        <span>MIRAGE ATELIER</span>
        <span>PARIS • NY</span>
      </motion.div>

      {/* Main Hero */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative"
        >
          {/* sparkle icon */}
          <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 text-rose-400"
          >
            <Sparkles size={38} strokeWidth={1.2} />
          </motion.div>

          {/* logo */}
          <h1 className="font-serif text-7xl md:text-8xl font-black italic tracking-[-0.08em] text-[#181314] drop-shadow-sm">
            Mirage
          </h1>

          {/* divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[2px] mx-auto rounded-full bg-gradient-to-r from-transparent via-[#d9b67a] to-transparent my-8"
          />

          {/* subtitle */}
          <p className="text-sm md:text-base uppercase tracking-[0.35em] text-[#8e8084] font-medium">
            Luxury Beauty & Couture Rituals
          </p>

          {/* description */}
          <p className="mt-8 text-sm md:text-[15px] text-[#7d7175] leading-relaxed max-w-md mx-auto font-light">
            Personalized skin intelligence meets elevated beauty commerce —
            crafted for modern rituals, curated by aesthetic precision.
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="w-full max-w-lg flex flex-col items-center gap-7 relative z-10">
        <motion.button
          id="splash-explore-button"
          onClick={onExplore}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative overflow-hidden w-full h-16 rounded-full bg-gradient-to-r from-[#171314] via-[#2a1e21] to-[#171314] text-white text-xs uppercase tracking-[0.28em] font-semibold shadow-[0_18px_45px_rgba(0,0,0,.18)] border border-white/10"
        >
          {/* shimmer sweep */}
          <motion.div
            animate={{ x: ["-120%", "160%"] }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          <span className="relative flex items-center justify-center gap-3">
            Enter The Ritual
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </motion.button>

        <span className="text-[10px] uppercase tracking-[0.28em] text-[#b1a4aa] font-medium">
          Secure Full-Stack Luxury Commerce
        </span>
      </div>
    </div>
  );
};
