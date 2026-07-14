import { labsPrinciples } from "./data";
import { AnimatedSection } from "./AnimatedSection";

export function LabsPrinciples() {
  return (
    <section className="section-pad builds-upgrade">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">How Labs Works</p>
          <h2 className="section-title">Products first, experiments second.</h2>
          <p className="section-copy mt-6">
            Labs is where Pravaron proves agentic patterns on its own products before they carry client workloads.
          </p>
        </AnimatedSection>

        <div className="principle-grid mt-12">
          {labsPrinciples.map(([title, body], index) => (
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
