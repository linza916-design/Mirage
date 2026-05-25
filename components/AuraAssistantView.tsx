import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, Image, Send, Bot, User, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';
import { Message, Product } from '../lib/types';
import { products } from '../lib/data';

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
  onSelectProduct
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Welcome to the MIRAGE Private Atelier, Elena. I am Aura, your bespoke beauty companion.\n\nI have reviewed your **${skinType || 'Balanced'}** diagnostic profile. I am fully prepared to map custom morning/night sequences or perform a luxury **Camera Skin Assessment** directly if you snap a diagnostic selfie below. How may I guide your skin wellness today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Camera simulation state
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    "AHA vs Retinol for evening ritual?",
    "Explain Midnight Oud notes",
    "Glass skin ritual using Aura Bloom"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Activate Web Cam for real diagnostic selfie capture
  const startCamera = async () => {
    setCapturedImage(null);
    setCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }
    } catch (err) {
      console.warn("Camera hardware not fully available in preview frame. Emulating premium studio filter.");
    }
  };

  const captureSnapshot = () => {
    // Attempt real canvas draw, else fall back to beautiful model placeholder
    let finalBase64 = '';
    if (canvasRef.current && videoRef.current) {
      try {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, 320, 240);
          finalBase64 = canvasRef.current.toDataURL('image/jpeg');
        }
      } catch (e) {
        console.warn("Canvas capture error, using soft-box model beauty image.");
      }
    }

    if (!finalBase64) {
      // High end soft light beauty profile photo fallback
      finalBase64 = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=320';
    }

    setCapturedImage(finalBase64);
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const executeSend = async (text: string, withSelfieBase64?: string | null) => {
    if (!text.trim() && !withSelfieBase64) return;

    const userMsgId = `msg_${Date.now()}`;
    const userMsgText = text.trim() || "Uploaded selfie for diagnostic review.";

    const userMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageAnalysis: withSelfieBase64 || undefined
    };

    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInputVal('');
    setCapturedImage(null);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMsgs,
          skinType,
          concerns
        })
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();
      
      // Parse potential matched product cards based on text detection
      const textReply = data.text;
      const matchedProds: Product[] = [];
      products.forEach(p => {
        // Check if matching word
        if (textReply.toLowerCase().includes(p.name.toLowerCase()) || 
            (p.brand && textReply.toLowerCase().includes(p.brand.toLowerCase()))) {
          if (!matchedProds.find(m => m.id === p.id)) {
            matchedProds.push(p);
          }
        }
      });

      setMessages(prev => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: textReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendations: matchedProds.length > 0 ? matchedProds : undefined
        }
      ]);

    } catch (err: any) {
      console.error("Aura conversation pipeline failed:", err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          sender: 'ai',
          text: `I apologize, Elena. A momentary network shimmer interrupted our diagnostic stream. Rest assured, your skin ritual remains my priority: \n\n*Aura recommends checking process.env.GEMINI_API_KEY in modern Express server.*`,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const triggerPreset = (presetText: string) => {
    executeSend(presetText);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-24 text-[#1a1a1a] font-sans max-w-4xl mx-auto px-4 md:px-0">
      
      {/* Title block */}
      <div className="flex justify-between items-center pb-4 border-b border-[#eeeae6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-amber-200/20 flex items-center justify-center shadow-lg">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-serif italic text-[#1a1a1a] font-bold">
              Aura Consults
            </h3>
            <span className="text-[10px] text-[#8a817c] font-mono uppercase tracking-widest block font-bold mt-0.5">
              Bespeaking Skin Intelligence
            </span>
          </div>
        </div>

        {/* Diagnostic profile capsules */}
        <div className="flex gap-2 text-[10px] font-mono">
          <span className="bg-white border border-[#eeeae6] text-rose-600 px-2.5 py-1 rounded-full uppercase font-bold">
            {skinType || 'Dry'} skin
          </span>
          <span className="bg-white border border-[#eeeae6] text-[#8a817c] px-2.5 py-1 rounded-full uppercase font-bold">
            Diag-0092
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Interactive snap tool & preset filters (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Glassmorphism Camera Diagnostic Snap Card */}
          <div className="bg-white border border-[#eeeae6] p-5 rounded-[2rem] flex flex-col gap-4 relative overflow-hidden shadow-sm text-left">
            <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold">
              Camera Diagnostic
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Capture a selfie to let Aura construct highly personalized, moisture maps using Gemini Vision.
            </p>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-50 border border-[#eeeae6] flex items-center justify-center">
              {cameraActive ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" />
                  <button
                    onClick={captureSnapshot}
                    className="absolute bottom-3 bg-red-500 hover:bg-red-650 text-white w-10 h-10 rounded-full flex items-center justify-center animate-pulse cursor-pointer shadow-lg"
                  >
                    <Camera size={18} />
                  </button>
                </div>
              ) : capturedImage ? (
                <div className="relative w-full h-full">
                  <img src={capturedImage} alt="Captured diagnostic" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-rose-500/10 mix-blend-color" />
                  {/* Cancel snap */}
                  <button
                    onClick={() => setCapturedImage(null)}
                    className="absolute top-2 right-2 text-xs bg-[#1a1a1a] hover:bg-[#333] text-white px-2.5 py-1 rounded-full cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <Camera size={24} className="text-stone-300" />
                  <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest font-bold">CAMERA INACTIVE</span>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} width="320" height="240" className="hidden" />

            {!cameraActive && !capturedImage && (
              <button
                id="aura-camera-trigger"
                onClick={startCamera}
                className="w-full h-11 bg-rose-400 hover:bg-rose-350 text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <Camera size={13} className="stroke-[2.5px]" />
                Activate Lens
              </button>
            )}

            {capturedImage && (
              <button
                onClick={() => executeSend("Please perform a luxury diagnostic on my selfie.", capturedImage)}
                className="w-full h-11 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                Analyze Selfie <ArrowRight size={13} />
              </button>
            )}
          </div>

          {/* Preset Capsules */}
          <div className="bg-rose-50/50 border border-[#eeeae6] p-4 rounded-3xl flex flex-col gap-3 text-left shadow-sm">
            <span className="text-[10px] text-[#8a817c] font-mono tracking-widest uppercase block font-bold">PRESET QUERIES</span>
            <div className="flex flex-col gap-2">
              {presets.map((p, idx) => (
                <button
                  id={`preset-cap-${idx}`}
                  key={idx}
                  onClick={() => triggerPreset(p)}
                  className="w-full text-left p-3 rounded-xl bg-white border border-[#eeeae6] hover:border-rose-350 text-[11px] text-stone-700 tracking-wide font-medium hover:text-[#1a1a1a] transition-all cursor-pointer"
                >
                  ✦ {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Dialog & Recommendations (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white border border-[#eeeae6] rounded-[2.5rem] p-5 h-[500px] shadow-sm justify-between">
          
          {/* Messages list */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-stone-200">
            <AnimatePresence>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-2 max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[9px] text-[#8a817c] font-mono font-bold">
                    {msg.sender === 'ai' ? (
                      <>
                        <Bot size={10} className="text-rose-500" />
                        <span>AURA ATELIER</span>
                      </>
                    ) : (
                      <>
                        <User size={10} className="text-[#1a1a1a]" />
                        <span>ELENA ROSSI</span>
                      </>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-3xl text-xs leading-relaxed font-light text-left ${
                      msg.sender === 'user'
                        ? 'bg-rose-50 text-[#1a1a1a] border border-[#eeeae6] rounded-tr-none'
                        : 'bg-stone-50 text-[#1a1a1a] border border-[#eeeae6] rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.imageAnalysis && (
                      <div className="w-24 aspect-square rounded-lg overflow-hidden mb-2 border border-[#eeeae6]">
                        <img src={msg.imageAnalysis} alt="Selfie preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {msg.text}
                  </div>

                  {/* Recommendations Row inside chat directly matching the output */}
                  {msg.recommendations && (
                    <div className="flex gap-2.5 overflow-x-auto py-1 max-w-full scrollbar-none self-start mt-1">
                      {msg.recommendations.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 bg-[#fcf8f7] border border-[#eeeae6] p-2.5 rounded-2xl min-w-[200px]"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover cursor-pointer bg-white border border-[#eeeae6]"
                            onClick={() => onSelectProduct(p)}
                          />
                          <div className="flex-1 flex flex-col text-left min-w-0">
                            <h5 className="text-[10px] font-bold tracking-wide text-[#1a1a1a] truncate hover:text-rose-600 cursor-pointer" onClick={() => onSelectProduct(p)}>
                              {p.name}
                            </h5>
                            <span className="text-[10px] text-rose-600 font-mono font-bold">${p.price.toFixed(2)}</span>
                          </div>
                          <button
                            id={`aura-recommendation-add-${p.id}`}
                            onClick={() => onAddToBag(p)}
                            className="w-7 h-7 rounded-full bg-[#1a1a1a] text-white hover:bg-[#333] flex items-center justify-center cursor-pointer transition-colors"
                          >
                            <ShoppingBag size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="self-start flex flex-col gap-1.5 items-start">
                <span className="text-[9px] text-[#8a817c] font-mono uppercase tracking-widest flex items-center gap-1 font-bold">
                  <RefreshCw size={8} className="animate-spin text-rose-450 text-rose-400" /> Aura is formulating your prescription...
                </span>
                <div className="bg-stone-50 border border-[#eeeae6] text-stone-500 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Typing input bar */}
          <div className="flex gap-2 items-center mt-4 pt-3 border-t border-[#eeeae6]">
            <input
              id="aura-chat-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') executeSend(inputVal); }}
              placeholder="Ask Aura about custom skin balances, palettes..."
              className="flex-1 h-12 bg-stone-50 border border-[#eeeae6] rounded-xl px-4 text-xs tracking-wide focus:outline-none focus:border-rose-300 text-[#1a1a1a]"
            />
            <button
              id="aura-chat-send"
              disabled={!inputVal.trim()}
              onClick={() => executeSend(inputVal)}
              className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                inputVal.trim()
                  ? 'bg-[#1a1a1a] text-white hover:bg-[#333] font-bold'
                  : 'bg-stone-50 border border-[#eeeae6] text-stone-400'
              }`}
            >
              <Send size={15} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
