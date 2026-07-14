/* eslint-disable @next/next/no-img-element */
"use client";

import { Building2, Mail, MapPin, UploadCloud } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useState, useRef, useEffect } from "react";

export default function CareersPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fix hydration by ensuring client-only rendering for interactive parts
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <main>
      <PageHero
        label="Careers"
        title="Build your future with Pravaron"
        copy="The next generation of focused software, automation, and intelligent systems needs people who care about craft and outcomes."
      />

      <section className="section-pad careers-overview">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="careers-photo-panel">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
              alt="Corporate team collaborating in a modern office"
            />
            <div className="careers-photo-card">
              <Building2 size={20} aria-hidden="true" />
              <span>Pravaron Technologies Pvt. Ltd.</span>
            </div>
          </div>

          <div className="careers-office-card">
            <p className="system-label">Office</p>
            <h2>Corporate workspace in Noida.</h2>
            <p>
              O-621, Block-A, EON Fairfox, Sector-140A, Noida.
            </p>
            <div className="office-actions">
              <a href="mailto:careers@pravarontechnologies.com?subject=Careers Inquiry">
                <Mail size={16} aria-hidden="true" />
                careers@pravarontechnologies.com
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=EON%20FairFox%20Sector%20140A%20Noida" target="_blank" rel="noreferrer">
                <MapPin size={16} aria-hidden="true" />
                View location
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-b border-line">
        <div className="max-w-none mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left side - Benefits panel */}
            <div className="flex flex-col justify-center px-8 lg:px-16 py-12 bg-orange-subtle/30">
              <p className="system-label">Apply</p>
              <h2 className="mt-3 text-5xl lg:text-6xl font-bold text-ink leading-tight">
                Share your profile with Pravaron.
              </h2>
            </div>

            {/* Right side - Application form */}
            <div className="flex flex-col justify-center bg-white px-8 lg:px-16 py-12">
              <form className="w-full max-w-2xl mx-auto" id="apply">
                <p className="system-label">Application Form</p>
                <h2 className="mt-3 text-3xl font-bold text-ink mb-8">Job application form</h2>
                
                <div className="form-grid">
                  <label>
                    Full name
                    <input placeholder="Enter your full name" />
                  </label>
                  <label>
                    Email address
                    <input type="email" placeholder="you@example.com" />
                  </label>
                  <label>
                    Phone number
                    <input placeholder="+91 00000 00000" />
                  </label>
                  <label>
                    Role
                    <input placeholder="Role you want to apply for" />
                  </label>
                  <label className="form-full">
                    Portfolio / LinkedIn
                    <input placeholder="https://linkedin.com/in/your-profile" />
                  </label>
                  <label className="form-full">
                    Message
                    <textarea placeholder="Tell us about your experience and interest" rows={5} />
                  </label>
                </div>
                
                <div 
                  className="resume-dropzone" 
                  onClick={handleFileClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleFileClick();
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload resume"
                  />
                  <UploadCloud size={22} aria-hidden="true" />
                  <span>{selectedFile ? selectedFile.name : 'Resume upload'}</span>
                  <small>{selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'PDF, DOC, or DOCX'}</small>
                </div>
                
                <div className="flex justify-center mt-6">
                  <button 
                    type="button" 
                    className="button button-primary px-12 py-4"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


