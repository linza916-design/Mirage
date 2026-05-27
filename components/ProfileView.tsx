"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Sun,
  Moon,
  Calendar,
  Check,
  Star,
  RefreshCw,
  Info,
  X,
  Lock,
  Bot,
} from "lucide-react";
import { userRituals } from "../lib/data";

interface ProfileProps {
  skinType: string;
  onChangeSkinType: (type: string) => void;
}

export const ProfileView: React.FC<ProfileProps> = ({
  skinType,
  onChangeSkinType,
}) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleCheck = (id: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const skinOptions = ["Dry", "Oily", "Sensitive", "Combined"];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 pb-28 text-[#1a1a1a]">
      {/* ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-rose-200/20 blur-[180px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-[#eeeae6]"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-rose-400 via-amber-200 to-indigo-200 shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2tA1-TQqXmB-NLVd3VrbQpv1LEqp2tgic4wX6YULpkZwdPmuD87PCM7f4ZrD_xyzodWtWzzJp7CiJwc7kWfvyUYuwToBhQbil-MJN-znNsPa87YsuWRiFSA2uji1X9CfVlNkCnAjmiotc8PkZGmvzPucc2jfw4c2rqrseGPMn9LkRyUDAGIlkdKt-isfIWUDFy9Ums-6ZbIYOlA6gw8Y_GiHlGBNglkphNx_AnHJ6WjRAFnJlClkeXPhKr6pafzbG7pjQCqUsa3M"
                alt="avatar"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>

            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border border-[#eeeae6]">
              <Star size={14} className="fill-amber-400 text-amber-400" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-3 items-center">
              <h2 className="text-4xl font-serif italic font-black tracking-tight">
                Elena Rossi
              </h2>

              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[10px] tracking-[0.22em] uppercase font-bold text-rose-600">
                MIRAGE VIP
              </span>
            </div>

            <p className="text-sm text-[#8a817c] mt-2">
              Member since April 2026 • Verified ID MRG-9401
            </p>

            <button
              onClick={() => setIsHelpOpen(true)}
              className="mt-4 flex items-center gap-2 text-rose-500 text-sm hover:text-rose-700 transition"
            >
              <Info size={14} />
              Privacy & Diagnostics
            </button>
          </div>
        </div>

        {/* selector */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#eeeae6] rounded-3xl p-5 shadow-lg w-full md:w-[280px]">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8a817c] mb-3">
            Skin Diagnostic
          </p>

          <div className="flex gap-3">
            <select
              value={skinType}
              onChange={(e) => onChangeSkinType(e.target.value)}
              className="flex-1 rounded-2xl border border-[#eeeae6] bg-stone-50 px-4 py-3 text-sm outline-none focus:border-rose-300"
            >
              {skinOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <button className="w-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center hover:bg-rose-100 transition">
              <RefreshCw size={16} className="text-rose-500" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Ritual Section */}
      <div className="mt-12">
        <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#d4af37]">
          Sovereign Ritual Timeline
        </span>

        <h3 className="text-3xl font-serif italic mt-2">
          Daily Beauty Checklist
        </h3>

        <p className="text-sm text-[#8a817c] mt-2 max-w-2xl">
          Complete rituals daily to synchronize rewards and enhance your beauty
          cadence progression.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {userRituals.map((r) => {
            const icon =
              r.type === "am" ? (
                <Sun size={12} className="text-amber-500" />
              ) : r.type === "pm" ? (
                <Moon size={12} className="text-indigo-500" />
              ) : (
                <Calendar size={12} className="text-rose-500" />
              );

            return (
              <motion.div
                whileHover={{ y: -6 }}
                key={r.id}
                className="bg-white border border-[#eeeae6] rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xl px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold shadow">
                    {icon}
                    {r.duration}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-semibold">{r.title}</h4>

                  <p className="text-xs text-[#8a817c] uppercase tracking-widest mt-1">
                    {r.items.length} phases
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    {r.items.map((item, i) => {
                      const id = `${r.id}-${i}`;
                      const checked = completedItems[id];

                      return (
                        <button
                          key={id}
                          onClick={() => toggleCheck(id)}
                          className={`flex justify-between items-center p-3 rounded-2xl border transition ${
                            checked
                              ? "bg-rose-50 border-rose-200 text-rose-700"
                              : "bg-stone-50 border-[#eeeae6] hover:border-rose-200"
                          }`}
                        >
                          <span className="text-sm">{item}</span>

                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center ${
                              checked
                                ? "bg-rose-400 text-white"
                                : "border border-stone-300"
                            }`}
                          >
                            {checked && <Check size={12} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Security Card */}
      <div className="mt-12 bg-white/70 backdrop-blur-xl border border-[#eeeae6] rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-4 items-start">
          <ShieldCheck className="text-rose-500 mt-1" size={24} />
          <div>
            <h4 className="font-semibold">Privacy Sync Active</h4>
            <p className="text-sm text-[#8a817c] mt-1">
              Diagnostics are encrypted locally and synchronized securely.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsHelpOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#1a1a1a] text-white text-sm hover:bg-[#333]"
        >
          Privacy Center
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex justify-center items-center p-6"
            onClick={() => setIsHelpOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#eeeae6]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif italic font-black">
                  Privacy Shield
                </h3>

                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="p-2 rounded-full hover:bg-stone-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6 text-sm text-[#8a817c] leading-relaxed">
                <div className="flex gap-4">
                  <Lock className="text-rose-500 mt-1" />
                  <p>
                    Diagnostic metadata remains encrypted inside secure local
                    browser storage.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Bot className="text-amber-500 mt-1" />
                  <p>
                    AI scanning processes ephemeral memory streams only. No
                    portrait retention.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Check className="text-indigo-500 mt-1" />
                  <p>
                    Users maintain total control over deletion and overwrite
                    authority.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsHelpOpen(false)}
                className="w-full mt-8 h-14 rounded-2xl bg-[#1a1a1a] text-white font-semibold hover:bg-[#333]"
              >
                I Understand
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};