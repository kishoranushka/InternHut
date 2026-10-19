import Link from "next/link";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/routes";
import {
  BROWSE_BY_FIELD,
  BEFORE_YOU_APPLY,
  type StartingSoonItem,
} from "./nav-data";
import { MegaPanel, MegaColumn } from "./mega-panel";

export function MegaInternships({
  startingSoon,
}: {
  startingSoon: StartingSoonItem[];
}) {
  return (
    <MegaPanel className="grid-cols-[3fr_4fr_3fr_4fr]">
      <MegaColumn heading="Browse by field">
        {BROWSE_BY_FIELD.map((field) => (
          <Link key={field.label} href={field.href} className="mega-link">
            <span className="text-ui font-bold">{field.label}</span>
            <span className="text-meta text-muted-foreground">{field.blurb}</span>
          </Link>
        ))}
      </MegaColumn>

      <div className="flex flex-col">
        <span className="eyebrow-muted mb-4">Starting soon</span>
        {startingSoon.map((item, index) => (
          <Link
            key={item.slug}
            href={ROUTES.internship(item.slug)}
            className={cn(
              "hover-row flex items-center justify-between gap-4 border-t border-border py-4 text-navy no-underline",
              index === startingSoon.length - 1 && "border-b",
            )}
          >
            <span className="flex flex-col gap-1">
              <span className="text-ui font-bold">{item.title}</span>
              <span className="text-meta text-muted-foreground">{item.meta}</span>
            </span>
            <span className="arrow">&rarr;</span>
          </Link>
        ))}
      </div>

      <MegaColumn heading="Before you apply">
        {BEFORE_YOU_APPLY.map((link) => (
          <Link key={link.label} href={link.href} className="mega-link">
            <span className="text-ui font-bold">{link.label}</span>
          </Link>
        ))}
      </MegaColumn>

      <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-card bg-inverse p-8 text-white">
        <svg
          width="132"
          height="132"
          viewBox="0 0 132 132"
          className="absolute -top-px -right-px"
          aria-hidden="true"
        >
          <g stroke="var(--border-on-navy)" fill="none">
            <path d="M0.5 0.5H131.5V131.5H0.5Z" />
            <path d="M44.5 0V132M88.5 0V132M0 44.5H132M0 88.5H132" />
          </g>
          <rect x="89" y="1" width="42" height="43" fill="var(--accent)" />
        </svg>
        <span className="eyebrow-on-navy">All programmes</span>
        <span className="max-w-[260px] text-heading-sm font-bold tracking-[-0.02em]">
          Compare every open internship by field, duration and fee.
        </span>
        <Link
          href={ROUTES.internships}
          className="btn btn-white btn-sm self-start"
        >
          Browse internships
        </Link>
      </div>
    </MegaPanel>
  );
}
