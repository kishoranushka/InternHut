import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/dal";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dateTimeFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function AdminUsersPage({ searchParams }: PageProps<"/admin/admins">) {
  const [{ added }, currentAdmin, admins] = await Promise.all([
    searchParams,
    getCurrentAdmin(),
    prisma.adminUser.findMany({
      orderBy: { createdAt: "asc" },
      // Never load password hashes into a page.
      select: { id: true, name: true, email: true, createdAt: true, lastLoginAt: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground">Admins</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {admins.length} {admins.length === 1 ? "person has" : "people have"} access to the admin panel.
          </p>
        </div>
        <Link href="/admin/admins/new" className={buttonVariants({})}>
          Add admin
        </Link>
      </div>

      {added && (
        <p role="status" className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
          Admin added. They can now sign in at /admin/login.
        </p>
      )}

      <div className="space-y-3">
        {admins.map((admin) => (
          <Card key={admin.id} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{admin.name}</p>
                {admin.id === currentAdmin.id && <Badge tone="accent">You</Badge>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{admin.email}</p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <p>Added {dateTimeFormat.format(admin.createdAt)}</p>
              <p className="mt-0.5">
                {admin.lastLoginAt
                  ? `Last sign-in ${dateTimeFormat.format(admin.lastLoginAt)}`
                  : "Never signed in"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
