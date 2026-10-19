const STEP_LABELS = [
  { x: 136, y: 414, number: "01", label: "REGISTERED" },
  { x: 256, y: 294, number: "02", label: "REVIEWED" },
  { x: 376, y: 174, number: "03", label: "RECRUITED" },
];

/** Hero motif: three squares rising from registration to a recruited seal. */
export function HeroStepsDiagram() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="block h-auto w-full max-w-[480px]"
      role="img"
      aria-label="Diagram: three steps rising from registered, to reviewed, to recruited"
    >
      <g stroke="var(--border)" strokeWidth="1" fill="none">
        <path d="M0.5 0.5H479.5V479.5H0.5Z" />
        <path d="M120.5 0V480M240.5 0V480M360.5 0V480" />
        <path d="M0 120.5H480M0 240.5H480M0 360.5H480" />
      </g>

      <rect x="1" y="361" width="119" height="118" fill="var(--tint-100)" />
      <rect x="121" y="241" width="119" height="119" fill="var(--accent)" />
      <rect x="241" y="121" width="119" height="119" fill="var(--navy)" />

      <path
        d="M300 180V60H378"
        fill="none"
        stroke="var(--muted-icon)"
        strokeWidth="1.25"
        strokeDasharray="3 4"
      />
      <path
        d="M60 420V300H180V180H300"
        fill="none"
        stroke="var(--navy)"
        strokeWidth="1.5"
      />

      <circle cx="60" cy="420" r="5" fill="var(--navy)" />
      <circle cx="180" cy="300" r="6.5" fill="var(--card)" />
      <circle cx="180" cy="300" r="3.5" fill="var(--accent)" />
      <circle cx="300" cy="180" r="5" fill="var(--background)" />

      <circle cx="420" cy="60" r="40" fill="var(--card)" stroke="var(--navy)" strokeWidth="1.5" />
      <circle
        cx="420"
        cy="60"
        r="31"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <path
        d="M407 60.5l9 9 17.5-17.5"
        fill="none"
        stroke="var(--navy)"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.4">
        {STEP_LABELS.map((step) => (
          <g key={step.number}>
            <text x={step.x} y={step.y} fill="var(--accent)">
              {step.number}
            </text>
            <text x={step.x} y={step.y + 18} fill="var(--body)">
              {step.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
