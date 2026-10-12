import type { Metadata } from "next";
import { StudioExplorer } from "@/components/public/studio/studio-explorer";

export const metadata: Metadata = {
  title: "Project Studio",
  description:
    "Every internship is built around one brief from a partner company — illustrative examples of how that brief is structured.",
};

const ANATOMY = [
  { number: "01 · Context", body: "Who needs this and why. A realistic situation, not a textbook exercise.", emphasised: true },
  { number: "02 · Deliverables", body: "Concrete artefacts, each tied to a milestone and a format." },
  { number: "03 · Evaluation", body: "Weighted criteria published up front — the same rubric your mentor uses." },
];

export default function StudioPage() {
  return (
    <main>
      <section className="px-section-x pt-[clamp(48px,7vw,96px)] pb-0">
        <div className="mx-auto flex max-w-content flex-col gap-10">
          <div className="flex flex-wrap items-end gap-x-wide gap-y-8">
            <div className="flex min-w-0 flex-[7_1_520px] flex-col gap-6">
              <span className="eyebrow flex items-center gap-3">
                <span className="block size-2 bg-accent" />
                Project Studio
              </span>
              <h1 className="m-0 text-balance text-[clamp(40px,5.4vw,72px)] font-bold leading-[1] tracking-[-0.045em]">
                The brief is the internship.
              </h1>
            </div>
            <p className="m-0 min-w-0 flex-[5_1_340px] text-ui leading-[1.65] text-muted-foreground">
              Every internship is built around one brief from a partner
              company. We shape it into clear context, defined deliverables
              and published evaluation criteria. Browse examples of the
              format below.
            </p>
          </div>

          <div role="note" className="flex items-start gap-3.5 rounded-md border border-[#F5CF9C] bg-warning-tint px-5 py-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="mt-0.5 flex-none">
              <circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.5" />
            </svg>
            <span className="text-sm leading-[1.55] text-body">
              <b className="text-navy">Illustrative briefs.</b> These examples
              show how briefs from partner companies are structured. They are
              not real company briefs or completed student projects.
            </span>
          </div>

          <StudioExplorer />
        </div>
      </section>

      <section className="border-t border-border bg-muted px-section-x py-[clamp(64px,8vw,104px)]">
        <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-10">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Anatomy of a brief</span>
            <h2 className="m-0 text-[clamp(28px,3vw,38px)] font-bold leading-[1.1] tracking-[-0.03em]">Four parts, every time.</h2>
          </div>
          {ANATOMY.map((part) => (
            <div
              key={part.number}
              className={`flex flex-col gap-2.5 pt-4 ${part.emphasised ? "border-t-2 border-navy" : "border-t border-border-strong"}`}
            >
              <span className="text-meta font-bold text-accent">{part.number}</span>
              <span className="text-ui leading-[1.6] text-muted-foreground">{part.body}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
