import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const STEPS = [
  {
    number: "Step 1",
    title: "Submit an enquiry",
    body: "Tell us about your institution, the departments involved and an approximate batch size. It takes about three minutes.",
    marker: "filled",
  },
  {
    number: "Step 2",
    title: "Discuss student requirements",
    body: "A call with your placement cell or department to understand semester dates, skills focus and constraints.",
    marker: "outline",
  },
  {
    number: "Step 3",
    title: "Review partner options",
    body: "We propose partner companies, tracks, a schedule and a delivery format. You review sample briefs, rubrics and reporting.",
    marker: "outline",
  },
  {
    number: "Step 4",
    title: "Explore a partnership",
    body: "Agree scope — a pilot group or a full batch — and timelines before anything is committed.",
    marker: "final",
  },
] as const;

export function CollegesSection() {
  return (
    <section className="bg-navy px-section-x py-section-y-lg text-white">
      <div className="mx-auto flex max-w-content flex-wrap gap-x-wide gap-y-16">
        <div className="flex min-w-0 flex-[5_1_340px] flex-col gap-7">
          <span className="eyebrow-on-navy flex items-center gap-3">
            <span className="block size-2 bg-accent" />
            For colleges &amp; placement cells
          </span>
          <h2 className="m-0 text-balance text-h2 font-bold">
            Industry internships for your students, without sourcing every
            company yourself.
          </h2>
          <p className="m-0 max-w-[480px] text-body-lg leading-[1.65] text-on-navy">
            We match your batch with our partner companies, structure the work
            around your academic calendar, and give your department reporting it
            can actually use.
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <Link href={ROUTES.colleges} className="btn btn-white btn-lg">
              Start a partnership enquiry
            </Link>
            <Link href={ROUTES.colleges} className="btn btn-outline-navy btn-lg">
              How partnerships work
            </Link>
          </div>
          <p className="mt-2 mb-0 max-w-[440px] border-t border-border-on-navy pt-5 text-meta leading-[1.6] text-on-navy-muted">
            We never list an institution as a partner without its written
            agreement.
          </p>
        </div>

        <ol className="m-0 flex min-w-0 flex-[7_1_460px] list-none flex-col p-0">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-6"
            >
              <div className="flex flex-col items-center">
                {step.marker === "filled" && (
                  <span className="mt-1.5 block size-4 bg-accent" />
                )}
                {step.marker === "outline" && (
                  <span className="mt-1.5 box-border block size-4 border-[1.5px] border-blue-soft" />
                )}
                {step.marker === "final" && (
                  <span className="mt-1.5 box-border block size-4 rounded-full border-[1.5px] border-white" />
                )}
                {step.marker !== "final" && (
                  <span className="mt-2 block w-px flex-1 bg-border-on-navy" />
                )}
              </div>
              <div
                className={
                  step.marker === "final"
                    ? "flex flex-col gap-2"
                    : "flex flex-col gap-2 pb-10"
                }
              >
                <span className="text-meta font-bold text-blue-soft">
                  {step.number}
                </span>
                <span className="text-step-title font-bold">{step.title}</span>
                <span className="text-ui leading-[1.6] text-on-navy">
                  {step.body}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
