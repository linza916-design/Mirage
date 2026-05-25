import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  PhoneCall,
  Gift,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";

export const OrderTrackerView: React.FC = () => {
  const trackingSteps = [
    {
      label: "Ritual Sealed",
      date: "May 24, 10:18 AM",
      desc: "Secure Flutterwave payment cleared successfully.",
      active: true,
      done: true,
    },
    {
      label: "Atelier Packaging",
      date: "May 24, 11:30 AM",
      desc: "Scented wrapping and pristine weighted glass boxes prepared.",
      active: true,
      done: true,
    },
    {
      label: "Courier Dispatched",
      date: "May 24, 2:00 PM",
      desc: "Transferred to MIRAGE premium urban courier fleet.",
      active: true,
      done: false,
    },
    {
      label: "Arrived at Vanity",
      date: "Estimated: Tomorrow",
      desc: "Pristine setup achieved.",
      active: false,
      done: false,
    },
  ];

  return (
    <div className="w-full pb-24 text-stone-100 font-sans max-w-4xl mx-auto px-4 md:px-0">
      <div className="flex justify-between items-center pb-4 border-b border-stone-900">
        <h3 className="text-lg font-light tracking-widest uppercase text-stone-200">
          Track Your Parcel
        </h3>
        <span className="text-xs font-mono text-stone-500">
          PARCEL ID: MRG-8829410
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-6">
        {/* Left Side: Urban Grid desaturated map container (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-video rounded-[2.5rem] bg-stone-950 overflow-hidden border border-stone-850 shadow-2xl flex items-center justify-center p-4">
            {/* Custom stylized layout representing desaturated desaturated lines map */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              {/* Grid Lines */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-[1px] bg-stone-300"
                  style={{ left: `${i * 7}%` }}
                />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-[1px] bg-stone-300"
                  style={{ top: `${i * 7}%` }}
                />
              ))}
              {/* Floating diagonal street */}
              <div className="absolute top-0 bottom-0 w-2.5 bg-stone-300 rotate-45 left-1/3" />
              <div className="absolute top-0 bottom-0 w-2 bg-stone-300 -rotate-45 right-1/4" />
            </div>

            {/* Glowing route lines */}
            <div className="absolute w-32 h-1 bg-rose-400/40 rounded blur-sm top-1/2 left-1/4 rotate-12" />

            {/* Destination marker */}
            <div className="absolute top-[45%] left-[55%] flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 w-8 h-8 rounded-full bg-rose-400/30 animate-ping -m-2" />
                <div className="relative w-4 h-4 rounded-full bg-rose-300 border border-stone-950 flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                </div>
              </div>
              <span className="bg-stone-900/90 text-[9px] px-2 py-0.5 mt-1 border border-stone-800 rounded font-mono text-stone-200 shadow-xl uppercase whites-nowrap">
                Elena's Vanity
              </span>
            </div>

            {/* Courier truck icon */}
            <div className="absolute top-1/2 left-1/4 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-950 flex items-center justify-center shadow-2xl animate-pulse">
                <Compass size={14} className="animate-spin" />
              </div>
            </div>

            {/* Float details panel over map */}
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-md border border-stone-800 p-4 rounded-2xl flex justify-between items-center max-w-full">
              <div className="flex gap-3 items-center min-w-0">
                <div className="w-10 h-10 rounded-full border border-stone-800 overflow-hidden bg-stone-950">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfKELN0dRFzPkbcZybGMcU2GMPU22WmFOE43t_klnc6LrgmoKU71_Ln2MUZH85BJ40za96ALzts2WJg2v9YApY3v2RLL95zVVxHEbVyLqjER3juUXiHGJ4Yea-f2tsSB5-0iIwHmA77d6aTujSjdbzOk88XdfAyJbzb5SiFJNdu3IUjgpsBe7BPScF5aPi5ar5NumR5CrruxH8UCLq6t21SYLG0gzLn3_L7EjTRrXPxxwlpaavE0QEKrS7R5TfA48wyNcpw9ZQmSw"
                    alt="Courier driver"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[9px] text-stone-500 font-mono uppercase tracking-widest block">
                    ATELIER EXECUTIVE
                  </span>
                  <h4 className="text-xs font-semibold text-stone-200 truncate">
                    Julian S. (Fleet Driver)
                  </h4>
                  <span className="text-[10px] text-rose-300 font-mono flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> 12 mins to destiny
                  </span>
                </div>
              </div>

              <a
                id="call-courier-driver"
                href="tel:+1555941100"
                className="w-9 h-9 rounded-full bg-stone-950 text-stone-300 hover:text-rose-200 border border-stone-800 flex items-center justify-center cursor-pointer transition-colors shadow-lg"
              >
                <PhoneCall size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Step logs vertical checklist (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-stone-900/40 border border-stone-850 p-6 rounded-[2.5rem] gap-5 shadow-2xl text-left">
          <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase block">
            TRANSIT CHRONO
          </span>

          <div className="flex flex-col gap-6 relative pl-4">
            {/* Draw joining line */}
            <div className="absolute left-[3px] top-4 bottom-4 w-[1px] bg-stone-800" />

            {trackingSteps.map((step, idx) => (
              <div key={idx} className="relative flex gap-4 items-start">
                {/* Dot */}
                <div
                  className={`absolute -left-[17px] top-1.5 w-2 h-2 rounded-full border transition-all ${
                    step.done
                      ? "bg-rose-300 border-rose-300 w-3 h-3 -left-[19px]"
                      : step.active
                        ? "bg-stone-950 border-rose-400/80 animate-ping"
                        : "bg-stone-950 border-stone-800"
                  }`}
                />

                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="flex justify-between items-center">
                    <h5
                      className={`text-xs font-semibold tracking-wide ${step.active ? "text-stone-100" : "text-stone-500"}`}
                    >
                      {step.label}
                    </h5>
                    <span className="text-[9px] font-mono text-stone-500">
                      {step.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-900 text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-300">
              <Gift size={16} />
            </div>
            <p className="text-[10px] text-stone-400 font-light max-w-xs leading-relaxed">
              *Signature Box Seal*: Packages arrive locked in satin ribbons.
              Standard 1-year product replacement protocol is activated upon
              receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
