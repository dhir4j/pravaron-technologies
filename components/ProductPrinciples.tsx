import { productPrinciples } from "./data";

export function ProductPrinciples() {
  return (
    <section className="section-pad border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="system-label">How Products Work</p>
          <h2 className="section-title">Proven through real operating products.</h2>
          <p className="section-copy mt-6">Our products prove agentic patterns with real users before those patterns carry client workloads.</p>
        </div>
        <div className="principle-grid mt-12">
          {productPrinciples.map(([title, body], index) => (
            <article className="principle-card" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
