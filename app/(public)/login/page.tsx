import { redirect } from "next/navigation";
import { getStudentSession } from "@/lib/dal";
import { StudentLoginForm } from "@/components/public/student-login-form";
import { Card } from "@/components/ui/card";

export default async function LoginPage() {
  const session = await getStudentSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[calc(100dvh-64px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <h1 className="mb-1 font-display text-2xl text-foreground">
          Welcome back
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Sign in to see your internships and certificates.
        </p>
        <StudentLoginForm />
      </Card>
    </main>
  );
}
