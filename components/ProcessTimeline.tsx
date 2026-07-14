import { process as buildProcess } from "./data";
import { AnimatedSection } from "./AnimatedSection";

export function ProcessTimeline() {
  return (
    <section id="method" className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">How We Build</p>
          <h2 className="section-title">A build process for intelligent operations.</h2>
          <p className="section-copy mt-6">
            The work moves from workflow reality into architecture, shipped software, integration, security, deployment, and continuous improvement.
          </p>
        </AnimatedSection>

        <div className="neural-timeline mt-12">
          {buildProcess.map(([title, body], index) => (
            <AnimatedSection className="timeline-item" delay={Math.min(index * 0.035, 0.18)} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

