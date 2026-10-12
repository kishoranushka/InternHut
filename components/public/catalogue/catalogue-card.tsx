import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { formatRupees } from "@/lib/money";
import { INTERNSHIP_MODE_LABEL, INTERNSHIP_LEVEL_LABEL } from "@/lib/enums";
import type { PublishedInternship } from "@/lib/queries/internships";

export function CatalogueCard({ internship }: { internship: PublishedInternship }) {
  const seatsOpen = internship.seatsFilled < internship.seatsTotal;

  return (
    <Link
      href={ROUTES.internship(internship.slug)}
      className="hover-card flex flex-col gap-4.5 rounded-card border border-border bg-card p-7 text-navy no-underline"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-caption font-bold tracking-[0.14em] text-accent-secondary uppercase">
          {internship.category}
        </span>
        {seatsOpen && (
          <span className="inline-flex items-center gap-1.5 text-meta font-bold text-muted-foreground">
            <span className="block size-1.5 rounded-full bg-success" />
            Starts {formatMonth(internship.startDate)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <h2 className="m-0 text-xl font-bold tracking-[-0.02em]">{internship.title}</h2>
        <span className="flex items-center gap-2.5 text-sm font-semibold text-body">
          <span className="block size-6 flex-none rounded border-[1.5px] border-dashed border-border-strong" />
          with {internship.partnerCompany ?? "[Partner company]"}
        </span>
        <p className="m-0 text-ui text-muted-foreground">{internship.shortDescription}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-x-3.5 gap-y-1.5 border-t border-b border-border py-3.5 text-meta font-semibold text-body">
        <span>{internship.durationWeeks} weeks</span>
        <span className="text-border-strong">/</span>
        <span>{INTERNSHIP_MODE_LABEL[internship.mode]}</span>
        <span className="text-border-strong">/</span>
        <span>{INTERNSHIP_LEVEL_LABEL[internship.level]}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex flex-col gap-0.5">
          <span className="text-meta font-semibold text-muted-foreground">Programme fee</span>
          <span className="tnum text-lg font-bold">{formatRupees(internship.priceInPaise)}</span>
        </span>
        <span className="inline-flex items-center gap-2 text-ui font-bold">
          View details <span className="arrow">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

function formatMonth(date: Date | null) {
  if (!date) return "soon";
  return new Date(date).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}
