import Link from "next/link";
import { formatRupees } from "@/lib/money";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type InternshipCardData = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  durationWeeks: number;
  priceInPaise: number;
  courseEligibility: string[];
  seatsTotal: number;
  seatsFilled: number;
};

export function InternshipCard({ internship }: { internship: InternshipCardData }) {
  const seatsLeft = internship.seatsTotal - internship.seatsFilled;

  return (
    <Link href={`/internships/${internship.slug}`} className="group block h-full">
      <Card className="relative flex h-full flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative mb-3 flex flex-wrap gap-1.5">
          <Badge tone="accent">{internship.category}</Badge>
          {internship.courseEligibility.map((course) => (
            <Badge key={course} tone="neutral">
              {course}
            </Badge>
          ))}
        </div>
        <h3 className="relative font-display text-2xl font-bold text-foreground">
          {internship.title}
        </h3>
        <p className="relative mt-1 flex-1 text-sm text-muted-foreground">
          {internship.shortDescription}
        </p>
        <div className="relative mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">
            {formatRupees(internship.priceInPaise)}
          </span>
          <span className="text-muted-foreground">{internship.durationWeeks} weeks</span>
        </div>
        <p className="relative mt-1 text-xs text-muted-foreground">
          {seatsLeft > 0 ? `${seatsLeft} seats left` : "Seats full"}
        </p>
      </Card>
    </Link>
  );
}
