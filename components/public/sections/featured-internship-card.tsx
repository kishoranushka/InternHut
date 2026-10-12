import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { formatRupees } from "@/lib/money";
import { INTERNSHIP_MODE_LABEL } from "@/lib/enums";
import type { PublishedInternship } from "@/lib/queries/internships";

function FacetCell({
  label,
  value,
  divided,
}: {
  label: string;
  value: string;
  divided?: boolean;
}) {
  return (
    <div
      className={
        divided
          ? "flex flex-col gap-0.5 border-l border-border py-3.5 pl-4"
          : "flex flex-col gap-0.5 py-3.5"
      }
    >
      <dt className="text-caption font-semibold text-muted-foreground">{label}</dt>
      <dd className="tnum m-0 text-ui font-bold">{value}</dd>
    </div>
  );
}

export function FeaturedInternshipCard({
  internship,
}: {
  internship: PublishedInternship;
}) {
  const seatsOpen = internship.seatsFilled < internship.seatsTotal;

  return (
    <Link
      href={ROUTES.internship(internship.slug)}
      className="hover-card mb-8 flex min-w-0 flex-[5_1_380px] flex-col overflow-hidden rounded-card border border-border text-navy no-underline"
    >
      <div className="flex min-h-[168px] items-start justify-between gap-4 bg-tint-50 p-7">
        <div className="flex flex-col gap-2.5">
          <span className="text-caption font-bold uppercase tracking-[0.14em] text-accent-secondary">
            {internship.category}
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 self-start rounded bg-white px-2 text-caption font-bold text-success">
            <span className="block size-1.5 rounded-full bg-success" />
            {seatsOpen ? "Applications open" : "Waitlist open"}
          </span>
        </div>
        <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
          <g stroke="var(--tint-200)" fill="none">
            <path d="M0.5 0.5H111.5V111.5H0.5Z" />
            <path d="M28.5 0V112M56.5 0V112M84.5 0V112M0 28.5H112M0 56.5H112M0 84.5H112" />
          </g>
          <rect x="57" y="29" width="27" height="27" fill="var(--accent)" />
          <rect x="85" y="1" width="26" height="27" fill="var(--navy)" />
        </svg>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-7">
        <h3 className="m-0 text-feature font-bold">{internship.title}</h3>

        <span className="flex items-center gap-2.5 text-sm font-semibold text-body">
          <span className="block size-7 flex-none rounded border-[1.5px] border-dashed border-border-strong" />
          with {internship.partnerCompany ?? "[Partner company]"}
        </span>

        <p className="m-0 text-ui text-muted-foreground">
          {internship.shortDescription}
        </p>

        <dl className="mt-2 mb-0 grid grid-cols-3 border-t border-b border-border">
          <FacetCell label="Duration" value={`${internship.durationWeeks} weeks`} />
          <FacetCell
            label="Mode"
            value={INTERNSHIP_MODE_LABEL[internship.mode]}
            divided
          />
          <FacetCell
            label="Fee"
            value={formatRupees(internship.priceInPaise)}
            divided
          />
        </dl>

        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-ui font-bold">
          View details <span className="arrow">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
