import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatRupees } from "@/lib/money";
import { ROUTES } from "@/lib/routes";
import { INTERNSHIP_MODE_LABEL, INTERNSHIP_LEVEL_LABEL } from "@/lib/enums";
import {
  parseDeliverables,
  parseWeeklyPlan,
  parseEligibility,
  parseFaqs,
} from "@/lib/validation/internship-content";
import { FaqAccordion } from "@/components/public/detail/faq-accordion";

const JUMP_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "outcomes", label: "Outcomes" },
  { id: "deliverables", label: "Deliverables" },
  { id: "structure", label: "Structure" },
  { id: "partner", label: "Partner company" },
  { id: "mentoring", label: "Mentor guidance" },
  { id: "completion", label: "Completion" },
  { id: "certificate", label: "Certificate" },
  { id: "eligibility", label: "Eligibility" },
  { id: "faqs", label: "FAQs" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const internship = await prisma.internship.findUnique({ where: { slug } });
  return {
    title: internship?.title ?? "Internship",
    description: internship?.shortDescription,
  };
}

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const internship = await prisma.internship.findUnique({ where: { slug } });
  if (!internship || internship.status !== "PUBLISHED") {
    notFound();
  }

  const partnerCompany = internship.partnerCompany ?? "[Partner company]";
  const deliverables = parseDeliverables(internship.deliverables);
  const weeklyPlan = parseWeeklyPlan(internship.weeklyPlan);
  const eligibility = parseEligibility(internship.eligibility);
  const faqs = parseFaqs(internship.faqs);
  const nextCohort = internship.startDate
    ? new Date(internship.startDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : "Rolling";
  const seatsOpen = internship.seatsFilled < internship.seatsTotal;

  return (
    <main>
      <section className="border-b border-border bg-muted px-section-x pt-[clamp(36px,5vw,64px)] pb-0">
        <div className="mx-auto flex max-w-content flex-col gap-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-meta font-semibold text-muted-foreground">
            <Link href={ROUTES.home} className="text-muted-foreground no-underline">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={ROUTES.internships} className="text-muted-foreground no-underline">Internships</Link>
            <span aria-hidden="true">/</span>
            <span className="text-navy">{internship.title}</span>
          </nav>

          <div className="flex max-w-[820px] flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-caption font-bold tracking-[0.14em] text-accent-secondary uppercase">
                {internship.category}
              </span>
              {seatsOpen && (
                <span className="inline-flex h-6 items-center gap-1.5 rounded bg-[#E8F5EE] px-2 text-caption font-bold text-success">
                  <span className="block size-1.5 rounded-full bg-success" />
                  Applications open
                </span>
              )}
            </div>
            <h1 className="m-0 text-balance text-[clamp(38px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em]">
              {internship.title}
            </h1>
            <p className="m-0 text-lead font-medium text-body">{internship.shortDescription}</p>
            <a
              href="#partner"
              className="inline-flex max-w-fit items-center gap-3 rounded-control border border-border bg-card py-2.5 pr-4 pl-2.5 text-navy no-underline"
            >
              <span className="flex size-9 items-center justify-center rounded border-[1.5px] border-dashed border-border-strong text-[8px] font-bold text-muted-icon">
                LOGO
              </span>
              <span className="flex flex-col">
                <span className="text-caption font-semibold text-muted-foreground">Internship with</span>
                <span className="text-sm font-bold">{partnerCompany}</span>
              </span>
            </a>
          </div>

          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] border-t border-navy">
            <Stat label="Duration" value={`${internship.durationWeeks} weeks`} />
            <Stat label="Mode" value={INTERNSHIP_MODE_LABEL[internship.mode]} />
            <Stat label="Weekly effort" value={internship.weeklyEffortHours ?? "—"} />
            <Stat label="Level" value={INTERNSHIP_LEVEL_LABEL[internship.level]} />
            <Stat label="Next cohort" value={nextCohort} />
            <Stat label="Fee" value={formatRupees(internship.priceInPaise)} tnum last />
          </dl>
        </div>
      </section>

      <div className="border-b border-border bg-card px-section-x">
        <nav aria-label="On this page" className="mx-auto flex max-w-content gap-7 overflow-x-auto">
          {JUMP_SECTIONS.map((section, index) => (
            <a key={section.id} href={`#${section.id}`} className="jump-link" data-current={index === 0}>
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      <section className="px-section-x py-[clamp(48px,6vw,80px)] pb-[clamp(80px,9vw,120px)]">
        <div className="mx-auto flex max-w-content flex-wrap items-start gap-x-wide gap-y-14">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-stack">
            <section id="overview" className="flex flex-col gap-5">
              <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Overview</h2>
              {internship.overview.map((paragraph, index) => (
                <p
                  key={index}
                  className={`m-0 max-w-[680px] text-ui leading-[1.7] ${index === 0 ? "" : "text-body"}`}
                >
                  {paragraph}
                </p>
              ))}
            </section>

            {internship.learningOutcomes.length > 0 && (
              <section id="outcomes" className="flex flex-col gap-6">
                <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Learning outcomes</h2>
                <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-10 border-t border-navy p-0">
                  {internship.learningOutcomes.map((outcome, index) => (
                    <li key={outcome} className="flex gap-4 border-b border-border py-4.5">
                      <span className="w-5.5 flex-none pt-0.5 text-meta font-bold text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base leading-[1.55]">{outcome}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {deliverables.length > 0 && (
              <section id="deliverables" className="flex flex-col gap-6">
                <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Project deliverables</h2>
                <div className="border-t border-navy">
                  <div className="hidden grid-cols-[minmax(0,2.4fr)_1fr_1.2fr] gap-6 border-b border-border py-3 text-caption font-bold tracking-[0.1em] text-muted-foreground uppercase stack:grid">
                    <span>Deliverable</span><span>Due</span><span>Format</span>
                  </div>
                  {deliverables.map((item) => (
                    <div
                      key={item.title}
                      className="grid grid-cols-1 gap-1 border-b border-border py-4.5 text-base stack:grid-cols-[minmax(0,2.4fr)_1fr_1.2fr] stack:gap-6"
                    >
                      <span className="font-bold">{item.title}</span>
                      <span className="text-body">{item.due}</span>
                      <span className="text-body">{item.format}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {weeklyPlan.length > 0 && (
              <section id="structure" className="flex flex-col gap-6">
                <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Programme structure</h2>
                <ol className="m-0 flex list-none flex-col p-0">
                  {weeklyPlan.map((item, index) => {
                    const isLast = index === weeklyPlan.length - 1;
                    return (
                      <li key={item.week} className="grid grid-cols-[88px_24px_minmax(0,1fr)] gap-x-4">
                        <span className="pt-0.5 text-meta font-bold text-muted-foreground">{item.week}</span>
                        <span className="flex flex-col items-center">
                          <span
                            className={
                              isLast
                                ? "mt-0.5 box-border block size-3.5 rounded-full border-[1.5px] border-navy"
                                : item.milestone
                                  ? "mt-1 box-border block size-3 border-[1.5px] border-navy"
                                  : "mt-1 block size-3 bg-navy"
                            }
                          />
                          {!isLast && <span className="block w-px flex-1 bg-border-strong" />}
                        </span>
                        <span className={`flex flex-col gap-1 ${isLast ? "" : "pb-7"}`}>
                          <span className="text-lg font-bold">{item.title}</span>
                          <span className="text-ui leading-[1.6] text-muted-foreground">{item.body}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            <section id="partner" className="flex flex-col gap-6">
              <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">About the partner company</h2>
              <div className="flex flex-wrap items-start gap-x-8 gap-y-6 rounded-card border border-border p-[clamp(20px,3vw,32px)]">
                <span className="flex size-20 flex-none items-center justify-center rounded-lg border-[1.5px] border-dashed border-border-strong text-micro font-bold tracking-[0.08em] text-muted-icon">
                  LOGO
                </span>
                <div className="flex flex-[1_1_320px] flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xl font-bold">{partnerCompany}</span>
                    <span className="text-meta font-semibold text-muted-foreground">
                      {internship.partnerIndustry ?? "[Industry]"} · {internship.partnerCity ?? "[City]"}
                    </span>
                  </div>
                  <p className="m-0 text-ui leading-[1.65] text-body">
                    {internship.partnerDescription ??
                      "[Two or three sentences about the company, its product or services, and the team interns will work alongside.]"}
                  </p>
                  <Link href={ROUTES.partners} className="arrow-link text-meta">
                    All partner companies <i>&rarr;</i>
                  </Link>
                </div>
              </div>
            </section>

            <section id="mentoring" className="flex flex-col gap-7 rounded-card bg-tint-50 p-[clamp(28px,4vw,48px)]">
              <div className="flex flex-col gap-3">
                <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Mentor guidance</h2>
                <p className="m-0 max-w-[620px] text-ui leading-[1.65] text-body">
                  Your mentor is a practitioner from the partner company. Their
                  role is to review, question and guide — not to do the work
                  for you. Our coordinators support you throughout.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-6">
                <MentorCard title="Written reviews" body="Rubric scores and specific comments on every milestone." />
                <MentorCard title="Live office hours" body="Scheduled group sessions for questions and code or work walkthroughs." />
                <MentorCard title="Q&A thread" body="Ask anytime; replies within two working days." />
              </div>
            </section>

            <section id="completion" className="flex flex-col gap-6">
              <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Completion criteria</h2>
              <p className="m-0 max-w-[640px] text-ui leading-[1.65] text-body">
                A certificate is issued only when every criterion below is
                met. You can track each one from your dashboard.
              </p>
              <ul className="m-0 flex list-none flex-col border-t border-navy p-0">
                {[
                  "Every milestone submitted and reviewed",
                  "The minimum rubric score met on each milestone",
                  "Final project review passed",
                  "Original work, in line with the academic integrity policy",
                ].map((item, index, arr) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3.5 py-4 text-base leading-[1.5] ${index < arr.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="certificate" className="flex flex-wrap items-center gap-x-12 gap-y-8">
              <div className="flex flex-[1_1_300px] flex-col gap-4.5">
                <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Certificate details</h2>
                <p className="m-0 text-ui leading-[1.65] text-body">
                  Issued digitally with a unique ID and QR code. It records:
                </p>
                <ul className="m-0 list-disc py-0 pl-4.5 text-ui leading-[1.9]">
                  <li>Your name, internship title and partner company</li>
                  <li>Duration and completion date</li>
                  <li>Skills assessed by your mentor</li>
                  <li>A public verification link</li>
                </ul>
                <Link href={ROUTES.verify} className="arrow-link text-ui">
                  How verification works <i>&rarr;</i>
                </Link>
              </div>
              <div className="relative flex-[1_1_320px] bg-muted p-6">
                <span className="absolute top-0 left-0 inline-flex h-6.5 items-center bg-warning px-2.5 text-micro font-bold tracking-[0.06em] text-white">
                  SAMPLE
                </span>
                <div className="aspect-[1.414/1] bg-card p-2.5 shadow-float">
                  <div className="flex h-full flex-col justify-between border border-navy p-4.5">
                    <div className="flex justify-between">
                      <span className="text-caption font-bold">InternSetu</span>
                      <span className="text-[9px] font-bold tracking-[0.06em] text-muted-foreground">
                        IS-{new Date().getFullYear()}-SAMPLE01
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold tracking-[0.2em] text-accent">CERTIFICATE OF COMPLETION</span>
                      <span className="text-[22px] font-bold tracking-[-0.03em]">Sample Student Name</span>
                      <span className="text-[9px] text-body">
                        {internship.title} · {internship.durationWeeks} weeks · with {partnerCompany}
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="min-w-[80px] border-t border-navy pt-1 text-[8px] text-muted-foreground">
                        Mentor signature
                      </span>
                      <span className="flex size-9 items-center justify-center border border-navy text-[6px] text-muted-foreground">QR</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {eligibility.length > 0 && (
              <section id="eligibility" className="flex flex-col gap-6">
                <h2 className="m-0 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">Eligibility</h2>
                <dl className="m-0 flex flex-col border-t border-navy">
                  {eligibility.map((item, index, arr) => (
                    <div
                      key={item.label}
                      className={`grid grid-cols-1 gap-1.5 py-4.5 stack:grid-cols-[220px_minmax(0,1fr)] stack:gap-6 ${index < arr.length - 1 ? "border-b border-border" : ""}`}
                    >
                      <dt className="text-base font-bold">{item.label}</dt>
                      <dd className="m-0 text-ui leading-[1.6] text-body">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {faqs.length > 0 && (
              <section id="faqs" className="flex flex-col gap-2">
                <h2 className="m-0 mb-2 text-[clamp(28px,2.8vw,36px)] font-bold leading-[1.15] tracking-[-0.025em]">
                  Frequently asked questions
                </h2>
                <FaqAccordion faqs={faqs} />
              </section>
            )}
          </div>

          <aside className="hidden max-w-[400px] min-w-0 flex-[1_1_340px] stack:sticky stack:top-6 stack:block">
            <div className="rounded-card border border-border shadow-card">
              <div className="flex flex-col gap-5 p-7">
                <div className="flex flex-col gap-1">
                  <span className="text-meta font-semibold text-muted-foreground">Programme fee</span>
                  <span className="tnum text-4xl font-bold tracking-[-0.03em]">{formatRupees(internship.priceInPaise)}</span>
                  <span className="text-meta text-muted-foreground">Pay only after you&apos;re matched with the partner company.</span>
                </div>
                <div className="flex flex-col gap-1.5 border-t border-border pt-4">
                  <span className="text-meta font-semibold text-muted-foreground">Next cohort</span>
                  <span className="text-base font-bold">{nextCohort} · {INTERNSHIP_MODE_LABEL[internship.mode]}</span>
                </div>
                <Link href={ROUTES.apply(internship.slug)} className="btn btn-primary btn-lg w-full">
                  Apply now
                </Link>
              </div>
              <ul className="m-0 flex list-none flex-col gap-3 border-t border-border bg-muted p-5 text-sm text-body">
                <li className="flex gap-2.5">
                  <span className="mt-1.5 block size-1.5 flex-none bg-navy" />
                  Project with {partnerCompany}
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 block size-1.5 flex-none bg-navy" />
                  Company mentor reviews on every milestone
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 block size-1.5 flex-none bg-accent" />
                  Verifiable certificate on completion
                </li>
              </ul>
            </div>
            <Link href={ROUTES.contact} className="arrow-link mt-5 text-meta">
              Questions before applying? <i>&rarr;</i>
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-navy px-section-x py-[clamp(64px,8vw,104px)] text-white">
        <div className="mx-auto flex max-w-content flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[680px] flex-col gap-4">
            <span className="eyebrow-on-navy">{nextCohort} cohort</span>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] font-bold leading-[1.06] tracking-[-0.035em]">
              Ready to build something you can show?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.apply(internship.slug)} className="btn btn-white btn-lg">
              Apply now · {formatRupees(internship.priceInPaise)}
            </Link>
            <Link href={ROUTES.internships} className="btn btn-outline-navy btn-lg">
              Compare internships
            </Link>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-card px-5 py-3 shadow-float stack:hidden">
        <span className="flex flex-col">
          <span className="text-caption font-semibold text-muted-foreground">
            {internship.durationWeeks} weeks · {INTERNSHIP_MODE_LABEL[internship.mode]}
          </span>
          <span className="tnum text-lg font-bold">{formatRupees(internship.priceInPaise)}</span>
        </span>
        <Link href={ROUTES.apply(internship.slug)} className="btn btn-primary">
          Apply now
        </Link>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  tnum,
  last,
}: {
  label: string;
  value: string;
  tnum?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1 py-5 ${last ? "pr-0" : "pr-5"} pb-6`}>
      <dt className="text-caption font-bold tracking-[0.1em] text-muted-foreground uppercase">{label}</dt>
      <dd className={`m-0 text-lg font-bold ${tnum ? "tnum" : ""}`}>{value}</dd>
    </div>
  );
}

function MentorCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-tint-200 pt-4">
      <span className="text-base font-bold">{title}</span>
      <span className="text-ui leading-[1.6] text-body">{body}</span>
    </div>
  );
}
