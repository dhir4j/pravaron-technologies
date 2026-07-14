import { ArrowUpRight, Mail } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { MagneticButton } from "./MagneticButton";

export function FinalCTA() {
  return (
    <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <AnimatedSection className="final-cta mx-auto max-w-7xl corporate-final-cta">
        <div>
          <p className="system-label">Ready to build your intelligence layer?</p>
          <h2>Turn manual workflows into autonomous systems.</h2>
          <p>
            Bring a workflow, product idea, or AI integration challenge. Pravaron can help shape the strategy, architecture, software, and automation path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="mailto:contact@pravarontechnologies.com?subject=Start a Project">
              Start a Project
            </MagneticButton>
            <MagneticButton href="mailto:contact@pravarontechnologies.com?subject=AI Strategy Consultation" variant="secondary">
              Book Consultation
            </MagneticButton>
          </div>
          <a className="final-mail-link" href="mailto:contact@pravarontechnologies.com">
            <Mail size={16} aria-hidden="true" />
            contact@pravarontechnologies.com
          </a>
        </div>
        <div className="corporate-final-panel" aria-hidden="true">
          <span>Strategy</span>
          <span>Architecture</span>
          <span>Software</span>
          <span>Automation</span>
          <strong>Delivery <ArrowUpRight size={18} /></strong>
        </div>
      </AnimatedSection>
    </section>
  );
}
