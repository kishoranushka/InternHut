import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { COLLEGE_PARTNERSHIP_LINKS, COLLEGE_EVALUATE_LINKS } from "./nav-data";
import { MegaPanel, MegaColumn } from "./mega-panel";

export function MegaColleges() {
  return (
    <MegaPanel className="grid-cols-[4fr_3fr_3fr_4fr]">
      <div className="flex flex-col gap-4 border-r border-border pr-6">
        <span className="eyebrow">For colleges &amp; placement cells</span>
        <span className="text-heading-sm font-bold tracking-[-0.02em]">
          Industry internships for your whole batch, with our partner companies.
        </span>
        <Link href={ROUTES.colleges} className="arrow-link text-ui">
          Partnership overview <i>&rarr;</i>
        </Link>
      </div>

      <MegaColumn heading="Partnership">
        {COLLEGE_PARTNERSHIP_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="mega-link">
            <span className="text-ui font-bold">{link.label}</span>
          </Link>
        ))}
      </MegaColumn>

      <MegaColumn heading="Evaluate">
        {COLLEGE_EVALUATE_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="mega-link">
            <span className="text-ui font-bold">{link.label}</span>
          </Link>
        ))}
      </MegaColumn>

      <div className="flex flex-col justify-between gap-6 rounded-card bg-tint-50 p-8">
        <div className="flex flex-col gap-2.5">
          <span className="text-lg font-bold tracking-[-0.01em]">
            Start a partnership enquiry
          </span>
          <span className="text-sm leading-[1.55] text-body">
            Tell us about your institution. A short form — no commitment.
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={ROUTES.colleges} className="btn btn-navy btn-sm">
            Enquire now
          </Link>
          <Link href={ROUTES.contact} className="btn btn-ghost-navy btn-sm">
            Talk to us
          </Link>
        </div>
      </div>
    </MegaPanel>
  );
}
