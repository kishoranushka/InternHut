import { redirect } from "next/navigation";
import { getStudentSession } from "@/lib/dal";
import { RegisterForm } from "@/components/public/register-form";
import { Card } from "@/components/ui/card";

export default async function RegisterPage() {
  const session = await getStudentSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[calc(100dvh-64px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <h1 className="mb-1 font-display text-2xl text-foreground">
          Create your account
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Track your internships, certificates, and applications in one place.
        </p>
        <RegisterForm />
      </Card>
    </main>
  );
}
