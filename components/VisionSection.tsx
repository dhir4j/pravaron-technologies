"use client";

const stages = [
  {
    number: "01",
    title: "Input",
    label: "Classic Software",
    items: ["Operators type and click", "Software stores and displays", "People decide every step"],
    tone: "light"
  },
  {
    number: "02",
    title: "Context",
    label: "AI-Augmented",
    items: ["Signals read automatically", "State summarized for teams", "Actions drafted for review"],
    tone: "orange"
  },
  {
    number: "03",
    title: "Action",
    label: "Autonomous Agents",
    items: ["Goals broken into tasks", "Tools used directly", "People review what matters", "Outcomes reported back"],
    tone: "dark"
  }
];

export function VisionSection() {
  return (
    <section className="vision-stage-section py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-orange mb-4">
            <span className="h-px w-8 bg-orange" />
            Operating Model
          </p>
          <h2 className="text-5xl lg:text-6xl font-bold text-ink mb-6">
            From Software to <span className="bg-gradient-to-r from-orange via-orange-light to-pink bg-clip-text text-transparent">Autonomous Systems</span>
          </h2>
          <p className="text-lg text-muted">
            AI is no longer only an interface. It is becoming the operating layer that turns context into coordinated action.
          </p>
        </div>

        <div className="vision-stage-wrap">
          <div className="vision-stage-grid">
            {stages.map((stage) => (
              <article className={`vision-stage-card vision-stage-card-${stage.tone}`} key={stage.number}>
                <div className="vision-stage-topline">
                  <span>{stage.number}</span>
                  <small>{stage.title}</small>
                </div>
                <h3>{stage.label}</h3>
                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white border-2 border-orange rounded-full px-8 py-4 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-orange">Evolution Path</span>
              <span className="text-ink font-bold">Software → AI-augmented → Autonomous</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
