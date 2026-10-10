"use client";

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  // If already authenticated, redirect straight to the admin panel
  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin/leads");
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/admin/leads");
    } catch (err: any) {
      const code = err?.code || "";
      if (
        code === "auth/invalid-credential" ||
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
      ) {
        setError("Invalid email address or password. Please try again.");
      } else if (code === "auth/too-many-requests") {
        setError(
          "Access temporarily locked due to multiple failed attempts. Please try again later."
        );
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#061826] relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Ambient glowing orbs matching Cavue's luxury oceanic navy palette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#0C4568]/45 via-[#2B7DA8]/25 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-[#0C3852]/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-200 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Site</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Glass Card */}
        <div className="bg-[#092232]/85 backdrop-blur-2xl border border-white/10 rounded-2xl p-7 sm:p-10 shadow-2xl shadow-black/60 relative">

          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2B7DA8]/50 transition-colors shadow-inner group">
              <Image
                src="/whitelogo.svg"
                alt="Cavue Logo"
                width={120}
                height={35}
                className="h-7 w-auto object-contain transition-transform group-hover:scale-[1.03]"
                priority
              />
            </Link>

            <h1 className="text-2xl sm:text-3xl font-anton tracking-wider text-white uppercase mt-1">
              Admin Portal
            </h1>
            <div className="flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full bg-[#2B7DA8]/15 border border-[#2B7DA8]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2B7DA8]" />
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Restricted Authority Access
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-300 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cavue.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#061826]/75 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2B7DA8] focus:ring-1 focus:ring-[#2B7DA8] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#061826]/75 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2B7DA8] focus:ring-1 focus:ring-[#2B7DA8] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0C4568] via-[#1a5b82] to-[#2B7DA8] hover:from-[#0C3852] hover:to-[#22678c] text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg shadow-[#0C4568]/40 hover:shadow-[#0C4568]/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Authority Dashboard</span>
              )}
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <p className="text-center text-[11px] text-slate-400 mt-6 tracking-wide">
          Authorized personnel only. All access attempts and activities are monitored and logged.
        </p>
      </div>
    </div>
  );
}
