import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStudentSession } from "@/lib/dal";
import { ROUTES, categoryHref, INTERNSHIP_CATEGORIES, PARTNERS_PAGE_ENABLED } from "@/lib/routes";
import { EnquiryForm } from "@/components/public/colleges/enquiry-form";

export const metadata: Metadata = {
  title: "For Colleges",
  description:
    "Industry internships for your whole batch, organised end to end — matched with our partner companies, reported against your academic calendar.",
};

const AUDIENCES = [
  { eyebrow: "For placement cells", body: "Supervised project experience for students before placement season." },
  { eyebrow: "For departments", body: "Tracks aligned to your curriculum, with rubric-based assessment." },
  { eyebrow: "For students", body: "A real brief, weekly feedback and a certificate they can defend." },
];

const BENEFITS = [
  { number: "01", title: "Access to partner companies", body: "Students intern on real briefs from vetted companies — without your team sourcing and supervising each placement." },
  { number: "02", title: "Structure and calendar fit", body: "Defined briefs and milestone reviews, scheduled around semesters, examinations and vacations — agreed with you up front." },
  { number: "03", title: "Progress reporting", body: "Milestone completion and rubric scores per student, shared with your coordinator and exportable." },
  { number: "04", title: "Verifiable outcomes", body: "Each certificate can be independently verified — useful for accreditation and audit files." },
  { number: "05", title: "One point of contact", body: "A named coordinator for your institution, from first call to final report." },
];

const FORMATS = [
  { label: "Format A", title: "Semester-integrated", tint: false },
  { label: "Format B", title: "Vacation cohort", tint: true },
  { label: "Format C", title: "Department track", tint: false },
];

const FORMAT_ROWS = [
  { label: "Timing", values: ["Runs alongside classes", "Summer or winter break", "Scheduled with the department"] },
  { label: "Duration", values: ["10–12 weeks, lighter weekly load", "6–8 weeks, focused", "Flexible, per track"] },
  { label: "Mode", values: ["Remote or hybrid", "Remote", "Hybrid or on-campus"] },
  { label: "Tracks", values: ["Any from the catalogue", "Any from the catalogue", "One track, adapted to the curriculum"] },
  { label: "Best for", values: ["Credit-linked internships", "Pre-placement preparation", "A single department's batch"] },
];

const BATCH_REPORT_ROWS = [
  { track: "Frontend development", complete: 3, total: 5 },
  { track: "Data analytics", complete: 2, total: 5 },
  { track: "UI/UX design", complete: 4, total: 5 },
];

const PROCESS_STEPS = [
  { number: "01", title: "Enquiry", body: "You submit the short form below. We reply within a few working days.", marker: "filled" as const },
  { number: "02", title: "Requirements call", body: "We discuss departments, calendar, skills focus and constraints.", marker: "outline" as const },
  { number: "03", title: "Partner proposal", body: "Matched partner companies, tracks, schedule and fees in writing, with sample briefs.", marker: "outline" as const },
  { number: "04", title: "Confirmation", body: "Agree a pilot group or full batch and sign the partnership terms.", marker: "outline" as const },
  { number: "05", title: "Delivery & reporting", body: "Onboarding, weekly reviews, progress reports and certificates.", marker: "final" as const },
];

export default async function CollegesPage() {
  // This page is for institutions; logged-in students go to their dashboard.
  if (await getStudentSession()) redirect(ROUTES.dashboard);

  return (
    <main>
      <section className="px-section-x pt-[clamp(56px,8vw,112px)] pb-0">
        <div className="mx-auto max-w-content">
          <div className="flex flex-wrap items-end gap-x-wide gap-y-8 pb-[clamp(56px,7vw,96px)]">
            <div className="flex min-w-0 flex-[8_1_560px] flex-col gap-7">
              <span className="eyebrow flex items-center gap-3">
                <span className="block size-2 bg-accent" />
                For colleges &amp; placement cells
              </span>
              <h1 className="m-0 text-balance text-[clamp(42px,5.8vw,80px)] font-bold leading-[1] tracking-[-0.045em]">
                Industry internships for your whole batch, organised end to end.
              </h1>
            </div>
            <div className="flex min-w-0 flex-[4_1_320px] flex-col gap-6">
              <p className="m-0 text-lg leading-[1.6] font-medium text-body">
                We match your students with our partner companies for
                project-based, mentor-reviewed internships that fit your
                academic calendar — with progress reporting your department
                can use and certificates employers can verify.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#enquiry" className="btn btn-navy btn-lg">Start a partnership enquiry</a>
                <a href="#process" className="btn btn-outline btn-lg">See the process</a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] border-t border-navy">
            {AUDIENCES.map((audience, index) => (
              <div
                key={audience.eyebrow}
                className={`flex flex-col gap-2.5 py-7 pr-8 pb-10 ${index > 0 ? "border-l border-border pl-8" : ""}`}
              >
                <span className="text-meta font-bold text-accent">{audience.eyebrow}</span>
                <span className="text-lg leading-[1.35] font-bold tracking-[-0.01em]">{audience.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-wrap gap-x-wide gap-y-10">
          <div className="flex flex-[4_1_300px] flex-col gap-5">
            <span className="eyebrow">Institutional benefits</span>
            <h2 className="m-0 text-h2-sm font-bold">What a partnership gives your institution</h2>
          </div>
          <dl className="m-0 flex min-w-0 flex-[8_1_520px] flex-col border-t border-navy">
            {BENEFITS.map((benefit, index, arr) => (
              <div
                key={benefit.number}
                className={`grid grid-cols-1 gap-2 py-6.5 stack:grid-cols-[56px_240px_minmax(0,1fr)] stack:gap-6 ${index < arr.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="pt-0.5 text-meta font-bold text-accent">{benefit.number}</span>
                <dt className="text-lg font-bold">{benefit.title}</dt>
                <dd className="m-0 text-ui leading-[1.6] text-body">{benefit.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
            <div className="flex max-w-[680px] flex-col gap-5">
              <span className="eyebrow">Delivery approach</span>
              <h2 className="m-0 text-h2-sm font-bold">Three batch formats. One standard of review.</h2>
            </div>
            <p className="m-0 max-w-[420px] text-ui leading-[1.65] text-muted-foreground">
              Formats are a starting point. We adapt timing and track mix to your institution after the requirements call.
            </p>
          </div>

          <div className="overflow-x-auto border-t border-navy">
            <table className="w-full min-w-[760px] border-collapse text-base">
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] border-b border-border py-5 pr-6 text-left" />
                  {FORMATS.map((format) => (
                    <th
                      key={format.label}
                      scope="col"
                      className={`border-b border-border px-6 py-5 text-left align-bottom ${format.tint ? "bg-tint-50" : ""}`}
                    >
                      <span className="mb-1.5 block text-meta font-bold text-accent-secondary">{format.label}</span>
                      <span className="text-xl font-bold tracking-[-0.015em]">{format.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FORMAT_ROWS.map((row, rowIndex) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className={`py-4.5 pr-6 text-left font-bold ${rowIndex < FORMAT_ROWS.length - 1 ? "border-b border-border" : ""}`}
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-6 py-4.5 text-body ${rowIndex < FORMAT_ROWS.length - 1 ? "border-b border-border" : ""} ${FORMATS[colIndex].tint ? "bg-tint-50" : ""}`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-tint-50 px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-wide gap-y-14">
          <div className="flex min-w-0 flex-[5_1_340px] flex-col gap-6">
            <span className="eyebrow !text-accent-secondary">Batch-based programmes</span>
            <h2 className="m-0 text-h2-sm font-bold">Your students, one cohort, visible progress.</h2>
            <p className="m-0 text-ui leading-[1.65] text-body">
              Batches run as dedicated cohorts across one or more partner
              companies. Your coordinator sees each student&apos;s company,
              milestone status and scores, and receives a summary report at
              the end.
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERNSHIP_CATEGORIES.map((category) => (
                <Link key={category.label} href={categoryHref(category.label)} className="chip">
                  {category.label}
                </Link>
              ))}
            </div>
            {PARTNERS_PAGE_ENABLED && (
              <Link href={ROUTES.partners} className="arrow-link text-ui">
                See our partner companies <i>&rarr;</i>
              </Link>
            )}
          </div>

          <div className="min-w-0 flex-[7_1_480px] overflow-hidden rounded-card border border-tint-200 bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4.5">
              <span className="text-lg font-bold">Batch progress report</span>
              <span className="inline-flex h-6.5 items-center rounded bg-warning-tint px-2.5 text-caption font-bold tracking-[0.04em] text-warning">
                SAMPLE REPORT
              </span>
            </div>
            <div className="overflow-x-auto px-6 pt-2 pb-5">
              <table className="w-full min-w-[440px] border-collapse text-sm">
                <thead>
                  <tr className="text-caption font-bold tracking-[0.08em] text-muted-foreground uppercase">
                    <th scope="col" className="border-b border-border py-3 text-left">Track</th>
                    <th scope="col" className="border-b border-border py-3 text-left">Students</th>
                    <th scope="col" className="w-2/5 border-b border-border py-3 text-left">Milestones complete</th>
                  </tr>
                </thead>
                <tbody>
                  {BATCH_REPORT_ROWS.map((row, index) => (
                    <tr key={row.track}>
                      <td className={`py-3.5 font-bold ${index < BATCH_REPORT_ROWS.length - 1 ? "border-b border-border" : ""}`}>{row.track}</td>
                      <td className={`tnum py-3.5 ${index < BATCH_REPORT_ROWS.length - 1 ? "border-b border-border" : ""}`}>[n]</td>
                      <td className={`py-3.5 ${index < BATCH_REPORT_ROWS.length - 1 ? "border-b border-border" : ""}`}>
                        <span className="flex items-center gap-2.5">
                          <span
                            className="block h-1.5 flex-1"
                            style={{ background: `linear-gradient(90deg, var(--navy) ${(row.complete / row.total) * 100}%, var(--border) ${(row.complete / row.total) * 100}%)` }}
                          />
                          <span className="w-10 text-meta text-body">{row.complete} / {row.total}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border bg-muted px-6 py-4 text-meta text-muted-foreground">
              <span>Per-student scores</span><span>·</span><span>CSV export</span><span>·</span><span>End-of-batch summary</span>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-inverse px-section-x py-section-y text-white">
        <div className="mx-auto flex max-w-content flex-col gap-stack">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
            <div className="flex max-w-[680px] flex-col gap-5">
              <span className="eyebrow-on-navy">Implementation process</span>
              <h2 className="m-0 text-h2-sm font-bold">From enquiry to a running batch, in five steps.</h2>
            </div>
            <p className="m-0 max-w-[400px] text-ui leading-[1.65] text-on-navy">
              Nothing is committed until step four. You can stop at any point before then.
            </p>
          </div>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-y-10 gap-x-0 p-0">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.number} className={`flex flex-col gap-3.5 ${index < PROCESS_STEPS.length - 1 ? "pr-6" : ""}`}>
                <div className="flex items-center">
                  {step.marker === "filled" && <span className="block size-4 flex-none bg-accent" />}
                  {step.marker === "outline" && <span className="box-border block size-4 flex-none border-[1.5px] border-blue-soft" />}
                  {step.marker === "final" && <span className="box-border block size-4 flex-none rounded-full border-[1.5px] border-white" />}
                  {step.marker !== "final" && <span className="block h-px flex-1 bg-border-on-navy" />}
                </div>
                <span className={`text-[44px] leading-none font-bold tracking-[-0.04em] ${index === 0 ? "text-blue-soft" : "text-border-on-navy"}`}>
                  {step.number}
                </span>
                <span className="text-lg font-bold">{step.title}</span>
                <span className="text-ui leading-[1.6] text-on-navy">{step.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquiry" className="px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-wrap items-start gap-x-wide gap-y-14">
          <div className="flex min-w-0 flex-[4_1_300px] flex-col gap-6">
            <span className="eyebrow">Partnership enquiry</span>
            <h2 className="m-0 text-h2-sm font-bold">Tell us about your institution.</h2>
            <p className="m-0 text-ui leading-[1.65] text-muted-foreground">
              About three minutes. No commitment — this only starts a conversation.
            </p>
            <div className="mt-2 flex flex-col border-t border-navy">
              <span className="py-4 pb-1 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
                What happens next
              </span>
              {[
                "We acknowledge your enquiry by email.",
                "A coordinator schedules a requirements call.",
                "You receive a written programme proposal.",
              ].map((step, index) => (
                <div key={step} className="flex gap-3.5 py-3 text-ui leading-[1.5]">
                  <span className="w-5 flex-none text-meta font-bold text-accent">{index + 1}</span>
                  {step}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 rounded-card bg-muted p-5 text-sm text-body">
              <span className="font-bold text-navy">Prefer to talk first?</span>
              <span>[partnerships email] · [phone]</span>
            </div>
          </div>

          <div className="min-w-0 flex-[8_1_520px] rounded-card border border-border bg-card p-[clamp(24px,4vw,48px)] shadow-card">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
