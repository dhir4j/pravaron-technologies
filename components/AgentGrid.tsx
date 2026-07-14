"use client";

export function AgentGrid({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`agent-grid ${compact ? "agent-grid-compact" : ""}`}
      aria-label="Pravaron operating-system view: an agent workflow collecting signals, reasoning on context, and acting with human review"
    >
      <img
        className="agent-grid-image"
        src="/images/generated/hero-agent-workflow-operating-layer.webp"
        alt="Agent workflow interface showing collect signals, reason on context, act with review, agents, review, tools, reports, APIs, data, people, and operating layer output."
        loading={compact ? "lazy" : "eager"}
      />
    </figure>
  );
}
