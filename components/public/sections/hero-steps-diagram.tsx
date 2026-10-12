const STEP_LABELS = [
  { x: 92, y: 436, number: "01", label: "MATCH" },
  { x: 172, y: 356, number: "02", label: "BUILD" },
  { x: 252, y: 276, number: "03", label: "FEEDBACK" },
  { x: 332, y: 196, number: "04", label: "REVIEW" },
  { x: 412, y: 116, number: "05", label: "CERTIFY" },
];

/** Hero motif: five squares rising from enrolment to a certificate seal. */
export function HeroStepsDiagram() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="block h-auto w-full max-w-[480px]"
      role="img"
      aria-label="Abstract diagram: five squares rising like steps from enrolment to a certificate seal"
    >
      <g stroke="var(--border)" strokeWidth="1" fill="none">
        <path d="M0.5 0.5H479.5V479.5H0.5Z" />
        <path d="M80.5 0V480M160.5 0V480M240.5 0V480M320.5 0V480M400.5 0V480" />
        <path d="M0 80.5H480M0 160.5H480M0 240.5H480M0 320.5H480M0 400.5H480" />
      </g>

      <rect
        x="1"
        y="401"
        width="79"
        height="78"
        fill="#FFFFFF"
        stroke="var(--muted-icon)"
        strokeDasharray="4 4"
      />
      <rect x="81" y="321" width="79" height="79" fill="var(--tint-50)" />
      <rect x="161" y="241" width="79" height="79" fill="var(--tint-100)" />
      <rect x="241" y="161" width="79" height="79" fill="var(--accent)" />
      <rect x="321" y="81" width="79" height="79" fill="var(--navy)" />

      <path
        d="M40 440V360H120V280H200V200H280V120H360V40H440"
        fill="none"
        stroke="var(--muted-icon)"
        strokeWidth="1.25"
        strokeDasharray="3 4"
      />
      <path
        d="M40 440V360H120V280H200V200H280"
        fill="none"
        stroke="var(--navy)"
        strokeWidth="1.5"
      />

      <circle cx="40" cy="440" r="4.5" fill="var(--navy)" />
      <circle cx="120" cy="360" r="4.5" fill="var(--navy)" />
      <circle cx="200" cy="280" r="4.5" fill="var(--navy)" />
      <circle cx="280" cy="200" r="5.5" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="280" cy="200" r="3" fill="var(--accent)" />
      <circle
        cx="360"
        cy="120"
        r="4.5"
        fill="var(--navy)"
        stroke="var(--on-navy-muted)"
        strokeWidth="1.5"
      />

      <circle cx="440" cy="40" r="34" fill="#FFFFFF" stroke="var(--navy)" strokeWidth="1.5" />
      <circle
        cx="440"
        cy="40"
        r="26"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <path
        d="M429 40.5l7.5 7.5 15-15"
        fill="none"
        stroke="var(--navy)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g fontFamily="Manrope, sans-serif" fontSize="10" fontWeight="700" letterSpacing="1.4">
        {STEP_LABELS.map((step) => (
          <g key={step.number}>
            <text x={step.x} y={step.y} fill="var(--accent)">
              {step.number}
            </text>
            <text x={step.x} y={step.y + 16} fill="var(--body)">
              {step.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
