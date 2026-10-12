import Link from "next/link";
import { cn } from "@/lib/cn";
import { ROUTES, INTERNSHIP_CATEGORIES, categoryHref } from "@/lib/routes";
import { formatRupees } from "@/lib/money";
import { INTERNSHIP_MODE_LABEL } from "@/lib/enums";
import type { PublishedInternship } from "@/lib/queries/internships";
import { FeaturedInternshipCard } from "./featured-internship-card";

export function ExploreSection({
  internships,
}: {
  internships: PublishedInternship[];
}) {
  const [featured, ...rest] = internships;
  const rows = rest.slice(0, 4);

  return (
    <section className="px-section-x py-section-y">
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-navy pb-7">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Explore opportunities</span>
            <h2 className="m-0 text-h2 font-bold">
              Internships open with our partners
            </h2>
          </div>
          <Link href={ROUTES.internships} className="arrow-link text-base">
            Browse all internships <i>&rarr;</i>
          </Link>
        </div>

        {internships.length === 0 ? (
          <p className="mt-10 text-body-lg text-muted-foreground">
            New internships are being finalised with our partner companies.{" "}
            <Link href={ROUTES.contact} className="font-semibold">
              Ask to be notified
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 flex flex-wrap gap-x-mid gap-y-0">
            {featured && <FeaturedInternshipCard internship={featured} />}

            <div className="flex min-w-0 flex-[7_1_480px] flex-col">
              {rows.map((internship, index) => (
                <Link
                  key={internship.id}
                  href={ROUTES.internship(internship.slug)}
                  className={cn(
                    "hover-row flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-2 py-[26px] text-navy no-underline",
                    index === rows.length - 1 && "border-b",
                  )}
                >
                  <span className="flex flex-[1_1_260px] flex-col gap-1.5">
                    <span className="text-caption font-bold uppercase tracking-[0.12em] text-accent">
                      {internship.category}
                    </span>
                    <span className="text-xl font-bold tracking-[-0.015em]">
                      {internship.title}
                    </span>
                    <span className="text-meta font-semibold text-muted-foreground">
                      with {internship.partnerCompany ?? "[Partner company]"}
                    </span>
                  </span>
                  <span className="flex-[0_0_160px] text-sm font-semibold text-body">
                    {internship.durationWeeks} weeks ·{" "}
                    {INTERNSHIP_MODE_LABEL[internship.mode]}
                  </span>
                  <span className="tnum flex-[0_0_80px] text-base font-bold">
                    {formatRupees(internship.priceInPaise)}
                  </span>
                  <span className="arrow text-xl">&rarr;</span>
                </Link>
              ))}

              <div className="mt-7 flex flex-wrap gap-2">
                {INTERNSHIP_CATEGORIES.map((category) => (
                  <Link
                    key={category.label}
                    href={categoryHref(category.label)}
                    className="chip"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
