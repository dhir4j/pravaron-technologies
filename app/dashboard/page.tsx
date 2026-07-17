"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Application {
  id: number;
  job_id: number;
  job_title: string;
  job_location: string;
  status: string;
  message: string;
  applied_at: string;
  updated_at: string;
}

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  status: string;
}

export default function ApplicantDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"applications" | "jobs" | "profile">("applications");
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated" && (session?.user as any)?.role !== "applicant") {
      router.push("/admin");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchApplications();
      fetchJobs();
      fetchNotifications();
    }
  }, [status]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleApply = async (jobId: number) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_id: jobId }),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        fetchApplications();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to submit application");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Applied": "bg-blue-50 text-blue-700 border-blue-200",
      "Under Review": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Shortlisted": "bg-purple-50 text-purple-700 border-purple-200",
      "Interview Scheduled": "bg-indigo-50 text-indigo-700 border-indigo-200",
      "Selected": "bg-green-50 text-green-700 border-green-200",
      "Rejected": "bg-red-50 text-red-700 border-red-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.is_read).length;

  return (
    <main className="min-h-screen bg-base pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="system-label mb-4">Applicant Portal</p>
              <h1 className="text-4xl font-bold text-ink mb-2">{session?.user?.name}</h1>
              <p className="text-muted">{session?.user?.email}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="button button-secondary">
                Home
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="button button-primary"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-8 border border-line">
            <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">Applications</p>
            <p className="text-4xl font-bold text-ink">{applications.length}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-line">
            <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">Available Jobs</p>
            <p className="text-4xl font-bold text-ink">{jobs.length}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-line">
            <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">Notifications</p>
            <p className="text-4xl font-bold text-ink">
              {unreadNotifications}
              {unreadNotifications > 0 && (
                <span className="ml-3 text-sm font-medium text-primary-pink">unread</span>
              )}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-line mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("applications")}
              className={`pb-4 text-base font-semibold transition-all relative ${
                activeTab === "applications"
                  ? "text-primary-pink"
                  : "text-muted hover:text-ink"
              }`}
            >
              My Applications
              {activeTab === "applications" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-pink"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`pb-4 text-base font-semibold transition-all relative ${
                activeTab === "jobs"
                  ? "text-primary-pink"
                  : "text-muted hover:text-ink"
              }`}
            >
              Available Jobs
              {activeTab === "jobs" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-pink"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-4 text-base font-semibold transition-all relative ${
                activeTab === "profile"
                  ? "text-primary-pink"
                  : "text-muted hover:text-ink"
              }`}
            >
              Profile & Notifications
              {unreadNotifications > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-pink rounded-full">
                  {unreadNotifications}
                </span>
              )}
              {activeTab === "profile" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-pink"></span>
              )}
            </button>
          </div>
        </div>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-line">
                <h3 className="text-2xl font-bold text-ink mb-3">No applications yet</h3>
                <p className="text-muted mb-6 max-w-md mx-auto">
                  Start your journey by exploring available positions and submitting your first application.
                </p>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="button button-primary"
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="bg-white rounded-2xl border border-line p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-ink mb-2">{app.job_title}</h3>
                      {app.job_location && (
                        <p className="text-sm text-muted mb-4">{app.job_location}</p>
                      )}
                      <div className="flex items-center gap-6 text-sm text-muted">
                        <span>
                          Applied: {new Date(app.applied_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span>
                          Updated: {new Date(app.updated_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-line">
                <h3 className="text-2xl font-bold text-ink mb-3">No jobs available</h3>
                <p className="text-muted max-w-md mx-auto">
                  Check back soon for new opportunities that match your skills and interests.
                </p>
              </div>
            ) : (
              jobs.map((job) => {
                const hasApplied = applications.some(app => app.job_id === job.id);
                return (
                  <div key={job.id} className="bg-white rounded-2xl border border-line p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-ink mb-3">{job.title}</h3>
                        <p className="text-muted mb-4 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted">
                          {job.location && <span>{job.location}</span>}
                          {job.job_type && <span>• {job.job_type}</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={hasApplied}
                        className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                          hasApplied
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "button button-primary"
                        }`}
                      >
                        {hasApplied ? "Applied" : "Apply Now"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Profile & Notifications Tab */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Profile Information */}
            <div className="bg-white rounded-2xl border border-line p-8">
              <h2 className="text-2xl font-bold text-ink mb-8">Profile Information</h2>
              <div className="space-y-6">
                <div className="pb-6 border-b border-line">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Full Name</label>
                  <p className="text-lg text-ink">{session?.user?.name}</p>
                </div>
                <div className="pb-6 border-b border-line">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Email Address</label>
                  <p className="text-lg text-ink">{session?.user?.email}</p>
                </div>
                <div className="pb-6 border-b border-line">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Account Type</label>
                  <span className="inline-flex px-3 py-1 bg-primary-subtle/30 text-primary-pink rounded-lg text-sm font-semibold">
                    Applicant
                  </span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Total Applications</label>
                  <p className="text-3xl font-bold text-ink">{applications.length}</p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-line p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-ink">Notifications</h2>
                {unreadNotifications > 0 && (
                  <span className="px-3 py-1 bg-primary-pink text-white rounded-full text-sm font-semibold">
                    {unreadNotifications} new
                  </span>
                )}
              </div>
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-xl border transition-all ${
                        notif.is_read
                          ? "bg-gray-50/50 border-gray-200"
                          : "bg-primary-subtle/10 border-primary-pink/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-ink leading-relaxed mb-2">{notif.message}</p>
                          {notif.job_title && (
                            <p className="text-sm text-muted">Job: {notif.job_title}</p>
                          )}
                          <p className="text-xs text-muted/70 mt-2">
                            {new Date(notif.created_at).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        {!notif.is_read && (
                          <div className="w-2 h-2 bg-primary-pink rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
