import { cn } from "@/lib/cn";

/** Marker styles differ per stage, mirroring the mockup's progression. */
const STAGES = [
  {
    number: "01",
    title: "Apply & get matched",
    body: "Pick an internship and apply. Once you're matched with a company, you get your project brief and a weekly plan.",
    record: "Confirmed match & brief",
    marker: "outline",
    connector: "solid",
  },
  {
    number: "02",
    title: "Experience the Corporate Life",
    body: "Work and Experience through assigned tasks from real projects.",
    record: "Milestone submissions",
    marker: "tint",
    connector: "solid",
  },
  {
    number: "03",
    title: "Mentor feedback",
    body: "Get feedback from the founder and tech leads for enormous improvement.",
    record: "Scored reviews",
    marker: "accent",
    connector: "solid",
  },
  {
    number: "04",
    title: "Completion review",
    body: "Get a 3-layer evaluation of your overall work during the internship.",
    record: "Completion decision",
    marker: "navy",
    connector: "dashed",
  },
  {
    number: "05",
    title: "Get Verified Credentials",
    body: "Receive an official, verifiable certificate and Official Signed Letter of Recommendation (LOR) issued directly by the company.",
    record: "Verifiable credential",
    marker: "seal",
    connector: "none",
  },
] as const;

function StageMarker({
  marker,
  connector,
}: {
  marker: (typeof STAGES)[number]["marker"];
  connector: (typeof STAGES)[number]["connector"];
}) {
  return (
    <div className="flex items-center">
      {marker === "seal" ? (
        <span className="flex size-[18px] flex-none items-center justify-center rounded-full border-[1.5px] border-navy bg-card">
          <span className="block size-2 rounded-full bg-accent" />
        </span>
      ) : (
        <span
          className={cn(
            "block size-[18px] flex-none",
            marker === "outline" && "border-[1.5px] border-navy bg-card",
            marker === "tint" && "border-[1.5px] border-navy bg-tint-100",
            marker === "accent" && "bg-accent",
            marker === "navy" && "bg-navy",
          )}
        />
      )}

      {connector === "solid" && <span className="block h-[1.5px] flex-1 bg-navy" />}
      {connector === "dashed" && (
        <span className="block h-[1.5px] flex-1 bg-[repeating-linear-gradient(90deg,var(--navy)_0_4px,transparent_4px_8px)]" />
      )}
    </div>
  );
}

export function JourneySection() {
  return (
    <section className="border-t border-border bg-muted px-section-x py-section-y">
      <div className="mx-auto max-w-content">
        <div className="mb-header-gap flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="flex max-w-[720px] flex-[1_1_560px] flex-col gap-5">
            <span className="eyebrow">From learning to credential</span>
            <h2 className="m-0 text-balance text-h2 font-bold">
              Five stages. Each one leaves a record.
            </h2>
          </div>
          <p className="m-0 flex-[0_1_420px] text-body-lg leading-[1.65] text-muted-foreground">
            We handle the matching, structure and verification. The partner
            company provides the project and the mentoring. You see the brief,
            rubric and completion criteria before you begin.
          </p>
        </div>

        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-x-0 gap-y-10 p-0">
          {STAGES.map((stage, index) => (
            <li
              key={stage.number}
              className={cn(
                "flex flex-col gap-[18px]",
                index < STAGES.length - 1 && "pr-7",
              )}
            >
              <StageMarker marker={stage.marker} connector={stage.connector} />
              <span className="text-meta font-bold text-accent">
                Stage {stage.number}
              </span>
              <h3 className="m-0 text-card-title font-bold">{stage.title}</h3>
              <p className="m-0 text-ui text-muted-foreground">{stage.body}</p>
              <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3.5">
                <span className="text-micro font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Record
                </span>
                <span className="text-sm font-semibold">{stage.record}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
