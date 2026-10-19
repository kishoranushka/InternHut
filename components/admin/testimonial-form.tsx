"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createTestimonial,
  type TestimonialFormState,
} from "@/lib/actions/testimonial-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TestimonialForm() {
  const [state, formAction, isPending] = useActionState<TestimonialFormState, FormData>(
    createTestimonial,
    undefined,
  );
  const values = state?.values ?? {};
  const text = (key: string) => (typeof values[key] === "string" ? (values[key] as string) : undefined);

  return (
    // Remount after a failed attempt so defaultValue refills the fields.
    <form key={state ? JSON.stringify(values) : "fresh"} action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="studentName">Student name</Label>
        <Input id="studentName" name="studentName" defaultValue={text("studentName")} required />
      </div>
      <div>
        <Label htmlFor="quote">Quote</Label>
        <Textarea
          id="quote"
          name="quote"
          rows={5}
          minLength={20}
          maxLength={600}
          defaultValue={text("quote")}
          placeholder="In the student's own words: what they built, what they learned, what changed."
          required
        />
        <p className="mt-1 text-xs text-muted-foreground">20 to 600 characters.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="internship">Internship (optional)</Label>
          <Input id="internship" name="internship" defaultValue={text("internship")} placeholder="e.g. Frontend Development with React" />
        </div>
        <div>
          <Label htmlFor="company">Company (optional)</Label>
          <Input id="company" name="company" defaultValue={text("company")} />
        </div>
        <div>
          <Label htmlFor="college">College (optional)</Label>
          <Input id="college" name="college" defaultValue={text("college")} />
        </div>
        <div>
          <Label htmlFor="year">Year (optional)</Label>
          <Input id="year" name="year" defaultValue={text("year")} placeholder="e.g. 2026" />
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-foreground">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={values.isPublished !== false}
          className="mt-0.5 size-4 accent-[var(--accent)]"
        />
        Show on the homepage now
      </label>
      <label className="flex items-start gap-2.5 text-sm text-foreground">
        <input
          type="checkbox"
          name="hasPermission"
          required
          defaultChecked={values.hasPermission === true}
          className="mt-0.5 size-4 accent-[var(--accent)]"
        />
        The student agreed to have this quote and their name shown on the website
      </label>

      {state?.error && <p className="text-sm text-error">{state.error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Add testimonial"}
        </Button>
        <Link href="/admin/testimonials" className={buttonVariants({ variant: "ghost" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
