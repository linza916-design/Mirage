import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Camera,
  Send,
  Bot,
  User,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { Message, Product } from "../lib/types";
import { products } from "../lib/data";

interface AuraProps {
  skinType: string;
  concerns: string[];
  onAddToBag: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const AuraAssistantView: React.FC<AuraProps> = ({
  skinType,
  concerns,
  onAddToBag,
  onSelectProduct,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Welcome to the MIRAGE Private Atelier, Elena.

I am Aura, your bespoke beauty companion.

I have reviewed your ${skinType || "Balanced"} diagnostic profile and I’m prepared to map your luxury skincare rituals or perform a Camera Skin Assessment if you capture a diagnostic selfie below.

How may I guide your skin wellness today?`,
      timestamp: "Just now",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    "AHA vs Retinol for evening ritual?",
    "Explain Midnight Oud notes",
    "Glass skin ritual using Aura Bloom",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;

      stream.getTracks().forEach((track) => track.stop());

      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  };

  const startCamera = async () => {
    setCapturedImage(null);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera unavailable");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);
    } catch (err) {
      console.error("Camera failed:", err);
    }
  };

  const captureSnapshot = () => {
    let finalBase64 = "";

    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 320, 240);
        finalBase64 = canvasRef.current.toDataURL("image/jpeg");
      }
    }

    if (!finalBase64) {
      finalBase64 =
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600";
    }

    setCapturedImage(finalBase64);
    stopCamera();
  };

  const executeSend = async (
    text: string,
    withSelfieBase64?: string | null,
  ) => {
    if (!text.trim() && !withSelfieBase64) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: text.trim() || "Uploaded selfie for analysis.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      imageAnalysis: withSelfieBase64 || undefined,
    };

    const updated = [...messages, userMsg];

    setMessages(updated);
    setInputVal("");
    setCapturedImage(null);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updated,
          skinType,
          concerns,
        }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();
      const reply = data.text || "Aura is recalibrating.";

      const matchedProducts = products.filter(
        (p) =>
          reply.toLowerCase().includes(p.name.toLowerCase()) ||
          reply.toLowerCase().includes(p.brand?.toLowerCase() || ""),
      );

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        recommendations:
          matchedProducts.length > 0 ? matchedProducts : undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: "ai",
          text: `Diagnostic stream interrupted.

Please verify your API route and ensure GEMINI_API_KEY is configured.`,
          timestamp: "Now",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-24 flex flex-col gap-6 text-[#1a1a1a]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#eeeae6] pb-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-amber-200 flex items-center justify-center shadow-lg">
            <Sparkles size={16} className="text-white" />
          </div>

          <div>
            <h3 className="text-xl font-serif italic font-bold">
              Aura Consults
            </h3>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8a817c]">
              Bespoke Skin Intelligence
            </span>
          </div>
        </div>

        <div className="flex gap-2 text-[10px] font-mono">
          <span className="px-3 py-1 rounded-full border border-[#eeeae6] text-rose-600 uppercase font-bold">
            {skinType || "Balanced"} Skin
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Camera Side */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white border border-[#eeeae6] rounded-3xl p-5 shadow-sm">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#d4af37] font-bold">
              Camera Diagnostic
            </h4>

            <div className="aspect-video mt-4 rounded-2xl overflow-hidden border border-[#eeeae6] bg-stone-50 flex items-center justify-center">
              {cameraActive ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover -scale-x-100"
                  />

                  <button
                    onClick={captureSnapshot}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center animate-pulse"
                  >
                    <Camera size={18} />
                  </button>
                </div>
              ) : capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={28} className="text-stone-300" />
              )}
            </div>

            <canvas
              ref={canvasRef}
              width={320}
              height={240}
              className="hidden"
            />

            {!cameraActive && !capturedImage && (
              <button
                onClick={startCamera}
                className="mt-4 w-full h-11 bg-rose-400 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold uppercase"
              >
                Activate Lens
              </button>
            )}

            {capturedImage && (
              <button
                onClick={() =>
                  executeSend(
                    "Please perform a luxury diagnostic.",
                    capturedImage,
                  )
                }
                className="mt-4 w-full h-11 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-xl text-xs font-semibold uppercase flex items-center justify-center gap-2"
              >
                Analyze <ArrowRight size={14} />
              </button>
            )}
          </div>

          {/* Presets */}
          <div className="bg-rose-50 rounded-3xl border border-[#eeeae6] p-4">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => executeSend(p)}
                className="w-full p-3 text-left rounded-xl bg-white border border-[#eeeae6] hover:border-rose-300 mb-2 text-xs"
              >
                ✦ {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-8 bg-white border border-[#eeeae6] rounded-[2rem] p-5 flex flex-col h-[600px]">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2"
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] ${
                    msg.sender === "user" ? "self-end text-right" : "self-start"
                  }`}
                >
                  <div className="text-[10px] font-mono mb-1 flex gap-1 items-center">
                    {msg.sender === "ai" ? (
                      <Bot size={10} />
                    ) : (
                      <User size={10} />
                    )}
                    {msg.timestamp}
                  </div>

                  <div
                    className={`p-4 rounded-3xl text-xs whitespace-pre-line ${
                      msg.sender === "user" ? "bg-rose-50" : "bg-stone-50"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.recommendations && (
                    <div className="flex gap-3 mt-2 overflow-x-auto">
                      {msg.recommendations.map((p) => (
                        <div
                          key={p.id}
                          className="min-w-[180px] bg-[#fcf8f7] border border-[#eeeae6] rounded-2xl p-3"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-24 object-cover rounded-xl cursor-pointer"
                            onClick={() => onSelectProduct(p)}
                          />

                          <div className="mt-2 text-xs font-semibold">
                            {p.name}
                          </div>

                          <button
                            onClick={() => onAddToBag(p)}
                            className="mt-2 w-full h-9 rounded-xl bg-[#1a1a1a] text-white text-xs"
                          >
                            Add to Bag
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex gap-2 text-xs text-stone-500">
                <RefreshCw size={14} className="animate-spin" />
                Aura is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="pt-4 border-t border-[#eeeae6] flex gap-2">
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeSend(inputVal)}
              className="flex-1 h-12 rounded-xl border border-[#eeeae6] px-4 text-sm"
              placeholder="Ask Aura..."
            />

            <button
              onClick={() => executeSend(inputVal)}
              disabled={!inputVal.trim()}
              className="w-12 h-12 rounded-xl bg-[#1a1a1a] text-white flex items-center justify-center disabled:bg-stone-200"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
