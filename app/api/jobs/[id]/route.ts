import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/database";

// PATCH update job posting (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, requirements, skills, location, job_type, status } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const { id: jobId } = await params;

    // Update job posting
    db.prepare(
      `UPDATE job_postings 
       SET title = ?, description = ?, requirements = ?, skills = ?, 
           location = ?, job_type = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`
    ).run(title, description, requirements, skills, location, job_type, status, jobId);

    return NextResponse.json({ 
      message: "Job posting updated successfully" 
    });
  } catch (error) {
    console.error("Error updating job posting:", error);
    return NextResponse.json(
      { error: "Failed to update job posting" },
      { status: 500 }
    );
  }
}

// DELETE job posting (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    db.prepare('DELETE FROM job_postings WHERE id = ?').run(id);

    return NextResponse.json({ 
      message: "Job posting deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    return NextResponse.json(
      { error: "Failed to delete job posting" },
      { status: 500 }
    );
  }
}
