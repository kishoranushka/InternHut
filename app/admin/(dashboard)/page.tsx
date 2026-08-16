import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

async function getDashboardCounts() {
  const [publishedInternships, draftInternships, newLeads] = await Promise.all([
    prisma.internship.count({ where: { status: "PUBLISHED" } }),
    prisma.internship.count({ where: { status: "DRAFT" } }),
    prisma.application.count({ where: { status: "NEW" } }),
  ]);
  return { publishedInternships, draftInternships, newLeads };
}

export default async function AdminDashboardPage() {
  const { publishedInternships, draftInternships, newLeads } =
    await getDashboardCounts();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStat label="Published internships" value={publishedInternships} />
        <DashboardStat label="Draft internships" value={draftInternships} />
        <DashboardStat label="New leads" value={newLeads} />
        <DashboardStat label="Pending payments" value="—" note="Coming soon" />
      </div>
    </div>
  );
}

function DashboardStat({
  label,
  value,
  note,
}: {
  label: string;
  value: number | string;
  note?: string;
}) {
  return (
    <Card>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
    </Card>
  );
}
