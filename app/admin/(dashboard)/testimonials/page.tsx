import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialRowActions } from "@/components/admin/testimonial-row-actions";

const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "Asia/Kolkata" });

export default async function AdminTestimonialsPage({
  searchParams,
}: PageProps<"/admin/testimonials">) {
  const [{ added }, testimonials] = await Promise.all([
    searchParams,
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  const publishedCount = testimonials.filter((t) => t.isPublished).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {publishedCount} shown on the homepage
            {publishedCount > 3 ? " (visitors use the arrows to see more)" : ""}.
          </p>
        </div>
        <Link href="/admin/testimonials/new" className={buttonVariants({})}>
          Add testimonial
        </Link>
      </div>

      {added && (
        <p role="status" className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
          Testimonial added.
        </p>
      )}

      {testimonials.length === 0 ? (
        <Card>
          <p className="text-sm text-muted-foreground">
            No testimonials yet. The section stays hidden on the homepage until
            at least one is published.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{t.studentName}</p>
                    <Badge tone={t.isPublished ? "success" : "neutral"}>
                      {t.isPublished ? "Published" : "Hidden"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {[t.internship, t.company, t.college, t.year].filter(Boolean).join(" · ") || "No details"}
                    {" · added "}
                    {dateFormat.format(t.createdAt)}
                  </p>
                </div>
                <TestimonialRowActions id={t.id} studentName={t.studentName} isPublished={t.isPublished} />
              </div>
              <p className="rounded-lg bg-muted p-3 text-sm text-foreground [overflow-wrap:anywhere]">&ldquo;{t.quote}&rdquo;</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
