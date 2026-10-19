import Link from "next/link";
import { ROUTES } from "@/lib/routes";

/** `showColleges` is false for logged-in students, who never see college pages. */
export function ClosingSection({ showColleges = true }: { showColleges?: boolean }) {
  return (
    <section className="border-t border-border px-section-x pt-[clamp(72px,9vw,120px)] pb-section-y-lg">
      <div className="mx-auto max-w-content">
        <h2 className="mt-0 mb-block max-w-[920px] text-balance text-closing font-bold">
          Start with one project. Finish with proof.
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] border-t border-navy">
          <div className="flex flex-col gap-4 border-b border-border py-10 pr-[clamp(0px,3vw,48px)] pl-0">
            <span className="eyebrow">Students</span>
            <span className="max-w-[440px] text-panel font-bold">
              Find an internship with a partner company that fits your semester
              and your goals.
            </span>
            <Link
              href={ROUTES.internships}
              className="btn btn-primary btn-lg mt-2 self-start"
            >
              Explore internships
            </Link>
          </div>

          {showColleges && (
          <div className="flex flex-col gap-4 border-b border-l border-border py-10 pl-[clamp(20px,3vw,48px)]">
            <span className="eyebrow">Colleges</span>
            <span className="max-w-[440px] text-panel font-bold">
              Plan a structured internship programme for your next batch.
            </span>
            <Link
              href={ROUTES.colleges}
              className="btn btn-navy btn-lg mt-2 self-start"
            >
              Start a partnership enquiry
            </Link>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
