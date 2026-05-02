"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  // Default to first in-stock variant
  const defaultVariant = product.variants.find((v) => v.stock > 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant) return;
    addItem({
      id: `${product.id}-${defaultVariant.id}`,
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      size: defaultVariant.size,
      quantity: 1,
      stock: defaultVariant.stock,
    });
  };

  const discount = product.salePrice
    ? getDiscountPercent(product.price, product.salePrice)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.07 }}
    >
      <Link
        href={`/product/${product.id}`}
        id={`product-${product.id}`}
        className="group block product-card rounded-2xl overflow-hidden w-full"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isFeatured && (
              <span className="badge">Featured</span>
            )}
            {product.isOnSale && discount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                -{discount}%
              </span>
            )}
            {!defaultVariant && (
              <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-red-400"
          >
            <Heart className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
          </button>

          {/* Quick Add overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              id={`quick-add-${product.id}`}
              onClick={handleQuickAdd}
              disabled={!defaultVariant}
              className="btn-gold w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              {defaultVariant ? "Quick Add" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
            {product.category?.name}
          </p>
          <h3
            className="font-medium text-sm leading-snug line-clamp-1 mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                style={{
                  color: i < 4 ? "#c8a96e" : "var(--text-muted)",
                  fill: i < 4 ? "#c8a96e" : "none",
                }}
              />
            ))}
            <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
              (24)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <span
                className="text-xs line-through"
                style={{ color: "var(--text-muted)" }}
              >
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
