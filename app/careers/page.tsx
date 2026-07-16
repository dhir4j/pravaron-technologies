/* eslint-disable @next/next/no-img-element */
"use client";

import { Building2, Mail, MapPin, UploadCloud } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useState, useRef, useEffect } from "react";

const benefits = [
  {
    layer: "Development Layer",
    title: "Growth & Learning",
    description: "Work on cutting-edge AI and automation systems while learning from experienced engineers."
  },
  {
    layer: "Ownership Layer",
    title: "Impact & Ownership",
    description: "Own features and products from conception to deployment with direct client impact."
  },
  {
    layer: "Culture Layer",
    title: "Culture & Team",
    description: "Collaborate with a focused team that values craft, outcomes, and continuous improvement."
  },
  {
    layer: "Flexibility Layer",
    title: "Flexibility & Balance",
    description: "Remote-friendly work environment with focus on results, not micromanagement."
  }
];

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

      {/* Coming Soon Section */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <AnimatedSection>
                <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold text-ink mb-6">
                  Coming Soon
                </h2>
                <p className="text-xl text-muted leading-relaxed">
                  We're currently building our careers page. Check back soon for open positions and application details.
                </p>
                <div className="mt-10">
                  <a 
                    href="mailto:careers@pravarontechnologies.com?subject=Career Inquiry" 
                    className="button button-primary"
                  >
                    <Mail size={18} aria-hidden="true" />
                    Email Us Your Interest
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENTED OUT FOR FUTURE USE */}
      {/* Why Join Section */}
      {/* <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <AnimatedSection className="max-w-3xl">
              <p className="system-label">Why Join</p>
              <h2 className="section-title">One team, four core benefits.</h2>
              <p className="section-copy mt-6">
                Growth opportunities, meaningful work, collaborative culture, and work-life balance combined into one career path.
              </p>
            </AnimatedSection>
          </div>

          <div className="services-index">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.06}>
                <div className="services-index-row">
                  <span className="deployment-layer">{benefit.layer}</span>
                  <div>
                    <strong>{benefit.title}</strong>
                    <p className="mt-2 text-muted">{benefit.description}</p>
                  </div>
                  <span className="services-index-arrow" aria-hidden="true">→</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Application Form Section - COMMENTED OUT FOR FUTURE USE */}
      {/* <section className="py-20 border-t border-b border-line">
        <div className="max-w-none mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            <div className="flex flex-col justify-center px-8 lg:px-16 py-12 bg-orange-subtle/30">
              <p className="system-label">Apply</p>
              <h2 className="mt-3 text-5xl lg:text-6xl font-bold text-ink leading-tight">
                Share your profile with Pravaron.
              </h2>
              
              <div className="mt-10 pt-8 border-t border-ink/10">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 size={24} className="text-[#E2231A]" aria-hidden="true" />
                  <strong className="text-xl font-bold text-ink">Pravaron Technologies Pvt. Ltd.</strong>
                </div>
                
                <p className="text-base text-muted mb-6">
                  Corporate workspace in Noida, India.
                </p>
                
                <div className="space-y-3">
                  <a 
                    href="mailto:careers@pravarontechnologies.com?subject=Careers Inquiry" 
                    className="flex items-center gap-3 text-base text-ink hover:text-[#E2231A] transition-colors duration-200"
                  >
                    <Mail size={18} aria-hidden="true" />
                    careers@pravarontechnologies.com
                  </a>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=EON%20FairFox%20Sector%20140A%20Noida" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 text-base text-ink hover:text-[#E2231A] transition-colors duration-200"
                  >
                    <MapPin size={18} aria-hidden="true" />
                    O-621, Block-A, EON FairFox, Sector-140A, Noida
                  </a>
                </div>
              </div>
            </div>

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
      </section> */}
    </main>
  );
}


