import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  ShoppingBag,
  Eye,
  Zap,
  Flame,
  User,
  Play,
  Star,
  Plus,
} from "lucide-react";
import { Product, CommunityPost } from "../lib/types";
import { products, mockPosts } from "../lib/data";

interface HomeFeedProps {
  onSelectProduct: (product: Product) => void;
  onAddToBag: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistedIds: string[];
  skinType: string;
}

export const HomeFeedView: React.FC<HomeFeedProps> = ({
  onSelectProduct,
  onAddToBag,
  onToggleWishlist,
  wishlistedIds,
  skinType,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeReelIdx, setActiveReelIdx] = useState<number>(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "all", name: "All" },
    { id: "skincare", name: "Skincare" },
    { id: "makeup", name: "Makeup" },
    { id: "fragrance", name: "Fragrances" },
    { id: "bath", name: "Atelier" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Filtered recommendations based on skin type profile
  const skinTypeRecommendations = products.filter((p) => {
    if (skinType === "Dry")
      return (
        p.id === "azure_renewal" ||
        p.id === "velvet_mask" ||
        p.id === "silk_blouse"
      );
    if (skinType === "Oily")
      return (
        p.id === "botanical_mist" ||
        p.id === "luminance_eye" ||
        p.id === "sculpt_night"
      );
    if (skinType === "Sensitive")
      return p.id === "botanical_mist" || p.id === "velvet_mask";
    return (
      p.id === "azure_renewal" ||
      p.id === "luminance_eye" ||
      p.id === "gold_lipstick"
    );
  });

  const handleLikeReel = (postId: string) => {
    setLikedReels((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-24 text-[#1a1a1a] font-sans">
      {/* Editorial Header Greeting */}
      <div className="flex justify-between items-end px-4 md:px-0">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase text-[#8a817c] tracking-[0.22em] font-mono font-bold">
            MIRAGE PRIVÉ MEMBER STATUS
          </span>
          <div className="flex items-center gap-2">
            <h2 className="text-3.5xl font-serif italic font-black text-[#1a1a1a] tracking-tight">
              Bonjour, Elena
            </h2>
            <div className="flex items-center gap-1 bg-white border border-[#d4af37]/40 text-[#d4af37] text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full tracking-wider font-semibold shadow-sm">
              <Zap size={8} className="fill-[#d4af37]" /> Gold tier
            </div>
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-1 select-none">
          <span className="text-xs text-rose-500 text-right font-medium block">
            {skinType
              ? `${skinType} skin profile active`
              : "Configuring diagnostic..."}
          </span>
          <span className="text-[10px] text-[#8a817c] font-mono tracking-widest uppercase font-bold">
            941,100 pts
          </span>
        </div>
      </div>

      {/* Categories Horizontal Banner */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 md:px-0 py-1">
          {categories.map((cat) => (
            <button
              id={`cat-filter-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm"
                  : "bg-white border-[#eeeae6] text-[#8a817c] hover:text-[#1a1a1a] hover:border-stone-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left is Products, Right is TikTok-style Video Reel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-0">
        {/* Products Segment (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex justify-between items-center pb-2 border-b border-[#eeeae6]">
            <h3 className="text-xl font-serif italic text-[#1a1a1a] font-bold">
              The Collection
            </h3>
            <span className="text-xs font-mono text-[#8a817c]">
              {filteredProducts.length} treasures shown
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product) => {
              const isWish = wishlistedIds.includes(product.id);
              return (
                <div
                  id={`product-card-${product.id}`}
                  key={product.id}
                  className="bg-white border border-[#eeeae6] rounded-[2rem] p-4 flex flex-col gap-4 hover:shadow-md hover:border-rose-250 transition-all duration-300 group shadow-sm"
                >
                  {/* Photo container */}
                  <div
                    className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-stone-100 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Glossy tag */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] tracking-wider text-[#d4af37] font-mono font-bold border border-[#eeeae6]">
                      {product.brand}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      id={`wish-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-[#eeeae6] hover:bg-rose-50 cursor-pointer text-[#1a1a1a] transition-all"
                    >
                      <Heart
                        size={14}
                        className={
                          isWish
                            ? "fill-rose-500 stroke-rose-500 text-rose-500"
                            : "text-stone-400 hover:text-[#1a1a1a]"
                        }
                      />
                    </button>

                    {/* Size tag */}
                    {product.size && (
                      <div className="absolute bottom-3 left-3 bg-[#1a1a1a]/80 text-white px-2 py-0.5 rounded text-[9px] font-mono">
                        {product.size}
                      </div>
                    )}
                  </div>

                  {/* Text properties */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <h4
                        className="text-sm font-semibold text-[#1a1a1a] tracking-wide hover:text-rose-600 line-clamp-1 cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                      >
                        {product.name}
                      </h4>
                      <span className="text-sm font-mono font-bold text-rose-600 shrink-0">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-stone-550 line-clamp-2 leading-relaxed font-light">
                      {product.description}
                    </p>

                    {/* Rating and Benefits highlights */}
                    <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
                      <Star
                        size={10}
                        className="fill-amber-400 stroke-amber-400"
                      />
                      <span className="text-stone-700 font-mono font-bold">
                        {product.rating}
                      </span>
                      <span className="text-stone-300 font-mono">•</span>
                      <span className="truncate text-stone-500">
                        {product.benefits?.[0] || "Dermatologist tested"}
                      </span>
                    </div>
                  </div>

                  {/* Add action */}
                  <button
                    id={`add-bag-${product.id}`}
                    onClick={() => onAddToBag(product)}
                    className="w-full h-11 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer mt-1 shadow-sm transition-colors"
                  >
                    <ShoppingBag size={13} className="stroke-[2.5px]" />
                    Add to Bag
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* TikTok Style Discovery Reels (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex justify-between items-center pb-2 border-b border-[#eeeae6]">
            <h3 className="text-xl font-serif italic text-[#1a1a1a] font-bold flex items-center gap-2">
              <Flame size={16} className="text-amber-500 animate-bounce" /> Live
              Try-On
            </h3>
            <span className="text-[10px] bg-rose-500/10 text-rose-600 border border-rose-300/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest font-bold">
              Live Feed
            </span>
          </div>

          <div className="relative aspect-[9/16] bg-stone-950 rounded-[2rem] overflow-hidden shadow-2xl border border-[#eeeae6]">
            {/* Infinite simulated videos array */}
            {mockPosts.map((post, idx) => {
              if (idx !== activeReelIdx) return null;
              const hasLiked = likedReels[post.id] || false;
              return (
                <div
                  key={post.id}
                  className="relative w-full h-full flex flex-col justify-end p-5"
                >
                  {/* Background beauty portrait acting as video static/looped mockup */}
                  <img
                    src={
                      post.image ||
                      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600"
                    }
                    alt="TikTok reel content"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />

                  {/* Soft top and bottom dark gradient overlay for optimal legibility */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-stone-950 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent pointer-events-none" />

                  {/* Action overlays (floating right) */}
                  <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-20">
                    {/* User profile bubble */}
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full border-2 border-rose-350 p-0.5 bg-stone-950">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="bg-rose-300 text-stone-950 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold -mt-2">
                        +
                      </div>
                    </div>

                    {/* Heart Counter */}
                    <button
                      id={`reel-like-${post.id}`}
                      onClick={() => handleLikeReel(post.id)}
                      className="w-12 h-12 rounded-full bg-stone-900/60 backdrop-blur-md flex flex-col items-center justify-center text-stone-200 border border-stone-800/40 hover:text-rose-400 cursor-pointer active:scale-125 transition-transform"
                    >
                      <Heart
                        size={18}
                        className={
                          hasLiked
                            ? "fill-rose-500 stroke-rose-500 text-rose-500"
                            : ""
                        }
                      />
                      <span className="text-[9px] font-mono mt-0.5">
                        {post.likes + (hasLiked ? 1 : 0)}
                      </span>
                    </button>

                    {/* Comment Indicator */}
                    <button className="w-12 h-12 rounded-full bg-stone-900/60 backdrop-blur-md flex flex-col items-center justify-center text-stone-200 border border-stone-800/40">
                      <ShoppingBag size={18} className="text-stone-300" />
                      <span className="text-[9px] font-mono mt-0.5">
                        {post.comments}
                      </span>
                    </button>
                  </div>

                  {/* Play visual indicator */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-16 h-16 rounded-full bg-stone-900/40 backdrop-blur-md flex items-center justify-center">
                      <Play size={28} className="text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Reel Product Recommendation Drawer overlay directly integrated */}
                  {post.shopProduct && (
                    <div className="relative bg-white/95 backdrop-blur-xl border border-[#eeeae6] rounded-2xl p-3 mb-3 z-10 flex gap-3 shadow-xl text-left text-[#1a1a1a]">
                      <img
                        src={post.shopProduct.image}
                        alt={post.shopProduct.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-15 rounded-lg object-cover bg-stone-100 cursor-pointer"
                        onClick={() => onSelectProduct(post.shopProduct!)}
                      />
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <span className="text-[8px] tracking-widest text-[#d4af37] uppercase font-mono font-bold">
                          REEL DEAL
                        </span>
                        <h5
                          className="text-xs font-bold text-[#1a1a1a] truncate hover:text-rose-600 cursor-pointer"
                          onClick={() => onSelectProduct(post.shopProduct!)}
                        >
                          {post.shopProduct.name}
                        </h5>
                        <span className="text-xs text-rose-600 font-mono font-bold">
                          ${post.shopProduct.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        id={`reel-add-${post.shopProduct.id}`}
                        onClick={() => onAddToBag(post.shopProduct!)}
                        className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-[#333] cursor-pointer shadow my-auto transition-colors"
                      >
                        <Plus size={14} className="stroke-[3px]" />
                      </button>
                    </div>
                  )}

                  {/* Text descriptions overlay */}
                  <div className="relative z-10 pr-12 pb-1 text-left">
                    <span className="text-xs font-semibold text-rose-200">
                      {post.authorHandle}
                    </span>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                    <span className="text-[9px] text-stone-500 font-mono tracking-wider block mt-2">
                      Sound: Original Audio • {post.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Reel selectors (carousel indicators) */}
            <div className="absolute top-4 left-4 flex gap-1.5 z-20">
              {mockPosts.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => setActiveReelIdx(pIdx)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    activeReelIdx === pIdx
                      ? "w-6 bg-rose-200"
                      : "w-2 bg-stone-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bento grid section: Skincare Ritual Recommendation zone */}
      <div className="px-4 md:px-0">
        <div className="bg-gradient-to-r from-rose-50/60 via-amber-50/30 to-rose-50/60 border border-[#eeeae6] p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-[10px] tracking-[0.2em] font-mono text-rose-500 uppercase font-bold">
              Bento personalized routine recommended
            </span>
            <h4 className="text-2xl font-serif italic text-[#1a1a1a]">
              Skin-Care Ritual matching your profile
            </h4>
            <p className="text-xs text-[#8a817c] font-light max-w-md">
              Aura generated these selections optimized specifically for **
              {skinType}** skin concerns with rapid lipid revival.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            {skinTypeRecommendations.slice(0, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="w-24 flex flex-col items-center text-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-[#eeeae6] p-1.5 flex items-center justify-center shadow-sm">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="text-[10px] text-[#1a1a1a] font-medium tracking-tight truncate w-full block">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
