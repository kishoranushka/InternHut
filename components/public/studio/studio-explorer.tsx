"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES, INTERNSHIP_CATEGORIES } from "@/lib/routes";
import { STUDIO_BRIEFS_FULL } from "./studio-briefs-full";

export function StudioExplorer() {
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = ["All", ...INTERNSHIP_CATEGORIES.map((c) => c.label)];
  const tiles = STUDIO_BRIEFS_FULL.filter((b) => category === "All" || b.category === category);
  const selected = STUDIO_BRIEFS_FULL.find((b) => b.id === openId) ?? null;
  const maxWeight = selected ? Math.max(...selected.criteria.map(([, weight]) => weight)) : 1;

  return (
    <>
      <div role="tablist" aria-label="Categories" className="flex gap-8 overflow-x-auto border-b border-border">
        {categories.map((label) => {
          const count = label === "All" ? STUDIO_BRIEFS_FULL.length : STUDIO_BRIEFS_FULL.filter((b) => b.category === label).length;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={category === label}
              className="tab"
              onClick={() => setCategory(label)}
            >
              {label === "All" ? "All briefs" : label} <span className="font-medium text-muted-icon">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(360px,100%),1fr))] gap-6">
        {tiles.map((brief) => (
          <button
            key={brief.id}
            type="button"
            className="hover-card flex flex-col gap-3 rounded-card border border-border bg-card p-7 text-left"
            onClick={() => setOpenId(brief.id)}
            aria-haspopup="dialog"
          >
            <div className="flex w-full items-center justify-between gap-3">
              <span className="text-caption font-bold tracking-[0.14em] text-accent-secondary uppercase">{brief.category}</span>
              <span className="text-meta font-bold text-muted-foreground">{brief.code}</span>
            </div>
            <span className="text-[23px] leading-[1.2] font-bold tracking-[-0.02em]">{brief.title}</span>
            <span className="text-ui leading-[1.6] text-muted-foreground">{brief.context}</span>
            <span className="mt-1 flex flex-wrap gap-1.5">
              {brief.skills.slice(0, 3).map((skill) => (
                <span key={skill} className="inline-flex h-6.5 items-center rounded border border-border px-2 text-caption font-semibold">
                  {skill}
                </span>
              ))}
            </span>
            <span className="mt-auto flex w-full items-center justify-between border-t border-border pt-4 text-meta font-semibold text-body">
              <span>{brief.deliverables.length} deliverables · {brief.level} · {brief.duration}</span>
              <span className="inline-flex items-center gap-1.5 text-ui font-bold text-navy">
                Open <span className="arrow">&rarr;</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <>
          <div aria-hidden="true" className="fixed inset-0 z-[80] bg-inverse/[0.48]" onClick={() => setOpenId(null)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brief-title"
            className="fixed inset-y-0 right-0 z-[90] w-full max-w-[720px] overflow-y-auto bg-card shadow-[-24px_0_56px_-24px_rgba(11,26,47,0.4)]"
          >
            <div className="sticky top-0 z-[1] flex items-center justify-between gap-4 border-b border-border bg-card px-[clamp(20px,4vw,48px)] py-4">
              <span className="inline-flex h-6.5 items-center rounded bg-warning-tint px-2.5 text-caption font-bold tracking-[0.04em] text-warning">
                ILLUSTRATIVE BRIEF · {selected.code.toUpperCase()}
              </span>
              <button
                type="button"
                className="btn btn-outline btn-sm w-10 p-0"
                onClick={() => setOpenId(null)}
                aria-label="Close brief"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="flex flex-col gap-10 p-[clamp(28px,4vw,48px)]">
              <div className="flex flex-col gap-4">
                <span className="text-caption font-bold tracking-[0.14em] text-accent-secondary uppercase">
                  {selected.category} · {selected.level} · {selected.duration}
                </span>
                <span className="flex items-center gap-2.5 text-sm font-semibold text-body">
                  <span className="block size-7 rounded border-[1.5px] border-dashed border-border-strong" />
                  Brief set by [Partner company]
                </span>
                <h2 id="brief-title" className="m-0 text-[clamp(30px,3.4vw,42px)] font-bold leading-[1.08] tracking-[-0.035em]">
                  {selected.title}
                </h2>
                <p className="m-0 text-lead text-body">{selected.context}</p>
              </div>

              <div className="flex flex-col">
                <span className="border-b border-navy pb-3 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  Deliverables &amp; milestones
                </span>
                {selected.deliverables.map((text, index) => (
                  <div key={text} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-border py-4">
                    <span className="text-meta font-bold text-accent">
                      {index === selected.deliverables.length - 1 ? "Final" : `M${index + 1}`}
                    </span>
                    <span className="text-base leading-[1.5]">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3.5">
                <span className="border-b border-navy pb-3 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  Skills developed
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span key={skill} className="inline-flex h-8 items-center rounded border border-border px-3 text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="border-b border-navy pb-3 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  Evaluation criteria
                </span>
                {selected.criteria.map(([name, weight]) => (
                  <div key={name} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{name}</span>
                      <span className="tnum text-muted-foreground">{weight}%</span>
                    </div>
                    <div className="h-1.5 bg-border">
                      <div className="h-1.5 bg-navy" style={{ width: `${(weight / maxWeight) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-tint-50 p-6">
                <span className="flex flex-col gap-1">
                  <span className="text-meta font-semibold text-body">Used in a programme like</span>
                  <span className="text-lg font-bold">{selected.programme}</span>
                </span>
                <Link href={ROUTES.internship(selected.programmeSlug)} className="btn btn-navy">
                  View programme
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
