"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "verify">("register");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    portfolio_url: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          phone: formData.phone,
          portfolio_url: formData.portfolio_url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setRegisteredEmail(formData.email);
      setStep("verify");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registeredEmail,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Verification failed");
        return;
      }

      router.push("/login?verified=true");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setResending(true);

    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registeredEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to resend code");
        return;
      }

      alert("New verification code sent to your email!");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  if (step === "verify") {
    return (
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-12 lg:px-16 bg-white">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E2231A] to-[#A10E0A] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-ink mb-3">Verify Your Email</h2>
              <p className="text-muted text-lg">
                We sent a 6-digit code to<br />
                <strong className="text-ink">{registeredEmail}</strong>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2 text-center">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  className="w-full px-4 py-4 border-2 border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-center text-2xl font-bold tracking-widest transition-all"
                  placeholder="000000"
                />
                <p className="text-xs text-muted mt-2 text-center">Code expires in 10 minutes</p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full button button-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Complete Registration"}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <button
                onClick={handleResendOTP}
                disabled={resending}
                className="text-sm text-orange font-semibold hover:underline disabled:opacity-50"
              >
                {resending ? "Sending..." : "Didn't receive code? Resend"}
              </button>
              
              <div>
                <button
                  onClick={() => setStep("register")}
                  className="text-sm text-muted hover:text-orange"
                >
                  Change email address
                </button>
              </div>
            </div>
          </div>
        </div>

        <RightPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 py-12 lg:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <Link href="/login" className="inline-block">
              <h1 className="text-3xl font-bold">
                <span className="text-orange">Pravaron</span>
                <span className="text-ink"> Technologies</span>
              </h1>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-ink mb-3">Create Account</h2>
            <p className="text-muted text-lg">Join Pravaron Technologies</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all" placeholder="Enter your full name" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all" placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all" placeholder="+91 00000 00000" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Portfolio / LinkedIn</label>
                <input type="url" name="portfolio_url" value={formData.portfolio_url} onChange={handleChange} className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all" placeholder="https://linkedin.com/in/yourprofile" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6} className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all" placeholder="••••••••" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Confirm Password *</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required minLength={6} className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full button button-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-6">
              {loading ? "Sending Verification Code..." : "Continue"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted">Already have an account? <Link href="/login" className="text-orange font-semibold hover:underline">Sign In</Link></p>
          </div>
        </div>
      </div>

      <RightPanel />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}

function RightPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center px-16 py-12 bg-gradient-to-br from-[#E2231A] via-[#A10E0A] to-[#7A0A08] text-white">
      <div className="max-w-xl">
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
            AI-Powered Hiring Platform
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">Join Pravaron<br />Technologies</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">Create your account and access our intelligent hiring platform with automated workflows and real-time tracking.</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Secure Registration</h3>
              <p className="text-white/80">Email verification ensures your account security</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Instant Access</h3>
              <p className="text-white/80">Start applying for positions immediately after verification</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Real-Time Updates</h3>
              <p className="text-white/80">Get notified about every step of your application</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold mb-1">10x</div>
            <div className="text-sm text-white/80">Faster Hiring</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-sm text-white/80">Automated</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">24/7</div>
            <div className="text-sm text-white/80">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
