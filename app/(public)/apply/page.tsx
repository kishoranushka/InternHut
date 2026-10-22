import type { Metadata } from "next";
import { InternshipLeadForm } from "@/components/public/apply/internship-lead-form";

export const metadata: Metadata = {
  title: "Apply for internship",
  description:
    "Register once with Graditute. We review your details and match you with a real company project that fits your course and skills.",
};

const NEXT_STEPS = [
  { title: "Registered", body: "Let us know a bit about you." },
  { title: "Reviewed", body: "Our AI matches your portfolio directly with open roles within hours." },
  { title: "Recruited", body: "Join the team and start building from day 0." },
];

const WHAT_YOU_GET = [
  "Real production level project to know how the corporate world works",
  "Direct Founders and Top Executives Mentorship",
  "Verified Credentials (Shareable proof-of-work) from the company you interned in",
];

export default function ApplyNowPage() {
  return (
    <main className="px-section-x pt-[clamp(48px,7vw,96px)] pb-section-y">
      <div className="mx-auto flex max-w-content flex-wrap items-start gap-x-wide gap-y-12">
        <aside className="flex min-w-0 flex-[4_1_320px] flex-col gap-10 nav:sticky nav:top-28">
          <div className="anim-rise flex flex-col gap-6">
            <span className="eyebrow flex items-center gap-3">
              <span className="block size-2 flex-none bg-accent" />
              Apply for internship
            </span>
            <h1 className="m-0 text-balance text-h2 font-bold">
              Start your internship journey
            </h1>
            <p className="m-0 text-lead font-medium text-body">
              Fill in one short form. We&apos;ll review your details and match
              you with a company project that fits your course and skills.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-navy pt-6">
            <span className="eyebrow-muted">What happens next</span>
            <ol className="m-0 flex list-none flex-col gap-5 p-0">
              {NEXT_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-8 flex-none items-center justify-center rounded-full bg-tint-100 text-sm font-bold text-accent-secondary">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold">{step.title}</span>
                    <span className="text-ui text-muted-foreground">{step.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-4 rounded-card bg-tint-50 p-6">
            <span className="eyebrow">What you get</span>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {WHAT_YOU_GET.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ui font-semibold text-navy">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section
          aria-label="Application form"
          className="min-w-0 flex-[8_1_560px] rounded-card border border-border bg-card p-[clamp(24px,4vw,48px)] shadow-card"
        >
          <InternshipLeadForm />
        </section>
      </div>
    </main>
  );
}
