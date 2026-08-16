import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminLeadsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: { internship: { select: { title: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-foreground">Leads</h1>

      {applications.length === 0 ? (
        <Card>
          <p className="text-sm text-muted-foreground">
            No queries or applications yet. They&apos;ll show up here as students
            submit them.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <Card key={application.id}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">
                  {application.studentName}
                </p>
                <Badge tone="accent">{application.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {application.internship.title} &middot; {application.studentEmail}{" "}
                &middot; {application.studentPhone}
                {application.studentCourse ? ` · ${application.studentCourse}` : ""}
              </p>
              {application.message && (
                <p className="mt-2 rounded-lg bg-muted p-3 text-sm text-foreground">
                  {application.message}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
