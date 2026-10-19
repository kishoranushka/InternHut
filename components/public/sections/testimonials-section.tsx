import type { PublishedTestimonial } from "@/lib/queries/testimonials";
import { TestimonialsCarousel } from "./testimonials-carousel";

/**
 * Student testimonials, managed from /admin/testimonials. The section is hidden
 * until at least one real, permissioned testimonial is published.
 */
export function TestimonialsSection({ testimonials }: { testimonials: PublishedTestimonial[] }) {
  if (testimonials.length === 0) return null;

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

        <TestimonialsCarousel items={testimonials} />
      </div>
    </section>
  );
}
