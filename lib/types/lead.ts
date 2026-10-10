export type LeadStatus = "New" | "Contacted" | "In Progress" | "Converted" | "Archived";

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  budget?: string;
  services: string[];
  message: string;
  status: LeadStatus;
  score?: number;
  source?: string;
  createdAt: string; // ISO date string
  updatedAt?: string;
  notes?: string;
}

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  contactedLeads?: number;
}

export interface LeadFilters {
  search?: string;
  status?: string;
  service?: string;
  dateRange?: "all" | "today" | "7days" | "30days";
  sortBy?: "newest" | "oldest";
  page?: number;
  limit?: number;
}
