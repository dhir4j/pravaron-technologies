import { AnimatedSection } from "./AnimatedSection";

const points = [
  "Agentic AI-first thinking",
  "Automation-first implementation",
  "Custom software capability",
  "Product-building mindset",
  "Technical consulting plus execution",
  "Future-ready architecture",
  "Clear business outcome focus"
];

export function WhyPravaron() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <AnimatedSection>
          <p className="system-label">Why Pravaron</p>
          <h2 className="section-title">Most companies add AI as a feature.</h2>
          <p className="section-copy mt-6">
            Pravaron designs systems where intelligence becomes the operating layer: strategy, software, automation, and execution working as one.
          </p>
        </AnimatedSection>

        <div className="why-grid">
          {points.map((point, index) => (
            <AnimatedSection className="why-item" delay={index * 0.035} key={point}>
              {point}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
