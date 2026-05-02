"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Tag,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, totalPrice, totalItems } =
    useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Use useEffect to set mounted to true
  useEffect(() => setMounted(true), []);

  const subtotal = totalPrice();
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "LUXE20") {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
    }, 4000);
  };

  if (!mounted) {
    return <div className="min-h-screen" style={{ background: "var(--bg-primary)" }} />;
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 rounded-3xl glass max-w-md mx-4"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Order Confirmed!
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6"
            style={{ background: "var(--bg-elevated)" }}
          >
            <span className="text-xs text-accent font-mono font-bold">
              #ORD-{Math.random().toString(36).slice(2, 8).toUpperCase()}
            </span>
          </div>
          <Link href="/shop" className="btn-gold px-8 py-3 rounded-full block text-sm font-semibold">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--bg-elevated)" }}>
            <ShoppingBag className="w-10 h-10" style={{ color: "var(--text-muted)" }} />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Your cart is empty
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Looks like you haven&apos;t added anything yet
          </p>
          <Link href="/shop" className="btn-gold px-8 py-3 rounded-full inline-block text-sm font-semibold">
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <h1 className="font-display text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Shopping Cart
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          {totalItems()} {totalItems() === 1 ? "item" : "items"}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.variantId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  layout
                  className="flex gap-4 p-4 rounded-2xl"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}
                >
                  {/* Image */}
                  <div className="w-24 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-1" style={{ color: "var(--text-primary)" }}>
                          {item.name}
                        </h3>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          Size: <span className="font-semibold text-accent">{item.size}</span>
                        </p>
                      </div>
                      <button
                        id={`remove-${item.variantId}`}
                        onClick={() => removeItem(item.variantId)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 transition-all flex-shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div
                        className="inline-flex items-center rounded-lg overflow-hidden border"
                        style={{ borderColor: "var(--border-col)" }}
                      >
                        <button
                          id={`dec-${item.variantId}`}
                          onClick={() => updateQty(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-accent/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" style={{ color: "var(--text-primary)" }} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {item.quantity}
                        </span>
                        <button
                          id={`inc-${item.variantId}`}
                          onClick={() => updateQty(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-accent/10 transition-colors"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-3 h-3" style={{ color: "var(--text-primary)" }} />
                        </button>
                      </div>
                      <span className="font-bold text-accent text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-5 sticky top-24"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}
            >
              <h2 className="font-semibold text-base mb-4" style={{ color: "var(--text-primary)" }}>
                Order Summary
              </h2>

              {/* Promo code */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                  <input
                    id="promo-input"
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="input-field pl-9 text-sm py-2.5"
                  />
                </div>
                <button
                  id="apply-promo"
                  onClick={applyPromo}
                  className="btn-outline px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-green-400 mb-3"
                >
                  ✓ LUXE20 applied — 20% off!
                </motion.p>
              )}

              {/* Price breakdown */}
              <div className="space-y-2.5 text-sm pb-4 border-b" style={{ borderColor: "var(--border-col)" }}>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                  <span style={{ color: "var(--text-primary)" }}>{formatPrice(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (20%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? "#4ade80" : "var(--text-primary)" }}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-base py-4">
                <span style={{ color: "var(--text-primary)" }}>Total</span>
                <span className="text-accent">{formatPrice(total)}</span>
              </div>

              <motion.button
                id="checkout-btn"
                onClick={handleCheckout}
                whileTap={{ scale: 0.97 }}
                className="btn-gold w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <div className="mt-4 text-center">
                <Link href="/shop" className="text-xs flex items-center justify-center gap-1 hover:text-accent transition-colors"
                  style={{ color: "var(--text-muted)" }}>
                  <ChevronRight className="w-3 h-3 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
