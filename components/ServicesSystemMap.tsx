import { services } from "./data";
import { AnimatedSection } from "./AnimatedSection";

export function ServicesSystemMap() {
  return (
    <section id="services" className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">Technology Capabilities</p>
          <h2 className="section-title">Services deployed as a system map.</h2>
          <p className="section-copy mt-6">
            Pravaron combines consulting, engineering, AI integration, and automation implementation into one build path. Every lane below is a layer of the same operating system, not a separate department.
          </p>
        </AnimatedSection>

        <div className="deployment-map mt-12">
          {services.map((service, index) => (
            <AnimatedSection className="deployment-row" delay={index * 0.045} key={service.slug}>
              <span className="deployment-layer">{service.layer}</span>
              <div id={service.slug} className="scroll-mt-28">
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <ul className="deliverable-list">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
