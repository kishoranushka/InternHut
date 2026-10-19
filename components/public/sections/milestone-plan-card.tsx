const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const CURRENT_WEEK = "W5";

const RUBRIC_BARS = [
  { label: "Function", percent: 80 },
  { label: "Code", percent: 90 },
  { label: "UX", percent: 70 },
];

/**
 * Sample milestone plan + mentor review card for the Guided learning section.
 * Illustrative UI, not a live student record.
 */
export function MilestonePlanCard() {
  return (
    <div className="relative min-w-0 flex-[7_1_520px] pb-18">
      <div className="flex flex-col gap-6 rounded-card border border-tint-200 bg-card p-panel-x">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="text-base font-bold">
            Frontend Development · Milestone plan
          </span>
          <span className="text-meta font-semibold text-body">Week 5 of 8</span>
        </div>

        <div className="grid grid-cols-8 gap-1 text-center text-micro font-bold text-muted-foreground">
          {WEEKS.map((week) => (
            <span key={week} className={week === CURRENT_WEEK ? "text-accent-secondary" : undefined}>
              {week}
            </span>
          ))}

          <span className="col-[1/span_2] flex h-9 items-center rounded px-2.5 text-left text-caption text-background bg-navy">
            M1 · Plan
          </span>
          <span className="col-[3/span_2] flex h-9 items-center rounded px-2.5 text-left text-caption text-background bg-navy">
            M2 · Components
          </span>
          <span className="col-[5/span_1] flex h-9 items-center rounded bg-accent px-2 text-caption text-accent-foreground">
            M3
          </span>
          <span className="col-[6/span_2] flex h-9 items-center rounded border-[1.5px] border-dashed border-muted-icon px-2.5 text-caption text-body">
            M4 · Data
          </span>
          <span className="col-[8/span_1] flex h-9 items-center justify-center rounded border-[1.5px] border-navy text-caption text-navy">
            Final
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 border-t border-border py-3 text-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--success)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            <span className="flex-1 font-semibold">M2 · Component library</span>
            <span className="tnum text-muted-foreground">Reviewed · 8/10</span>
          </div>
          <div className="flex items-center gap-3 border-t border-border py-3 text-sm">
            <span className="flex w-4 justify-center">
              <span className="block size-2 bg-accent" />
            </span>
            <span className="flex-1 font-bold">M3 · Dashboard view</span>
            <span className="font-semibold text-accent-secondary">
              Submitted — in review
            </span>
          </div>
        </div>
      </div>

      <div className="absolute right-[clamp(0px,2vw,24px)] bottom-0 flex w-[min(340px,86%)] flex-col gap-3 rounded-card border border-border bg-card p-5 shadow-float">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-navy text-caption font-bold text-background">
            M
          </span>
          <div className="flex flex-col">
            <span className="text-meta font-bold">Mentor review · M2</span>
            <span className="text-caption text-muted-foreground">Sample feedback</span>
          </div>
        </div>
        <p className="m-0 text-sm leading-[1.55] text-body">
          Clean, reusable components. Before M3, add empty and loading states and
          check colour contrast on the buttons.
        </p>
        <div className="grid grid-cols-3 gap-2 text-micro font-bold text-muted-foreground">
          {RUBRIC_BARS.map((bar) => (
            <div key={bar.label} className="flex flex-col gap-1">
              <span>{bar.label}</span>
              <span
                className="block h-[3px]"
                style={{
                  background: `linear-gradient(90deg, var(--navy) ${bar.percent}%, var(--border) ${bar.percent}%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
