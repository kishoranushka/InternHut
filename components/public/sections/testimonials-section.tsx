/**
 * Testimonials. Every name, photo and quote is a bracketed placeholder until
 * real, permissioned student testimonials are supplied — the section states
 * that quotes are shared with permission, so nothing here may be invented.
 */

const SHORT_QUOTES = [
  "“[Shorter testimonial, 15–25 words — for example, about working on a real brief or the weekly reviews.]”",
  "“[Shorter testimonial, 15–25 words — for example, about using the verified certificate in a job or higher-studies application.]”",
];

export function TestimonialsSection() {
  return (
    <section className="px-section-x pt-section-y-lg">
      <div className="mx-auto flex max-w-content flex-col gap-stack">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div className="flex max-w-[640px] flex-col gap-4">
            <span className="eyebrow">In their words</span>
            <h2 className="m-0 text-h2-sm font-bold">
              What students say about their internships
            </h2>
          </div>
          <span className="text-meta font-semibold text-muted-foreground">
            Shared with each student&apos;s permission
          </span>
        </div>

        <div className="flex flex-wrap gap-x-wide gap-y-12 border-t border-navy pt-10">
          <figure className="m-0 flex min-w-0 flex-[7_1_480px] flex-col gap-7">
            <svg width="44" height="34" viewBox="0 0 44 34" aria-hidden="true">
              <path
                d="M0 34V20C0 8 6 1.5 18 0l1.5 5C12.5 7 9.5 11 9.5 16H18v18H0zm25.5 0V20c0-12 6-18.5 18-20L45 5c-7 2-10 6-10 11h8.5v18h-18z"
                fill="var(--accent)"
              />
            </svg>
            <blockquote className="m-0 text-[clamp(22px,2.3vw,30px)] font-semibold leading-[1.35] tracking-[-0.015em] text-navy">
              [Student testimonial — what they built, what the company
              mentor&apos;s feedback taught them, and what changed in how they
              work. 30–45 words, in the student&apos;s own words.]
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <span className="flex size-12 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-border-strong text-[10px] font-bold text-muted-icon">
                PHOTO
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-base font-bold">[Student name]</span>
                <span className="text-sm text-muted-foreground">
                  [Internship] with [Partner company] · [College], [Year]
                </span>
              </span>
            </figcaption>
          </figure>

          <div className="flex min-w-0 flex-[5_1_340px] flex-col">
            {SHORT_QUOTES.map((quote, index) => (
              <figure
                key={index}
                className={
                  index === 0
                    ? "m-0 flex flex-col gap-4 border-b border-border pb-7"
                    : "m-0 flex flex-col gap-4 border-b border-border py-7"
                }
              >
                <blockquote className="m-0 text-[17px] leading-[1.6] text-body">
                  {quote}
                </blockquote>
                <figcaption className="text-sm">
                  <b>[Student name]</b>{" "}
                  <span className="text-muted-foreground">
                    · [Internship] with [Partner company]
                  </span>
                </figcaption>
              </figure>
            ))}

            <div className="flex gap-2 pt-6">
              {/* Paging arrives with the first real testimonial set; until then
                  there is only one page of placeholders to show. */}
              <button
                type="button"
                className="btn btn-outline btn-sm w-10 p-0"
                aria-label="Previous testimonials"
                aria-disabled="true"
              >
                &larr;
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm w-10 p-0"
                aria-label="Next testimonials"
                aria-disabled="true"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
