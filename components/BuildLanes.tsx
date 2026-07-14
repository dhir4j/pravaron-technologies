import { capabilities } from "./data";
import { AnimatedSection } from "./AnimatedSection";

export function BuildLanes() {
  return (
    <section className="section-pad builds-upgrade">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="system-label">Build Lanes</p>
          <h2 className="section-title">What each lane actually solves.</h2>
          <p className="section-copy mt-6">
            Every engagement starts from an operational problem, not a technology preference. Each lane below maps the problem, the system we build, and the outcome it produces.
          </p>
        </AnimatedSection>

        <div className="capability-lane mt-12">
          {capabilities.map((capability, index) => (
            <AnimatedSection delay={Math.min(index * 0.04, 0.16)} key={capability.slug}>
              <article className="capability-card scroll-mt-28" id={capability.slug}>
                <h3>{capability.title}</h3>
                <div className="capability-facets">
                  <div>
                    <span>Problem</span>
                    <p>{capability.problem}</p>
                  </div>
                  <div>
                    <span>System</span>
                    <p>{capability.system}</p>
                  </div>
                  <div>
                    <span>Outcome</span>
                    <p>{capability.outcome}</p>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
