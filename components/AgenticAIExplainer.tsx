import { AnimatedSection } from "./AnimatedSection";

const steps = [
  ["Goal", "Define the business outcome"],
  ["Agent reasoning", "Plan with live context"],
  ["Tool use", "Act across connected systems"],
  ["Workflow execution", "Coordinate the full sequence"],
  ["Business result", "Report measurable output"],
];

export function AgenticAIExplainer() {
  return (
    <section className="section-pad approach-explainer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="approach-section-intro">
          <AnimatedSection>
            <p className="system-label">Agentic AI, explained simply</p>
            <h2 className="section-title">Software that can reason through work, not just display it.</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <p className="section-copy">Agentic systems turn an objective into coordinated action. They interpret context, choose tools, execute steps, and keep people involved where judgment matters.</p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="approach-flow" delay={0.08}>
          {steps.map(([title, description], index) => (
            <div className="approach-flow-step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
