import { AnimatedSection } from "./AnimatedSection";

const visionStages = [
  {
    number: "01",
    phase: "Input",
    stage: "Traditional Software",
    title: "Manual Coordination",
    description: "Applications depend on users for every input, decision, and action. Software stores data but people drive execution.",
    characteristics: ["User-driven workflows", "Manual data entry", "Constant human oversight"],
    tone: "light",
  },
  {
    number: "02",
    phase: "Context",
    stage: "AI-Augmented Systems",
    title: "Intelligent Assistance",
    description: "AI adds context and recommendations while people continue to coordinate the overall process.",
    characteristics: ["Smart recommendations", "Automated insights", "Contextual assistance"],
    tone: "orange",
  },
  {
    number: "03",
    phase: "Action",
    stage: "Autonomous Systems",
    title: "Goal-Driven Execution",
    description: "AI agents understand objectives, break them into tasks, use tools, coordinate actions, and request approval where needed.",
    characteristics: ["Goal understanding", "Multi-step execution", "Intelligent orchestration"],
    tone: "dark",
  },
];

export function AboutVision() {
  return (
    <section className="section-pad border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">Our Vision</p>
          <h2 className="section-title">From software to autonomous systems.</h2>
          <p className="section-copy mt-6">Business technology is evolving from user-driven tools to systems that understand context, coordinate work, and act toward defined goals.</p>
        </AnimatedSection>

        <div className="about-stage-grid">
          {visionStages.map((item, index) => (
            <AnimatedSection key={item.number} delay={index * 0.08}>
              <article className={`about-stage-card about-stage-card-${item.tone}`}>
                <div className="about-stage-summary">
                  <span className="about-stage-number">{item.number}</span>
                  <span className="about-stage-heading"><small>{item.phase}</small><strong>{item.stage}</strong></span>
                </div>
                <div className="about-stage-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>{item.characteristics.map((characteristic) => <li key={characteristic}>→ {characteristic}</li>)}</ul>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="about-transformation-readout">
          <div><span>Transformation Path</span><strong>Software → AI-Augmented → Autonomous</strong></div>
          <div><span>Our Focus</span><strong>Practical, Responsible Implementation</strong></div>
        </div>
      </div>
    </section>
  );
}
