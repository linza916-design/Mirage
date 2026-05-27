"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, PhoneCall, Gift, Clock } from "lucide-react";

export const OrderTrackerView: React.FC = () => {
  const trackingSteps = [
    {
      label: "Ritual Sealed",
      date: "May 24 • 10:18 AM",
      desc: "Secure Flutterwave authorization approved.",
      active: true,
      done: true,
    },
    {
      label: "Atelier Packaging",
      date: "May 24 • 11:30 AM",
      desc: "Luxury satin wrapping finalized in couture vault.",
      active: true,
      done: true,
    },
    {
      label: "Courier Dispatched",
      date: "May 24 • 2:00 PM",
      desc: "Transferred to MIRAGE executive fleet.",
      active: true,
      done: false,
    },
    {
      label: "Arriving at Vanity",
      date: "ETA • Tomorrow",
      desc: "Final luxury delivery handoff.",
      active: false,
      done: false,
    },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 pb-28 text-[#1a1a1a]">
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-rose-200/20 blur-[180px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center pb-8 border-b border-[#eeeae6]"
      >
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#d4af37]">
            Parcel Transit
          </p>
          <h2 className="text-3xl font-serif italic font-black mt-2">
            Track Your Ritual
          </h2>
        </div>

        <span className="text-xs font-mono text-[#8a817c]">
          Parcel ID: MRG-8829410
        </span>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-10 mt-10">
        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-white border border-[#eeeae6] shadow-2xl backdrop-blur-xl">
            {/* map grid */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-stone-300"
                  style={{
                    left: `${i * 6}%`,
                    top: 0,
                    width: 1,
                    height: "100%",
                  }}
                />
              ))}

              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute bg-stone-300"
                  style={{
                    top: `${i * 6}%`,
                    left: 0,
                    height: 1,
                    width: "100%",
                  }}
                />
              ))}
            </div>

            {/* route line */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-1/2 left-1/4 w-52 h-1 bg-rose-300 rounded-full blur-sm"
            />

            {/* courier */}
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-[50%] left-[28%]"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center shadow-xl">
                <Compass size={18} className="animate-spin" />
              </div>
            </motion.div>

            {/* destination */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-[44%] left-[70%]"
            >
              <div className="w-7 h-7 rounded-full bg-rose-400 shadow-lg border-4 border-white" />
            </motion.div>

            {/* driver card */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/85 backdrop-blur-xl border border-[#eeeae6] rounded-3xl p-5 shadow-xl flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfKELN0dRFzPkbcZybGMcU2GMPU22WmFOE43t_klnc6LrgmoKU71_Ln2MUZH85BJ40za96ALzts2WJg2v9YApY3v2RLL95zVVxHEbVyLqjER3juUXiHGJ4Yea-f2tsSB5-0iIwHmA77d6aTujSjdbzOk88XdfAyJbzb5SiFJNdu3IUjgpsBe7BPScF5aPi5ar5NumR5CrruxH8UCLq6t21SYLG0gzLn3_L7EjTRrXPxxwlpaavE0QEKrS7R5TfA48wyNcpw9ZQmSw"
                  className="w-14 h-14 rounded-full object-cover border border-[#eeeae6]"
                  alt="driver"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a817c] font-bold">
                    Executive Driver
                  </p>

                  <h4 className="font-semibold">Julian S.</h4>

                  <span className="flex items-center gap-2 text-xs text-rose-500 mt-1">
                    <Clock size={12} />
                    12 mins remaining
                  </span>
                </div>
              </div>

              <a
                href="tel:+1555941100"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:scale-105 transition"
              >
                <PhoneCall size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 bg-white border border-[#eeeae6] rounded-[2.5rem] p-8 shadow-xl"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#d4af37]">
            Transit Chronology
          </p>

          <div className="mt-8 relative pl-6 space-y-8">
            <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-[#eeeae6]" />

            {trackingSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-[17px] top-2 w-4 h-4 rounded-full border-4 ${
                    step.done
                      ? "bg-rose-400 border-rose-100"
                      : step.active
                        ? "bg-white border-rose-400 animate-pulse"
                        : "bg-white border-stone-300"
                  }`}
                />

                <div>
                  <div className="flex justify-between items-center">
                    <h4
                      className={`font-semibold ${
                        step.active ? "text-[#1a1a1a]" : "text-[#8a817c]"
                      }`}
                    >
                      {step.label}
                    </h4>

                    <span className="text-xs font-mono text-[#8a817c]">
                      {step.date}
                    </span>
                  </div>

                  <p className="text-sm text-[#8a817c] mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gift card */}
          <div className="mt-10 rounded-3xl bg-rose-50 border border-rose-100 p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mx-auto text-rose-500">
              <Gift size={20} />
            </div>

            <h4 className="mt-4 font-semibold">Signature Box Protection</h4>

            <p className="text-sm text-[#8a817c] mt-2 leading-relaxed">
              Satin ribbon lock-seal and 1-year couture replacement protection
              are activated upon delivery.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
