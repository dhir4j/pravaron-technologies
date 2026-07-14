import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/database";
import { 
  sendStatusUpdateEmail, 
  sendInterviewScheduledEmail, 
  sendSelectionEmail 
} from "@/lib/email";

// PATCH update application status (admin only)
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
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const { id: applicationId } = await params;

    // Get application details including user and job info
    const application = db.prepare(`
      SELECT a.user_id, a.job_id, u.email as user_email, u.full_name as user_name, j.title as job_title
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN job_postings j ON a.job_id = j.id
      WHERE a.id = ?
    `).get(applicationId) as any;

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Update application status
    db.prepare(
      'UPDATE applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(status, applicationId);

    // Create notification for applicant
    db.prepare(
      'INSERT INTO notifications (user_id, application_id, message) VALUES (?, ?, ?)'
    ).run(
      application.user_id,
      applicationId,
      `Your application status has been updated to: ${status}`
    );

    // Send email notification based on status
    if (application.user_email && application.user_name && application.job_title) {
      if (status === 'Interview Scheduled') {
        await sendInterviewScheduledEmail(
          application.user_email, 
          application.user_name, 
          application.job_title
        );
      } else if (status === 'Selected') {
        await sendSelectionEmail(
          application.user_email, 
          application.user_name, 
          application.job_title
        );
      } else {
        await sendStatusUpdateEmail(
          application.user_email, 
          application.user_name, 
          application.job_title, 
          status
        );
      }
    }

    return NextResponse.json({ 
      message: "Application status updated successfully" 
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

// DELETE application (admin only)
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
    db.prepare('DELETE FROM applications WHERE id = ?').run(id);

    return NextResponse.json({ 
      message: "Application deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
