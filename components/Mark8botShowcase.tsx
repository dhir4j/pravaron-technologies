/* eslint-disable @next/next/no-img-element */
import { mark8botFeatures } from "./data";
import { AnimatedSection } from "./AnimatedSection";
import { MagneticButton } from "./MagneticButton";

export function Mark8botShowcase() {
  return (
    <section className="py-20 border-t border-b border-line">
      <div className="max-w-none mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-12 bg-orange-subtle/30">
            <span className="text-xs font-bold uppercase tracking-wider text-orange">Active system</span>
            <h2 className="mt-3 text-5xl lg:text-6xl font-bold text-ink leading-none">Mark8bot</h2>
            <p className="mt-6 text-lg text-muted max-w-xl">
              Telegram-first campaign manager for automated group posting, AI replies, bulk direct messages, multi-account outreach, content generation, and analytics. Built and operated by Pravaron Labs, running live campaigns in production.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="https://mark8bot.com" target="_blank">
                Visit Mark8bot
              </MagneticButton>
              <MagneticButton
                href="mailto:careers@pravarontechnologies.com?subject=Product Inquiry: Mark8bot"
                variant="secondary"
              >
                Product Inquiry
              </MagneticButton>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex items-center justify-center bg-black p-8 lg:p-12">
            <img 
              src="/images/mark8bot.png" 
              alt="Mark8bot product interface showcasing automated Telegram campaign management" 
              loading="lazy"
              className="w-full h-auto max-w-full object-contain rounded-lg shadow-2xl"
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

