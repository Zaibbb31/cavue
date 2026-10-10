"use client";

import React from "react";
import { Users, Zap, CheckCircle2 } from "lucide-react";
import { LeadStats } from "@/lib/types/lead";

interface StatsCardsProps {
  stats: LeadStats;
  loading?: boolean;
}

export default function StatsCards({ stats, loading = false }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto">
      {/* Total Leads Card */}
      <div className="flex items-center gap-2 sm:gap-3 bg-white border border-slate-200 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-xs hover:border-slate-300 transition-colors">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 text-[#0C4568] hidden sm:flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-[#0C4568]" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] sm:text-xs font-medium text-slate-500 tracking-tight truncate">
            Total Leads
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold sm:font-extrabold text-[#0C4568] leading-tight">
            {loading ? "–" : stats.totalLeads}
          </div>
        </div>
      </div>

      {/* New Leads Card */}
      <div className="flex items-center gap-2 sm:gap-3 bg-white border border-slate-200 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-xs hover:border-slate-300 transition-colors">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FEF3C7] text-[#D97706] hidden sm:flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] sm:text-xs font-medium text-slate-500 tracking-tight truncate">
            New
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold sm:font-extrabold text-[#D97706] leading-tight">
            {loading ? "–" : stats.newLeads}
          </div>
        </div>
      </div>

      {/* Converted Card */}
      <div className="flex items-center gap-2 sm:gap-3 bg-white border border-slate-200 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-xs hover:border-slate-300 transition-colors">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#ECFDF5] text-[#059669] hidden sm:flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-[#059669]" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] sm:text-xs font-medium text-slate-500 tracking-tight truncate">
            Converted
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold sm:font-extrabold text-[#059669] leading-tight">
            {loading ? "–" : stats.convertedLeads}
          </div>
        </div>
      </div>
    </div>
  );
}

