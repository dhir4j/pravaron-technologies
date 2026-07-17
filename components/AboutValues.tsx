import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const whoWeWorkWith = [
  {
    title: "Automate Operations",
    description: "Organizations transforming repetitive manual work into intelligent automated workflows."
  },
  {
    title: "AI Integration",
    description: "Companies embedding AI capabilities into existing systems and business processes."
  },
  {
    title: "Agentic AI Products",
    description: "Businesses building goal-driven AI systems that can reason, plan, and execute tasks."
  },
  {
    title: "Decision Intelligence",
    description: "Teams improving decision-making with data-driven insights and recommendations."
  },
  {
    title: "Product Validation",
    description: "Startups testing and validating AI product concepts before full-scale development."
  },
  {
    title: "Production Deployment",
    description: "Organizations moving from AI experimentation to reliable production systems."
  }
];

const approach = [
  {
    title: "Clearly Defined Objectives",
    body: "Every system starts with a business goal, not a technology choice."
  },
  {
    title: "Reliable Data & Context",
    body: "AI systems need accurate information and proper context to make intelligent decisions."
  },
  {
    title: "Well-Designed Workflows",
    body: "Technology must fit into operational processes, not replace them arbitrarily."
  },
  {
    title: "Appropriate Human Oversight",
    body: "Critical decisions remain with people while automation handles repetitive coordination."
  },
  {
    title: "Evaluation & Monitoring",
    body: "Systems must be measured, tested, and continuously improved based on real performance."
  },
  {
    title: "Operational Controls",
    body: "Failure handling, security boundaries, and access controls are built into every solution."
  }
];

export function AboutValues() {
  return (
    <>
      {/* Our Approach Section */}
      <section className="section-pad border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <p className="system-label">Our Approach</p>
            <h2 className="section-title">AI systems require more than powerful models.</h2>
            <p className="section-copy mt-6">
              We choose technologies based on the problem being solved. Our focus is practical implementation, responsible deployment, and long-term operational value.
            </p>
          </AnimatedSection>

          <div className="deployment-map mt-12">
            {approach.map((item, index) => (
              <AnimatedSection delay={index * 0.045} key={item.title}>
                <details className="deployment-row about-approach-disclosure">
                  <summary>
                    <span className="deployment-layer">Principle {index + 1}</span>
                    <h3>{item.title}</h3>
                    <ChevronDown size={20} aria-hidden="true" />
                  </summary>
                  <p>{item.body}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="section-pad builds-upgrade">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="builds-heading">
            <p className="system-label">Who We Serve</p>
            <h2>Organizations ready to evolve.</h2>
            <p>
              We partner with startups, growing companies, and established organizations that want to transform operations through intelligent automation and AI integration.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {whoWeWorkWith.map((item, index) => (
              <AnimatedSection 
                key={item.title}
                className="feature-card"
                delay={Math.min(index * 0.04, 0.2)}
              >
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
