import { techLayers } from "./data";
import { AnimatedSection } from "./AnimatedSection";

export function TechnologyLayers() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">Technology Stack</p>
          <h2 className="section-title">Serious systems need more than a model call.</h2>
          <p className="section-copy mt-6">
            Pravaron thinks in layers: experience, application logic, agentic intelligence, automation, data, infrastructure, and security.
          </p>
        </AnimatedSection>

        <div className="layer-stack mt-12">
          {techLayers.map(([title, body], index) => (
            <AnimatedSection className="tech-layer" delay={index * 0.035} key={title}>
              <span>{title}</span>
              <p>{body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
