import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronRight,
  Check,
  Trash2,
  Plus,
  Minus,
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
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);

  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "flutterwave_pay" | "submitting"
  >("cart");

  const [payEmail, setPayEmail] = useState("elena.rossi@mirage.com");
  const [payName, setPayName] = useState("Elena Rossi");
  const [payPhone, setPayPhone] = useState("+1 (555) 941-1002");

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "MIRAGEGIFT") {
      setDiscount(20);
      setPromoSuccess(true);
      setPromoError("");
    } else {
      setPromoError('Unknown token. Try "MIRAGEGIFT"');
      setPromoSuccess(false);
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08;
  const delivery = subtotal > 150 ? 0 : 15;
  const finalTotal = subtotal + tax + delivery - discount;

  const handlePayViaFlutterwave = () => {
    if (!cartItems.length) return;
    setCheckoutStep("flutterwave_pay");
  };

  const executeFlutterwaveSubmission = () => {
    setCheckoutStep("submitting");
    setTimeout(() => {
      onPlaceOrder();
    }, 2200);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-10 text-[#1a1a1a]">
      {/* Ambient glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-200/30 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/20 rounded-full blur-[160px]" />

      <div className="relative z-10">
        <div className="flex justify-between items-center border-b border-[#eeeae6] pb-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-rose-400 font-mono">
              MIRAGE CHECKOUT
            </span>
            <h2 className="text-3xl font-serif italic font-black mt-1">
              Shopping Ritual
            </h2>
          </div>

          <span className="text-xs text-[#8a817c] font-mono">
            {cartItems.reduce((a, b) => a + b.quantity, 0)} ITEMS
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-32 flex flex-col items-center text-center">
            <ShoppingBag size={50} className="text-rose-200 mb-4" />
            <h3 className="font-serif italic text-2xl">Your bag is empty</h3>
            <p className="text-[#8a817c] text-sm mt-2 max-w-sm">
              Explore premium beauty rituals and discover your signature glow.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* CART */}
            {checkoutStep === "cart" && (
              <motion.div
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-12 gap-8 mt-10"
              >
                {/* PRODUCTS */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white/80 backdrop-blur-xl border border-[#eeeae6] rounded-[2rem] p-5 flex items-center gap-5 shadow-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-28 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
                          {item.product.brand}
                        </span>

                        <h4 className="font-medium text-lg mt-1">
                          {item.product.name}
                        </h4>

                        <p className="text-sm text-[#8a817c] mt-1">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-[#fcf8f7] rounded-xl p-2 border border-[#eeeae6]">
                        <button
                          onClick={() => onUpdateQty(item.product, -1)}
                          className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="px-2 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => onUpdateQty(item.product, 1)}
                          className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product)}
                        className="w-10 h-10 rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-100 flex items-center justify-center"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* SUMMARY */}
                <div className="lg:col-span-4">
                  <div className="bg-white/80 backdrop-blur-xl border border-[#eeeae6] rounded-[2rem] p-6 shadow-xl">
                    <span className="text-[10px] uppercase tracking-widest text-[#8a817c] font-mono">
                      TOTAL SUMMARY
                    </span>

                    <div className="space-y-4 mt-5 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>{delivery === 0 ? "FREE" : `$${delivery}`}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-rose-500">
                          <span>Discount</span>
                          <span>- ${discount}</span>
                        </div>
                      )}

                      <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Promo */}
                    <div className="mt-6 flex gap-2">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 border border-[#eeeae6] rounded-xl px-4 h-11 text-sm"
                      />
                      <button
                        onClick={applyPromo}
                        className="px-4 rounded-xl bg-[#1a1a1a] text-white"
                      >
                        Apply
                      </button>
                    </div>

                    {promoError && (
                      <p className="text-xs text-red-400 mt-2">{promoError}</p>
                    )}

                    {promoSuccess && (
                      <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                        <Check size={12} /> Promo applied
                      </p>
                    )}

                    <button
                      onClick={handlePayViaFlutterwave}
                      className="w-full mt-8 h-14 bg-[#1a1a1a] hover:bg-[#333] text-white rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                    >
                      Checkout with Flutterwave
                      <ChevronRight size={14} />
                    </button>

                    <div className="mt-4 flex justify-center items-center gap-2 text-xs text-[#8a817c]">
                      <ShieldCheck size={14} />
                      Secured Payment
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FLUTTERWAVE */}
            {checkoutStep === "flutterwave_pay" && (
              <motion.div
                key="pay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-lg mx-auto mt-12 bg-white border border-[#eeeae6] rounded-[2rem] p-8 shadow-xl"
              >
                <h3 className="text-2xl font-serif italic mb-6">
                  Flutterwave Authorization
                </h3>

                <div className="space-y-4">
                  <input
                    value={payName}
                    onChange={(e) => setPayName(e.target.value)}
                    className="w-full h-12 px-4 border rounded-xl"
                  />

                  <input
                    value={payEmail}
                    onChange={(e) => setPayEmail(e.target.value)}
                    className="w-full h-12 px-4 border rounded-xl"
                  />

                  <input
                    value={payPhone}
                    onChange={(e) => setPayPhone(e.target.value)}
                    className="w-full h-12 px-4 border rounded-xl"
                  />
                </div>

                <button
                  onClick={executeFlutterwaveSubmission}
                  className="w-full h-14 mt-8 bg-gradient-to-r from-orange-400 to-amber-300 rounded-2xl font-semibold flex justify-center items-center gap-2"
                >
                  <CreditCard size={16} />
                  Authorize Payment
                </button>
              </motion.div>
            )}

            {/* LOADING */}
            {checkoutStep === "submitting" && (
              <motion.div
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-28 text-center"
              >
                <div className="w-14 h-14 border-4 border-rose-300 border-t-transparent rounded-full animate-spin mx-auto" />

                <h4 className="mt-6 font-serif italic text-2xl">
                  Processing Ritual...
                </h4>

                <p className="text-[#8a817c] mt-2">
                  Securely routing your payment via Flutterwave.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
