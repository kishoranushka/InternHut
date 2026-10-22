import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "About",
  description:
    "Graditute connects college students with partner companies for guided, project-based internships — and turns the outcome into a certificate anyone can verify.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Real companies, real work",
    body: "Every internship is with a vetted partner company and built around a project with concrete deliverables.",
    emphasised: true,
  },
  {
    number: "02",
    title: "Feedback is the product",
    body: "Written, specific mentor feedback on every milestone is the core of what students pay for.",
  },
  {
    number: "03",
    title: "Criteria in the open",
    body: "Briefs, rubrics and completion criteria are published before anyone enrols or applies.",
  },
  {
    number: "04",
    title: "Certificates that hold up",
    body: "Issued only on completion, verifiable by anyone, and revoked if they were issued in error.",
  },
  {
    number: "05",
    title: "Honest about outcomes",
    body: "We describe what a programme involves and what it records — never promised jobs, salaries or placements.",
  },
];

const WE_WILL = [
  "Tell you the company details before you start",
  "Review every submission against its rubric",
  "Keep every certificate verifiable",
  "Use your data only to run your programme",
];

const WE_WONT = [
  "Promise jobs, placements or salaries",
  "Issue certificates for payment or attendance alone",
  "List any company or institution as a partner without written agreement",
  "Sell or share student data",
];

const AUDIENCES = [
  {
    eyebrow: "For students",
    body: "Build one serious project, with someone who knows the field reviewing it.",
    cta: "Apply for internship",
    href: ROUTES.applyNow,
    variant: "white" as const,
  },
  {
    eyebrow: "For colleges",
    body: "Offer supervised, reportable internships without building the programme yourself.",
    cta: "Partner with us",
    href: ROUTES.colleges,
    variant: "outline-navy" as const,
  },
  {
    eyebrow: "For companies",
    body: "Mentor motivated students on a project you define — we handle the rest.",
    cta: "Become a partner company",
    href: ROUTES.contact,
    variant: "outline-navy" as const,
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-section-x pt-[clamp(64px,10vw,144px)] pb-[clamp(64px,8vw,112px)]">
        <svg
          width="352"
          height="352"
          viewBox="0 0 352 352"
          aria-hidden="true"
          className="absolute top-[clamp(48px,7vw,96px)] right-[clamp(20px,5vw,96px)] hidden stack:block"
        >
          <g stroke="var(--border)" fill="none">
            <path d="M0.5 0.5H351.5V351.5H0.5Z" />
            <path d="M88.5 0V352M176.5 0V352M264.5 0V352M0 88.5H352M0 176.5H352M0 264.5H352" />
          </g>
          <rect x="177" y="89" width="87" height="87" fill="var(--accent)" />
        </svg>
        <div className="relative mx-auto flex max-w-content flex-col gap-9">
          <span className="eyebrow flex items-center gap-3">
            <span className="block size-2 bg-accent" />
            About Graditute
          </span>
          <h1 className="m-0 max-w-[960px] text-balance text-[clamp(44px,6.4vw,92px)] font-bold leading-[0.98] tracking-[-0.05em]">
            A credential should describe what someone can actually do.
          </h1>
          <p className="m-0 max-w-[640px] text-[clamp(17px,1.5vw,20px)] font-medium leading-[1.6] text-body">
            Graditute connects college students with partner companies for
            guided, project-based internships — and turns the outcome into a
            certificate anyone can verify.
          </p>
        </div>
      </section>

      <section className="border-t border-border px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-wrap gap-x-wide gap-y-12">
          <div className="flex flex-[3_1_240px] flex-col gap-3">
            <span className="eyebrow">Mission</span>
            <span className="text-ui leading-[1.6] text-muted-foreground">Why the platform exists</span>
          </div>
          <div className="grid min-w-0 flex-[9_1_560px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-x-12 gap-y-8">
            <p className="col-span-full m-0 max-w-[880px] text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.35] tracking-[-0.015em]">
              Our mission is to bring students and companies together around
              real work — so students gain experience they can demonstrate,
              companies meet emerging talent, and colleges get a structured
              way to offer both.
            </p>
            <p className="m-0 text-ui leading-[1.7] text-body">
              Many students finish their studies with knowledge but little
              evidence of applied work. Companies want to offer internships
              but lack the time to structure them. Colleges struggle to
              source enough of them.
            </p>
            <p className="m-0 text-ui leading-[1.7] text-body">
              We sit between all three: we vet partner companies, match
              students to them, structure each internship around a defined
              project, and only issue a certificate when the work has been
              reviewed and completed.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
            <h2 className="m-0 text-h2 font-bold">Principles</h2>
            <p className="m-0 max-w-[440px] text-ui leading-[1.65] text-muted-foreground">
              The rules we use to make decisions about programmes, reviews and certificates.
            </p>
          </div>
          <ol className="m-0 flex list-none flex-col border-t border-navy p-0">
            {PRINCIPLES.map((principle) => (
              <li
                key={principle.number}
                className="grid grid-cols-1 items-baseline gap-x-10 gap-y-3 border-b border-border py-8 stack:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.4fr)]"
              >
                <span
                  className={`text-[56px] leading-none font-bold tracking-[-0.05em] ${principle.emphasised ? "text-accent" : "text-border-strong"}`}
                >
                  {principle.number}
                </span>
                <h3 className="m-0 text-xl font-bold tracking-[-0.015em]">{principle.title}</h3>
                <p className="m-0 text-ui leading-[1.65] text-muted-foreground">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-section-x py-section-y">
        <div className="mx-auto flex max-w-content flex-col gap-12">
          <h2 className="m-0 max-w-[720px] text-h2 font-bold">What you can hold us to</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] border-t border-navy">
            <div className="flex flex-col gap-1 py-8 pr-[clamp(0px,3vw,48px)]">
              <span className="mb-3 text-caption font-bold tracking-[0.14em] text-success uppercase">We will</span>
              {WE_WILL.map((item, index) => (
                <div key={item} className={`flex gap-3.5 py-3.5 text-ui leading-[1.5] ${index < WE_WILL.length - 1 ? "border-b border-border" : ""}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1 border-border py-8 pl-0 stack:border-l stack:pl-12">
              <span className="mb-3 text-caption font-bold tracking-[0.14em] text-error uppercase">We won&apos;t</span>
              {WE_WONT.map((item, index) => (
                <div key={item} className={`flex gap-3.5 py-3.5 text-ui leading-[1.5] ${index < WE_WONT.length - 1 ? "border-b border-border" : ""}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="mt-0.5 flex-none"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-inverse px-section-x py-section-y-lg text-white">
        <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-x-mid gap-y-12">
          {AUDIENCES.map((audience) => (
            <div key={audience.eyebrow} className="flex flex-col gap-4.5 border-t border-border-on-navy pt-6">
              <span className="eyebrow-on-navy">{audience.eyebrow}</span>
              <span className="text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.2] tracking-[-0.02em]">{audience.body}</span>
              <Link href={audience.href} className={`btn btn-${audience.variant} mt-2 self-start`}>
                {audience.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-section-x py-[clamp(56px,7vw,88px)]">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6">
          <span className="text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.015em]">
            Questions about how we work?
          </span>
          <Link href={ROUTES.contact} className="arrow-link text-lg">
            Get in touch <i>&rarr;</i>
          </Link>
        </div>
      </section>
    </main>
  );
}
