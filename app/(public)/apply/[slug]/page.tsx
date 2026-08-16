import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ApplicationForm } from "@/components/public/application-form";
import { Card } from "@/components/ui/card";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const internship = await prisma.internship.findUnique({ where: { slug } });
  if (!internship || internship.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-display text-2xl text-foreground sm:text-3xl">{internship.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Apply, or ask a question before enrolling.
      </p>
      <Card className="mt-6">
        <ApplicationForm
          internshipId={internship.id}
          internshipSlug={internship.slug}
        />
      </Card>
    </div>
  );
}
