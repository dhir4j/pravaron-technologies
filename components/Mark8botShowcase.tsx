/* eslint-disable @next/next/no-img-element */
import { mark8botFeatures } from "./data";
import { AnimatedSection } from "./AnimatedSection";
import { MagneticButton } from "./MagneticButton";

export function Mark8botShowcase() {
  return (
    <section className="mark8bot-showcase border-t border-b border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mark8bot-shell">
          <div className="mark8bot-copy">
            <span className="text-xs font-bold uppercase tracking-wider text-orange">Active system</span>
            <h2 className="mt-3 text-5xl lg:text-6xl font-bold text-ink leading-none">Mark8bot</h2>
            <p className="mt-6 text-lg text-muted max-w-xl">
              Social media campaign workspace for scheduled publishing, assisted responses, content planning, approval workflows, and performance visibility. Built and operated by Pravaron Labs for compliant campaign operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="https://mark8bot.com" target="_blank">
                Visit Mark8bot
              </MagneticButton>
              <MagneticButton
                href="mailto:contact@pravarontechnologies.com?subject=Product Inquiry: Mark8bot"
                variant="secondary"
              >
                Product Inquiry
              </MagneticButton>
            </div>
          </div>

          <div className="mark8bot-device" aria-label="Mark8bot product interface preview">
            <div className="mark8bot-monitor-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <img
              src="/images/mark8bot.png"
              alt="Mark8bot product interface showing a social media campaign workspace"
              loading="lazy"
              className="mark8bot-screen"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="feature-grid">
          {mark8botFeatures.map(([title, body], index) => (
            <AnimatedSection className="feature-card" delay={Math.min(index * 0.04, 0.16)} key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

