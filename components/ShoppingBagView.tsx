import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronRight,
  Check,
  Trash2,
  Plus,
  Minus,
  Tag,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { CartItem, Product } from "../lib/types";

interface ShoppingBagProps {
  cartItems: CartItem[];
  onUpdateQty: (product: Product, d: number) => void;
  onRemoveItem: (product: Product) => void;
  onPlaceOrder: () => void;
}

export const ShoppingBagView: React.FC<ShoppingBagProps> = ({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
}) => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>("");
  const [promoSuccess, setPromoSuccess] = useState<boolean>(false);

  // Flutterwave Interactive checkout state
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "flutterwave_pay" | "submitting"
  >("cart");
  const [payEmail, setPayEmail] = useState<string>("elena.rossi@mirage.com");
  const [payName, setPayName] = useState<string>("Elena Rossi");
  const [payPhone, setPayPhone] = useState<string>("+1 (555) 941-1002");

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "MIRAGEGIFT") {
      setDiscount(20);
      setPromoSuccess(true);
      setPromoError("");
    } else {
      setPromoError('Unknown luxury token. Try "MIRAGEGIFT" for $20 off.');
      setPromoSuccess(false);
      setDiscount(0);
    }
  };

  const getSubtotal = () =>
    cartItems.reduce(
      (acc, current) => acc + current.product.price * current.quantity,
      0,
    );
  const tax = getSubtotal() * 0.08;
  const delivery = getSubtotal() > 150 ? 0 : 15;
  const finalTotal = getSubtotal() + tax + delivery - discount;

  const handlePayViaFlutterwave = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep("flutterwave_pay");
  };

  const executeFlutterwaveSubmission = () => {
    setCheckoutStep("submitting");
    setTimeout(() => {
      onPlaceOrder();
    }, 2200);
  };

  return (
    <div className="w-full pb-24 text-stone-100 font-sans px-4 md:px-0 max-w-4xl mx-auto">
      <div className="flex justify-between items-center pb-4 border-b border-stone-900">
        <h3 className="text-lg font-light tracking-widest uppercase text-stone-200">
          Shopping Bag (
          {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} items)
        </h3>
        <span className="text-xs font-mono text-stone-500">
          SECURE DISPATCH
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-4 text-center">
          <ShoppingBag size={48} className="text-stone-700 stroke-[1.5px]" />
          <div>
            <h4 className="text-base font-light tracking-wide text-stone-300">
              Your bag is empty
            </h4>
            <p className="text-xs text-stone-500 font-light max-w-xs mt-1">
              Explore our custom collection grids or ask Aura to formulate a
              glow sequence.
            </p>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {checkoutStep === "cart" && (
            <motion.div
              key="cart_screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6"
            >
              {/* Left Side: Items List (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div
                    id={`cart-item-${item.product.id}`}
                    key={item.product.id}
                    className="p-4 rounded-3xl bg-stone-900/30 border border-stone-850 flex gap-4 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-20 rounded-xl object-cover bg-stone-950"
                    />

                    <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest font-mono font-bold">
                        {item.product.brand}
                      </span>
                      <h4 className="text-sm font-medium text-stone-200 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-xs text-rose-300 font-mono mt-0.5">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-850 p-1.5 rounded-xl font-mono">
                      <button
                        id={`cart-qty-dec-${item.product.id}`}
                        onClick={() => onUpdateQty(item.product, -1)}
                        className="w-6 h-6 rounded bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-stone-800 text-stone-400 cursor-pointer"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-semibold px-2 text-stone-200">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-qty-inc-${item.product.id}`}
                        onClick={() => onUpdateQty(item.product, 1)}
                        className="w-6 h-6 rounded bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-stone-800 text-stone-400 cursor-pointer"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    {/* Delete trigger */}
                    <button
                      id={`cart-remove-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product)}
                      className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-red-500/10 cursor-pointer text-stone-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Side: Totals Card (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Promo Code Input */}
                <div className="bg-stone-900/40 border border-stone-850 p-5 rounded-[2rem] flex flex-col gap-3 text-left shadow-lg">
                  <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase block">
                    PROMO VOUCHER
                  </span>
                  <div className="flex gap-2">
                    <input
                      id="promo-input"
                      type="text"
                      placeholder="e.g. MIRAGEGIFT"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 h-10 bg-stone-950 border border-stone-850 rounded-xl px-3 text-xs tracking-widest text-center focus:outline-none focus:border-rose-300/40 uppercase"
                    />
                    <button
                      onClick={applyPromo}
                      className="bg-stone-200 text-stone-950 hover:bg-rose-100 text-[10px] px-3 rounded-xl font-semibold uppercase cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <span className="text-[10px] text-red-400 font-mono">
                      {promoError}
                    </span>
                  )}
                  {promoSuccess && (
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <Check size={10} className="stroke-[3px]" /> $20 off
                      applied!
                    </span>
                  )}
                </div>

                {/* Subtotal table */}
                <div className="bg-stone-900/40 border border-stone-850 p-6 rounded-[2rem] flex flex-col gap-4 text-left shadow-lg">
                  <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase block">
                    SUMS PRESCRIPTION
                  </span>

                  <div className="flex flex-col gap-3 text-xs tracking-wide">
                    <div className="flex justify-between border-b border-stone-900 pb-2">
                      <span className="text-stone-400 font-light">
                        Vanity Bag Subtotal
                      </span>
                      <span className="font-mono text-stone-200">
                        ${getSubtotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-stone-900 pb-2">
                      <span className="text-stone-400 font-light">
                        Est. State Tax (8%)
                      </span>
                      <span className="font-mono text-stone-200">
                        ${tax.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-stone-900 pb-2">
                      <span className="text-stone-400 font-light">
                        Luxury Courier Shipping
                      </span>
                      <span className="font-mono text-stone-200">
                        {delivery === 0 ? (
                          <b className="text-rose-200">FREE</b>
                        ) : (
                          `$${delivery.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between border-b border-stone-900 pb-2 text-rose-300 font-mono">
                        <span>VIP Credit Gift</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-1 text-sm font-semibold tracking-wide">
                      <span className="text-stone-100">
                        Couture Ritual Total
                      </span>
                      <span className="font-mono text-rose-200">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    id="bag-checkout-trigger"
                    onClick={handlePayViaFlutterwave}
                    className="w-full h-12 bg-stone-100 hover:bg-rose-100 text-stone-950 rounded-xl font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    Proceed with Flutterwave <ChevronRight size={13} />
                  </button>

                  <div className="flex items-center gap-1.5 justify-center text-[10px] text-stone-500 font-mono mt-1">
                    <ShieldCheck size={12} className="text-rose-300" />{" "}
                    End-to-end encryption active
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Checkout Screen 2: Interactive Flutterwave portal mockup */}
          {checkoutStep === "flutterwave_pay" && (
            <motion.div
              key="flutterwave_screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto bg-stone-950 border border-stone-800 p-8 rounded-[2.5rem] mt-6 flex flex-col gap-6 text-left shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-orange-400 font-bold">
                    FLUTTERWAVE PAY
                  </span>
                  <h4 className="text-lg font-light tracking-wide text-stone-100">
                    Boutique Escrow
                  </h4>
                </div>
                {/* Flutterwave brand emblem (orange-black circle design) */}
                <div className="h-9 w-9 bg-orange-500 rounded-full flex items-center justify-center font-bold text-stone-950 text-xs">
                  FL
                </div>
              </div>

              <div className="bg-stone-900/60 p-4 border border-stone-850 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-stone-400 font-light">
                  Securing order value:
                </span>
                <span className="font-mono text-stone-100 font-semibold">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Secure Form inputs */}
              <div className="flex flex-col gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1.5">
                  <label className="text-stone-400 font-light">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    value={payName}
                    onChange={(e) => setPayName(e.target.value)}
                    className="h-10 bg-stone-900 border border-stone-800 rounded-xl px-3 text-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-stone-400 font-light">
                    Checkout Email Notification
                  </label>
                  <input
                    type="email"
                    value={payEmail}
                    onChange={(e) => setPayEmail(e.target.value)}
                    className="h-10 bg-stone-900 border border-stone-800 rounded-xl px-3 text-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-stone-400 font-light">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={payPhone}
                    onChange={(e) => setPayPhone(e.target.value)}
                    className="h-10 bg-stone-900 border border-stone-800 rounded-xl px-3 text-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Secure simulated card container */}
              <div className="p-4 bg-gradient-to-tr from-stone-900 to-stone-850 border border-stone-800 rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 bg-stone-950 border border-stone-800 rounded flex items-center justify-center text-orange-400">
                  <CreditCard size={18} />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-[11px] font-semibold tracking-widest text-stone-300 block">
                    •••• •••• •••• 9401
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono uppercase block">
                    FLUTTERWAVE ESCROW CHOOSE CAPABLE CARD
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setCheckoutStep("cart")}
                  className="flex-1 h-12 bg-stone-900 border border-stone-800 hover:bg-stone-800 rounded-xl text-xs font-medium tracking-wide text-stone-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="flutterwave-submit-pay"
                  onClick={executeFlutterwaveSubmission}
                  className="flex-2 h-12 bg-gradient-to-r from-orange-400 to-amber-300 text-stone-950 font-semibold rounded-xl text-xs tracking-widest uppercase flex justify-center items-center gap-2 cursor-pointer shadow-lg"
                >
                  Authorize <ChevronRight size={13} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Submitting Shimmer loader */}
          {checkoutStep === "submitting" && (
            <motion.div
              key="submitting_screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center flex flex-col items-center gap-4 max-w-sm mx-auto"
            >
              <div className="w-12 h-12 rounded-full border-t-2 border-orange-400 border-r-2 animate-spin" />
              <div>
                <h4 className="text-sm font-medium text-stone-200 tracking-wider uppercase font-mono">
                  Routing Escrow Pipeline
                </h4>
                <p className="text-xs text-stone-500 font-light mt-1">
                  Flutterwave is negotiating with secure banking institutions.
                  Please do not close this browser tab.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
