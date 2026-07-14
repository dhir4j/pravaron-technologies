import Link from "next/link";
import { services } from "./data";
import { AnimatedSection } from "./AnimatedSection";
import { MagneticButton } from "./MagneticButton";

export function ServicesIndex() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="system-label">Service Lanes</p>
            <h2 className="section-title">One build path, five service lanes.</h2>
            <p className="section-copy mt-6">
              Consulting, engineering, AI integration, and automation implementation combined into one delivery system.
            </p>
          </div>
          <MagneticButton href="/services" variant="secondary" className="shrink-0">
            Explore All Services
          </MagneticButton>
        </AnimatedSection>

        <div className="services-index">
          {services.map((service, index) => (
            <AnimatedSection delay={index * 0.04} key={service.slug}>
              <Link className="services-index-row" href={`/services#${service.slug}`}>
                <span className="deployment-layer">{service.layer}</span>
                <strong>{service.title}</strong>
                <span className="services-index-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
