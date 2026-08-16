import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/dal";
import { LoginForm } from "@/components/admin/login-form";
import { Card } from "@/components/ui/card";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-foreground px-4">
      <Card className="w-full max-w-sm">
        <h1 className="mb-1 font-display text-2xl text-foreground">
          Admin sign in
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Manage internships, leads, and certificates.
        </p>
        <LoginForm />
      </Card>
    </main>
  );
}
