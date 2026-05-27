"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplashView } from "../components/SplashView";
import { OnboardingView } from "../components/OnboardingView";
import { HomeFeedView } from "../components/HomeFeedView";
import { AuraAssistantView } from "../components/AuraAssistantView";
import { ShoppingBagView } from "../components/ShoppingBagView";
import { OrderTrackerView } from "../components/OrderTrackerView";
import { ProfileView } from "../components/ProfileView";
import { Product, CartItem, Notification, CommunityPost } from "../lib/types";
import { products, mockNotifications, mockPosts } from "../lib/data";
import {
  HouseIcon,
  Sparkles,
  ShoppingBag,
  User,
  Heart,
  Search,
  Bell,
  X,
  Star,
  Gift,
  ArrowRight,
  Check,
  Plus,
} from "lucide-react";

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<
    | "splash"
    | "onboarding"
    | "home"
    | "wishlist"
    | "aura"
    | "bag"
    | "tracker"
    | "profile"
  >("splash");
  const [skinType, setSkinType] = useState<string>("Combined");
  const [concerns, setConcerns] = useState<string[]>(["hydration", "glow"]);

  // Shopping and saving state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    "azure_renewal",
    "gold_lipstick",
  ]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Widget notifications states
  const [notifDropdown, setNotifDropdown] = useState<boolean>(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  // Custom successful petal/sparkle floating animation triggers
  const [showCheckoutSuccess, setShowCheckoutSuccess] =
    useState<boolean>(false);

  // Bottom search query parameters
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Ritual step counter
  const handleOnboardingComplete = (
    skin: string,
    primaryConcerns: string[],
  ) => {
    setSkinType(skin);
    setConcerns(primaryConcerns);
    setActiveScreen("home");
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToBag = (product: Product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.product.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromBag = (product: Product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== product.id),
    );
  };

  const handleUpdateQty = (product: Product, d: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === product.id) {
            const nextQty = item.quantity + d;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const handleAuthorizeCheckout = () => {
    // Escrow authorized, trigger elegant petal overlay
    setCart([]);
    setShowCheckoutSuccess(true);
    setTimeout(() => {
      setShowCheckoutSuccess(false);
      setActiveScreen("tracker");
    }, 4500);
  };

  const filteredSearchProducts =
    searchQuery.trim() === ""
      ? products
      : products.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div className="relative min-h-screen bg-[#fcf8f7] text-[#1a1a1a] flex flex-col justify-between overflow-x-hidden font-sans">
      {/* UI Decors - Artistic Flair theme ambient visual glow accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-112.5 h-112.5 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Dynamic Overlay: Falling Rose Petals/Golden Confetti for checkout completion */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#fcf8f7]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6"
          >
            {/* Ambient falling elements simulating rose petals */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -50,
                  x: Math.random() * window.innerWidth - window.innerWidth / 2,
                  rotate: 0,
                  opacity: 0.8,
                }}
                animate={{
                  y: window.innerHeight + 50,
                  x:
                    Math.random() * window.innerWidth -
                    window.innerWidth / 2 +
                    Math.sin(i) * 50,
                  rotate: 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: 0,
                  ease: "linear",
                }}
                className="absolute w-5 h-5 rounded-full bg-rose-300/40 blur-[1px]"
                style={{
                  top: "-10px",
                  borderRadius: "50% 0 50% 50%",
                  transform: "rotate(45deg)",
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-6 text-center max-w-sm"
            >
              <div className="w-20 h-20 rounded-full bg-rose-400/20 border border-rose-300 flex items-center justify-center text-rose-500 shadow-xl animate-pulse">
                <Check size={36} className="stroke-[3px]" />
              </div>
              <div>
                <span className="text-xs uppercase text-rose-400 tracking-[0.2em] font-mono block">
                  ATELIER SUCCESSION
                </span>
                <h3 className="text-2xl font-serif italic font-black text-[#1a1a1a] mt-2">
                  Your Ritual is Sealed
                </h3>
                <p className="text-xs text-[#8a817c] font-light leading-relaxed mt-3">
                  Pristine premium cosmetics orders processed successfully via
                  specialized Flutterwave Escrow. Your package status
                  MRG-8829410 is activated.
                </p>
              </div>
              <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase mt-4 block">
                TRANSITING COURIER SCREEN LOAD...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeScreen === "splash" && (
          <motion.div
            key="splash_screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <SplashView onExplore={() => setActiveScreen("onboarding")} />
          </motion.div>
        )}

        {activeScreen === "onboarding" && (
          <motion.div
            key="onboarding_screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <OnboardingView onComplete={handleOnboardingComplete} />
          </motion.div>
        )}

        {activeScreen !== "splash" && activeScreen !== "onboarding" && (
          <motion.div
            key="dashboard_layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col min-h-screen"
          >
            {/* Top Premium Editorial Header Navigation */}
            <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md border-b border-[#eeeae6] px-6 py-4 flex justify-between items-center max-w-5xl w-full mx-auto rounded-b-2rem">
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={() => setActiveScreen("home")}
              >
                <h1 className="font-serif text-3xl font-black italic tracking-tighter text-[#1a1a1a]">
                  Mirage
                </h1>
                <div className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
              </div>

              {/* Central Quick/Live Navigation Icons */}
              <div className="flex gap-6 text-xs uppercase tracking-widest font-medium text-[#1a1a1a]/60">
                <button
                  onClick={() => setActiveScreen("home")}
                  className={`hover:text-[#1a1a1a] tracking-wider cursor-pointer transition-all ${activeScreen === "home" ? "text-[#d4af37] font-bold border-b-2 border-[#d4af37]/40 pb-0.5" : ""}`}
                >
                  Discover
                </button>
                <button
                  onClick={() => setActiveScreen("wishlist")}
                  className={`hover:text-[#1a1a1a] tracking-wider cursor-pointer transition-all ${activeScreen === "wishlist" ? "text-[#d4af37] font-bold border-b-2 border-[#d4af37]/40 pb-0.5" : ""}`}
                >
                  Saved List
                </button>
                <button
                  onClick={() => setActiveScreen("aura")}
                  className={`hover:text-[#1a1a1a] tracking-wider cursor-pointer transition-all flex items-center gap-1 ${activeScreen === "aura" ? "text-rose-500 font-bold border-b-2 border-rose-300 pb-0.5" : ""}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                  Aura AI
                </button>
              </div>

              {/* Notifications Widget Trigger and Counter */}
              <div className="relative flex items-center gap-3">
                <button
                  id="notifications-button-trigger"
                  onClick={() => setNotifDropdown(!notifDropdown)}
                  className="relative p-2 rounded-full border border-[#eeeae6] bg-white hover:bg-stone-50 text-[#1a1a1a] cursor-pointer shadow-sm hover:shadow transition-all"
                >
                  <Bell size={14} />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                </button>

                {/* Glass dropdown block */}
                <AnimatePresence>
                  {notifDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-11 w-80 bg-white/95 backdrop-blur-2xl border border-[#eeeae6] p-5 rounded-3xl shadow-xl text-left z-40 max-h-96 overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#eeeae6]">
                        <span className="text-[10px] text-[#8a817c] font-mono uppercase tracking-widest font-bold">
                          Client Bulletins
                        </span>
                        <button
                          onClick={() => setNotifDropdown(false)}
                          className="text-[#8a817c] hover:text-[#1a1a1a]"
                        >
                          <X size={12} />
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="text-xs p-3 rounded-2xl hover:bg-[#fcf8f7] border border-transparent hover:border-[#eeeae6] flex flex-col gap-1 transition-all"
                          >
                            <div className="flex justify-between items-center text-[10px] font-bold text-rose-500 font-mono tracking-tight">
                              <span>⭐ {notif.title}</span>
                              <span className="text-[#8a817c] font-normal">
                                {notif.timeAgo}
                              </span>
                            </div>
                            <p className="text-[#8a817c] text-[11px] leading-relaxed font-light">
                              {notif.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </header>

            {/* Main Application Area (5xl standard layout centering) */}
            <main className="flex-1 max-w-5xl w-full mx-auto py-8">
              <AnimatePresence mode="wait">
                {activeScreen === "home" && (
                  <motion.div
                    key="home_panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <HomeFeedView
                      onSelectProduct={handleSelectProduct}
                      onAddToBag={handleAddToBag}
                      onToggleWishlist={handleToggleWishlist}
                      wishlistedIds={wishlistIds}
                      skinType={skinType}
                    />
                  </motion.div>
                )}

                {activeScreen === "wishlist" && (
                  <motion.div
                    key="wishlist_panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 md:px-0"
                  >
                    <div className="flex flex-col gap-6 text-left">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-4 border-b border-[#eeeae6]">
                        <div>
                          <span className="text-[10px] tracking-widest text-[#d4af37] uppercase font-mono font-bold">
                            YOUR ATELIER SELECTIONS
                          </span>
                          <h3 className="text-2xl font-serif italic text-[#1a1a1a]">
                            Saved Wishlist ({wishlistIds.length} items)
                          </h3>
                        </div>

                        {/* Dynamic search query fields */}
                        <div className="relative">
                          <input
                            id="wishlist-search-bar"
                            type="text"
                            placeholder="Filter saved beauties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/80 outline-none border border-[#eeeae6] px-4 py-2 pl-9 rounded-full text-xs text-[#1a1a1a] placeholder-[#8a817c] tracking-wide focus:border-rose-400 w-full sm:w-60 shadow-sm"
                          />
                          <Search
                            size={12}
                            className="absolute left-3.5 top-3 text-[#8a817c]"
                          />
                        </div>
                      </div>

                      {wishlistIds.length === 0 ? (
                        <div className="py-20 text-center flex flex-col items-center gap-4 bg-white/40 border border-[#eeeae6] rounded-3xl p-8">
                          <Heart
                            size={36}
                            className="text-stone-300 animate-pulse"
                          />
                          <span className="text-xs text-[#8a817c] font-mono">
                            NO ITEMS SAVED YET
                          </span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                          {filteredSearchProducts
                            .filter((p) => wishlistIds.includes(p.id))
                            .map((p) => (
                              <div
                                key={p.id}
                                className="bg-white border border-[#eeeae6] rounded-2rem p-4 flex flex-col gap-3 text-left relative shadow-sm hover:shadow-md transition-all duration-300"
                              >
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="aspect-square w-full rounded-2xl object-cover bg-stone-100 cursor-pointer"
                                  onClick={() => handleSelectProduct(p)}
                                />
                                <div>
                                  <span className="text-[8px] uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
                                    {p.brand}
                                  </span>
                                  <h4
                                    className="text-sm font-medium text-[#1a1a1a] truncate hover:text-rose-500 cursor-pointer"
                                    onClick={() => handleSelectProduct(p)}
                                  >
                                    {p.name}
                                  </h4>
                                  <span className="text-xs text-[#8a817c] font-mono">
                                    ${p.price.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    id={`wishlist-add-bag-${p.id}`}
                                    onClick={() => handleAddToBag(p)}
                                    className="flex-1 h-10 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                  >
                                    Add bag
                                  </button>
                                  <button
                                    id={`wishlist-remove-${p.id}`}
                                    onClick={() => handleToggleWishlist(p)}
                                    className="w-10 h-10 rounded-xl bg-stone-50 border border-[#eeeae6] hover:bg-rose-50 hover:text-rose-500 hover:border-rose-250 flex items-center justify-center text-[#8a817c] cursor-pointer transition-all"
                                  >
                                    <Trash2Icon />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeScreen === "aura" && (
                  <motion.div
                    key="aura_panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AuraAssistantView
                      skinType={skinType}
                      concerns={concerns}
                      onAddToBag={handleAddToBag}
                      onSelectProduct={handleSelectProduct}
                    />
                  </motion.div>
                )}

                {activeScreen === "bag" && (
                  <motion.div
                    key="bag_panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ShoppingBagView
                      cartItems={cart}
                      onUpdateQty={handleUpdateQty}
                      onRemoveItem={handleRemoveFromBag}
                      onPlaceOrder={handleAuthorizeCheckout}
                    />
                  </motion.div>
                )}

                {activeScreen === "tracker" && (
                  <motion.div
                    key="tracker_panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <OrderTrackerView />
                  </motion.div>
                )}

                {activeScreen === "profile" && (
                  <motion.div
                    key="profile_panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProfileView
                      skinType={skinType}
                      onChangeSkinType={setSkinType}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Bottom Glassmorphism Navigation Sheet */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-[#1a1a1a] border border-white/10 px-6 py-4 rounded-[2rem] flex justify-between items-center shadow-2xl">
              <button
                id="nav-btn-home"
                onClick={() => setActiveScreen("home")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeScreen === "home" ? "text-rose-300" : "text-stone-400 hover:text-stone-200"}`}
              >
                <HouseIcon
                  size={18}
                  className={activeScreen === "home" ? "fill-rose-300/10" : ""}
                />
                <span className="text-[9px] font-mono select-none">
                  Atelier
                </span>
              </button>

              <button
                id="nav-btn-wish"
                onClick={() => setActiveScreen("wishlist")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeScreen === "wishlist" ? "text-rose-300" : "text-stone-400 hover:text-stone-200"}`}
              >
                <Heart
                  size={18}
                  className={
                    activeScreen === "wishlist" ? "fill-rose-300/10" : ""
                  }
                />
                <span className="text-[9px] font-mono select-none">Saved</span>
              </button>

              <button
                id="nav-btn-aura"
                onClick={() => setActiveScreen("aura")}
                className={`relative flex flex-col items-center gap-1 transition-all cursor-pointer -mt-5 bg-linear-to-tr from-[#1a1a1a] to-rose-950 border border-rose-300/40 p-4 rounded-full w-14 h-14 justify-center shadow-2xl hover:scale-105 active:scale-95 ${
                  activeScreen === "aura"
                    ? "text-[#fff] border-rose-300 scale-105"
                    : "text-stone-300"
                }`}
              >
                <Sparkles size={18} className="text-rose-300" />
              </button>

              <button
                id="nav-btn-bag"
                onClick={() => setActiveScreen("bag")}
                className={`relative flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeScreen === "bag" ? "text-rose-300" : "text-stone-400 hover:text-stone-200"}`}
              >
                <ShoppingBag
                  size={18}
                  className={activeScreen === "bag" ? "fill-rose-300/10" : ""}
                />
                <span className="text-[9px] font-mono select-none">Bag</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-450 bg-rose-350 text-[#1a1a1a] animate-bounce font-mono">
                    {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                id="nav-btn-profile"
                onClick={() => setActiveScreen("profile")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeScreen === "profile" ? "text-rose-300" : "text-stone-400 hover:text-stone-200"}`}
              >
                <User
                  size={18}
                  className={
                    activeScreen === "profile" ? "fill-rose-300/10" : ""
                  }
                />
                <span className="text-[9px] font-mono select-none">
                  VIP VIP
                </span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-Up Detail drawer overview when user selects product card */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full max-w-lg bg-white border border-[#eeeae6] border-b-none p-6 rounded-t-[3rem] shadow-2xl flex flex-col gap-5 text-left text-[#1a1a1a]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-2 border-b border-[#eeeae6]">
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#d4af37] font-mono tracking-widest uppercase font-bold">
                    {selectedProduct.brand}
                  </span>
                  <h4 className="text-xl font-serif italic text-[#1a1a1a] tracking-wide">
                    {selectedProduct.name}
                  </h4>
                </div>
                <button
                  id="close-product-drawer"
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 rounded-full bg-stone-50 border border-[#eeeae6] hover:bg-stone-100 text-[#8a817c] cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Product Info columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="aspect-4/3 sm:aspect-[4/5] rounded-2xl overflow-hidden bg-stone-50 border border-[#eeeae6]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </div>
                <div className="flex flex-col justify-between text-xs font-sans">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-amber-400 stroke-amber-400"
                      />
                      <span className="text-[#1a1a1a] font-mono font-bold">
                        {selectedProduct.rating} / 5
                      </span>
                      <span className="text-[#8a817c]">
                        • Verified assessment
                      </span>
                    </div>

                    <p className="text-stone-600 leading-relaxed font-light mt-1 text-[11px]">
                      {selectedProduct.description}
                    </p>

                    <span className="text-[10px] text-[#8a817c] font-mono uppercase tracking-widest block mt-2 font-bold">
                      Active Benefits:
                    </span>
                    <ul className="list-disc pl-4 text-[10.5px] text-stone-700 space-y-0.5 mt-0.5 font-light">
                      {selectedProduct.benefits?.map((b, i) => (
                        <li key={i}>{b}</li>
                      )) || (
                        <li>Dermatologist approved and tested formulations.</li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#eeeae6] flex justify-between items-center text-xs font-mono mt-3">
                    <span className="text-[#8a817c] font-sans">
                      Size: {selectedProduct.size || "30ml"}
                    </span>
                    <span className="text-rose-600 font-bold text-base font-semibold">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Drawer actions */}
              <button
                id={`drawer-add-bag-${selectedProduct.id}`}
                onClick={() => {
                  handleAddToBag(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full h-12 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 cursor-pointer mt-1 shadow transition-colors"
              >
                <ShoppingBag size={13} className="stroke-[2.5px]" /> Add to bag
                • ${selectedProduct.price.toFixed(2)}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact helper components to support neat structures
const Trash2Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-trash-2"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);
