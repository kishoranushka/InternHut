import { createInternship } from "@/lib/actions/internship-actions";
import { InternshipForm } from "@/components/admin/internship-form";
import { Card } from "@/components/ui/card";

export default function NewInternshipPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-foreground">New internship</h1>
      <Card>
        <InternshipForm action={createInternship} submitLabel="Create internship" />
      </Card>
    </div>
  );
}
