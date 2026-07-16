import { AnimatedSection } from "./AnimatedSection";

const visionStages = [
  {
    stage: "Traditional Software",
    title: "Manual Coordination",
    description: "Applications depend on users for every input, decision, and action. Software stores data but humans drive execution.",
    characteristics: ["User-driven workflows", "Manual data entry", "Constant human oversight"]
  },
  {
    stage: "AI-Augmented Systems",
    title: "Intelligent Assistance",
    description: "AI adds context and recommendations. Systems can analyze, summarize, and suggest—but humans still coordinate the overall process.",
    characteristics: ["Smart recommendations", "Automated insights", "Contextual assistance"]
  },
  {
    stage: "Autonomous Systems",
    title: "Goal-Driven Execution",
    description: "AI agents understand objectives, break them into tasks, use tools, coordinate actions, and request approval only when needed.",
    characteristics: ["Goal understanding", "Multi-step execution", "Intelligent orchestration"]
  }
];

export function AboutVision() {
  return (
    <section className="section-pad border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">Our Vision</p>
          <h2 className="section-title">From software to autonomous systems.</h2>
          <p className="section-copy mt-6">
            Business technology is evolving. We're helping organizations move from manual software operations to intelligent, autonomous systems that understand context, make decisions, and take action.
          </p>
        </AnimatedSection>

        <div className="autonomy-visual mt-16">
          <div className="autonomy-stages">
            {visionStages.map((item, index) => (
              <AnimatedSection 
                key={item.stage}
                className={`stage-card ${
                  index === 0 ? 'stage-card-old' : 
                  index === 1 ? 'stage-card-mid' : 
                  'stage-card-new'
                }`}
                delay={index * 0.1}
              >
                <span>{item.stage}</span>
                <strong>{item.title}</strong>
                <ul>
                  {item.characteristics.map((char) => (
                    <li key={char}>{char}</li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>

          <div className="autonomy-readout">
            <div>
              <span>Transformation Path</span>
              <strong>Software → AI-Augmented → Autonomous</strong>
            </div>
            <div>
              <span>Our Focus</span>
              <strong>Practical, Responsible Implementation</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
