import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/database";
import { sendApplicationSubmittedEmail, notifyAdminNewApplication } from "@/lib/email";

// GET applications (user: their applications, admin: all applications)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    let applications;

    if (userRole === 'admin' && isAdmin) {
      // Admin sees all applications with user and job details
      applications = db.prepare(`
        SELECT 
          a.*,
          u.full_name as applicant_name,
          u.email as applicant_email,
          u.phone as applicant_phone,
          j.title as job_title
        FROM applications a
        JOIN users u ON a.user_id = u.id
        JOIN job_postings j ON a.job_id = j.id
        ORDER BY a.applied_at DESC
      `).all();
    } else {
      // Applicant sees only their applications
      applications = db.prepare(`
        SELECT 
          a.*,
          j.title as job_title,
          j.location as job_location
        FROM applications a
        JOIN job_postings j ON a.job_id = j.id
        WHERE a.user_id = ?
        ORDER BY a.applied_at DESC
      `).all(userId);
    }

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST create new application
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'applicant') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { job_id, message } = body;

    if (!job_id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;

    // Check if already applied
    const existing = db.prepare(
      'SELECT id FROM applications WHERE user_id = ? AND job_id = ?'
    ).get(userId, job_id);

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create application
    const result = db.prepare(
      'INSERT INTO applications (user_id, job_id, message, status) VALUES (?, ?, ?, ?)'
    ).run(userId, job_id, message || null, 'Applied');

    // Create notification for user
    db.prepare(
      'INSERT INTO notifications (user_id, application_id, message) VALUES (?, ?, ?)'
    ).run(
      userId,
      result.lastInsertRowid,
      'Your application has been submitted successfully'
    );

    // Get user and job details for email
    const user = db.prepare('SELECT full_name, email FROM users WHERE id = ?').get(userId) as any;
    const job = db.prepare('SELECT title FROM job_postings WHERE id = ?').get(job_id) as any;

    // Send confirmation email to applicant
    if (user && job) {
      await sendApplicationSubmittedEmail(user.email, user.full_name, job.title);
      
      // Notify admin
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@pravaron.com';
      await notifyAdminNewApplication(adminEmail, user.full_name, user.email, job.title);
    }

    return NextResponse.json(
      { 
        message: "Application submitted successfully",
        applicationId: result.lastInsertRowid
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
