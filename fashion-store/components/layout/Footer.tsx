"use client";

import Link from "next/link";
import { Sparkles, Camera, MessageCircle, Globe, Mail } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Men", href: "/shop?cat=men" },
    { label: "Women", href: "/shop?cat=women" },
    { label: "Sale", href: "/shop?filter=sale" },
  ],
  Help: [
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--border-col)",
        background: "var(--bg-secondary)",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #c8a96e55, #c8a96e, #c8a96e55, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Brand Column ── */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-[#0a0a0b]" />
              </div>
              <span
                className="font-display font-bold text-xl tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                LUXE<span className="text-accent"> THREAD</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Where style speaks, trends resonate, and fashion flourishes. Curated
              collections for the modern wardrobe.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2 mb-5">
              <input
                type="email"
                placeholder="Your email"
                className="input-field flex-1 text-sm py-2.5"
              />
              <button className="btn-gold px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full btn-outline flex items-center justify-center hover:border-accent/50 hover:text-accent transition-all"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link Columns ── */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-semibold text-sm mb-4 tracking-wide"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-accent"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border-col)" }}
        >
          <p className="text-xs order-2 sm:order-1" style={{ color: "var(--text-muted)" }}>
            © 2026 Luxe Thread. All rights reserved.
          </p>
          <div className="flex items-center gap-3 order-1 sm:order-2 flex-wrap justify-center">
            {["Visa", "Mastercard", "UPI", "Razorpay"].map((pm) => (
              <span
                key={pm}
                className="text-xs px-2.5 py-1 rounded-md border"
                style={{
                  borderColor: "var(--border-col)",
                  color: "var(--text-muted)",
                }}
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
