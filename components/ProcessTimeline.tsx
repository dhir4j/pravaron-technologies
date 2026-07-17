import { process as buildProcess } from "./data";
import { AnimatedSection } from "./AnimatedSection";

export function ProcessTimeline() {
  return (
    <section id="method" className="section-pad approach-method">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="approach-section-intro">
          <AnimatedSection>
            <p className="system-label">How We Build</p>
            <h2 className="section-title">A controlled path from workflow to production.</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <p className="section-copy">Each phase produces a concrete decision or working artifact. That keeps scope visible, technical risk bounded, and delivery connected to the operating outcome.</p>
          </AnimatedSection>
        </div>

        <div className="approach-method-grid">
          {buildProcess.map(([title, body], index) => (
            <AnimatedSection className="approach-method-step" delay={Math.min(index * 0.035, 0.18)} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
