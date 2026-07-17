import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";

export function FounderProfile() {
  return (
    <section className="founder-section" aria-labelledby="founder-heading">
      <div className="founder-shell">
        <AnimatedSection className="founder-portrait">
          <div className="founder-portrait-frame">
            <span className="founder-portrait-index" aria-hidden="true">
              01 / Leadership
            </span>
            <span className="founder-portrait-role" aria-hidden="true">
              Dhiraj Kapse
            </span>
            <Image
              src="/images/founder-ceo.png"
              alt="Founder and CEO of Pravaron Technologies"
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
              className="founder-portrait-image"
              priority={false}
            />
          </div>
          <blockquote className="founder-portrait-quote">
            <p>
              “Intelligence should not remain inside a chat window. It should
              become part of how businesses operate.”
            </p>
            <cite>Dhiraj Kapse, Founder &amp; CEO</cite>
          </blockquote>
        </AnimatedSection>

        <AnimatedSection className="founder-story" delay={0.08}>
          <p className="system-label">Founder &amp; CEO</p>
          <h2 id="founder-heading">
            From AI research to <span>systems that act.</span>
          </h2>

          <div className="founder-copy">
            <p>
              Before building Pravaron Technologies, I worked as a lecturer and
              researcher in artificial intelligence, exploring how intelligent
              systems reason, learn, and support better decisions.
            </p>
            <p>
              My work with automation revealed the missing link: intelligence
              creates its greatest value when it can move beyond insight and act
              inside real business workflows. Pravaron Technologies brings both
              disciplines together, combining AI reasoning, automation, and
              production software to build dependable autonomous systems.
            </p>
          </div>

        </AnimatedSection>

      </div>
    </section>
  );
}
