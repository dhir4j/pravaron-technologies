"use client";

import { UploadCloud } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function CareerApplicationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  if (!mounted) {
    return (
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
      </form>
    );
  }

  return (
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
  );
}
