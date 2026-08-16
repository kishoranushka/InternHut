import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatRupees } from "@/lib/money";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATUS_BADGE_TONE = {
  DRAFT: "neutral",
  PUBLISHED: "success",
  ARCHIVED: "error",
} as const;

export default async function AdminInternshipsPage() {
  const internships = await prisma.internship.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-foreground">Internships</h1>
        <Link href="/admin/internships/new" className={buttonVariants({})}>
          New internship
        </Link>
      </div>

      {internships.length === 0 ? (
        <Card>
          <p className="text-sm text-muted-foreground">
            No internships yet. Create your first one to get started.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {internships.map((internship) => (
            <Link key={internship.id} href={`/admin/internships/${internship.id}`}>
              <Card className="flex items-center justify-between transition-colors hover:border-accent/30">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{internship.title}</p>
                    <Badge tone={STATUS_BADGE_TONE[internship.status]}>
                      {internship.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {internship.category} &middot; {internship.durationWeeks} weeks &middot;{" "}
                    {formatRupees(internship.priceInPaise)} &middot; {internship.seatsFilled}/
                    {internship.seatsTotal} seats filled
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
