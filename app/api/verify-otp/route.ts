import { NextResponse } from "next/server";
import db from "@/lib/database";
import { isOTPExpired, verifyOTP } from "@/lib/otp";
import { sendWelcomeEmail, notifyAdminNewRegistration } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = db.prepare(
      'SELECT id, full_name, otp_code, otp_expires_at, is_verified FROM users WHERE email = ?'
    ).get(email) as any;

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.is_verified) {
      return NextResponse.json(
        { error: "Account already verified" },
        { status: 400 }
      );
    }

    if (!user.otp_code || !user.otp_expires_at) {
      return NextResponse.json(
        { error: "No OTP found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if OTP expired
    if (isOTPExpired(user.otp_expires_at)) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (!verifyOTP(otp, user.otp_code)) {
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // Mark user as verified and clear OTP
    db.prepare(
      'UPDATE users SET is_verified = 1, otp_code = NULL, otp_expires_at = NULL, updated_at = CURRENT_TIMESTAMP WHERE email = ?'
    ).run(email);

    // Send welcome email
    await sendWelcomeEmail(email, user.full_name);

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pravaron.com';
    await notifyAdminNewRegistration(adminEmail, user.full_name, email);

    return NextResponse.json(
      { 
        message: "Account verified successfully",
        verified: true
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
