import { AdminUserForm } from "@/components/admin/admin-user-form";
import { Card } from "@/components/ui/card";

export default function NewAdminPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-foreground">Add admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The new admin can sign in at /admin/login with this email and password
          and gets full access to the admin panel.
        </p>
      </div>
      <Card>
        <AdminUserForm />
      </Card>
    </div>
  );
}
