/**
 * Email Service for Pravaron Technologies
 * Uses Nodemailer with SMTP (Gmail App Password)
 */

import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

// Create reusable transporter
let transporter: any = null;

function getTransporter() {
  if (!transporter) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️  SMTP not configured. Emails will be logged to console.');
      console.warn('   Configure SMTP in .env.local to send actual emails.');
      return null;
    }

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Send email using SMTP
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transport = getTransporter();
    
    if (!transport) {
      // Log to console if SMTP not configured
      console.log('\n📧 EMAIL NOTIFICATION (SMTP not configured):');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('Message:', options.text);
      console.log('---\n');
      return true;
    }

    await transport.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Pravaron Technologies'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text,
    });

    console.log('✅ Email sent to:', options.to);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
}

/**
 * Send OTP verification email
 */
export async function sendOTPEmail(email: string, name: string, otp: string): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: 'Verify Your Pravaron Technologies Account',
    text: `Dear ${name},

Your verification code is: ${otp}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

Best regards,
Pravaron Technologies Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #FF6B2C 0%, #FF8F5C 100%); padding: 30px; border-radius: 12px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Pravaron Technologies</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #E5E7EB; border-radius: 12px; margin-top: 20px;">
          <h2 style="color: #1F2937; margin-top: 0;">Verify Your Account</h2>
          <p style="color: #6B7280; font-size: 16px;">Dear ${name},</p>
          <p style="color: #6B7280; font-size: 16px;">Your verification code is:</p>
          
          <div style="background: #FFF7ED; border: 2px solid #FF6B2C; border-radius: 12px; padding: 20px; text-align: center; margin: 30px 0;">
            <span style="font-size: 36px; font-weight: bold; color: #FF6B2C; letter-spacing: 8px;">${otp}</span>
          </div>
          
          <p style="color: #6B7280; font-size: 14px;">This code will expire in <strong>10 minutes</strong>.</p>
          <p style="color: #6B7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #9CA3AF; font-size: 12px;">
          <p>© 2024 Pravaron Technologies. All rights reserved.</p>
        </div>
      </div>
    `
  });
}

/**
 * Send welcome email to new applicant
 */
export async function sendWelcomeEmail(userEmail: string, userName: string) {
  return sendEmail({
    to: userEmail,
    subject: 'Welcome to Pravaron Technologies',
    text: `Dear ${userName},

Welcome to Pravaron Technologies!

Your account has been successfully created. You can now log in and apply for available positions.

Visit: ${process.env.NEXTAUTH_URL}/login

Best regards,
Pravaron Technologies Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B2C;">Welcome to Pravaron Technologies</h2>
        <p>Dear ${userName},</p>
        <p>Your account has been successfully created. You can now log in and apply for available positions.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/login" style="background: #FF6B2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Login to Your Account</a></p>
        <p style="color: #666; font-size: 14px;">Best regards,<br>Pravaron Technologies Team</p>
      </div>
    `
  });
}

/**
 * Send application submission confirmation
 */
export async function sendApplicationSubmittedEmail(
  userEmail: string,
  userName: string,
  jobTitle: string
) {
  return sendEmail({
    to: userEmail,
    subject: 'Application Submitted Successfully',
    text: `Dear ${userName},

Your application for the position of ${jobTitle} has been submitted successfully.

We will review your application and update you on the next steps.

Best regards,
Pravaron Technologies Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B2C;">Application Submitted</h2>
        <p>Dear ${userName},</p>
        <p>Your application for the position of <strong>${jobTitle}</strong> has been submitted successfully.</p>
        <p>We will review your application and update you on the next steps.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #FF6B2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View Your Applications</a></p>
        <p style="color: #666; font-size: 14px;">Best regards,<br>Pravaron Technologies Team</p>
      </div>
    `
  });
}

/**
 * Send application status update notification
 */
export async function sendStatusUpdateEmail(
  userEmail: string,
  userName: string,
  jobTitle: string,
  newStatus: string
) {
  return sendEmail({
    to: userEmail,
    subject: `Application Status Updated: ${newStatus}`,
    text: `Dear ${userName},

Your application status for ${jobTitle} has been updated.

Current Status: ${newStatus}

Please log in to your dashboard to view more details.

Best regards,
Pravaron Technologies Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B2C;">Application Status Updated</h2>
        <p>Dear ${userName},</p>
        <p>Your application status for <strong>${jobTitle}</strong> has been updated.</p>
        <div style="background: #FFF7ED; border-left: 4px solid #FF6B2C; padding: 16px; margin: 20px 0;">
          <strong>Current Status: ${newStatus}</strong>
        </div>
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #FF6B2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View Application Details</a></p>
        <p style="color: #666; font-size: 14px;">Best regards,<br>Pravaron Technologies Team</p>
      </div>
    `
  });
}

/**
 * Notify admin of new applicant registration
 */
export async function notifyAdminNewRegistration(
  adminEmail: string,
  applicantName: string,
  applicantEmail: string
) {
  return sendEmail({
    to: adminEmail,
    subject: 'New Applicant Registration',
    text: `New applicant registered on Pravaron Technologies platform.

Name: ${applicantName}
Email: ${applicantEmail}

Log in to admin dashboard to view details.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B2C;">New Applicant Registration</h2>
        <p>New applicant registered on Pravaron Technologies platform.</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Name:</strong> ${applicantName}</li>
          <li><strong>Email:</strong> ${applicantEmail}</li>
        </ul>
        <p><a href="${process.env.NEXTAUTH_URL}/admin" style="background: #FF6B2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View in Admin Dashboard</a></p>
      </div>
    `
  });
}

/**
 * Notify admin of new job application
 */
export async function notifyAdminNewApplication(
  adminEmail: string,
  applicantName: string,
  applicantEmail: string,
  jobTitle: string
) {
  return sendEmail({
    to: adminEmail,
    subject: `New Application: ${jobTitle}`,
    text: `New application received for ${jobTitle}.

Applicant: ${applicantName}
Email: ${applicantEmail}

Log in to admin dashboard to review.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B2C;">New Application Received</h2>
        <p>New application received for <strong>${jobTitle}</strong>.</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Applicant:</strong> ${applicantName}</li>
          <li><strong>Email:</strong> ${applicantEmail}</li>
        </ul>
        <p><a href="${process.env.NEXTAUTH_URL}/admin" style="background: #FF6B2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Review Application</a></p>
      </div>
    `
  });
}

/**
 * Send interview scheduled notification
 */
export async function sendInterviewScheduledEmail(
  userEmail: string,
  userName: string,
  jobTitle: string,
  interviewDetails?: string
) {
  return sendEmail({
    to: userEmail,
    subject: `Interview Scheduled: ${jobTitle}`,
    text: `Dear ${userName},

Congratulations! Your interview for ${jobTitle} has been scheduled.

${interviewDetails || 'You will receive the interview details shortly.'}

Best regards,
Pravaron Technologies Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B2C;">Interview Scheduled</h2>
        <p>Dear ${userName},</p>
        <p>Congratulations! Your interview for <strong>${jobTitle}</strong> has been scheduled.</p>
        <div style="background: #FFF7ED; border-left: 4px solid #FF6B2C; padding: 16px; margin: 20px 0;">
          <p>${interviewDetails || 'You will receive the interview details shortly.'}</p>
        </div>
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #FF6B2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View Application Status</a></p>
        <p style="color: #666; font-size: 14px;">Best regards,<br>Pravaron Technologies Team</p>
      </div>
    `
  });
}

/**
 * Send selection notification
 */
export async function sendSelectionEmail(
  userEmail: string,
  userName: string,
  jobTitle: string
) {
  return sendEmail({
    to: userEmail,
    subject: `Congratulations! You've been selected for ${jobTitle}`,
    text: `Dear ${userName},

Congratulations! We are pleased to inform you that you have been selected for the position of ${jobTitle}.

Our HR team will reach out to you shortly with the next steps.

Welcome to Pravaron Technologies!

Best regards,
Pravaron Technologies Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B2C;">🎉 Congratulations!</h2>
        <p>Dear ${userName},</p>
        <p>We are pleased to inform you that you have been selected for the position of <strong>${jobTitle}</strong>.</p>
        <div style="background: #D1FAE5; border-left: 4px solid #10B981; padding: 16px; margin: 20px 0;">
          <strong>✓ Selected</strong>
          <p style="margin: 8px 0 0 0;">Our HR team will reach out to you shortly with the next steps.</p>
        </div>
        <p>Welcome to Pravaron Technologies!</p>
        <p style="color: #666; font-size: 14px;">Best regards,<br>Pravaron Technologies Team</p>
      </div>
    `
  });
}
