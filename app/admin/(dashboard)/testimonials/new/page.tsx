import { TestimonialForm } from "@/components/admin/testimonial-form";
import { Card } from "@/components/ui/card";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-foreground">Add testimonial</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Published testimonials appear in the &ldquo;What students say&rdquo;
          section on the homepage, newest first.
        </p>
      </div>
      <Card>
        <TestimonialForm />
      </Card>
    </div>
  );
}
