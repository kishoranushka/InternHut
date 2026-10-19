"use client";

import { useTransition } from "react";
import { deleteTestimonial, setTestimonialPublished } from "@/lib/actions/testimonial-actions";
import { Button } from "@/components/ui/button";

export function TestimonialRowActions({
  id,
  studentName,
  isPublished,
}: {
  id: string;
  studentName: string;
  isPublished: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => startTransition(() => setTestimonialPublished(id, !isPublished))}
      >
        {isPublished ? "Hide" : "Publish"}
      </Button>
      <Button
        type="button"
        variant="danger"
        size="sm"
        disabled={isPending}
        onClick={() => {
          if (confirm(`Delete ${studentName}'s testimonial? This can't be undone.`)) {
            startTransition(() => deleteTestimonial(id));
          }
        }}
      >
        Delete
      </Button>
    </div>
  );
}
