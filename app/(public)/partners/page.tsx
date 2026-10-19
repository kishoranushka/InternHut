import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PARTNERS_PAGE_ENABLED, ROUTES } from "@/lib/routes";
import { PartnersExplorer } from "@/components/public/partners/partners-explorer";

export const metadata: Metadata = {
  title: "Partner companies",
  description:
    "Each internship is set and mentored by one of our partner companies. We vet every partner, structure the work, and make the outcome verifiable.",
};

const CRITERIA = [
  { number: "01", title: "A real project", body: "Briefs come from the company's actual work, not textbook exercises." },
  { number: "02", title: "A committed mentor", body: "A named practitioner reviews every milestone on time." },
  { number: "03", title: "Our standards", body: "Published rubrics, fair assessment and respect for students' time." },
];

export default function PartnersPage() {
  if (!PARTNERS_PAGE_ENABLED) notFound();

  return (
    <main>
      <section className="px-section-x pt-[clamp(48px,7vw,104px)] pb-0">
        <div className="mx-auto flex max-w-content flex-col gap-10">
          <div className="flex flex-wrap items-end gap-x-wide gap-y-6">
            <div className="flex min-w-0 flex-[7_1_520px] flex-col gap-6">
              <span className="eyebrow flex items-center gap-3">
                <span className="block size-2 bg-accent" />
                Partner companies
              </span>
              <h1 className="m-0 text-balance text-[clamp(40px,5.4vw,72px)] font-bold leading-[1] tracking-[-0.045em]">
                The companies behind every internship.
              </h1>
            </div>
            <div className="flex min-w-0 flex-[5_1_340px] flex-col gap-4">
              <p className="m-0 text-ui leading-[1.65] text-body">
                Each internship is set and mentored by one of our partner
                companies. We vet every partner, structure the work, and
                make the outcome verifiable.
              </p>
              <span className="text-meta font-semibold text-muted-foreground">
                Companies are listed only with their written agreement.
              </span>
            </div>
          </div>

          <PartnersExplorer />
        </div>
      </section>

      <section className="border-t border-border bg-muted px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-wrap gap-x-wide gap-y-10">
          <div className="flex flex-[4_1_300px] flex-col gap-4">
            <span className="eyebrow">How we choose partners</span>
            <h2 className="m-0 text-[clamp(30px,3.4vw,44px)] font-bold leading-[1.08] tracking-[-0.035em]">
              Every partner meets the same bar.
            </h2>
          </div>
          <ol className="m-0 grid min-w-0 flex-[8_1_520px] list-none grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-x-8 gap-y-0 p-0">
            {CRITERIA.map((criterion, index) => (
              <li
                key={criterion.number}
                className={`flex flex-col gap-2 py-5.5 ${index === 0 ? "border-t-2 border-navy" : "border-t border-border-strong"}`}
              >
                <span className="text-meta font-bold text-accent">{criterion.number}</span>
                <span className="text-lg font-bold">{criterion.title}</span>
                <span className="text-ui leading-[1.6] text-muted-foreground">{criterion.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-inverse px-section-x py-section-y text-white">
        <div className="mx-auto flex max-w-content flex-wrap items-end justify-between gap-x-wide gap-y-10">
          <div className="flex max-w-[720px] flex-col gap-5">
            <span className="eyebrow-on-navy flex items-center gap-3">
              <span className="block size-2 bg-accent" />
              For companies
            </span>
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.04em]">
              Work with motivated students on a project you define.
            </h2>
            <p className="m-0 text-ui leading-[1.65] text-on-navy">
              We bring the students, the structure and the paperwork. You bring the brief and a mentor.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.contact} className="btn btn-white btn-lg">Become a partner company</Link>
            <Link href={ROUTES.learning} className="btn btn-outline-navy btn-lg">How internships run</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
