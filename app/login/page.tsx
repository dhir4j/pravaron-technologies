"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"applicant" | "admin">("applicant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Check for success messages
    if (searchParams.get('verified') === 'true') {
      setSuccess('✅ Email verified successfully! You can now login.');
    } else if (searchParams.get('registered') === 'true') {
      setSuccess('Registration successful! Please check your email for verification code.');
    }
  }, [searchParams, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn(
        userType === "applicant" ? "applicant-login" : "admin-login",
        {
          email,
          password,
          redirect: false,
        }
      );

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        // Redirect based on user type
        if (userType === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }
    } catch (err: any) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center px-8 py-12 lg:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Link href="/services" className="inline-block">
              <h1 className="text-3xl font-bold">
                <span className="text-orange">Pravaron</span>
                <span className="text-ink"> Technologies</span>
              </h1>
            </Link>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-ink mb-3">Welcome Back</h2>
            <p className="text-muted text-lg">Sign in to your account</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* User Type Toggle */}
          <div className="flex gap-2 p-1 bg-orange-subtle/20 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => setUserType("applicant")}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all ${
                userType === "applicant"
                  ? "bg-orange text-white shadow-lg"
                  : "text-muted hover:text-ink"
              }`}
            >
              Applicant
            </button>
            <button
              type="button"
              onClick={() => setUserType("admin")}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all ${
                userType === "admin"
                  ? "bg-orange text-white shadow-lg"
                  : "text-muted hover:text-ink"
              }`}
            >
              Admin
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full button button-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer Links */}
          {userType === "applicant" && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted">
                Don't have an account?{" "}
                <Link href="/register" className="text-orange font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          )}

          {userType === "admin" && (
            <div className="mt-8 text-center">
              <p className="text-xs text-muted bg-orange-subtle/20 p-3 rounded-xl border border-orange/30">
                <span className="block text-sm font-semibold text-ink mb-1">Admin Access</span>
                <strong>admin@pravaron.com</strong> / <strong>admin123</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - AI/Automation Content */}
      <div className="hidden lg:flex flex-col justify-center px-16 py-12 bg-gradient-to-br from-[#E2231A] via-[#A10E0A] to-[#7A0A08] text-white">
        <div className="max-w-xl">
          {/* Main Content */}
          <div className="mb-12">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
              AI-Powered Hiring Platform
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Automate Your
              <br />
              Hiring Process
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Transform your recruitment workflow with intelligent automation, 
              real-time tracking, and seamless communication.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">AI-Driven Matching</h3>
                <p className="text-white/80">
                  Intelligent algorithms match the best candidates to your positions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Instant Notifications</h3>
                <p className="text-white/80">
                  Real-time email updates for every application status change
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Smart Dashboard</h3>
                <p className="text-white/80">
                  Track applications, manage candidates, and make data-driven decisions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Secure & Verified</h3>
                <p className="text-white/80">
                  Email verification and secure authentication for all users
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
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
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
