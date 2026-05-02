"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ minHeight: "300px" }}
        >
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80"
            alt="Sale banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-accent/8" />

          {/* Content */}
          <div className="relative z-10 p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-accent text-xs font-bold uppercase tracking-widest">
                  Limited Time Offer
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                20% Off Your
                <br />
                <span className="text-accent">First Order</span>
              </h2>
              <p className="text-white/60 text-base max-w-md">
                Use code{" "}
                <span className="font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                  LUXE20
                </span>{" "}
                at checkout. Valid on all full-price items.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                id="cta-shop-now"
                href="/shop"
                className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold whitespace-nowrap"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
