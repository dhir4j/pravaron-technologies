"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("admin-login", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="text-4xl font-bold text-ink mb-3">Admin Console</h2>
            <p className="text-muted text-lg">Internal access only</p>
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
                placeholder="admin@pravaron.com"
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

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-muted hover:text-orange transition-colors">
              Back to website
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Internal Console Panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 py-12 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-white">
        <div className="max-w-xl">
          <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold mb-6">
            Internal Tooling
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Manage The
            <br />
            Applicant Pipeline.
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Review applications, manage job postings, and track candidates across every open role
            at Pravaron Technologies. Restricted to authorized staff.
          </p>
        </div>
      </div>
    </div>
  );
}
