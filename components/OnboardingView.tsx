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
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "Oily",
      title: "Oily / Sebum-Prone",
      desc: "Active glands wanting balancing formulas and lightweight finishes.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "Sensitive",
      title: "Sensitive / Reactive",
      desc: "Prone to redness, demanding gentle botanical soothing barriers.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "Combined",
      title: "Balanced / Combined",
      desc: "Mixed qualities looking for customizable dual-zone hydration.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const concernsList = [
    {
      id: "hydration",
      label: "Cellular Hydration",
      accent: "from-cyan-400 to-blue-500",
    },
    {
      id: "anti_aging",
      label: "Nocturnal Contours Lift",
      accent: "from-amber-400 to-orange-500",
    },
    {
      id: "glow",
      label: "Dewy Glass Radiance",
      accent: "from-rose-400 to-pink-500",
    },
    {
      id: "acne_calming",
      label: "Blemish & Pore Repair",
      accent: "from-emerald-400 to-green-500",
    },
    {
      id: "fragrance",
      label: "Atmospheric Fragrance",
      accent: "from-violet-400 to-fuchsia-500",
    },
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
    <div className="relative min-h-screen overflow-hidden bg-[#faf6f3] text-[#1a1a1a] flex items-center justify-center px-4 py-10">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] right-[-80px] w-[450px] h-[450px] bg-rose-300/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-120px] left-[-80px] w-[420px] h-[420px] bg-violet-300/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] bg-amber-200/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="backdrop-blur-2xl bg-white/80 border border-white/60 shadow-[0_25px_80px_rgba(0,0,0,0.08)] rounded-[2.8rem] overflow-hidden">
          {/* Header */}
          <div className="px-8 md:px-10 pt-8 pb-6 border-b border-black/5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.35em] uppercase text-stone-500 font-semibold">
                  Mirage Atelier
                </span>

                <h1 className="text-3xl md:text-4xl font-serif italic font-black mt-2 tracking-tight">
                  Beauty Ritual Setup
                </h1>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-lg">
                <Sparkles size={14} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                  Luxury AI
                </span>
              </div>
            </div>

            {/* Step Bar */}
            <div className="flex items-center gap-3 mt-8">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    step >= num
                      ? "flex-1 bg-gradient-to-r from-rose-400 to-pink-500"
                      : "flex-1 bg-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 md:px-10 py-8 min-h-[500px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col gap-8"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-bold">
                      Diagnostic No. 1
                    </span>

                    <h2 className="text-3xl font-serif italic mt-3">
                      Identify your skin texture
                    </h2>

                    <p className="text-sm text-stone-500 leading-relaxed mt-2 max-w-lg">
                      Aura calibrates personalized skincare formulations using
                      your surface characteristics and hydration profile.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {skinTypes.map((type) => {
                      const active = selectedSkin === type.id;

                      return (
                        <motion.button
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          key={type.id}
                          id={`skin-type-${type.id}`}
                          onClick={() => setSelectedSkin(type.id)}
                          className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-300 text-left ${
                            active
                              ? "border-rose-300 shadow-2xl shadow-rose-100"
                              : "border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <div className="relative h-52 overflow-hidden">
                            <img
                              src={type.image}
                              alt={type.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                            {active && (
                              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white text-rose-500 flex items-center justify-center shadow-lg">
                                <Check size={16} className="stroke-[3px]" />
                              </div>
                            )}

                            <div className="absolute bottom-5 left-5 right-5">
                              <h3 className="text-white text-lg font-semibold">
                                {type.title}
                              </h3>

                              <p className="text-white/80 text-xs leading-relaxed mt-1">
                                {type.desc}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col gap-8"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-bold">
                      Diagnostic No. 2
                    </span>

                    <h2 className="text-3xl font-serif italic mt-3">
                      Select your beauty goals
                    </h2>

                    <p className="text-sm text-stone-500 leading-relaxed mt-2 max-w-lg">
                      Choose one or more skincare ambitions so Aura can curate
                      products, rituals, and wellness sequences.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {concernsList.map((concern) => {
                      const active = selectedConcerns.includes(concern.id);

                      return (
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          key={concern.id}
                          id={`concern-type-${concern.id}`}
                          onClick={() => toggleConcern(concern.id)}
                          className={`relative overflow-hidden rounded-[1.7rem] border p-5 transition-all duration-300 text-left ${
                            active
                              ? "border-transparent shadow-xl"
                              : "border-stone-200 hover:border-stone-300 bg-white"
                          }`}
                        >
                          {active && (
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${concern.accent} opacity-10`}
                            />
                          )}

                          <div className="relative flex items-center justify-between">
                            <div>
                              <h4
                                className={`text-sm font-semibold tracking-wide ${
                                  active ? "text-[#1a1a1a]" : "text-stone-700"
                                }`}
                              >
                                {concern.label}
                              </h4>

                              <p className="text-xs text-stone-500 mt-1">
                                Personalized ritual optimization
                              </p>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                                active
                                  ? "bg-black border-black text-white"
                                  : "border-stone-300"
                              }`}
                            >
                              {active && (
                                <Check size={13} className="stroke-[3px]" />
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(244,114,182,0.4)",
                        "0 0 60px rgba(244,114,182,0.45)",
                        "0 0 0px rgba(244,114,182,0.4)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 flex items-center justify-center shadow-2xl"
                  >
                    <Sparkles size={42} className="text-white" />
                  </motion.div>

                  <div className="mt-8 max-w-lg">
                    <span className="text-xs uppercase tracking-[0.3em] text-rose-500 font-bold">
                      Portrait Synchronized
                    </span>

                    <h2 className="text-4xl font-serif italic mt-4">
                      Atelier Ready
                    </h2>

                    <p className="text-stone-500 leading-relaxed mt-4 text-sm">
                      Aura has successfully generated a personalized luxury
                      beauty identity for your{" "}
                      <span className="font-semibold text-rose-600">
                        {selectedSkin}
                      </span>{" "}
                      skin profile and curated wellness ambitions.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="w-full mt-10 rounded-[2rem] bg-gradient-to-br from-white to-stone-50 border border-stone-200 p-6 shadow-inner text-left">
                    <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">
                        Member Profile
                      </span>

                      <span className="text-xs font-semibold text-[#1a1a1a]">
                        ELENA ROSSI (GUEST)
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-stone-200">
                      <span className="text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold">
                        Skin Type
                      </span>

                      <span className="text-sm font-semibold text-rose-600">
                        {selectedSkin}
                      </span>
                    </div>

                    <div className="pt-4">
                      <span className="text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold block mb-3">
                        Selected Focuses
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {(selectedConcerns.length > 0
                          ? selectedConcerns
                          : ["hydration"]
                        ).map((c) => {
                          const item = concernsList.find((x) => x.id === c);

                          return (
                            <div
                              key={c}
                              className="px-4 py-2 rounded-full bg-black text-white text-[11px] uppercase tracking-[0.15em] font-semibold"
                            >
                              {item?.label}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Buttons */}
            <div className="flex gap-4 pt-8 mt-8 border-t border-black/5">
              {step > 1 && (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="h-14 px-6 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 transition-all flex items-center justify-center gap-2 text-sm font-medium text-stone-600"
                >
                  <ArrowLeft size={15} />
                  Back
                </motion.button>
              )}

              <motion.button
                whileHover={{
                  scale: step === 1 && !selectedSkin ? 1 : 1.01,
                }}
                whileTap={{
                  scale: step === 1 && !selectedSkin ? 1 : 0.98,
                }}
                id="onboarding-next-button"
                onClick={handleNext}
                disabled={step === 1 && !selectedSkin}
                className={`flex-1 h-14 rounded-2xl text-sm font-semibold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-3 ${
                  step === 1 && !selectedSkin
                    ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                    : "bg-[#111111] hover:bg-black text-white shadow-2xl shadow-black/20"
                }`}
              >
                {step === 3 ? "Enter Mirage" : "Continue"}
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
