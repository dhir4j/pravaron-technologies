import { ArrowUpRight, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PageHero } from "@/components/PageHero";

type PublicOpening = {
  job_id: string;
  title: string;
  department?: string;
  employment_type: string;
  experience_level?: string;
  location?: string;
  workplace_model: string;
  summary: string;
  url: string;
};

type OpeningsFeed = {
  careers_url: string;
  count: number;
  openings: PublicOpening[];
};

async function getOpenings(): Promise<OpeningsFeed | null> {
  const apiBase = process.env.CAREERS_API_URL || process.env.NEXT_PUBLIC_CAREERS_API_URL || "http://server2careers.pravarontechnologies.com/api/v1";
  try {
    const response = await fetch(`${apiBase.replace(/\/$/, "")}/public/openings`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function CareersPage() {
  const feed = await getOpenings();
  const openings = feed?.openings || [];
  const careersUrl = feed?.careers_url || "https://careers.pravarontechnologies.com";

  return (
    <main>
      <PageHero
        label="Careers"
        title="Build your future with Pravaron Technologies."
        copy="Build focused software, automation, and intelligent systems with people who care about craft, reliability, and outcomes."
      />

      <section className="section-pad corporate-openings-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="corporate-openings-heading">
            <p className="system-label">Open positions</p>
            <h2 className="section-title">Find the work that fits your edge.</h2>
            <p className="section-copy mt-6">Current opportunities are managed through the Pravaron Technologies Careers workspace.</p>
          </AnimatedSection>

          {openings.length ? (
            <div className="corporate-opening-list">
              {openings.map((opening, index) => (
                <AnimatedSection key={opening.job_id} delay={Math.min(index * 0.06, 0.24)}>
                  <a className="corporate-opening-card" href={opening.url}>
                    <div>
                      <span className="corporate-opening-code">{opening.job_id}</span>
                      <h3>{opening.title}</h3>
                      <p>{opening.summary}</p>
                    </div>
                    <div className="corporate-opening-meta">
                      <span><MapPin size={16} aria-hidden="true" />{opening.location || "Location flexible"}</span>
                      <span>{opening.workplace_model}</span>
                      <span>{opening.department || "Engineering"}</span>
                      <span>{opening.employment_type}</span>
                    </div>
                    <span className="corporate-opening-action" aria-hidden="true"><ArrowUpRight size={21} /></span>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="corporate-openings-empty">
              <h3>No roles are published right now.</h3>
              <p>New opportunities will appear here automatically when the hiring team publishes them.</p>
              <a className="button button-secondary" href="mailto:careers@pravarontechnologies.com">Contact the careers team</a>
            </div>
          )}

          <div className="corporate-careers-profile">
            <div><span>Pravaron Technologies Careers</span><strong>Keep your profile ready for the next opportunity.</strong></div>
            <a className="button button-primary" href={`${careersUrl}/register`}>Create candidate profile<ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
