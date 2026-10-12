import Link from "next/link";
import { Award, GraduationCap, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/dal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { StudentLogoutButton } from "@/components/public/student-logout-button";
import { cn } from "@/lib/cn";
import type { ApplicationStatus } from "@/app/generated/prisma/enums";

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  NEW: "Application received",
  CONTACTED: "We've contacted you",
  PAYMENT_PENDING: "Payment pending",
  PAYMENT_CONFIRMED: "Payment confirmed",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const STATUS_TONE: Record<ApplicationStatus, "neutral" | "accent" | "success" | "error"> = {
  NEW: "neutral",
  CONTACTED: "neutral",
  PAYMENT_PENDING: "accent",
  PAYMENT_CONFIRMED: "accent",
  IN_PROGRESS: "accent",
  COMPLETED: "success",
  CANCELLED: "error",
};

export default async function DashboardPage() {
  const student = await getCurrentStudent();

  const applications = await prisma.application.findMany({
    where: { studentId: student.id },
    include: { internship: true, certificate: true },
    orderBy: { createdAt: "desc" },
  });

  const certificates = applications
    .map((application) => application.certificate)
    .filter((certificate) => certificate && !certificate.revoked);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground sm:text-3xl">
            Welcome back, {student.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything tied to your account, in one place.
          </p>
        </div>
        <StudentLogoutButton />
      </div>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <GraduationCap className="h-5 w-5 text-accent" />
          My internships
        </h2>

        {applications.length === 0 ? (
          <Card className="mt-4">
            <p className="text-sm text-muted-foreground">
              You haven&apos;t applied to an internship yet.
            </p>
            <Link
              href="/internships"
              className={cn(buttonVariants({ variant: "primary", size: "sm" }), "mt-4")}
            >
              Browse internships
            </Link>
          </Card>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {applications.map((application) => (
              <Card key={application.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {application.internship.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Applied{" "}
                      {new Date(application.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge tone={STATUS_TONE[application.status]}>
                    {STATUS_LABEL[application.status]}
                  </Badge>
                </div>
                <Link
                  href={`/internships/${application.internship.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  View internship details
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Award className="h-5 w-5 text-accent" />
          My certificates
        </h2>

        {certificates.length === 0 ? (
          <Card className="mt-4">
            <p className="text-sm text-muted-foreground">
              No certificates yet — they&apos;ll show up here as soon as one is issued.
            </p>
          </Card>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {certificates.map((certificate) => (
              <Card key={certificate!.id}>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  {certificate!.internshipTitleSnapshot}
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {certificate!.verificationCode}
                </p>
                <Link
                  href={`/verify?code=${certificate!.verificationCode}`}
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  View verification
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        <Card className="mt-4">
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted-foreground">Name</dt>
              <dd className="mt-0.5 text-foreground">{student.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="mt-0.5 text-foreground">{student.email}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="mt-0.5 text-foreground">{student.phone ?? "—"}</dd>
            </div>
          </dl>
        </Card>
      </section>
    </main>
  );
}
