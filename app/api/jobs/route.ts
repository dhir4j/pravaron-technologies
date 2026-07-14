import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/database";

// GET all job postings (active for applicants, all for admin)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    let jobs;

    if (session && (session.user as any).role === 'admin' && isAdmin) {
      // Admin sees all jobs
      jobs = db.prepare(
        'SELECT * FROM job_postings ORDER BY created_at DESC'
      ).all();
    } else {
      // Applicants and public see only active jobs
      jobs = db.prepare(
        'SELECT * FROM job_postings WHERE status = ? ORDER BY created_at DESC'
      ).all('active');
    }

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST create new job (admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, requirements, skills, location, job_type } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const adminId = (session.user as any).id;
    
    const result = db.prepare(
      `INSERT INTO job_postings 
       (title, description, requirements, skills, location, job_type, created_by, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      title,
      description,
      requirements || null,
      skills || null,
      location || null,
      job_type || null,
      adminId,
      'active'
    );

    return NextResponse.json(
      { 
        message: "Job created successfully",
        jobId: result.lastInsertRowid
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
