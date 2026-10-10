import { NextRequest, NextResponse } from "next/server";
import { createLead, getLeads } from "@/lib/services/leadsService";
import { LeadFilters } from "@/lib/types/lead";

// GET /api/leads - Query leads with search, filter, and sort
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: LeadFilters = {
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") || undefined,
      service: searchParams.get("service") || undefined,
      dateRange: (searchParams.get("dateRange") as LeadFilters["dateRange"]) || undefined,
      sortBy: (searchParams.get("sortBy") as LeadFilters["sortBy"]) || "newest",
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined,
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined,
    };

    const data = await getLeads(filters);
    return NextResponse.json({ success: true, ...data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch leads";
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST /api/leads - Create new lead from contact form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, phone, budget, services, message } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Name format check (only characters and spaces allowed)
    if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
      return NextResponse.json(
        { success: false, error: "Name field can only contain characters." },
        { status: 400 }
      );
    }

    // Phone format check (only numbers, up to 10 digits)
    if (phone && !/^\d{1,10}$/.test(phone.trim())) {
      return NextResponse.json(
        { success: false, error: "Phone number field only accepts numbers up to 10 digits." },
        { status: 400 }
      );
    }

    const lead = await createLead({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      budget,
      services: Array.isArray(services) ? services : [],
      message: message || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received successfully!",
        lead,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save lead";
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
