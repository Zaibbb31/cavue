"use client";

import React, { useState } from "react";
import { X, Mail, Phone, Calendar, Tag, DollarSign, MessageSquare, Copy, Check, ExternalLink } from "lucide-react";
import { Lead, LeadStatus } from "@/lib/types/lead";

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: LeadStatus) => Promise<void>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
}

export default function LeadDetailModal({
  lead,
  onClose,
  onStatusChange,
  onSaveNotes,
}: LeadDetailModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [notes, setNotes] = useState(lead?.notes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  if (!lead) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      await onSaveNotes(lead.id, notes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2500);
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Clean phone number for WhatsApp
  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${lead.fullName}, thank you for reaching out to CAVUE! We would love to discuss your project.`)}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-slate-50 border border-[#E4DDD2] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0C4568] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 text-white font-bold text-sm flex items-center justify-center">
              {lead.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">{lead.fullName}</h2>
              <span className="text-xs text-white">
                Submitted on {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#0C4568]">
          {/* Status & Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E9E2D6]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status:
              </span>
              <select
                value={lead.status}
                onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                className="bg-blue-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0C4568] focus:outline-none focus:border-[#3D2E24] cursor-pointer"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Converted">Converted</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div className="bg-white p-3.5 rounded-xl border border-[#EAE3D7]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" /> Email
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(lead.email, "email")}
                  className="text-xs text-slate-500 hover:text-[#0C4568] flex items-center gap-1"
                >
                  {copiedField === "email" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${lead.email}`}
                className="font-medium text-[#0C3852] hover:underline break-all"
              >
                {lead.email}
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white p-3.5 rounded-xl border border-[#EAE3D7]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone
                </span>
                {lead.phone && (
                  <button
                    type="button"
                    onClick={() => handleCopy(lead.phone, "phone")}
                    className="text-xs text-slate-500 hover:text-[#0C4568] flex items-center gap-1"
                  >
                    {copiedField === "phone" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <span className="font-medium text-[#111827]">
                {lead.phone || "Not provided"}
              </span>
            </div>

            {/* Budget */}
            <div className="bg-white p-3.5 rounded-xl border border-[#EAE3D7]">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-500" /> Social Budget
              </span>
              <span className="font-medium text-[#111827]">
                {lead.budget || "Not specified"}
              </span>
            </div>

            {/* Quality Score */}
            <div className="bg-white p-3.5 rounded-xl border border-[#EAE3D7]">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> Lead Score
              </span>
              <span className="font-medium text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {lead.score ? lead.score.toFixed(1) : "0.9"} (High Intent)
              </span>
            </div>
          </div>

          {/* Services Requested */}
          {lead.services && lead.services.length > 0 && (
            <div className="bg-white p-3.5 rounded-xl border border-[#EAE3D7]">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Tag className="w-3.5 h-3.5 text-slate-500" /> Interested Services
              </span>
              <div className="flex flex-wrap gap-2">
                {lead.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 bg-blue-50 text-slate-600 border border-slate-200/70 rounded-full text-xs font-semibold"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Details Message */}
          <div className="bg-white p-4 rounded-xl border border-[#EAE3D7]">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Project Details / Message
            </span>
            <p className="text-[#332A24] leading-relaxed whitespace-pre-wrap">
              {lead.message || "No message provided."}
            </p>
          </div>

          {/* Internal Notes Editor */}
          <div className="bg-white p-4 rounded-xl border border-[#EAE3D7]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Internal Admin Notes
              </span>
              {notesSaved && (
                <span className="text-xs text-emerald-600 font-medium">Notes Saved!</span>
              )}
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add follow-up notes, client call summaries, or action items..."
              className="w-full p-2.5 bg-blue-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#0C4568] placeholder-[#9E948A] focus:outline-none focus:border-[#3D2E24] resize-none mb-2"
            />
            <button
              type="button"
              disabled={isSavingNotes}
              onClick={handleSaveNotes}
              className="px-4 py-1.5 bg-[#0C4568] hover:bg-[#09324C] disabled:opacity-50 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
            >
              {isSavingNotes ? "Saving..." : "Save Notes"}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#F2EDE4] border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-blue-50 text-[#0C4568] rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
