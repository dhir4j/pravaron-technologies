import { AnimatedSection } from "./AnimatedSection";
import { MagneticButton } from "./MagneticButton";

export function ProductsLabsSection() {
  return (
    <section id="products" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <AnimatedSection className="labs-manifesto">
          <p className="system-label">Pravaron Technologies Products</p>
          <h2>We do not only serve clients. We build our own AI-native products.</h2>
          <p>
            Our product team builds automation systems, campaign intelligence, and agent workflows that prove intelligent operating patterns in production.
          </p>
          <div className="mt-8">
            <MagneticButton href="/products" variant="secondary">
              Explore Products
            </MagneticButton>
          </div>
        </AnimatedSection>

        <AnimatedSection className="labs-product" delay={0.08}>
          <div className="labs-product-visual">
            <div className="labs-static-visual" aria-hidden="true">
              <span />
              <span />
              <span />
              <i />
            </div>
          </div>
          <span className="system-label text-cyan">Active system</span>
          <h3>Mark8bot</h3>
          <p>
            Social media campaign workspace for scheduled publishing, assisted responses, content planning, approval workflows, and performance visibility.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="https://mark8bot.com" target="_blank">
              Visit Mark8bot
            </MagneticButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
