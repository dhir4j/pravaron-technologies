import { AgentGrid } from "./AgentGrid";
import { MagneticButton } from "./MagneticButton";
import { RevealText } from "./RevealText";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-shell">
        <div className="hero-copy-block relative z-10">
          <p className="system-label">Authorized intelligence builder</p>
          <RevealText
            text="One partner. Every intelligent workflow."
            className="text-balance"
          />
          <p className="mt-7">
            From custom software to Agentic AI products, Pravaron Technologies helps businesses evaluate, build, integrate, and scale systems that automate work and improve decisions.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="mailto:contact@pravarontechnologies.com?subject=Start a Project">
              Start a Project
            </MagneticButton>
            <MagneticButton href="#builds" variant="secondary">
              Explore Capabilities
            </MagneticButton>
          </div>
        </div>

        <div className="relative">
          <AgentGrid />
        </div>
      </div>

      <div className="proof-strip">
        <span>Agentic products</span>
        <span>AI integration</span>
        <span>Automation systems</span>
        <span>Custom software</span>
      </div>
    </section>
  );
}
