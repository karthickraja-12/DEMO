"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Sparkles, ArrowRight, Check } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function SignupPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setAuth(
      { id: "3", email: form.email, name: form.name, role: "CUSTOMER", createdAt: "" },
      "demo-token"
    );
    router.push("/");
    setLoading(false);
  };

  const strength = [
    form.password.length >= 8,
    /[A-Z]/.test(form.password),
    /[0-9]/.test(form.password),
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="w-full max-w-md">
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
            Create an account
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Join thousands of fashion lovers
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
          {[
            { id: "signup-name", label: "Full Name", name: "name", type: "text", placeholder: "Your name" },
            { id: "signup-email", label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.id} className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
          ))}

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPw ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-field pr-10"
              />
              <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPw ? <EyeOff className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> : <Eye className="w-4 h-4" style={{ color: "var(--text-muted)" }} />}
              </button>
            </div>
            {/* Password strength */}
            {form.password.length > 0 && (
              <div className="mt-2 space-y-1">
                {[["8+ characters", strength[0]], ["Uppercase letter", strength[1]], ["Number", strength[2]]].map(
                  ([label, ok]) => (
                    <div key={label as string} className="flex items-center gap-2 text-xs">
                      <Check className="w-3 h-3" style={{ color: ok ? "#4ade80" : "var(--text-muted)" }} />
                      <span style={{ color: ok ? "#4ade80" : "var(--text-muted)" }}>{label as string}</span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <button
            id="signup-submit"
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Create Account <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
