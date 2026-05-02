"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Demo: simulate login
    await new Promise((r) => setTimeout(r, 800));
    if (email === "admin@luxe.com" && password === "admin123") {
      setAuth({ id: "1", email, name: "Admin User", role: "ADMIN", createdAt: "" }, "demo-token");
      router.push("/admin");
    } else if (email && password) {
      setAuth({ id: "2", email, name: email.split("@")[0], role: "CUSTOMER", createdAt: "" }, "demo-token");
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0a0a0b]" />
            </div>
            <span className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>
              LUXE <span className="text-accent">THREAD</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Welcome back
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Sign in to your account
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-3xl p-6 sm:p-8 space-y-5"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}
        >
          {/* Demo hint */}
          <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.2)" }}>
            <p className="text-accent font-semibold mb-1">Demo Credentials</p>
            <p style={{ color: "var(--text-secondary)" }}>Admin: <strong>admin@luxe.com</strong> / <strong>admin123</strong></p>
            <p style={{ color: "var(--text-secondary)" }}>Customer: any email + password</p>
          </div>

          <div>
            <label htmlFor="login-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                ) : (
                  <Eye className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs"
            >
              {error}
            </motion.p>
          )}

          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
