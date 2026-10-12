import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Learning Experience",
  description:
    "A steady weekly rhythm, reviewed by people who do the work: milestones, mentor guidance and completion criteria.",
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const JOURNEY = [
  { phase: "Before you start", title: "Apply, get matched, prepare", body: "Your application is reviewed for intent and readiness, and you're matched with a partner company. You then confirm your seat and receive the brief, rubric, calendar and setup guide." },
  { phase: "Week 1", title: "Orientation", body: "Meet your mentor and cohort, walk through the brief together, and agree how you will work." },
  { phase: "Weeks 2 to final", title: "Milestones and reviews", body: "One milestone a week (or fortnight, on longer tracks). Each submission gets rubric scores and written feedback before the next one is due." },
  { phase: "At completion", title: "Final review and certificate", body: "Your complete project is reviewed against the completion criteria. If they are met, your certificate is issued and becomes publicly verifiable." },
];

const GUIDES = [
  { initial: "M", role: "Your mentor", body: "A practitioner from the partner company. Reviews every milestone, runs office hours and answers questions in the thread.", does: "question, guide, score fairly", extra: "Doesn't: write your code or your report" },
  { initial: "C", role: "Programme coordinator", body: "From our team. Handles your match, schedules, extensions, payments and anything that isn't about the work itself.", does: "keep the programme running", extra: "Reach: [coordinator email]" },
  { initial: "P", role: "Your cohort", body: "Students on the same track. Discuss approaches, share resources, and give each other feedback.", does: null, extra: "Rule: discuss ideas, never share solutions" },
];

const MILESTONE_QUESTIONS = [
  "Where am I in the project?",
  "When is it due?",
  "What exactly do I submit?",
  "How will it be judged?",
  "When do I hear back?",
];

const RUBRIC_ROWS = [
  { criterion: "Functionality", weight: "30%", developing: "Core screens incomplete or break with real data.", proficient: "All required screens work with the mock API.", strong: "Handles empty, loading and error cases gracefully." },
  { criterion: "Code quality", weight: "25%", developing: "Logic duplicated; hard to follow.", proficient: "Reusable components with clear names.", strong: "Well-structured, documented and easy to extend." },
  { criterion: "UX & accessibility", weight: "25%", developing: "Layout breaks on mobile; low contrast.", proficient: "Responsive; keyboard reachable.", strong: "Consistent, accessible, considerate of real users." },
];

const CERT_CRITERIA = [
  { title: "Every milestone submitted", body: "No gaps. Late is acceptable within the programme window.", emphasised: true },
  { title: "Minimum score on each", body: "Set per programme and published with the rubric.", emphasised: true },
  { title: "Final review passed", body: "The complete project meets the brief as a whole." },
  { title: "Original work", body: "In line with the academic integrity policy." },
];

export default function LearningPage() {
  return (
    <main>
      <section className="px-section-x pt-[clamp(56px,8vw,112px)] pb-[clamp(64px,8vw,104px)]">
        <div className="mx-auto flex max-w-content flex-col gap-stack">
          <div className="flex flex-wrap items-end gap-x-wide gap-y-8">
            <div className="flex min-w-0 flex-[7_1_520px] flex-col gap-6">
              <span className="eyebrow flex items-center gap-3">
                <span className="block size-2 bg-accent" />
                Learning Experience
              </span>
              <h1 className="m-0 text-balance text-[clamp(40px,5.4vw,76px)] font-bold leading-[1] tracking-[-0.045em]">
                A steady weekly rhythm, reviewed by people who do the work.
              </h1>
            </div>
            <p className="m-0 min-w-0 flex-[5_1_340px] text-ui leading-[1.65] text-muted-foreground">
              Whichever partner company you intern with, the pattern is the
              same: a milestone opens, you build, you submit, your company
              mentor reviews. Repeat until the project is complete.
            </p>
          </div>

          <div className="overflow-x-auto border-t border-navy">
            <div className="grid min-w-[900px] grid-cols-[140px_repeat(7,minmax(110px,1fr))]">
              <span className="py-3.5 text-caption font-bold tracking-[0.1em] text-muted-foreground uppercase">A typical week</span>
              {WEEK_DAYS.map((day) => (
                <span key={day} className="border-l border-border px-3 py-3.5 text-meta font-bold">{day}</span>
              ))}

              <span className="border-t border-border py-2.5 text-sm font-semibold text-body">Milestone</span>
              <span className="col-span-1 col-start-2 m-1 flex h-9 items-center rounded px-2.5 text-caption font-bold text-white" style={{ background: "var(--navy)" }}>Opens</span>
              <span className="col-span-4 col-start-3 m-1 flex h-9 items-center rounded border border-tint-200 bg-tint-50 px-3 text-caption font-bold text-accent-secondary">Build at your own pace · 8–10 hrs</span>
              <span className="col-span-1 col-start-7 m-1 flex h-9 items-center rounded bg-accent px-2.5 text-caption font-bold text-white">Submit</span>
              <span className="col-span-1 col-start-8 m-1 flex h-9 items-center rounded border-[1.5px] border-dashed border-muted-icon px-2.5 text-caption font-bold text-body">Buffer</span>

              <span className="border-t border-border py-2.5 text-sm font-semibold text-body">Support</span>
              <span className="col-span-2 col-start-2 m-1 flex h-9 items-center rounded bg-muted px-3 text-caption font-bold text-body">Last week&apos;s review returned</span>
              <span className="col-span-1 col-start-5 m-1 flex h-9 items-center rounded border-[1.5px] border-navy px-2.5 text-caption font-bold">Office hours</span>
              <span className="col-span-3 col-start-6 m-1 flex h-9 items-center rounded bg-muted px-3 text-caption font-bold text-body">Q&amp;A thread open all week</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-wrap items-start gap-x-wide gap-y-10">
          <div className="flex min-w-0 flex-[4_1_300px] flex-col gap-5 stack:sticky stack:top-8">
            <span className="eyebrow">The student journey</span>
            <h2 className="m-0 text-h2-sm font-bold">What happens, and when.</h2>
            <p className="m-0 text-ui leading-[1.65] text-muted-foreground">Four phases, the same for every programme. Durations vary by track.</p>
          </div>
          <ol className="m-0 flex min-w-0 flex-[8_1_520px] list-none flex-col p-0">
            {JOURNEY.map((item, index) => (
              <li
                key={item.phase}
                className={`grid grid-cols-1 gap-2 py-8 stack:grid-cols-[120px_minmax(0,1fr)] stack:gap-8 ${index === 0 ? "border-t border-navy" : index === JOURNEY.length - 1 ? "border-t border-b border-border" : "border-t border-border"}`}
              >
                <span className="text-meta font-bold text-accent">{item.phase}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="m-0 text-2xl font-bold tracking-[-0.02em]">{item.title}</h3>
                  <p className="m-0 text-ui leading-[1.65] text-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-col gap-12">
          <div className="flex max-w-[720px] flex-col gap-5">
            <span className="eyebrow">Guidance</span>
            <h2 className="m-0 text-h2-sm font-bold">Who helps you — and how.</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] border-t border-navy">
            {GUIDES.map((guide, index) => (
              <div key={guide.role} className={`flex flex-col gap-4 py-8 ${index > 0 ? "border-l border-border pl-8" : "pr-8"}`}>
                <span className="text-[44px] leading-none font-bold tracking-[-0.04em] text-accent">{guide.initial}</span>
                <h3 className="m-0 text-xl font-bold tracking-[-0.015em]">{guide.role}</h3>
                <p className="m-0 text-ui leading-[1.65] text-body">{guide.body}</p>
                <div className="flex flex-col gap-1.5 border-t border-border pt-3.5 text-meta text-muted-foreground">
                  {guide.does && <span><b className="text-navy">Does:</b> {guide.does}</span>}
                  <span>{guide.extra}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-section-x py-section-y text-white">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-wide gap-y-14">
          <div className="min-w-0 flex-[6_1_440px] overflow-hidden rounded-card bg-card text-navy shadow-[0_24px_56px_-24px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between gap-3 border-b border-border px-7 py-5.5">
              <span className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent text-caption font-bold text-white">1</span>
                <span className="text-meta font-bold text-muted-foreground">Milestone 3 of 5</span>
              </span>
              <span className="flex items-center gap-2.5">
                <span className="text-meta font-semibold text-body">Due Sun, 11:59 pm</span>
                <span className="flex size-6 items-center justify-center rounded-full bg-accent text-caption font-bold text-white">2</span>
              </span>
            </div>
            <div className="flex flex-col gap-5.5 p-7">
              <h3 className="m-0 text-2xl font-bold tracking-[-0.02em]">Dashboard view</h3>
              <div className="flex gap-3">
                <span className="flex size-6 flex-none items-center justify-center rounded-full bg-accent text-caption font-bold text-white">3</span>
                <div className="flex flex-col gap-1">
                  <span className="text-caption font-bold tracking-[0.12em] text-muted-foreground uppercase">Submit</span>
                  <span className="text-ui leading-[1.55]">A deployed preview link and a pull request with a short write-up.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex size-6 flex-none items-center justify-center rounded-full bg-accent text-caption font-bold text-white">4</span>
                <div className="flex flex-1 flex-col gap-2">
                  <span className="text-caption font-bold tracking-[0.12em] text-muted-foreground uppercase">Scored on</span>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 text-sm font-semibold">
                    <span className="rounded border border-border px-2.5 py-2">Functionality · 30</span>
                    <span className="rounded border border-border px-2.5 py-2">Code · 25</span>
                    <span className="rounded border border-border px-2.5 py-2">UX · 25</span>
                    <span className="rounded border border-border px-2.5 py-2">Docs · 20</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-md bg-muted p-4">
                <span className="flex size-6 flex-none items-center justify-center rounded-full bg-accent text-caption font-bold text-white">5</span>
                <div className="flex flex-col gap-1">
                  <span className="text-caption font-bold tracking-[0.12em] text-muted-foreground uppercase">Feedback window</span>
                  <span className="text-ui leading-[1.55]">Review returned by Tuesday. Resubmit once if the minimum score isn&apos;t met.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-[5_1_360px] flex-col gap-7">
            <span className="eyebrow-on-navy">Anatomy of a milestone</span>
            <h2 className="m-0 text-h2-sm font-bold">Every milestone answers five questions.</h2>
            <ol className="m-0 flex list-none flex-col p-0">
              {MILESTONE_QUESTIONS.map((question, index, arr) => (
                <li
                  key={question}
                  className={`flex gap-4 border-t border-border-on-navy py-3.5 text-base ${index === arr.length - 1 ? "border-b" : ""}`}
                >
                  <span className="w-5 font-bold text-blue-soft">{index + 1}</span>
                  {question}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-tint-50 px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
            <div className="flex max-w-[680px] flex-col gap-5">
              <span className="eyebrow !text-accent-secondary">Evaluation</span>
              <h2 className="m-0 text-h2-sm font-bold">You see the rubric before you write a line.</h2>
            </div>
            <span className="inline-flex h-7 items-center rounded bg-card px-2.5 text-caption font-bold tracking-[0.04em] text-warning">
              EXAMPLE RUBRIC EXCERPT
            </span>
          </div>

          <div className="overflow-x-auto rounded-card border border-tint-200 bg-card">
            <table className="w-full min-w-[820px] border-collapse text-sm leading-[1.55]">
              <thead>
                <tr>
                  <th scope="col" className="w-1/5 border-b border-navy px-6 py-4.5 text-left text-caption font-bold tracking-[0.1em] text-muted-foreground uppercase" />
                  <th scope="col" className="border-b border-navy px-6 py-4.5 text-left">
                    <span className="block text-base font-bold">Developing</span>
                    <span className="text-caption font-semibold text-muted-foreground">1–4</span>
                  </th>
                  <th scope="col" className="border-b border-navy px-6 py-4.5 text-left">
                    <span className="block text-base font-bold">Proficient</span>
                    <span className="text-caption font-semibold text-muted-foreground">5–7</span>
                  </th>
                  <th scope="col" className="border-b border-navy bg-muted px-6 py-4.5 text-left">
                    <span className="block text-base font-bold">Strong</span>
                    <span className="text-caption font-semibold text-muted-foreground">8–10</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {RUBRIC_ROWS.map((row, index) => (
                  <tr key={row.criterion}>
                    <th scope="row" className={`px-6 py-5 text-left align-top ${index < RUBRIC_ROWS.length - 1 ? "border-b border-border" : ""}`}>
                      <span className="block font-bold">{row.criterion}</span>
                      <span className="text-caption text-muted-foreground">{row.weight}</span>
                    </th>
                    <td className={`px-6 py-5 align-top text-body ${index < RUBRIC_ROWS.length - 1 ? "border-b border-border" : ""}`}>{row.developing}</td>
                    <td className={`px-6 py-5 align-top text-body ${index < RUBRIC_ROWS.length - 1 ? "border-b border-border" : ""}`}>{row.proficient}</td>
                    <td className={`bg-muted px-6 py-5 align-top text-body ${index < RUBRIC_ROWS.length - 1 ? "border-b border-border" : ""}`}>{row.strong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-wrap gap-x-wide gap-y-10">
          <div className="flex min-w-0 flex-[5_1_340px] flex-col gap-5">
            <span className="eyebrow">Certificate criteria</span>
            <h2 className="m-0 text-h2-sm font-bold">A certificate means the work was done — and reviewed.</h2>
            <p className="m-0 text-ui leading-[1.65] text-muted-foreground">
              We do not issue certificates for attendance or payment alone. That is what makes them worth verifying.
            </p>
            <Link href={ROUTES.verify} className="arrow-link text-ui">
              How verification works <i>&rarr;</i>
            </Link>
          </div>
          <div className="grid min-w-0 flex-[7_1_460px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-8 gap-y-0">
            {CERT_CRITERIA.map((criterion) => (
              <div key={criterion.title} className={`flex flex-col gap-2.5 py-6 ${criterion.emphasised ? "border-t-2 border-navy" : "border-t border-border-strong"}`}>
                <span className="flex items-center gap-2 text-meta font-bold text-success">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  Required
                </span>
                <span className="text-lg font-bold">{criterion.title}</span>
                <span className="text-ui leading-[1.6] text-muted-foreground">{criterion.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-section-x py-[clamp(64px,8vw,104px)]">
        <div className="mx-auto flex max-w-content flex-wrap items-end justify-between gap-8">
          <h2 className="m-0 max-w-[680px] text-[clamp(32px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.04em]">
            See it applied to a real programme.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.internships} className="btn btn-primary btn-lg">Explore internships</Link>
            <Link href={ROUTES.studio} className="btn btn-outline btn-lg">Browse sample briefs</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
