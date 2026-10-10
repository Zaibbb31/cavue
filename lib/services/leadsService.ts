import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { Lead, LeadFilters, LeadStats, LeadStatus } from "../types/lead";

const LEADS_COLLECTION = "leads";

/**
 * Calculates a lead engagement score (0.5 to 1.0)
 * based on the completeness of contact details, budget, and services.
 */
function calculateLeadScore(lead: {
  phone?: string;
  email?: string;
  budget?: string;
  services?: string[];
  message?: string;
}): number {
  let score = 0.6;
  if (lead.phone && lead.phone.trim().length >= 10) score += 0.1;
  if (lead.budget && lead.budget.trim().length > 0) score += 0.1;
  if (lead.services && lead.services.length > 0) score += 0.1;
  if (lead.message && lead.message.trim().length > 30) score += 0.1;
  return Math.min(1.0, parseFloat(score.toFixed(1)));
}

/**
 * Creates a new lead document in Firestore
 */
export async function createLead(data: {
  fullName: string;
  email: string;
  phone?: string;
  budget?: string;
  services?: string[];
  message: string;
}): Promise<Lead> {
  if (!data.fullName || !data.email) {
    throw new Error("Full name and email are required.");
  }

  const now = new Date().toISOString();
  const score = calculateLeadScore(data);

  const newLeadData = {
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || "",
    budget: data.budget || "",
    services: data.services || [],
    message: data.message?.trim() || "",
    status: "New" as LeadStatus,
    score: score,
    source: "Website Contact Form",
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(collection(db, LEADS_COLLECTION), newLeadData);

  return {
    id: docRef.id,
    ...newLeadData,
  };
}

/**
 * Retrieves leads with optional filtering, search, and sorting
 */
export async function getLeads(filters: LeadFilters = {}): Promise<{ leads: Lead[]; total: number }> {
  const leadsRef = collection(db, LEADS_COLLECTION);
  const q = query(leadsRef, orderBy("createdAt", filters.sortBy === "oldest" ? "asc" : "desc"));

  const snapshot = await getDocs(q);

  let leads: Lead[] = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      budget: data.budget || "",
      services: data.services || [],
      message: data.message || "",
      status: (data.status as LeadStatus) || "New",
      score: typeof data.score === "number" ? data.score : 0.9,
      source: data.source || "Website Contact Form",
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt,
      notes: data.notes || "",
    };
  });

  // Filter by status
  if (filters.status && filters.status !== "All") {
    leads = leads.filter(
      (lead) => lead.status.toLowerCase() === filters.status!.toLowerCase()
    );
  }

  // Filter by service
  if (filters.service && filters.service !== "All") {
    leads = leads.filter((lead) =>
      lead.services?.some(
        (s) => s.toLowerCase() === filters.service!.toLowerCase()
      )
    );
  }

  // Filter by date range
  if (filters.dateRange && filters.dateRange !== "all") {
    const now = new Date();
    let cutoff: Date;

    if (filters.dateRange === "today") {
      cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (filters.dateRange === "7days") {
      cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (filters.dateRange === "30days") {
      cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else {
      cutoff = new Date(0);
    }

    leads = leads.filter((lead) => new Date(lead.createdAt) >= cutoff);
  }

  // Filter by search query
  if (filters.search && filters.search.trim().length > 0) {
    const term = filters.search.trim().toLowerCase();
    leads = leads.filter(
      (lead) =>
        lead.fullName.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.phone.toLowerCase().includes(term) ||
        lead.message.toLowerCase().includes(term) ||
        lead.services.some((s) => s.toLowerCase().includes(term))
    );
  }

  const total = leads.length;

  // Pagination (if specified)
  if (filters.page && filters.limit) {
    const startIndex = (filters.page - 1) * filters.limit;
    leads = leads.slice(startIndex, startIndex + filters.limit);
  }

  return { leads, total };
}

/**
 * Retrieves a single lead by its ID
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  const docRef = doc(db, LEADS_COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;

  const data = snap.data();
  return {
    id: snap.id,
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    budget: data.budget || "",
    services: data.services || [],
    message: data.message || "",
    status: data.status || "New",
    score: data.score ?? 0.9,
    source: data.source,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    notes: data.notes || "",
  };
}

/**
 * Updates a lead document in Firestore
 */
export async function updateLead(id: string, updates: Partial<Lead>): Promise<void> {
  const docRef = doc(db, LEADS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Deletes a lead document from Firestore
 */
export async function deleteLead(id: string): Promise<void> {
  const docRef = doc(db, LEADS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Calculates aggregate stats for top stat cards
 */
export async function getLeadsStats(): Promise<LeadStats> {
  const snapshot = await getDocs(collection(db, LEADS_COLLECTION));
  let totalLeads = 0;
  let newLeads = 0;
  let convertedLeads = 0;
  let contactedLeads = 0;

  snapshot.forEach((docSnap) => {
    totalLeads++;
    const data = docSnap.data();
    const status = (data.status || "").toLowerCase();
    if (status === "new") newLeads++;
    if (status === "converted") convertedLeads++;
    if (status === "contacted") contactedLeads++;
  });

  return {
    totalLeads,
    newLeads,
    convertedLeads,
    contactedLeads,
  };
}
