"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { DEMO_PRODUCTS } from "@/lib/demoData";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Size } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = DEMO_PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();


  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = selectedSize
    ? product.variants.find((v) => v.size === selectedSize)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedVariant) return;
    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      size: selectedVariant.size,
      quantity: qty,
      stock: selectedVariant.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.salePrice
    ? getDiscountPercent(product.price, product.salePrice)
    : 0;

  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-accent">Shop</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              style={{ background: "var(--bg-secondary)" }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isOnSale && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    -{discount}% OFF
                  </span>
                </div>
              )}

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((i) => Math.min(product.images.length - 1, i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    id={`thumb-${i}`}
                    className={cn(
                      "w-20 h-24 rounded-xl overflow-hidden transition-all",
                      selectedImage === i ? "ring-2 ring-accent" : "opacity-50 hover:opacity-80"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
                {product.category.name}
              </p>
              <h1
                className="font-display text-3xl sm:text-4xl font-bold leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    style={{ color: i < 4 ? "#c8a96e" : "var(--text-muted)", fill: i < 4 ? "#c8a96e" : "none" }}
                  />
                ))}
              </div>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>4.8 (124 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-accent">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <span className="text-lg line-through" style={{ color: "var(--text-muted)" }}>
                  {formatPrice(product.price)}
                </span>
              )}
              {product.salePrice && (
                <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {product.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Select Size
                </h3>
                <button className="text-xs text-accent hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    id={`size-${variant.size}`}
                    onClick={() => variant.stock > 0 && setSelectedSize(variant.size)}
                    disabled={variant.stock === 0}
                    className={cn(
                      "relative w-12 h-12 rounded-xl text-sm font-bold transition-all",
                      variant.stock === 0 && "opacity-40 cursor-not-allowed",
                      selectedSize === variant.size
                        ? "bg-accent text-[#0a0a0b] ring-2 ring-accent ring-offset-2"
                        : variant.stock > 0
                        ? "btn-outline hover:border-accent/60"
                        : "btn-outline"
                    )}
                    style={selectedSize !== variant.size ? { color: "var(--text-secondary)" } : {}}
                  >
                    {variant.size}
                    {variant.stock === 0 && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="absolute w-full h-px bg-current rotate-45 opacity-40" />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Stock indicator */}
              {selectedVariant && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "text-xs mt-2 font-medium",
                    selectedVariant.stock <= 3 ? "text-orange-400" : "text-green-400"
                  )}
                >
                  {selectedVariant.stock <= 3
                    ? `⚠️ Only ${selectedVariant.stock} left in stock!`
                    : `✓ ${selectedVariant.stock} in stock`}
                </motion.p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Quantity
              </h3>
              <div
                className="inline-flex items-center rounded-xl overflow-hidden border"
                style={{ borderColor: "var(--border-col)" }}
              >
                <button
                  id="qty-decrease"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-accent/10 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" style={{ color: "var(--text-primary)" }} />
                </button>
                <span
                  className="w-12 text-center text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {qty}
                </span>
                <button
                  id="qty-increase"
                  onClick={() => setQty((q) => Math.min(selectedVariant?.stock || 10, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-accent/10 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" style={{ color: "var(--text-primary)" }} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <motion.button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "flex-1 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all",
                  !selectedSize
                    ? "opacity-50 cursor-not-allowed"
                    : added
                    ? "bg-green-500 text-white"
                    : "btn-gold"
                )}
              >
                <ShoppingBag className="w-4 h-4" />
                {!selectedSize
                  ? "Select a Size"
                  : added
                  ? "Added to Cart! ✓"
                  : "Add to Cart"}
              </motion.button>
              <button className="btn-outline w-14 h-14 rounded-2xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent" />
              </button>
            </div>

            {/* Trust badges */}
            <div
              className="grid grid-cols-3 gap-3 pt-4 border-t"
              style={{ borderColor: "var(--border-col)" }}
            >
              {[
                { icon: Truck, text: "Free Shipping", sub: "Orders over ₹999" },
                { icon: RotateCcw, text: "Easy Returns", sub: "30-day policy" },
                { icon: Shield, text: "Secure Pay", sub: "SSL encrypted" },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="text-center">
                  <Icon className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{text}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
