"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const floatingCards = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80",
    name: "Silk Drape Dress",
    price: "₹4,999",
    delay: 0,
  },
  {
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&q=80",
    name: "Urban Jacket",
    price: "₹7,499",
    delay: 0.3,
  },
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80",
    name: "Classic White Tee",
    price: "₹1,299",
    delay: 0.6,
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden py-24 lg:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(200,169,110,0.6) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Text Content ── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border mb-6"
              style={{ borderColor: "rgba(200,169,110,0.3)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium text-accent tracking-wider uppercase">
                New Collection 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Where{" "}
              <span className="text-accent italic">style</span>{" "}
              speaks, trends{" "}
              <span
                className="relative inline-block"
                style={{
                  WebkitTextStroke: "1px #C8A96E",
                  WebkitTextFillColor: "transparent",
                }}
              >
                resonate
              </span>
              ,{" "}
              <br className="hidden sm:block" />
              fashion flourishes
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover curated collections crafted for those who dare to define
              their own style. Premium fabrics, timeless designs.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link
                id="hero-cta-new-collection"
                href="/shop"
                className="btn-gold inline-flex items-center gap-2 px-7 py-4 rounded-full text-base font-semibold"
              >
                New Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop?filter=sale"
                className="btn-outline inline-flex items-center gap-2 px-7 py-4 rounded-full text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                <Play className="w-3.5 h-3.5 text-accent fill-accent" />
                Explore Sale
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-8 mt-10 pt-8 border-t justify-center lg:justify-start"
              style={{ borderColor: "var(--border-col)" }}
            >
              {[
                { count: "10K+", label: "Happy Customers" },
                { count: "500+", label: "Styles Available" },
                { count: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-accent">{stat.count}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Floating cards — Desktop only ── */}
          <div className="hidden lg:block relative h-[540px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{ background: "var(--bg-elevated)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
                alt="Hero fashion"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
            </motion.div>

            {floatingCards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.4 + card.delay },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    delay: card.delay,
                    ease: "easeInOut",
                  },
                }}
                className="absolute glass rounded-2xl p-3 flex items-center gap-3"
                style={{
                  ...[
                    { bottom: "10%", left: "-8%", width: "180px" },
                    { top: "20%", right: "-5%", width: "168px" },
                    { bottom: "35%", right: "-8%", width: "156px" },
                  ][i],
                  borderColor: "rgba(200,169,110,0.2)",
                }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                    {card.name}
                  </p>
                  <p className="text-xs font-bold text-accent">{card.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Mobile / Tablet hero image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="block lg:hidden relative h-64 sm:h-80 rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
              alt="Hero fashion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
