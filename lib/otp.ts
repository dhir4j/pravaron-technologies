/**
 * OTP Utilities for Email Verification
 */

/**
 * Generate a random 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Get OTP expiry time (10 minutes from now)
 */
export function getOTPExpiry(): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 10);
  return expiry;
}

/**
 * Check if OTP has expired
 */
export function isOTPExpired(expiryDate: string | Date): boolean {
  const expiry = new Date(expiryDate);
  return new Date() > expiry;
}

/**
 * Verify OTP code matches
 */
export function verifyOTP(inputOTP: string, storedOTP: string): boolean {
  return inputOTP === storedOTP;
}
