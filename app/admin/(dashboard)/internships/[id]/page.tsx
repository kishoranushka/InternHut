import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteInternship, updateInternship } from "@/lib/actions/internship-actions";
import { InternshipForm } from "@/components/admin/internship-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function EditInternshipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const internship = await prisma.internship.findUnique({ where: { id } });
  if (!internship) {
    notFound();
  }

  const updateInternshipWithId = updateInternship.bind(null, internship.id);
  const deleteInternshipWithId = deleteInternship.bind(null, internship.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-foreground">Edit internship</h1>
        <form action={deleteInternshipWithId}>
          <Button type="submit" variant="danger" size="sm">
            Delete
          </Button>
        </form>
      </div>
      <Card>
        <InternshipForm
          action={updateInternshipWithId}
          submitLabel="Save changes"
          initialValues={{
            title: internship.title,
            shortDescription: internship.shortDescription,
            description: internship.description,
            courseEligibility: internship.courseEligibility,
            category: internship.category,
            durationWeeks: internship.durationWeeks,
            priceInRupees: internship.priceInPaise / 100,
            seatsTotal: internship.seatsTotal,
            status: internship.status,
            perks: internship.perks,
          }}
        />
      </Card>
    </div>
  );
}
