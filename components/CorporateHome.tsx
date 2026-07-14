"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export function CorporateHome() {
  return (
    <section className="corp-hero">
      {/* Video Background */}
      <div className="corp-hero-video-wrapper" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="corp-hero-video"
        >
          <source src="/images/generated/Circuit_field_pulsing_light_202607131502.mp4" type="video/mp4" />
        </video>
        <div className="corp-hero-video-overlay" />
      </div>
      <div className="corp-hero-shell">
        <div className="corp-hero-content">
          <p className="corp-hero-subtitle">Intelligent Systems · Autonomous Operations</p>
          <h1 className="corp-hero-title">Pravaron Technologies</h1>
          <p className="corp-hero-description">
            Building the future of autonomous business systems through cutting-edge AI, automation, and software engineering.
          </p>
          <div className="corp-hero-actions">
            <Link href="mailto:careers@pravarontechnologies.com?subject=Start a Project" className="corp-hero-button primary">
              Start a Project
            </Link>
            <Link href="/services" className="corp-hero-button secondary">
              Explore Capabilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}







