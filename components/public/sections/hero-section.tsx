import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { HeroStepsDiagram } from "./hero-steps-diagram";
import { RecognitionStrip } from "./recognition-section";

const HERO_STEPS = ["Registered", "Reviewed", "Recruited"];

/**
 * Fills exactly one screen below the 80px header, with the recognition strip
 * pinned to the bottom. Type, gaps and the diagram scale with viewport height
 * (dvh) so nothing is cut off on short laptop screens.
 */
export function HeroSection() {
  return (
    <section className="flex flex-col px-section-x pb-[clamp(20px,4dvh,40px)] nav:min-h-[calc(100dvh-80px)]">
      <div className="mx-auto flex w-full max-w-content flex-1 flex-col">
        <div className="flex flex-1 flex-wrap items-center gap-x-roomy gap-y-10 py-[clamp(40px,6dvh,72px)]">
          <div className="anim-rise flex min-w-0 flex-[7_1_520px] flex-col gap-[clamp(16px,3dvh,32px)]">
            <span className="eyebrow flex items-center gap-3">
              <span className="block size-2 flex-none bg-accent" />
              Connecting talent with opportunities
            </span>

            <h1 className="m-0 text-balance text-hero font-bold nav:text-[clamp(2.75rem,min(6.2vw,9.5dvh),5.5rem)]">
              Right Internship, Great Future
            </h1>

            <p className="m-0 max-w-[580px] text-lead font-medium text-body">
              We connect your skills to the right opportunity, where you gain
              real-world experience and build your career with companies looking
              for emerging talent.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href={ROUTES.applyNow} className="btn btn-primary btn-lg">
                Apply for internship
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <ol className="m-0 flex list-none flex-wrap gap-x-7 gap-y-3 p-0 text-sm font-semibold text-body">
              {HERO_STEPS.map((step, index) => (
                <li key={step} className="inline-flex items-center gap-2">
                  <span className="text-accent">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex min-w-0 flex-[5_1_360px] justify-center nav:justify-end">
            <div className="w-full max-w-[480px] nav:max-w-[min(480px,46dvh)]">
              <HeroStepsDiagram />
            </div>
          </div>
        </div>

        <RecognitionStrip />
      </div>
    </section>
  );
}
