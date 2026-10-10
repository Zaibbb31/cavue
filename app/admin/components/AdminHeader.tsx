"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  currentTab?: "leads" | "blogs";
  onTabChange?: (tab: "leads" | "blogs") => void;
}

export default function AdminHeader({
  currentTab,
  onTabChange,
}: AdminHeaderProps = {}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isLeadsActive = currentTab
    ? currentTab === "leads"
    : (pathname?.startsWith("/admin/leads") || pathname === "/admin");
  const isBlogsActive = currentTab
    ? currentTab === "blogs"
    : pathname?.startsWith("/admin/blogs");

  const tabs = [
    { key: "leads", label: "Leads", href: "/admin/leads", isActive: isLeadsActive },
    { key: "blogs", label: "Blogs", href: "/admin/blogs", isActive: isBlogsActive },
  ];

  return (
    <header className="w-full border-b border-slate-200 bg-slate-50/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Brand Logo & Navigation Capsule */}
        <div className="flex items-center gap-3 sm:gap-8">
          <Link href="/" className="flex items-center group">
            <span className="font-anton text-xl sm:text-2xl lg:text-[26px] tracking-wider text-[#0C4568] group-hover:text-[#0C3852] transition-colors uppercase">
              CAVUE
            </span>
          </Link>

          {/* Navigation Pill Container */}
          <nav className="inline-flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl shadow-inner border border-slate-200">
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                onClick={() => onTabChange && onTabChange(tab.key as "leads" | "blogs")}
                className={`px-3 sm:px-5 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tab.isActive
                    ? "bg-[#0C4568] text-white shadow-sm"
                    : "text-slate-500 hover:text-[#0C4568] hover:bg-black/5"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Logged-in User Capsule & Sign Out */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 pl-2">
            <div className="w-7 h-7 rounded-full bg-[#0C4568] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {user?.email ? user.email.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="text-xs font-medium text-slate-600 truncate max-w-[180px] lg:max-w-[240px]">
              {user?.email || "Admin"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => logout()}
            className="text-xs font-semibold flex items-center gap-1.5 border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg transition-colors text-slate-600 bg-white shadow-xs cursor-pointer shrink-0"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-500" />
            <span className="whitespace-nowrap">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
