"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "men",
    name: "Men",
    count: "120+ styles",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80",
    href: "/shop?cat=men",
    color: "from-blue-900/30 to-transparent",
  },
  {
    id: "women",
    name: "Women",
    count: "200+ styles",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa30e05b1e?w=400&q=80",
    href: "/shop?cat=women",
    color: "from-rose-900/30 to-transparent",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    count: "80+ styles",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
    href: "/shop?cat=streetwear",
    color: "from-orange-900/30 to-transparent",
  },
  {
    id: "accessories",
    name: "Accessories",
    count: "60+ items",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    href: "/shop?cat=accessories",
    color: "from-amber-900/30 to-transparent",
  },
  {
    id: "outerwear",
    name: "Outerwear",
    count: "45+ styles",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    href: "/shop?cat=outerwear",
    color: "from-gray-900/50 to-transparent",
  },
  {
    id: "footwear",
    name: "Footwear",
    count: "90+ pairs",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    href: "/shop?cat=footwear",
    color: "from-purple-900/30 to-transparent",
  },
];

export default function CategoryCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 w-full" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
              Browse Categories
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Shop by Style
            </h2>
          </motion.div>
          <div className="hidden sm:flex gap-2">
            <button
              id="category-scroll-left"
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full btn-outline flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
            </button>
            <button
              id="category-scroll-right"
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full btn-outline flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto carousel-scroll pb-4 -mx-4 px-4"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={cat.href}
                id={`category-${cat.id}`}
                className="group relative flex-shrink-0 w-52 h-72 rounded-2xl overflow-hidden block"
                style={{ background: "var(--bg-elevated)" }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} from-black/80 via-black/20 to-transparent`} />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-bold text-xl text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">{cat.count}</p>
                  <div className="mt-3 flex items-center gap-1 text-accent text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/40 rounded-2xl transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
