import Link from "next/link";
import { AgentGrid } from "./AgentGrid";

export function CorporateHome() {
  return (
    <section className="corp-hero">
      <div className="corp-hero-shell">
        <div className="corp-hero-content">
          <p className="corp-hero-subtitle">Intelligent Systems · Autonomous Operations</p>
          <h1 className="corp-hero-title">
            The operating layer for <em>autonomous business.</em>
          </h1>
          <p className="corp-hero-description">
            Pravaron Technologies builds the AI, automation, and software systems that turn manual operations into autonomous, self-running businesses.
          </p>
          <div className="corp-hero-actions">
            <Link href="mailto:careers@pravarontechnologies.com?subject=Start a Project" className="corp-hero-button primary">
              Start a Project
            </Link>
            <Link href="/services" className="corp-hero-button secondary">
              Explore Capabilities
            </Link>
          </div>
        </div>

        <div className="corp-hero-visual">
          <AgentGrid />
        </div>
      </div>
    </section>
  );
}
