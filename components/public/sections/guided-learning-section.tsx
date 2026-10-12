import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { MilestonePlanCard } from "./milestone-plan-card";

const FEATURES = [
  {
    term: "Milestones",
    detail: "The project is split into weekly, reviewable pieces of work.",
  },
  {
    term: "Mentor feedback",
    detail:
      "Written comments and rubric scores from a mentor at the partner company.",
  },
  {
    term: "Project reviews",
    detail: "A final review of the complete project against the brief.",
  },
  {
    term: "Completion requirements",
    detail: "Published up front, so you know exactly what earns the certificate.",
  },
];

export function GuidedLearningSection() {
  return (
    <section className="bg-tint-50 px-section-x py-section-y-lg">
      <div className="mx-auto flex max-w-content flex-wrap-reverse items-center gap-x-wide gap-y-14">
        <MilestonePlanCard />

        <div className="flex min-w-0 flex-[5_1_340px] flex-col gap-7">
          <span className="eyebrow !text-accent-secondary">Guided learning</span>
          <h2 className="m-0 text-h2-sm font-bold">
            Guidance at every milestone, not only at the end.
          </h2>

          <dl className="m-0 flex flex-col">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.term}
                className={
                  index === FEATURES.length - 1
                    ? "flex flex-col gap-1.5 border-t border-b border-tint-200 py-[18px]"
                    : "flex flex-col gap-1.5 border-t border-tint-200 py-[18px]"
                }
              >
                <dt className="text-base font-bold">{feature.term}</dt>
                <dd className="m-0 text-ui leading-[1.6] text-body">
                  {feature.detail}
                </dd>
              </div>
            ))}
          </dl>

          <Link href={ROUTES.learning} className="arrow-link text-ui">
            See the learning experience <i>&rarr;</i>
          </Link>
        </div>
      </div>
    </section>
  );
}
