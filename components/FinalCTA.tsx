import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="final-cta mx-auto max-w-7xl corporate-final-cta">
        <div className="corporate-final-copy">
          <p className="system-label">Have a workflow in mind?</p>
          <h2>Let&apos;s make it operational.</h2>
        </div>
        <div className="corporate-final-aside">
          <div className="corporate-final-actions">
            <MagneticButton className="corporate-final-button" href="mailto:contact@pravarontechnologies.com?subject=Start a Project">
              Start a Project <ArrowUpRight size={17} aria-hidden="true" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
