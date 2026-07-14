import { AnimatedSection } from "./AnimatedSection";

const steps = ["Goal", "Agent Reasoning", "Tool Use", "Workflow Execution", "Business Result"];

export function AgenticAIExplainer() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <AnimatedSection>
          <p className="system-label">Agentic AI, explained simply</p>
          <h2 className="section-title">Software that can reason through work, not just display it.</h2>
          <p className="section-copy mt-6">
            Agentic AI systems understand context, break goals into tasks, use tools, collaborate with other agents, execute workflows, and report outcomes.
          </p>
        </AnimatedSection>

        <AnimatedSection className="agent-pipeline" delay={0.08}>
          {steps.map((step, index) => (
            <div className="pipeline-step" style={{ "--i": index } as React.CSSProperties} key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
