import { contactLanes, contactSteps } from "./data";
import { AnimatedSection } from "./AnimatedSection";
import { MagneticButton } from "./MagneticButton";

export function ContactLanes() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="contact-grid">
          {contactLanes.map((lane, index) => (
            <AnimatedSection className="contact-card" delay={index * 0.05} key={lane.title}>
              <h2>{lane.title}</h2>
              <p>{lane.body}</p>
              <div className="mt-auto pt-6">
                <MagneticButton href={lane.href} variant={index === 0 ? "primary" : "secondary"}>
                  {lane.action}
                </MagneticButton>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="contact-direct" delay={0.1}>
          <span className="system-label">Direct line</span>
          <a href="mailto:contact@pravarontechnologies.com">contact@pravarontechnologies.com</a>
          <p>O-621, Block-A, EON Fairfox, Sector-140A, Noida.</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function ContactSteps() {
  return (
    <section className="section-pad builds-upgrade">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">What Happens Next</p>
          <h2 className="section-title">No pitch decks. A working direction.</h2>
        </AnimatedSection>

        <div className="principle-grid mt-12">
          {contactSteps.map(([title, body], index) => (
            <AnimatedSection className="principle-card" delay={index * 0.05} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

