"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Eye,
  MessageCircle,
  MoreVertical,
  ChevronDown,
  Trash2,
  ArrowUpDown,
  Mail,
  Phone,
  Inbox,
} from "lucide-react";
import { Lead, LeadStatus } from "@/lib/types/lead";

interface LeadsTableProps {
  leads: Lead[];
  loading?: boolean;
  onViewDetails: (lead: Lead) => void;
  onStatusChange: (id: string, newStatus: LeadStatus) => Promise<void>;
  onDeleteLead: (id: string) => void;
  onToggleSort: () => void;
  sortOrder?: "newest" | "oldest";
}

const statusColors: Record<LeadStatus, { bg: string; text: string; border: string; dot: string }> = {
  New: { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", border: "border-amber-200", dot: "bg-amber-500" },
  Contacted: { bg: "bg-[#E0F2FE]", text: "text-[#0369A1]", border: "border-blue-200", dot: "bg-blue-500" },
  "In Progress": { bg: "bg-[#F3E8FF]", text: "text-[#7E22CE]", border: "border-purple-200", dot: "bg-purple-500" },
  Converted: { bg: "bg-[#ECFDF5]", text: "text-[#047857]", border: "border-emerald-200", dot: "bg-emerald-600" },
  Archived: { bg: "bg-[#F3F4F6]", text: "text-[#6B7280]", border: "border-gray-200", dot: "bg-gray-400" },
};

export default function LeadsTable({
  leads,
  loading = false,
  onViewDetails,
  onStatusChange,
  onDeleteLead,
  onToggleSort,
}: LeadsTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [activeStatusId, setActiveStatusId] = useState<string | null>(null);

  // Automatically close dropdowns when user clicks anywhere outside
  useEffect(() => {
    if (!activeStatusId && !activeMenuId) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest("[data-dropdown-container]")) {
        return;
      }
      setActiveStatusId(null);
      setActiveMenuId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [activeStatusId, activeMenuId]);

  const handleCopyPhone = (id: string, phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsApp = (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    const clean = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
    const url = clean
      ? `https://wa.me/${clean}?text=${encodeURIComponent(`Hi ${lead.fullName}, thank you for contacting CAVUE! We would love to discuss your requirements.`)}`
      : `mailto:${lead.email}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW: Full Data Table (Visible on md and up)                   */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-visible">
        <div className={`pb-4 ${activeStatusId || activeMenuId ? "overflow-visible" : "overflow-x-auto"}`}>
          <table className="w-full text-left border-collapse">
            {/* Dark Table Header (matches screenshot) */}
            <thead>
              <tr className="bg-[#0C4568] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider select-none">
                <th
                  onClick={onToggleSort}
                  className="py-3.5 px-4 sm:px-6 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>DATE</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </div>
                </th>
                <th className="py-3.5 px-4">LEAD</th>
                <th className="py-3.5 px-4">EMAIL</th>
                <th className="py-3.5 px-4">PHONE</th>
                <th className="py-3.5 px-4">SERVICE</th>
                <th className="py-3.5 px-4 min-w-[200px]">PROJECT DETAILS</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right pr-6">ACTIONS</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-[#0C4568]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#0C4568] border-t-transparent rounded-full animate-spin" />
                      <span>Loading leads...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <p className="font-semibold text-base text-slate-600">No leads found</p>
                      <p className="text-xs">Try adjusting your search terms or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const colors = statusColors[lead.status] || statusColors.New;
                  const formattedDate = new Date(lead.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  const displayService =
                    lead.services && lead.services.length > 0
                      ? lead.services[0]
                      : "Consultation";

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => onViewDetails(lead)}
                      className="hover:bg-blue-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-slate-500 font-medium text-xs">
                        {formattedDate}
                      </td>

                      {/* Lead (Avatar + Name) */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0C4568] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                            {lead.fullName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-[#0C4568] group-hover:text-[#0C3852] transition-colors">
                            {lead.fullName}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          title={lead.email}
                          className="text-slate-600 hover:text-[#0C3852] max-w-[170px] truncate block"
                        >
                          {lead.email}
                        </span>
                      </td>

                      {/* Phone + Copy icon */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {lead.phone ? (
                          <div className="flex items-center gap-1.5 text-[#0C4568]">
                            <span className="font-medium">{lead.phone}</span>
                            <button
                              type="button"
                              title="Copy Phone Number"
                              onClick={(e) => handleCopyPhone(lead.id, lead.phone, e)}
                              className="p-1 rounded text-slate-400 hover:text-[#0C4568] hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              {copiedId === lead.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">None</span>
                        )}
                      </td>

                      {/* Service Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-slate-600 border border-slate-200/70">
                          {displayService}
                          {lead.services && lead.services.length > 1 && (
                            <span className="ml-1 text-[10px] text-slate-400">
                              +{lead.services.length - 1}
                            </span>
                          )}
                        </span>
                      </td>

                      {/* Project Details (Truncated) */}
                      <td className="py-4 px-4">
                        <p
                          title={lead.message}
                          className="text-slate-500 max-w-[240px] truncate text-xs sm:text-sm"
                        >
                          {lead.message || "No description provided."}
                        </p>
                      </td>

                      {/* Status Badge + Score */}
                      <td
                        className="py-4 px-4 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col items-start gap-1">
                          {/* Status Dropdown Pill */}
                          <div className="relative" data-dropdown-container>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                setActiveStatusId(activeStatusId === lead.id ? null : lead.id);
                              }}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${colors.bg} ${colors.text} cursor-pointer hover:opacity-90 shadow-2xs transition-all`}
                            >
                              <span>{lead.status}</span>
                              <ChevronDown className="w-3 h-3 opacity-75" />
                            </button>

                            {activeStatusId === lead.id && (
                              <div className="absolute left-0 top-full mt-2 w-[200px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top-left transition-all animate-in fade-in zoom-in-95 duration-100">
                                <div className="px-4 py-3 border-b border-slate-100">
                                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Change Status
                                  </span>
                                </div>
                                <div className="py-1">
                                  {(["New", "Contacted", "In Progress", "Converted", "Archived"] as LeadStatus[]).map(
                                    (st) => {
                                      const isSelected = lead.status === st;
                                      const dotColor =
                                        st === "New"
                                          ? "bg-amber-500"
                                          : st === "Contacted"
                                          ? "bg-blue-500"
                                          : st === "In Progress"
                                          ? "bg-purple-500"
                                          : st === "Converted"
                                          ? "bg-emerald-600"
                                          : "bg-gray-400";

                                      return (
                                        <button
                                          key={st}
                                          type="button"
                                          onClick={async () => {
                                            await onStatusChange(lead.id, st);
                                            setActiveStatusId(null);
                                          }}
                                          className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors cursor-pointer ${
                                            isSelected ? "bg-slate-50" : "hover:bg-slate-50/70"
                                          }`}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                                            <span className={`font-medium ${isSelected ? "text-[#0C4568]" : "text-slate-600"}`}>
                                              {st === "In Progress" ? "Follow-up" : st === "Archived" ? "Not Interested" : st}
                                            </span>
                                          </div>
                                          {isSelected && (
                                            <Check className="w-4 h-4 text-[#0C4568]" />
                                          )}
                                        </button>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Dot score */}
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                            <span>{lead.score ? lead.score.toFixed(1) : "0.9"}</span>
                          </div>
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td
                        className="py-4 px-4 whitespace-nowrap text-right pr-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="inline-flex items-center gap-1.5">
                          {/* WhatsApp Quick Chat */}
                          <button
                            type="button"
                            title="Open WhatsApp / Direct Chat"
                            onClick={(e) => handleWhatsApp(lead, e)}
                            className="w-8 h-8 rounded-lg border border-[#D5EAD8] bg-white text-[#25D366] hover:bg-[#ECFDF5] hover:border-[#25D366] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>

                          {/* View Details Eye */}
                          <button
                            type="button"
                            title="View Full Details"
                            onClick={() => onViewDetails(lead)}
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* More Options Dropdown - Styled matching Status dropdown */}
                          <div className="relative" data-dropdown-container>
                            <button
                              type="button"
                              title="More options"
                              onClick={() => {
                                setActiveStatusId(null);
                                setActiveMenuId(activeMenuId === lead.id ? null : lead.id);
                              }}
                              className={`w-8 h-8 rounded-lg border bg-white flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                                activeMenuId === lead.id
                                  ? "border-[#0C4568] text-[#0C4568] bg-blue-50/60 ring-1 ring-[#0C4568]/20"
                                  : "border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-slate-300"
                              }`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeMenuId === lead.id && (
                              <div className="absolute right-0 top-full mt-2 w-[190px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-100">
                                <div className="px-4 py-3 border-b border-slate-100">
                                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Quick Actions
                                  </span>
                                </div>
                                <div className="py-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onViewDetails(lead);
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0C4568] transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-4 h-4 text-slate-400" />
                                    <span>View Details</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      window.open(`mailto:${lead.email}`, "_blank");
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0C4568] transition-colors cursor-pointer"
                                  >
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span>Send Email</span>
                                  </button>

                                  <div className="my-1 border-t border-slate-100" />

                                  <button
                                    type="button"
                                    onClick={() => {
                                      onDeleteLead(lead.id);
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50/80 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                    <span>Delete Lead</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE & TABLET VIEW: Touch-Optimized Cards (Visible on < md)         */}
      {/* ========================================================================= */}
      <div className="block md:hidden space-y-3.5">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`m-skel-${i}`}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs animate-pulse space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-28 bg-slate-100 rounded" />
                    <div className="h-3 w-16 bg-slate-100/70 rounded" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-slate-100 rounded-lg" />
              </div>
              <div className="h-9 bg-slate-100/60 rounded-xl" />
              <div className="h-14 bg-slate-100/40 rounded-xl" />
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                <div className="h-8 bg-slate-100 rounded-xl" />
                <div className="h-8 bg-slate-100 rounded-xl" />
                <div className="h-8 bg-slate-100 rounded-xl" />
              </div>
            </div>
          ))
        ) : leads.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Inbox className="w-7 h-7 text-[#0C4568]" />
            </div>
            <p className="font-bold text-sm text-[#0C4568]">No leads match your filter</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          leads.map((lead) => {
            const leadStatus = lead.status || "New";
            const colors = statusColors[leadStatus] || statusColors.New;
            const initial = lead.fullName ? lead.fullName.charAt(0).toUpperCase() : "U";
            const formattedDate = lead.createdAt
              ? new Date(lead.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A";
            const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
            const whatsappUrl = cleanPhone
              ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${lead.fullName}, thank you for contacting CAVUE! We would love to discuss your requirements.`)}`
              : null;
            const displayService =
              lead.services && lead.services.length > 0
                ? lead.services[0]
                : "General Inquiry";

            const isMobileStatusOpen = activeStatusId === `m-${lead.id}`;

            return (
              <div
                key={lead.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3.5 transition-all"
              >
                {/* Card Header: Avatar, Name, Date, Status */}
                <div className="flex items-start justify-between gap-2 relative">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0C4568] font-extrabold text-sm flex items-center justify-center shrink-0 border border-slate-200">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-[#0C4568] truncate">
                        {lead.fullName || "Unknown Lead"}
                      </h3>
                      <span className="text-[11px] text-slate-400 block font-medium">
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge + Dropdown on Mobile */}
                  <div className="relative" data-dropdown-container>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenuId(null);
                        setActiveStatusId(isMobileStatusOpen ? null : `m-${lead.id}`);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border shadow-xs cursor-pointer hover:opacity-90 active:scale-95 transition-all ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      <span>{leadStatus}</span>
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>

                    {isMobileStatusOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setActiveStatusId(null)}
                        />
                        <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                          <div className="px-3.5 py-2 border-b border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Change Status
                            </span>
                          </div>
                          {(["New", "Contacted", "In Progress", "Converted", "Archived"] as LeadStatus[]).map(
                            (st) => {
                              const isSelected = lead.status === st;
                              const dotColor =
                                st === "New"
                                  ? "bg-amber-500"
                                  : st === "Contacted"
                                  ? "bg-blue-500"
                                  : st === "In Progress"
                                  ? "bg-purple-500"
                                  : st === "Converted"
                                  ? "bg-emerald-600"
                                  : "bg-gray-400";

                              return (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={async () => {
                                    await onStatusChange(lead.id, st);
                                    setActiveStatusId(null);
                                  }}
                                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium cursor-pointer transition-colors ${
                                    isSelected ? "bg-blue-50 text-[#0C4568] font-bold" : "text-slate-700 hover:bg-slate-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                                    <span>
                                      {st === "In Progress" ? "Follow-up" : st === "Archived" ? "Not Interested" : st}
                                    </span>
                                  </div>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0C4568]" />}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Contact Details Chips (Email & Phone) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {lead.email && (
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="truncate font-medium text-[#0C4568] hover:underline"
                      >
                        {lead.email}
                      </a>
                    </div>
                  )}

                  {lead.phone ? (
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70">
                      <div className="flex items-center gap-2 truncate">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <a
                          href={`tel:${lead.phone}`}
                          className="font-medium text-[#0C4568] hover:underline truncate"
                        >
                          {lead.phone}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleCopyPhone(lead.id, lead.phone, e)}
                        className="text-slate-400 hover:text-[#0C4568] p-0.5 cursor-pointer ml-1"
                        title="Copy phone"
                      >
                        {copiedId === lead.id ? (
                          <span className="text-[10px] text-emerald-600 font-bold">Copied</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ) : null}
                </div>

                {/* Service & Project Requirements Box */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Requested Service
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0C4568] text-[11px] font-bold capitalize border border-slate-200/60">
                      {displayService}
                      {lead.services && lead.services.length > 1 && (
                        <span className="ml-1 text-[10px] text-slate-400">
                          +{lead.services.length - 1}
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {lead.message || "No project description provided."}
                  </p>
                </div>

                {/* Security Score & History Indicators */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    reCAPTCHA: {lead.score ? lead.score.toFixed(1) : "0.9"}
                  </span>

                  {lead.notes && (
                    <span className="text-[10px] font-medium text-[#0C4568] bg-blue-50 px-2 py-0.5 rounded-md border border-slate-200">
                      Has Notes
                    </span>
                  )}
                </div>

                {/* Action Buttons Grid */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60">
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onViewDetails(lead)}
                      className="flex items-center justify-center gap-1.5 py-2 bg-blue-50 border border-blue-200 text-[#0C4568] rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>Contact</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onViewDetails(lead)}
                    className="flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200 text-[#0C4568] rounded-xl text-xs font-bold hover:bg-blue-50/60 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteLead(lead.id)}
                    className="flex items-center justify-center gap-1.5 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}