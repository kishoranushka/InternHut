import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatRupees } from "@/lib/money";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const internship = await prisma.internship.findUnique({ where: { slug } });
  if (!internship || internship.status !== "PUBLISHED") {
    notFound();
  }

  const seatsLeft = internship.seatsTotal - internship.seatsFilled;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Badge tone="accent">{internship.category}</Badge>
        {internship.courseEligibility.map((course) => (
          <Badge key={course} tone="neutral">
            {course}
          </Badge>
        ))}
      </div>

      <h1 className="font-display text-3xl text-foreground sm:text-4xl">{internship.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{internship.shortDescription}</p>

      <div className="mt-8 flex flex-wrap gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <Stat label="Price" value={formatRupees(internship.priceInPaise)} />
        <Stat label="Duration" value={`${internship.durationWeeks} weeks`} />
        <Stat
          label="Seats"
          value={seatsLeft > 0 ? `${seatsLeft} left` : "Full"}
        />
      </div>

      <div className="mt-10 whitespace-pre-line leading-relaxed text-foreground">
        {internship.description}
      </div>

      {internship.perks.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl text-foreground">What you get</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground">
            {internship.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={`/apply/${internship.slug}`}
        className={buttonVariants({ variant: "primary", size: "lg", className: "mt-12" })}
      >
        Apply or ask a question
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  );
}
