"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Sun,
  Moon,
  User,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Sale", href: "/shop?filter=sale" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = mounted ? totalItems() : 0;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-4"
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            scrolled && "glass rounded-2xl"
          )}
        >
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#0a0a0b]" />
              </div>
              <span
                className="font-display font-bold text-xl tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                LUXE<span className="text-accent"> THREAD</span>
              </span>
            </Link>

            {/* Pill Navigation — desktop */}
            <nav className="hidden md:flex pill-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "pill-nav-item",
                    pathname === link.href && "active"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  id="theme-toggle"
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="btn-outline w-9 h-9 rounded-full flex items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-accent" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                id="cart-icon"
                className="btn-outline relative w-9 h-9 rounded-full flex items-center justify-center"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center badge"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Link>

              {mounted && user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href={user.role === "ADMIN" ? "/admin" : "/account"}
                    className="btn-outline px-4 py-2 rounded-full text-sm flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" />
                    {user.name.split(" ")[0]}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-xs px-3 py-1.5 rounded-full border border-transparent hover:border-red-500/30 text-[var(--text-muted)] hover:text-red-400 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="btn-outline px-4 py-2 rounded-full text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="btn-gold px-4 py-2 rounded-full text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                id="hamburger-btn"
                className="md:hidden btn-outline w-9 h-9 rounded-full flex items-center justify-center"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col"
              style={{ background: "var(--bg-elevated)" }}
            >
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border-col)" }}>
                <span className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center btn-outline"
                >
                  <X className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                        pathname === link.href
                          ? "bg-accent/10 text-accent"
                          : "hover:bg-white/5"
                      )}
                      style={{ color: pathname === link.href ? "#c8a96e" : "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: "var(--border-col)" }}>
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="btn-outline w-full py-3 rounded-xl text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-outline w-full py-3 rounded-xl text-sm text-center">
                      Login
                    </Link>
                    <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="btn-gold w-full py-3 rounded-xl text-sm text-center">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[88px]" />
    </>
  );
}
