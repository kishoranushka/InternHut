"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { PARTNER_INDUSTRIES, PARTNER_PROFILES } from "./partners-data";

export function PartnersExplorer() {
  const [industry, setIndustry] = useState<string>("All");

  const tabs = ["All", ...PARTNER_INDUSTRIES];
  const partners = PARTNER_PROFILES.filter((p) => industry === "All" || p.industry === industry);

  return (
    <>
      <div role="tablist" aria-label="Industries" className="flex gap-8 overflow-x-auto border-b border-border">
        {tabs.map((label) => {
          const count = label === "All" ? PARTNER_PROFILES.length : PARTNER_PROFILES.filter((p) => p.industry === label).length;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={industry === label}
              className="tab"
              onClick={() => setIndustry(label)}
            >
              {label === "All" ? "All partners" : label} <span className="font-medium text-muted-icon">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(360px,100%),1fr))] gap-6">
        {partners.map((partner, index) => (
          <article key={index} className="hover-card flex flex-col gap-5 rounded-card border border-border bg-card p-7">
            <div className="flex items-center gap-4">
              <span className="flex size-16 flex-none items-center justify-center rounded-lg border-[1.5px] border-dashed border-border-strong text-micro font-bold tracking-[0.08em] text-muted-icon">
                LOGO
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="m-0 text-xl font-bold tracking-[-0.015em]">[Company name]</h2>
                <span className="text-meta font-semibold text-muted-foreground">{partner.industry} · [City]</span>
              </div>
            </div>
            <p className="m-0 text-ui leading-[1.6] text-body">
              [One line about what the company does and the kind of work interns take part in.]
            </p>
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <span className="text-micro font-bold tracking-[0.14em] text-muted-foreground uppercase">Internships offered</span>
              <div className="flex flex-wrap gap-1.5">
                {partner.programmes.map((programme) => (
                  <span key={programme} className="inline-flex h-7 items-center rounded border border-border px-2.5 text-meta font-semibold">
                    {programme}
                  </span>
                ))}
              </div>
            </div>
            <Link href={ROUTES.internships} className="mt-auto inline-flex items-center gap-2 text-ui font-bold text-navy no-underline">
              View internships <span className="arrow">&rarr;</span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
