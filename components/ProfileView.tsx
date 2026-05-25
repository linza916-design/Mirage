import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
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
    {},
  );
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleCheck = (itemId: string) => {
    setCompletedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const skinOptions = ["Dry", "Oily", "Sensitive", "Combined"];

  return (
    <div className="w-full pb-24 text-[#1a1a1a] font-sans max-w-4xl mx-auto px-4 md:px-0 z-10 relative">
      {/* Profile Header Block */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-8 border-b border-[#eeeae6]">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left w-full md:w-auto">
          {/* Custom avatar glass container */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-rose-400 to-amber-200 border border-[#eeeae6] shadow-lg overflow-hidden self-center animate-fade-in">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2tA1-TQqXmB-NLVd3VrbQpv1LEqp2tgic4wX6YULpkZwdPmuD87PCM7f4ZrD_xyzodWtWzzJp7CiJwc7kWfvyUYuwToBhQbil-MJN-znNsPa87YsuWRiFSA2uji1X9CfVlNkCnAjmiotc8PkZGmvzPucc2jfw4c2rqrseGPMn9LkRyUDAGIlkdKt-isfIWUDFy9Ums-6ZbIYOlA6gw8Y_GiHlGBNglkphNx_AnHJ6WjRAFnJlClkeXPhKr6pafzbG7pjQCqUsa3M"
                alt="Elena Rossi portrait"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-[#eeeae6] shadow-sm flex items-center justify-center text-amber-500">
              <Star size={11} className="fill-amber-500" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-center md:text-left w-full md:w-auto">
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <h3 className="text-3xl font-serif italic font-black text-[#1a1a1a] tracking-tight">
                Elena Rossi
              </h3>
              <span className="text-[9px] bg-rose-50 text-rose-600 border border-rose-300/30 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest font-bold">
                MIRAGE VIP
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
              <p className="text-xs text-[#8a817c] font-light">
                Member since April 2026 • Verified Customer ID: MRG-9401
              </p>
              <span className="hidden sm:inline text-stone-300">•</span>
              <button
                id="profile-help-privacy-trigger-link"
                onClick={() => setIsHelpOpen(true)}
                className="text-xs text-rose-500 hover:text-rose-700 font-semibold font-mono tracking-wide flex items-center gap-1 cursor-pointer underline underline-offset-4 decoration-rose-350/50 justify-center sm:justify-start transition-colors"
              >
                <Info size={11} /> Help & Privacy Specs
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic dropdown switcher */}
        <div className="bg-white border border-[#eeeae6] p-4 rounded-2xl flex flex-col gap-2 shadow-sm min-w-[200px] text-left w-full md:w-auto">
          <span className="text-[9px] text-[#8a817c] font-mono tracking-widest uppercase text-left block font-bold">
            RE-SWITCH TEXTURE DIAGNOSTIC
          </span>
          <div className="flex gap-2">
            <select
              id="skin-profile-select"
              value={skinType}
              onChange={(e) => onChangeSkinType(e.target.value)}
              className="flex-1 bg-stone-50 border border-[#eeeae6] rounded-lg px-2.5 py-1.5 text-xs text-[#1a1a1a] font-mono focus:outline-none focus:border-rose-300 cursor-pointer"
            >
              {skinOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} skin
                </option>
              ))}
            </select>
            <div className="w-8 h-8 rounded-lg bg-stone-50 border border-[#eeeae6] flex items-center justify-center text-rose-505 shadow-xs">
              <RefreshCw size={12} className="text-rose-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Skincare Ritual tracker list */}
      <div className="mt-8 flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-widest text-[#d4af37] uppercase font-mono font-bold">
            YOUR SOVEREIGN CHRONOLOGY
          </span>
          <h4 className="text-2xl font-serif italic text-[#1a1a1a]">
            Daily Beauty Checklist
          </h4>
          <p className="text-xs text-[#8a817c] font-light max-w-xl">
            Tap the luxury steps below as you complete them to synchronize your
            daily streak points with the Mirage Atelier rewards program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userRituals.map((r) => {
            const isAm = r.type === "am";
            const isPm = r.type === "pm";
            return (
              <div
                key={r.id}
                className="bg-white border border-[#eeeae6] rounded-[2rem] p-5 flex flex-col gap-4 shadow-sm relative hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-stone-50">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#1a1a1a] px-2.5 py-1 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border border-[#eeeae6] shadow-sm">
                    {isAm ? (
                      <Sun
                        size={10}
                        className="text-amber-500 fill-amber-100"
                      />
                    ) : isPm ? (
                      <Moon
                        size={10}
                        className="text-indigo-500 fill-indigo-100"
                      />
                    ) : (
                      <Calendar size={10} className="text-rose-500" />
                    )}
                    {r.duration}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <h5 className="text-sm font-semibold text-[#1a1a1a] tracking-wide">
                    {r.title}
                  </h5>
                  <span className="text-[9px] text-[#8a817c] font-mono uppercase tracking-widest font-bold">
                    {r.items.length} ritual phases
                  </span>
                </div>

                {/* Checklist controls */}
                <div className="flex flex-col gap-2 mt-2">
                  {r.items.map((item, idX) => {
                    const uniqueId = `${r.id}_${idX}`;
                    const checked = completedItems[uniqueId] || false;
                    return (
                      <button
                        id={`check-ritual-${uniqueId}`}
                        key={idX}
                        onClick={() => toggleCheck(uniqueId)}
                        className={`text-left p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          checked
                            ? "bg-rose-50/70 border-rose-300/40 text-rose-800 font-medium font-semibold"
                            : "bg-stone-50/50 border-[#eeeae6] text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:text-[#1a1a1a]"
                        }`}
                      >
                        <span className="text-[11px] font-light leading-snug">
                          {item}
                        </span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            checked
                              ? "bg-rose-400 border-rose-400 text-white"
                              : "border-stone-300"
                          }`}
                        >
                          {checked && (
                            <Check size={10} className="stroke-[3px]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Account validation notes */}
        <div className="p-5 bg-[#fcf8f7] border border-[#eeeae6] rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 text-left">
          <div className="flex gap-3.5 items-start sm:items-center">
            <ShieldCheck
              size={20}
              className="text-rose-500 shrink-0 mt-0.5 sm:mt-0 animate-pulse"
            />
            <p className="text-[11px] text-[#8a817c] leading-relaxed font-light">
              <span className="font-semibold text-[#1a1a1a]">
                Secure Local Privacy Sync Active.
              </span>{" "}
              Your skin diagnostic metadata is maintained locally in safe
              sandbox compartments conformant to HIPAA beauty standards.
            </p>
          </div>
          <button
            id="profile-help-privacy-trigger-button"
            onClick={() => setIsHelpOpen(true)}
            className="whitespace-nowrap px-4 py-2 bg-white border border-[#eeeae6] hover:border-rose-350 text-rose-600 hover:text-rose-700 font-mono text-[10px] tracking-wider uppercase font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5 self-end sm:self-auto"
          >
            <Lock size={10} /> Privacy Center
          </button>
        </div>
      </div>

      {/* Help & Privacy Modal */}
      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsHelpOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-lg bg-white border border-[#eeeae6] p-7 md:p-8 rounded-[2.5rem] shadow-2xl relative text-[#1a1a1a] flex flex-col gap-6 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-[#eeeae6]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif italic font-black text-[#1a1a1a] tracking-wide">
                      Help & Privacy Shield
                    </h4>
                    <span className="text-[10px] text-[#8a817c] font-mono uppercase tracking-widest block font-bold mt-0.5">
                      Mirage Diagnostic Safeguard
                    </span>
                  </div>
                </div>
                <button
                  id="close-privacy-help-modal"
                  onClick={() => setIsHelpOpen(false)}
                  className="p-1.5 rounded-full bg-stone-50 border border-[#eeeae6] hover:bg-stone-100 text-[#8a817c] cursor-pointer transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body explanation content */}
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[380px] pr-1.5 scrollbar-thin scrollbar-thumb-stone-200">
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Welcome to the Mirage Privacy Shield description. Your trust
                  is the cornerstone of our luxury ritual experiences. Below is
                  an explicit disclosure of how your diagnostic records are
                  securely preserved:
                </p>

                <div className="flex gap-4 items-start bg-rose-50/40 border border-[#eeeae6]/60 p-4 rounded-2xl">
                  <div className="rounded-lg p-1.5 bg-rose-100/60 text-rose-600 mt-0.5 shadow-xs shrink-0">
                    <Lock size={14} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h5 className="text-[11px] font-bold text-[#1a1a1a] tracking-wide font-mono uppercase">
                      1. SECURE LOCAL STORAGE ONLY
                    </h5>
                    <p className="text-[11px] text-[#8a817c] leading-relaxed font-light">
                      Every diagnostic point—including your self-selected
                      surface texture profile and targeted aesthetic focus
                      concerns—is stored exclusively on your local browser
                      sandboxed device compartment (
                      <code className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#eeeae6]">
                        localStorage
                      </code>
                      ).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-amber-50/20 border border-[#eeeae6]/60 p-4 rounded-2xl">
                  <div className="rounded-lg p-1.5 bg-amber-100/50 text-amber-600 mt-0.5 shadow-xs shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h5 className="text-[11px] font-bold text-[#1a1a1a] tracking-wide font-mono uppercase">
                      2. GEMINI AI PRIVACY SECURE
                    </h5>
                    <p className="text-[11px] text-[#8a817c] leading-relaxed font-light">
                      When initiating our selfie scanner through the camera, the
                      live snapshots are processed securely with the Gemini
                      Vision API using ephemeral token streams. Photos are
                      evaluated in-memory only to provide mapping data and are
                      never persisted or cached globally.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-indigo-50/20 border border-[#eeeae6]/60 p-4 rounded-2xl">
                  <div className="rounded-lg p-1.5 bg-indigo-100/10 text-indigo-600 mt-0.5 shadow-xs shrink-0">
                    <Check size={14} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h5 className="text-[11px] font-bold text-[#1a1a1a] tracking-wide font-mono uppercase">
                      3. COMPLETE PORTRAIT DELETION
                    </h5>
                    <p className="text-[11px] text-[#8a817c] leading-relaxed font-light">
                      You maintain full sovereignty over your physical profile.
                      Changing your diagnostics or using the "Clear" scanner
                      buttons instantly overwrites the existing active
                      telemetry. No shadow copies remain.
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-stone-550 leading-relaxed font-mono mt-2">
                  ✓ Mirage is strictly HIPAA compliant for localized personal
                  cosmetic guidelines and respects user constraints perfectly.
                </p>
              </div>

              {/* Close CTAs */}
              <div className="pt-4 border-t border-[#eeeae6] flex justify-end">
                <button
                  id="confirm-privacy-help-close"
                  onClick={() => setIsHelpOpen(false)}
                  className="px-6 h-11 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-xl text-xs font-semibold tracking-wider uppercase cursor-pointer shadow-sm hover:shadow transition-all"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
