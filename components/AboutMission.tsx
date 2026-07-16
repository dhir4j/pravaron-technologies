import { AnimatedSection } from "./AnimatedSection";

const missionPoints = [
  {
    title: "Workflow-First Thinking",
    description: "We begin with your business process and expected outcome—not with a preselected AI model or tool. Every solution is designed around real operational needs."
  },
  {
    title: "End-to-End Perspective",
    description: "We consider the complete system: AI, software, automation, data, integrations, security, people, and operational controls working together."
  },
  {
    title: "Practical Autonomy",
    description: "We automate where autonomy creates value and preserve human involvement where judgment, accountability, or oversight is necessary."
  },
  {
    title: "Built Around Your Business",
    description: "Our systems are designed around your organization's workflows, rules, technology environment, and operational requirements."
  }
];

export function AboutMission() {
  return (
    <section className="section-pad vision-upgrade">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 items-start">
          <AnimatedSection className="vision-narrative">
            <p className="system-label">Our Mission</p>
            <h2>
              Turn manual workflows into <span>intelligent systems.</span>
            </h2>
            <p className="vision-subhead">
              We bring together AI, automation, architecture, data, integrations, security, and human oversight to build systems that reduce repetitive work, improve operational visibility, and enable faster decisions.
            </p>
          </AnimatedSection>

          <div className="grid gap-6">
            {missionPoints.map((point, index) => (
              <AnimatedSection 
                key={point.title}
                className="principle-card"
                delay={index * 0.08}
              >
                <strong>{point.title}</strong>
                <p>{point.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
