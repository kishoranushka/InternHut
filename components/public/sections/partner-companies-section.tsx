import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const PLACEHOLDER_TILES = [1, 2, 3, 4, 5, 6, 7];

export function PartnerCompaniesSection() {
  return (
    <section className="px-section-x pb-[clamp(72px,9vw,120px)]">
      <div className="mx-auto flex max-w-content flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 border-t border-navy pt-8">
          <div className="flex max-w-[640px] flex-col gap-2.5">
            <span className="eyebrow">Our partner companies</span>
            <span className="text-kicker font-bold">
              Internships are offered with companies across software, data,
              design and business.
            </span>
          </div>
          <Link href={ROUTES.partners} className="arrow-link text-ui">
            See all partner companies <i>&rarr;</i>
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(180px,100%),1fr))] border-t border-l border-border">
          {PLACEHOLDER_TILES.map((tile) => (
            <Link
              key={tile}
              href={ROUTES.partners}
              className="hover-row flex h-28 flex-col items-center justify-center gap-2 border-r border-b border-border no-underline"
              aria-label={`Partner company placeholder ${tile}`}
            >
              <span className="flex h-8 w-24 items-center justify-center rounded border-[1.5px] border-dashed border-border-strong text-micro font-bold tracking-[0.08em] text-muted-icon">
                LOGO
              </span>
              <span className="text-caption font-semibold text-muted-foreground">
                [Partner company]
              </span>
            </Link>
          ))}

          <Link
            href={ROUTES.contact}
            className="flex h-28 flex-col justify-center gap-1.5 border-r border-b border-border bg-tint-50 px-5 text-navy no-underline"
          >
            <span className="text-sm font-bold">Hiring interns?</span>
            <span className="text-meta font-semibold text-accent-secondary">
              Become a partner &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
