"use client";

import React, { useState, useEffect } from "react";
import { RotateCw } from "lucide-react";
import StatsCards from "../components/StatsCards";
import FilterBar from "../components/FilterBar";
import LeadsTable from "../components/LeadsTable";
import LeadDetailModal from "../components/LeadDetailModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Lead, LeadFilters, LeadStats, LeadStatus } from "@/lib/types/lead";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeadsCount, setTotalLeadsCount] = useState(0);
  const [stats, setStats] = useState<LeadStats>({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters state
  const [filters, setFilters] = useState<LeadFilters>({
    search: "",
    status: undefined,
    service: undefined,
    dateRange: "all",
    sortBy: "newest",
    page: 1,
    limit: 10,
  });

  // Selected lead for detail modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Deletion modal state
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Stats Helper for event handlers
  const refreshStats = async () => {
    try {
      const res = await fetch("/api/leads/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  // Fetch Stats on mount
  useEffect(() => {
    let isMounted = true;
    fetch("/api/leads/stats")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.stats) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error("Failed to load stats:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Leads Effect
  useEffect(() => {
    let ignore = false;

    async function loadLeads() {
      try {
        const params = new URLSearchParams();
        if (filters.search) params.set("search", filters.search);
        if (filters.status && filters.status !== "All") params.set("status", filters.status);
        if (filters.service && filters.service !== "All") params.set("service", filters.service);
        if (filters.dateRange && filters.dateRange !== "all") params.set("dateRange", filters.dateRange);
        if (filters.sortBy) params.set("sortBy", filters.sortBy);
        if (filters.page) params.set("page", filters.page.toString());
        if (filters.limit) params.set("limit", filters.limit.toString());

        const res = await fetch(`/api/leads?${params.toString()}`);
        const data = await res.json();

        if (!ignore && data.success) {
          setLeads(data.leads || []);
          setTotalLeadsCount(data.total || 0);
        }
      } catch (err) {
        if (!ignore) console.error("Failed to load leads:", err);
      } finally {
        if (!ignore) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    loadLeads();
    return () => {
      ignore = true;
    };
  }, [filters]);

  // Handle manual refresh button
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.status && filters.status !== "All") params.set("status", filters.status);
      if (filters.service && filters.service !== "All") params.set("service", filters.service);
      if (filters.dateRange && filters.dateRange !== "all") params.set("dateRange", filters.dateRange);
      if (filters.sortBy) params.set("sortBy", filters.sortBy);
      if (filters.page) params.set("page", filters.page.toString());
      if (filters.limit) params.set("limit", filters.limit.toString());

      const [leadsRes, statsRes] = await Promise.all([
        fetch(`/api/leads?${params.toString()}`),
        fetch("/api/leads/stats"),
      ]);

      const [leadsData, statsData] = await Promise.all([
        leadsRes.json(),
        statsRes.json(),
      ]);

      if (leadsData.success) {
        setLeads(leadsData.leads || []);
        setTotalLeadsCount(leadsData.total || 0);
      }
      if (statsData.success && statsData.stats) {
        setStats(statsData.stats);
      }
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle status update
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      refreshStats();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handle notes update
  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, notes } : lead))
      );
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, notes } : null));
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  };

  // Handle delete lead
  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/leads/${leadToDelete.id}`, {
        method: "DELETE",
      });
      setLeads((prev) => prev.filter((l) => l.id !== leadToDelete.id));
      setTotalLeadsCount((prev) => Math.max(0, prev - 1));
      refreshStats();
      setLeadToDelete(null);
      if (selectedLead?.id === leadToDelete.id) {
        setSelectedLead(null);
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle sort order
  const handleToggleSort = () => {
    setFilters((prev) => ({
      ...prev,
      sortBy: prev.sortBy === "newest" ? "oldest" : "newest",
    }));
  };

  // Pagination calculation
  const currentPage = filters.page || 1;
  const pageLimit = filters.limit || 10;
  const totalPages = Math.ceil(totalLeadsCount / pageLimit) || 1;
  const startItem = totalLeadsCount === 0 ? 0 : (currentPage - 1) * pageLimit + 1;
  const endItem = Math.min(currentPage * pageLimit, totalLeadsCount);

  return (
    <>
      {/* Title Row + Stat Cards (Matches responsive layout) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        {/* Title & Subtitle */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0C4568] tracking-tight">
              Leads Database
            </h1>
            <button
              type="button"
              title="Refresh leads"
              onClick={handleRefresh}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-[#0C4568] transition-all cursor-pointer shadow-2xs"
            >
              <RotateCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#0C4568]" : ""}`}
              />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View, track, and manage all contact form submissions.
          </p>
        </div>

        {/* Top Stat Cards */}
        <StatsCards stats={stats} loading={loading && !leads.length} />
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        filters={filters}
        onChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))}
        availableServices={["Content Creation", "Social Management", "Paid Ads", "Web Development"]}
      />

      {/* Leads Table */}
      <LeadsTable
        leads={leads}
        loading={loading}
        sortOrder={filters.sortBy}
        onToggleSort={handleToggleSort}
        onViewDetails={(lead) => setSelectedLead(lead)}
        onStatusChange={handleStatusChange}
        onDeleteLead={(id) => {
          const found = leads.find((l) => l.id === id);
          if (found) setLeadToDelete(found);
        }}
      />

      {/* Footer & Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-8 text-xs sm:text-sm text-slate-500">
        <div className="text-center sm:text-left">
          Showing{" "}
          <span className="font-semibold text-[#0C4568]">{startItem}</span> to{" "}
          <span className="font-semibold text-[#0C4568]">{endItem}</span> of{" "}
          <span className="font-semibold text-[#0C4568]">{totalLeadsCount}</span> leads
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, currentPage - 1) }))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[#0C4568] text-xs font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
            const isCurrent = pg === currentPage;
            return (
              <button
                key={pg}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, page: pg }))}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#0C4568] text-white shadow-2xs"
                    : "bg-white border border-slate-200 text-[#0C4568] hover:bg-blue-50"
                }`}
              >
                {pg}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: Math.min(totalPages, currentPage + 1),
              }))
            }
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[#0C4568] text-xs font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Lead Detail View / Notes Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
          onSaveNotes={handleSaveNotes}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!leadToDelete}
        leadName={leadToDelete?.fullName}
        isDeleting={isDeleting}
        onClose={() => setLeadToDelete(null)}
        onConfirm={confirmDeleteLead}
      />
    </>
  );
}
