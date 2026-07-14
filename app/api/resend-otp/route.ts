import { NextResponse } from "next/server";
import db from "@/lib/database";
import { sendOTPEmail } from "@/lib/email";
import { generateOTP, getOTPExpiry } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = db.prepare(
      'SELECT id, full_name, is_verified FROM users WHERE email = ?'
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

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Update user with new OTP
    db.prepare(
      'UPDATE users SET otp_code = ?, otp_expires_at = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?'
    ).run(otp, otpExpiry.toISOString(), email);

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, user.full_name, otp);

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: "New verification code sent to your email"
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { error: "Failed to resend OTP" },
      { status: 500 }
    );
  }
}
