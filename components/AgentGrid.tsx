"use client";

const workflowSteps = [
  ["01", "Collect signals", "done"],
  ["02", "Reason on context", "live"],
  ["03", "Act with review", "next"]
] as const;

const controlTiles = ["Agents", "Review", "Tools", "Reports"] as const;
const inputTiles = ["APIs", "Data", "People"] as const;

export function AgentGrid({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`agent-grid ${compact ? "agent-grid-compact" : ""}`}
      aria-label="Pravaron operating-system view: an agent workflow collecting signals, reasoning on context, and acting with human review"
    >
      <svg className="agent-grid-svg" viewBox="0 0 960 600" role="img" aria-labelledby="agentGridTitle agentGridDesc">
        <title id="agentGridTitle">Agent workflow operating layer</title>
        <desc id="agentGridDesc">
          Collect signals, reason on context, act with review, and coordinate agents, tools, reports, APIs, data, and people.
        </desc>

        <defs>
          <linearGradient id="agentSurface" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="58%" stopColor="#f3ece9" />
            <stop offset="100%" stopColor="#d9ceca" />
          </linearGradient>
          <linearGradient id="agentDark" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1f1b1a" />
            <stop offset="100%" stopColor="#090909" />
          </linearGradient>
          <linearGradient id="agentRed" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff4b3e" />
            <stop offset="100%" stopColor="#c9140e" />
          </linearGradient>
          <radialGradient id="agentGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff4b3e" stopOpacity="0.7" />
            <stop offset="52%" stopColor="#e2231a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#e2231a" stopOpacity="0" />
          </radialGradient>
          <filter id="agentShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#000000" floodOpacity="0.28" />
          </filter>
          <pattern id="agentGridPattern" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1a1a1a" strokeOpacity="0.06" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="960" height="600" rx="34" fill="#130908" />
        <circle cx="112" cy="106" r="180" fill="url(#agentGlow)" opacity="0.5" />
        <circle cx="846" cy="505" r="220" fill="url(#agentGlow)" opacity="0.45" />

        <g filter="url(#agentShadow)">
          <rect x="74" y="54" width="812" height="492" rx="28" fill="url(#agentSurface)" />
          <rect x="74" y="54" width="812" height="492" rx="28" fill="url(#agentGridPattern)" />
          <rect x="74" y="54" width="812" height="492" rx="28" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
        </g>

        <g>
          <rect x="108" y="86" width="42" height="42" rx="10" fill="url(#agentRed)" />
          <path d="M121 113c0-9 17-9 17 0M129.5 101v22M121 113l8.5 10 8.5-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="166" y="116" className="agent-svg-title">Agent workflow</text>
        </g>

        {workflowSteps.map(([number, label, state], index) => {
          const x = 108 + index * 254;
          return (
            <g key={label}>
              <rect x={x} y="154" width="224" height="136" rx="18" fill="#ffffff" fillOpacity="0.7" stroke="#ffffff" strokeWidth="2" />
              <rect x={x + 18} y="174" width="32" height="32" rx="8" fill="url(#agentRed)" />
              <text x={x + 34} y="195" textAnchor="middle" className="agent-svg-number">{number}</text>
              <text x={x + 62} y="195" className="agent-svg-step">{label}</text>
              <path d={`M${x + 48} 236 C${x + 84} 214 ${x + 124} 258 ${x + 164} 224`} fill="none" stroke="#e2231a" strokeOpacity="0.4" strokeWidth="2" />
              <circle cx={x + 98} cy="235" r="22" fill="#e2231a" opacity="0.12" />
              <circle cx={x + 98} cy="235" r="6" fill="#e2231a" />
              <rect x={x + 152} y="240" width="54" height="30" rx="10" fill={state === "live" ? "#fff0ef" : "#ffffff"} stroke="#d9cfcc" />
              <text x={x + 179} y="260" textAnchor="middle" className={state === "live" ? "agent-svg-state-live" : "agent-svg-state"}>
                {state}
              </text>
            </g>
          );
        })}

        <path d="M332 222H362M586 222H616" stroke="#e2231a" strokeWidth="4" strokeLinecap="round" />
        <path d="M368 222h-10M622 222h-10" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.75" />

        <g>
          {controlTiles.map((tile, index) => {
            const x = 108 + index * 120;
            return (
              <g key={tile}>
                <rect x={x} y="324" width="106" height="106" rx="16" fill="url(#agentDark)" stroke={tile === "Review" ? "#e2231a" : "#3a312f"} strokeWidth="2" />
                <circle cx={x + 53} cy="366" r="20" fill={tile === "Review" ? "#e2231a" : "#ffffff"} opacity={tile === "Review" ? "0.96" : "0.14"} />
                <text x={x + 53} y="405" textAnchor="middle" className={tile === "Review" ? "agent-svg-control-accent" : "agent-svg-control"}>
                  {tile}
                </text>
              </g>
            );
          })}
        </g>

        <g>
          {inputTiles.map((tile, index) => {
            const x = 108 + index * 164;
            return (
              <g key={tile}>
                <path d={`M${x + 53} 430v24`} stroke="#e2231a" strokeWidth="3" />
                <rect x={x} y="454" width="144" height="64" rx="16" fill="#fff7f5" stroke="#ffffff" strokeWidth="2" />
                <circle cx={x + 32} cy="486" r="16" fill="#e2231a" opacity="0.12" />
                <text x={x + 58} y="493" className="agent-svg-input">{tile}</text>
              </g>
            );
          })}
        </g>

        <g>
          <rect x="636" y="322" width="214" height="196" rx="22" fill="#f0e8e4" stroke="#ffffff" strokeWidth="2" />
          <text x="743" y="356" textAnchor="middle" className="agent-svg-agentic">Agentic</text>
          <circle cx="743" cy="426" r="60" fill="#170d0c" stroke="#ffffff" strokeOpacity="0.56" strokeWidth="2" />
          <circle cx="743" cy="426" r="40" fill="url(#agentRed)" opacity="0.92" />
          <circle cx="743" cy="426" r="78" fill="none" stroke="#e2231a" strokeDasharray="3 8" opacity="0.45" />
          <path d="M721 426h44M743 404v44M725 410l36 32M761 410l-36 32" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.86" />
          <circle cx="743" cy="426" r="7" fill="#ffffff" />
        </g>

        <g>
          <rect x="108" y="532" width="742" height="58" rx="18" fill="#0b0b0b" stroke="#3a312f" />
          <path d="M132 550h28l-14 9 14 9h-28l14-9z" fill="none" stroke="#e2231a" strokeWidth="3" strokeLinejoin="round" />
          <text x="178" y="569" className="agent-svg-readout-title">Operating layer</text>
          <line x1="370" y1="546" x2="370" y2="576" stroke="#e2231a" strokeWidth="2" />
          <text x="404" y="569" className="agent-svg-readout">Context <tspan fill="#ff4b3e">in.</tspan> Coordinated action <tspan fill="#ff4b3e">out.</tspan></text>
        </g>
      </svg>
    </figure>
  );
}
