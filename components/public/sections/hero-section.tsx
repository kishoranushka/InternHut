import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { HeroStepsDiagram } from "./hero-steps-diagram";

const HERO_PROOF_POINTS = [
  { label: "Vetted partner companies", accent: false },
  { label: "Mentor-reviewed milestones", accent: false },
  { label: "Verifiable certificates", accent: true },
];

export function HeroSection() {
  return (
    <section className="px-section-x pt-hero-top pb-section-y">
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-roomy">
        <div className="anim-rise flex min-w-0 flex-[7_1_520px] flex-col gap-8">
          <span className="eyebrow flex items-center gap-3">
            <span className="block size-2 flex-none bg-accent" />
            Internships with partner companies · Made for India
          </span>

          <h1 className="m-0 text-balance text-hero font-bold">
            Intern with real companies. Leave with proof of real work.
          </h1>

          <p className="m-0 max-w-[580px] text-lead font-medium text-body">
            We connect college students with our partner companies for guided,
            project-based internships — with weekly milestones, mentor feedback
            and a certificate anyone can verify.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.internships} className="btn btn-primary btn-lg">
              Explore internships
            </Link>
            <Link href={ROUTES.colleges} className="btn btn-outline btn-lg">
              Partner with us
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-7 text-sm font-semibold text-body">
            {HERO_PROOF_POINTS.map((point) => (
              <span key={point.label} className="inline-flex items-center gap-2">
                <span
                  className={
                    point.accent
                      ? "block size-1.5 bg-accent"
                      : "block size-1.5 bg-navy"
                  }
                />
                {point.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-[5_1_360px] justify-center">
          <HeroStepsDiagram />
        </div>
      </div>
    </section>
  );
}
