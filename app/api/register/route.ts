import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/database";
import { sendOTPEmail } from "@/lib/email";
import { generateOTP, getOTPExpiry } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, full_name, phone, portfolio_url } = body;

    // Validation
    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: "Email, password, and full name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id, is_verified FROM users WHERE email = ?').get(email) as any;
    
    if (existingUser && existingUser.is_verified) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    if (existingUser && !existingUser.is_verified) {
      // Update existing unverified user with new OTP
      db.prepare(
        'UPDATE users SET password = ?, full_name = ?, phone = ?, portfolio_url = ?, otp_code = ?, otp_expires_at = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?'
      ).run(hashedPassword, full_name, phone || null, portfolio_url || null, otp, otpExpiry.toISOString(), email);
    } else {
      // Insert new user (unverified)
      db.prepare(
        'INSERT INTO users (email, password, full_name, phone, portfolio_url, is_verified, otp_code, otp_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).run(email, hashedPassword, full_name, phone || null, portfolio_url || null, 0, otp, otpExpiry.toISOString());
    }

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, full_name, otp);

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: "Verification code sent to your email",
        email: email,
        requiresVerification: true
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
