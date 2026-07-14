"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Application {
  id: number;
  user_id: number;
  job_id: number;
  job_title: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  message: string;
  status: string;
  applied_at: string;
  updated_at: string;
}

interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string;
  skills: string;
  location: string;
  job_type: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"applications" | "jobs">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    requirements: "",
    skills: "",
    location: "",
    job_type: "Full-time",
    status: "active",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchApplications();
      fetchJobs();
    }
  }, [status]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications?admin=true");
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
      const response = await fetch("/api/jobs?admin=true");
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleStatusUpdate = async (applicationId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert("Status updated successfully!");
        fetchApplications();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update status");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleDeleteApplication = async (applicationId: number) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Application deleted successfully!");
        fetchApplications();
      } else {
        alert("Failed to delete application");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingJob ? `/api/jobs/${editingJob.id}` : "/api/jobs";
      const method = editingJob ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobForm),
      });

      if (response.ok) {
        alert(editingJob ? "Job updated successfully!" : "Job created successfully!");
        setShowJobModal(false);
        setEditingJob(null);
        setJobForm({
          title: "",
          description: "",
          requirements: "",
          skills: "",
          location: "",
          job_type: "Full-time",
          status: "active",
        });
        fetchJobs();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to save job");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      description: job.description,
      requirements: job.requirements || "",
      skills: job.skills || "",
      location: job.location || "",
      job_type: job.job_type || "Full-time",
      status: job.status,
    });
    setShowJobModal(true);
  };

  const handleDeleteJob = async (jobId: number) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Job deleted successfully!");
        fetchJobs();
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicant_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Applied": "bg-blue-100 text-blue-700",
      "Under Review": "bg-yellow-100 text-yellow-700",
      "Shortlisted": "bg-purple-100 text-purple-700",
      "Document Review": "bg-indigo-100 text-indigo-700",
      "Interview Scheduled": "bg-cyan-100 text-cyan-700",
      "Selected": "bg-green-100 text-green-700",
      "Rejected": "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-line p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ink">Admin Dashboard</h1>
              <p className="text-muted mt-1">Pravaron Technologies Hiring Management</p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="button button-secondary px-6 py-2">
                Home
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="button button-primary px-6 py-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "applications"
                ? "bg-orange text-white shadow-lg"
                : "bg-white text-muted border border-line hover:border-orange"
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "jobs"
                ? "bg-orange text-white shadow-lg"
                : "bg-white text-muted border border-line hover:border-orange"
            }`}
          >
            Job Postings ({jobs.length})
          </button>
        </div>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-line p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by name, email, or job title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-line rounded-xl focus:outline-none focus:border-orange"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-line rounded-xl focus:outline-none focus:border-orange"
                >
                  <option value="all">All Statuses</option>
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Document Review">Document Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm border border-line p-12 text-center">
                  <p className="text-muted text-lg">No applications found</p>
                </div>
              ) : (
                filteredApplications.map((app) => (
                  <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-line p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-ink mb-1">{app.applicant_name}</h3>
                        <p className="text-sm text-muted mb-2">{app.applicant_email}</p>
                        {app.applicant_phone && (
                          <p className="text-sm text-muted mb-2">📱 {app.applicant_phone}</p>
                        )}
                        <p className="text-sm font-semibold text-ink mb-2">Applied for: {app.job_title}</p>
                        {app.message && (
                          <p className="text-sm text-muted mb-3 italic">"{app.message}"</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted">
                          <span>Applied: {new Date(app.applied_at).toLocaleDateString()}</span>
                          <span>Updated: {new Date(app.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                        className="px-4 py-2 border border-line rounded-xl text-sm focus:outline-none focus:border-orange"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Document Review">Document Review</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <button
                        onClick={() => handleDeleteApplication(app.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div>
            {/* Create Job Button */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setEditingJob(null);
                  setJobForm({
                    title: "",
                    description: "",
                    requirements: "",
                    skills: "",
                    location: "",
                    job_type: "Full-time",
                    status: "active",
                  });
                  setShowJobModal(true);
                }}
                className="button button-primary px-6 py-3"
              >
                + Create New Job Posting
              </button>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm border border-line p-12 text-center">
                  <p className="text-muted text-lg">No job postings yet</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-line p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-ink">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            job.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}>
                            {job.status}
                          </span>
                        </div>
                        <p className="text-muted mb-3">{job.description}</p>
                        {job.requirements && (
                          <p className="text-sm text-muted mb-2"><strong>Requirements:</strong> {job.requirements}</p>
                        )}
                        {job.skills && (
                          <p className="text-sm text-muted mb-2"><strong>Skills:</strong> {job.skills}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted">
                          {job.location && <span>📍 {job.location}</span>}
                          {job.job_type && <span>💼 {job.job_type}</span>}
                          <span>Created: {new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="px-4 py-2 bg-orange text-white rounded-xl text-sm hover:shadow-lg transition-shadow"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Job Modal */}
        {showJobModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <h2 className="text-2xl font-bold text-ink mb-6">
                {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
              </h2>
              <form onSubmit={handleJobSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-orange"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Description *</label>
                  <textarea
                    required
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-orange h-32"
                    placeholder="Job description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Requirements</label>
                  <textarea
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-orange h-24"
                    placeholder="Job requirements..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Skills</label>
                  <input
                    type="text"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                    className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-orange"
                    placeholder="e.g., React, Node.js, TypeScript"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Location</label>
                    <input
                      type="text"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-orange"
                      placeholder="e.g., Remote, Bangalore"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Job Type</label>
                    <select
                      value={jobForm.job_type}
                      onChange={(e) => setJobForm({ ...jobForm, job_type: e.target.value })}
                      className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-orange"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Status</label>
                  <select
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                    className="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-orange"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <button type="submit" className="button button-primary px-6 py-3">
                    {editingJob ? "Update Job" : "Create Job"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowJobModal(false);
                      setEditingJob(null);
                    }}
                    className="button button-secondary px-6 py-3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
