import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ArrowRight, ArrowLeft } from "lucide-react";

interface OnboardingProps {
  onComplete: (skinType: string, concerns: string[]) => void;
}

export const OnboardingView: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedSkin, setSelectedSkin] = useState<string>("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const skinTypes = [
    {
      id: "Dry",
      title: "Dry / Dehydrated",
      desc: "Flaky dry skin searching for rich moisture and lipid repair.",
    },
    {
      id: "Oily",
      title: "Oily / Sebum-Prone",
      desc: "Active glands wanting balancing formulas and lightweight finishes.",
    },
    {
      id: "Sensitive",
      title: "Sensitive / reactive",
      desc: "Prone to redness, demanding gentle botanical soothing barriers.",
    },
    {
      id: "Combined",
      title: "Balanced / Combined",
      desc: "Mixed qualities looking for customizable bento dual-zone hydration.",
    },
  ];

  const concernsList = [
    { id: "hydration", label: "Cellular Hydration" },
    { id: "anti_aging", label: "Nocturnal Contours lift" },
    { id: "glow", label: "Dewy Glass Radiance" },
    { id: "acne_calming", label: "Blemish & Pore Repair" },
    { id: "fragrance", label: "Atmospheric Fragrance Scribing" },
  ];

  const toggleConcern = (id: string) => {
    if (selectedConcerns.includes(id)) {
      setSelectedConcerns(selectedConcerns.filter((x) => x !== id));
    } else {
      setSelectedConcerns([...selectedConcerns, id]);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedSkin) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      onComplete(selectedSkin, selectedConcerns);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="relative min-h-screen bg-[#fcf8f7] text-[#1a1a1a] flex flex-col justify-center items-center px-4 py-8 overflow-hidden font-sans">
      {/* Editorial glowing rose spots */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-rose-200/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-100/20 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg bg-white border border-[#eeeae6] p-8 rounded-[2.5rem] flex flex-col justify-between shadow-lg relative z-10">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step === num
                    ? "w-8 bg-rose-405 bg-rose-400"
                    : "w-2 bg-stone-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] tracking-widest text-[#8a817c] uppercase font-mono font-bold">
            RITUAL PREPARATION
          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="text-xs uppercase text-rose-500 tracking-widest font-mono font-bold">
                  DIAGNOSTIC NO. 1
                </span>
                <h2 className="text-2xl font-serif italic text-[#1a1a1a] mt-2">
                  Identify your skin texture
                </h2>
                <p className="text-xs text-[#8a817c] mt-1 font-light">
                  Aura maps your treatment parameters based on surface traits.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 mt-4">
                {skinTypes.map((type) => (
                  <button
                    id={`skin-type-${type.id}`}
                    key={type.id}
                    onClick={() => setSelectedSkin(type.id)}
                    className={`text-left p-4.5 rounded-[1.5rem] border transition-all duration-300 flex flex-col gap-1 cursor-pointer group ${
                      selectedSkin === type.id
                        ? "bg-rose-50/70 border-rose-350 shadow-sm"
                        : "bg-stone-50/50 border-[#eeeae6] hover:bg-stone-50 hover:border-stone-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold tracking-wide text-[#1a1a1a]">
                        {type.title}
                      </span>
                      {selectedSkin === type.id && (
                        <div className="w-5 h-5 rounded-full bg-rose-400 flex items-center justify-center text-white">
                          <Check size={12} className="stroke-[3px]" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-stone-550 leading-relaxed font-light">
                      {type.desc}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="text-xs uppercase text-rose-500 tracking-widest font-mono font-bold">
                  DIAGNOSTIC NO. 2
                </span>
                <h2 className="text-2xl font-serif italic text-[#1a1a1a] mt-2">
                  Your primary beauty focus
                </h2>
                <p className="text-xs text-[#8a817c] mt-1 font-light">
                  Select one or more aesthetic targets to refine catalog
                  recommendations.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                {concernsList.map((concern) => {
                  const active = selectedConcerns.includes(concern.id);
                  return (
                    <button
                      id={`concern-type-${concern.id}`}
                      key={concern.id}
                      onClick={() => toggleConcern(concern.id)}
                      className={`text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        active
                          ? "bg-rose-50/70 border-rose-350 text-rose-700 font-semibold"
                          : "bg-stone-50/50 border-[#eeeae6] text-stone-700 hover:bg-stone-50 hover:border-stone-300"
                      }`}
                    >
                      <span className="text-sm tracking-wide font-light">
                        {concern.label}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          active
                            ? "bg-rose-400 border-rose-450 text-white"
                            : "border-stone-300"
                        }`}
                      >
                        {active && <Check size={12} className="stroke-[3px]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center py-6 gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-400 to-amber-200/40 flex items-center justify-center animate-pulse shadow-xl">
                <Sparkles size={36} className="text-white font-light" />
              </div>

              <div className="flex flex-col gap-2 max-w-sm">
                <span className="text-xs uppercase text-rose-500 tracking-widest font-mono font-bold">
                  PORTRAIT SYNCHRONIZED
                </span>
                <h2 className="text-2xl font-serif italic text-[#1a1a1a]">
                  Atelier Ready
                </h2>
                <p className="text-xs text-stone-650 leading-relaxed font-light mt-2">
                  Aura has assembled a customized beauty guide based on your{" "}
                  <b className="text-rose-550 font-semibold">{selectedSkin}</b>{" "}
                  skin selection and targeted focuses. You are now authorized to
                  browse products and social feeds in luxury fidelity.
                </p>
              </div>

              {/* Quick Summary Card */}
              <div className="w-full bg-[#fcf8f7] border border-[#eeeae6] p-4.5 rounded-2xl text-left mt-2 font-mono flex flex-col gap-1.5 text-[11px] text-[#8a817c]">
                <div className="flex justify-between border-b border-[#eeeae6] pb-1.5">
                  <span className="text-[#8a817c]">MEMBER PROFILE:</span>
                  <span className="text-[#1a1a1a] font-bold">
                    ELENA ROSSI (GUEST)
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#eeeae6] py-1.5">
                  <span className="text-[#8a817c]">SKIN TYPE:</span>
                  <span className="text-rose-600 font-bold uppercase">
                    {selectedSkin}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-[#8a817c]">TARGETED CORES:</span>
                  <span className="text-[#1a1a1a] font-bold text-right truncate max-w-[200px]">
                    {selectedConcerns
                      .map((c) => concernsList.find((cl) => cl.id === c)?.label)
                      .join(", ") || "Global Hydration"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons Column */}
        <div className="flex gap-4 mt-12 pt-6 border-t border-[#eeeae6]">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 h-12 bg-stone-50 border border-[#eeeae6] hover:bg-stone-100 rounded-xl font-medium tracking-wider text-xs flex items-center justify-center gap-2 text-stone-600 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}

          <button
            id="onboarding-next-button"
            onClick={handleNext}
            disabled={step === 1 && !selectedSkin}
            className={`flex-2 h-12 rounded-xl font-medium tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
              step === 1 && !selectedSkin
                ? "bg-[#eeeae6] text-stone-400 cursor-not-allowed"
                : "bg-[#1a1a1a] text-white hover:bg-[#333] font-semibold shadow"
            }`}
          >
            {step === 3 ? "Unveil Mirage" : "Continue"}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
