"use client";

const workflowTasks = [
  ["Collect signals", "done"],
  ["Reason on context", "live"],
  ["Act with review", "next"]
] as const;

export function AgentGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`agent-grid ${compact ? "agent-grid-compact" : ""}`}
      aria-label="Pravaron operating-system view: an agent workflow collecting signals, reasoning on context, and acting with human review"
    >
      <div className="agent-grid-canvas" aria-hidden="true">
        <div className="system-window primary">
          <div className="system-bar">
            <span className="system-dot" />
            <span className="system-bar-title">agent workflow</span>
          </div>
          <div className="system-tasks">
            {workflowTasks.map(([task, state]) => (
              <div className="system-task" key={task}>
                <strong>{task}</strong>
                <em data-state={state}>{state}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="system-window secondary">
          <div className="system-quad">
            <span>Agents</span>
            <span className="is-accent">Review</span>
            <span>Tools</span>
            <span>Reports</span>
          </div>
        </div>

        <div className="system-window tertiary">Agentic</div>
        <div className="system-io floating">
          <i>APIs</i>
          <i>Data</i>
          <i className="is-accent">People</i>
        </div>
      </div>

      <div className="agent-grid-readout">
        <span>Operating layer</span>
        <strong>Context in. Coordinated action out.</strong>
      </div>
    </div>
  );
}

