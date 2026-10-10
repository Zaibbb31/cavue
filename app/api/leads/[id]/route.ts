import { NextRequest, NextResponse } from "next/server";
import { getLeadById, updateLead, deleteLead } from "@/lib/services/leadsService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/leads/[id] - Get single lead
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const lead = await getLeadById(id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch lead";
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// PATCH /api/leads/[id] - Update lead status or notes
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await updateLead(id, body);

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update lead";
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE /api/leads/[id] - Delete a lead
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    await deleteLead(id);

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete lead";
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
