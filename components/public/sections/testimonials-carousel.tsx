"use client";

import { useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import type { PublishedTestimonial } from "@/lib/queries/testimonials";

/** One featured quote plus two smaller ones beside it. */
const VISIBLE = 3;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

function detailLine(t: PublishedTestimonial) {
  const role = [t.internship, t.company && `with ${t.company}`].filter(Boolean).join(" ");
  const school = [t.college, t.year].filter(Boolean).join(", ");
  return [role, school].filter(Boolean).join(" · ");
}

/**
 * Each card keeps a stable view-transition-name, so when the window shifts the
 * browser morphs the first small card into the featured slot (and the others
 * up one place) instead of swapping text in place.
 */
function morphStyle(id: string): CSSProperties {
  return { viewTransitionName: `testimonial-${id}`, viewTransitionClass: "testimonial" } as CSSProperties;
}

export function TestimonialsCarousel({ items }: { items: PublishedTestimonial[] }) {
  const [rawStart, setStart] = useState(0);
  const canPage = items.length > VISIBLE;
  // The list can shrink after a revalidation; keep the window in range.
  const start = rawStart % items.length;

  const visible = Array.from(
    { length: Math.min(VISIBLE, items.length) },
    (_, offset) => items[(start + offset) % items.length],
  );
  const [featured, ...others] = visible;

  function move(step: 1 | -1) {
    const update = () => setStart((current) => (current + step + items.length) % items.length);
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      update();
      return;
    }
    document.startViewTransition(() => flushSync(update));
  }

  return (
    <div aria-live="polite" className="flex flex-wrap gap-x-wide gap-y-12 border-t border-navy pt-10 [overflow-wrap:anywhere]">
      <figure key={featured.id} style={morphStyle(featured.id)} className="m-0 flex min-w-0 flex-[7_1_480px] flex-col gap-7">
        <svg width="44" height="34" viewBox="0 0 44 34" aria-hidden="true">
          <path
            d="M0 34V20C0 8 6 1.5 18 0l1.5 5C12.5 7 9.5 11 9.5 16H18v18H0zm25.5 0V20c0-12 6-18.5 18-20L45 5c-7 2-10 6-10 11h8.5v18h-18z"
            fill="var(--accent)"
          />
        </svg>
        <blockquote className="m-0 text-[clamp(22px,2.3vw,30px)] font-semibold leading-[1.35] tracking-[-0.015em] text-navy">
          {featured.quote}
        </blockquote>
        <figcaption className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="flex size-12 flex-none items-center justify-center rounded-full bg-tint-100 text-sm font-bold text-accent-secondary"
          >
            {initials(featured.studentName)}
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-base font-bold">{featured.studentName}</span>
            {detailLine(featured) && (
              <span className="text-sm text-muted-foreground">{detailLine(featured)}</span>
            )}
          </span>
        </figcaption>
      </figure>

      <div className="flex min-w-0 flex-[5_1_340px] flex-col">
        {others.map((t, index) => (
          <figure
            key={t.id}
            style={morphStyle(t.id)}
            className={
              index === 0
                ? "m-0 flex flex-col gap-4 border-b border-border pb-7"
                : "m-0 flex flex-col gap-4 border-b border-border py-7"
            }
          >
            <blockquote className="m-0 text-[17px] leading-[1.6] text-body">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <b>{t.studentName}</b>
              {detailLine(t) && <span className="text-muted-foreground"> · {detailLine(t)}</span>}
            </figcaption>
          </figure>
        ))}

        {canPage && (
          <div className="flex items-center gap-2 pt-6">
            <button
              type="button"
              className="btn btn-outline btn-sm w-10 p-0"
              aria-label="Previous testimonials"
              onClick={() => move(-1)}
            >
              &larr;
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm w-10 p-0"
              aria-label="Next testimonials"
              onClick={() => move(1)}
            >
              &rarr;
            </button>
            <span className="ml-2 text-meta font-semibold text-muted-foreground tnum">
              {start + 1} / {items.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
