"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import AdminHeader from "./components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // If auth state resolved, no user, and not already on the login page -> Redirect to login
    if (!loading && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  // Let the login page render freely without layout restrictions
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Display Cavue branded loader while verifying authentication
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#061826] flex flex-col items-center justify-center gap-4 relative overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-[#0C4568]/40 to-[#2B7DA8]/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
            <Image
              src="/whitelogo.svg"
              alt="Cavue Logo"
              width={110}
              height={32}
              className="h-7 w-auto object-contain animate-pulse"
              priority
            />
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <Loader2 className="w-4 h-4 text-[#2B7DA8] animate-spin" />
            <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Verifying Authorization...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Prevent flicker while redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[#0C4568] flex flex-col font-sans">
      <AdminHeader />
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {children}
      </main>
    </div>
  );
}
