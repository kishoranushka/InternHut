import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default async function ApplySuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const internship = await prisma.internship.findUnique({ where: { slug } });
  if (!internship) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <Card>
        <h1 className="font-display text-2xl text-foreground">
          Thanks — we&apos;ve got it!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your submission for {internship.title}. We&apos;ll
          reach out to you by email or phone shortly.
        </p>
        <Link
          href="/internships"
          className={buttonVariants({ variant: "outline", className: "mt-6" })}
        >
          Browse more internships
        </Link>
      </Card>
    </div>
  );
}
