import { getCurrentAdmin } from "@/lib/dal";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const admin = await getCurrentAdmin();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="text-foreground">{admin.email}</span>
          </p>
          <LogoutButton />
        </header>
        <main className="flex-1 bg-muted/40 p-6">{children}</main>
      </div>
    </div>
  );
}
