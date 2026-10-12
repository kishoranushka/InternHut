"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ROUTES, INTERNSHIP_CATEGORIES } from "@/lib/routes";
import type { PublishedInternship } from "@/lib/queries/internships";
import type { InternshipMode, InternshipLevel } from "@/lib/enums";
import { FilterGroup } from "./filter-group";
import { CatalogueCard } from "./catalogue-card";

type DurationBucket = "any" | "le6" | "w8" | "ge10";
type FeeBucket = "any" | "lt5" | "mid" | "gt7";
type SortKey = "soon" | "feeAsc" | "feeDesc" | "short";

const DURATION_OPTIONS: { value: DurationBucket; label: string }[] = [
  { value: "any", label: "Any duration" },
  { value: "le6", label: "Up to 6 weeks" },
  { value: "w8", label: "8 weeks" },
  { value: "ge10", label: "10 weeks or more" },
];

const FEE_OPTIONS: { value: FeeBucket; label: string }[] = [
  { value: "any", label: "Any fee" },
  { value: "lt5", label: "Under ₹5,000" },
  { value: "mid", label: "₹5,000 – ₹7,000" },
  { value: "gt7", label: "Above ₹7,000" },
];

const MODE_OPTIONS: { value: InternshipMode; label: string }[] = [
  { value: "REMOTE", label: "Remote" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ON_CAMPUS", label: "On-campus" },
];

const LEVEL_OPTIONS: { value: InternshipLevel; label: string }[] = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
];

function matchesDuration(weeks: number, bucket: DurationBucket) {
  if (bucket === "any") return true;
  if (bucket === "le6") return weeks <= 6;
  if (bucket === "w8") return weeks === 8;
  return weeks >= 10;
}

function matchesFee(priceInPaise: number, bucket: FeeBucket) {
  if (bucket === "any") return true;
  const rupees = priceInPaise / 100;
  if (bucket === "lt5") return rupees < 5000;
  if (bucket === "mid") return rupees >= 5000 && rupees <= 7000;
  return rupees > 7000;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function CatalogueExplorer({ internships }: { internships: PublishedInternship[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [duration, setDuration] = useState<DurationBucket>("any");
  const [fee, setFee] = useState<FeeBucket>("any");
  const [modes, setModes] = useState<InternshipMode[]>([]);
  const [levels, setLevels] = useState<InternshipLevel[]>([]);
  const [sort, setSort] = useState<SortKey>("soon");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = { All: internships.length };
    for (const c of INTERNSHIP_CATEGORIES) {
      counts[c.label] = internships.filter((i) => i.category === c.label).length;
    }
    return counts;
  }, [internships]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = internships.filter((internship) => {
      if (category !== "All" && internship.category !== category) return false;
      if (q) {
        const haystack = `${internship.title} ${internship.category} ${internship.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (!matchesDuration(internship.durationWeeks, duration)) return false;
      if (!matchesFee(internship.priceInPaise, fee)) return false;
      if (modes.length > 0 && !modes.includes(internship.mode)) return false;
      if (levels.length > 0 && !levels.includes(internship.level)) return false;
      return true;
    });

    const sorters: Record<SortKey, (a: PublishedInternship, b: PublishedInternship) => number> = {
      soon: (a, b) => (a.startDate?.getTime() ?? Infinity) - (b.startDate?.getTime() ?? Infinity),
      feeAsc: (a, b) => a.priceInPaise - b.priceInPaise,
      feeDesc: (a, b) => b.priceInPaise - a.priceInPaise,
      short: (a, b) => a.durationWeeks - b.durationWeeks,
    };
    return filtered.slice().sort(sorters[sort]);
  }, [internships, query, category, duration, fee, modes, levels, sort]);

  const clearAll = () => {
    setQuery("");
    setCategory("All");
    setDuration("any");
    setFee("any");
    setModes([]);
    setLevels([]);
  };

  const chips: { label: string; remove: () => void }[] = [];
  if (query.trim()) chips.push({ label: `"${query.trim()}"`, remove: () => setQuery("") });
  if (category !== "All") chips.push({ label: category, remove: () => setCategory("All") });
  if (duration !== "any") {
    chips.push({
      label: DURATION_OPTIONS.find((o) => o.value === duration)!.label,
      remove: () => setDuration("any"),
    });
  }
  if (fee !== "any") {
    chips.push({ label: FEE_OPTIONS.find((o) => o.value === fee)!.label, remove: () => setFee("any") });
  }
  modes.forEach((m) =>
    chips.push({
      label: MODE_OPTIONS.find((o) => o.value === m)!.label,
      remove: () => setModes((prev) => toggle(prev, m)),
    }),
  );
  levels.forEach((l) =>
    chips.push({
      label: LEVEL_OPTIONS.find((o) => o.value === l)!.label,
      remove: () => setLevels((prev) => toggle(prev, l)),
    }),
  );

  const hasResults = results.length > 0;
  const isEmptyCatalogue = internships.length === 0;

  return (
    <>
      <div className="flex flex-col gap-7">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="flex flex-[1_1_480px] flex-col gap-4">
            <h1 className="m-0 text-[clamp(40px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em]">
              Internships
            </h1>
            <p className="m-0 max-w-[560px] text-ui leading-[1.6] text-muted-foreground">
              Guided internships with our partner companies, each built around
              one real project brief. Every internship includes mentor
              reviews and a verifiable certificate on completion.
            </p>
          </div>
          <div className="flex flex-[1_1_440px] max-w-[560px] flex-col gap-2">
            <label htmlFor="cat-q" className="text-sm font-bold">Search internships</label>
            <div className="relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="absolute top-[17px] left-4">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                id="cat-q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by skill or title — React, SQL, Figma"
                className="input h-13 pl-11.5 text-base"
              />
            </div>
          </div>
        </div>

        <div role="tablist" aria-label="Fields" className="mt-3 flex gap-8 overflow-x-auto">
          {["All", ...INTERNSHIP_CATEGORIES.map((c) => c.label)].map((label) => {
            const selected = (label === "All" ? "All" : label) === category;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={selected}
                className="tab"
                onClick={() => setCategory(label)}
              >
                {label === "All" ? "All fields" : label}{" "}
                <span className="font-medium text-muted-icon">{trackCounts[label] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-start gap-x-mid gap-y-10">
        <aside
          aria-label="Filters"
          className={`flex min-w-[220px] flex-[0_1_248px] flex-col gap-8 ${filtersOpen ? "" : "hidden stack:flex"}`}
        >
          <div className="flex items-center justify-between border-b border-navy pb-3.5">
            <span className="text-sm font-bold">Filters</span>
            <button type="button" onClick={clearAll} className="bg-transparent p-0 py-2 font-sans text-sm font-semibold text-accent-secondary">
              Clear all
            </button>
          </div>

          <FilterGroup legend="Duration" mode="radio" options={DURATION_OPTIONS} selected={[duration]} onSelect={setDuration} />
          <FilterGroup
            legend="Mode"
            mode="checkbox"
            options={MODE_OPTIONS}
            selected={modes}
            onSelect={(v) => setModes((prev) => toggle(prev, v))}
          />
          <FilterGroup legend="Programme fee" mode="radio" options={FEE_OPTIONS} selected={[fee]} onSelect={setFee} />
          <FilterGroup
            legend="Level"
            mode="checkbox"
            options={LEVEL_OPTIONS}
            selected={levels}
            onSelect={(v) => setLevels((prev) => toggle(prev, v))}
          />

          <div className="flex flex-col gap-2.5 rounded-card bg-tint-50 p-5">
            <span className="text-sm font-bold">Enrolling a whole batch?</span>
            <span className="text-meta leading-[1.55] text-body">Colleges can request a dedicated cohort.</span>
            <Link href={ROUTES.colleges} className="arrow-link text-meta">
              For colleges <i>&rarr;</i>
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm font-bold" aria-live="polite">
                {isEmptyCatalogue
                  ? "No open programmes"
                  : results.length === 1
                    ? "1 programme"
                    : `${results.length} programmes`}
              </span>
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="chip h-8 border-tint-200 bg-tint-50 pl-3 pr-2.5 text-meta text-accent-secondary"
                  onClick={chip.remove}
                  aria-label={`Remove filter ${chip.label}`}
                >
                  {chip.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-outline btn-sm stack:hidden"
                aria-expanded={filtersOpen}
                onClick={() => setFiltersOpen((open) => !open)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
                Filters
              </button>
              <label htmlFor="cat-sort" className="text-sm font-semibold text-muted-foreground">Sort</label>
              <div className="relative">
                <select
                  id="cat-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="input h-10 w-auto appearance-none py-0 pr-9 pl-3 text-sm font-semibold"
                >
                  <option value="soon">Starting soonest</option>
                  <option value="feeAsc">Fee: low to high</option>
                  <option value="feeDesc">Fee: high to low</option>
                  <option value="short">Shortest first</option>
                </select>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--body)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-[13px] right-3">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {hasResults && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))] gap-6">
              {results.map((internship) => (
                <CatalogueCard key={internship.id} internship={internship} />
              ))}
            </div>
          )}

          {!hasResults && !isEmptyCatalogue && (
            <div className="flex flex-wrap items-center gap-x-12 gap-y-8 rounded-card border border-border p-[clamp(32px,5vw,64px)]">
              <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true" className="flex-none">
                <g stroke="var(--border-strong)" fill="none">
                  <path d="M0.5 0.5H119.5V119.5H0.5Z" />
                  <path d="M40.5 0V120M80.5 0V120M0 40.5H120M0 80.5H120" />
                </g>
                <rect x="41" y="41" width="39" height="39" fill="none" stroke="var(--accent)" strokeDasharray="4 4" />
              </svg>
              <div className="flex flex-[1_1_320px] flex-col gap-3.5">
                <h2 className="m-0 text-2xl font-bold tracking-[-0.02em]">No internships match these filters</h2>
                <p className="m-0 max-w-[520px] text-sm leading-[1.6] text-muted-foreground">
                  {query.trim()
                    ? `Nothing matches "${query.trim()}" with the filters you have chosen. Try a broader skill, or remove a filter.`
                    : "Try widening the duration or fee range, or removing a mode."}
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <button type="button" className="btn btn-navy" onClick={clearAll}>Clear all filters</button>
                  <Link href={ROUTES.contact} className="btn btn-ghost-navy">Tell us what you&apos;re looking for</Link>
                </div>
              </div>
            </div>
          )}

          {isEmptyCatalogue && (
            <div className="flex flex-col items-start gap-5 rounded-card bg-muted p-[clamp(32px,6vw,80px)]">
              <svg width="160" height="80" viewBox="0 0 160 80" aria-hidden="true">
                <g stroke="var(--border-strong)" fill="none">
                  <path d="M0.5 0.5H159.5V79.5H0.5Z" />
                  <path d="M40.5 0V80M80.5 0V80M120.5 0V80M0 40.5H160" />
                </g>
                <rect x="121" y="1" width="38" height="39" fill="var(--tint-100)" />
              </svg>
              <h2 className="m-0 max-w-[560px] text-[clamp(26px,3vw,34px)] font-bold leading-[1.15] tracking-[-0.025em]">
                New cohorts are being scheduled
              </h2>
              <p className="m-0 max-w-[560px] text-base leading-[1.65] text-muted-foreground">
                There are no internships open for applications right now.
              </p>
              <Link href={ROUTES.studio} className="arrow-link mt-2 text-ui">
                Meanwhile, browse sample project briefs <i>&rarr;</i>
              </Link>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
            <span className="text-ui text-body">
              <b className="text-navy">Not sure which internship fits?</b> See how a programme runs week by week.
            </span>
            <Link href={ROUTES.learning} className="arrow-link text-ui">
              How internships work <i>&rarr;</i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
