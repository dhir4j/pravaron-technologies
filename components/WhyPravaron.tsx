import { AnimatedSection } from "./AnimatedSection";

const points = [
  ["Agentic AI-first thinking", "Intelligence is designed into the operating model, not attached as a final feature."],
  ["Automation-first implementation", "Repeated coordination is removed before more interface or process is added."],
  ["Custom software capability", "Interfaces, APIs, data, permissions, and infrastructure are built as one system."],
  ["Product-building mindset", "Every release is usable, observable, and designed to improve from real operation."],
  ["Consulting plus execution", "Architecture decisions stay connected to the team responsible for implementation."],
  ["Future-ready architecture", "Clear boundaries make models, tools, and workflows replaceable as requirements evolve."],
];

export function WhyPravaron() {
  return (
    <section className="section-pad approach-difference">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="approach-section-intro">
          <AnimatedSection>
            <p className="system-label">Why Pravaron Technologies</p>
            <h2 className="section-title">Intelligence designed as infrastructure.</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <p className="section-copy">We combine strategy, software engineering, automation, and agent design so the final system can operate reliably beyond a prototype.</p>
          </AnimatedSection>
        </div>

        <div className="approach-capability-index">
          {points.map(([title, body], index) => (
            <AnimatedSection className="approach-capability-row" delay={index * 0.035} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
