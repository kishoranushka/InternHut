"use client";

import { useActionState } from "react";
import { COURSE_ELIGIBILITY } from "@/lib/enums";
import {
  submitApplication,
  type ApplicationFormState,
} from "@/lib/actions/application-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const COURSE_OPTIONS = COURSE_ELIGIBILITY;

export function ApplicationForm({
  internshipId,
  internshipSlug,
}: {
  internshipId: string;
  internshipSlug: string;
}) {
  const [state, formAction, isPending] = useActionState<
    ApplicationFormState,
    FormData
  >(submitApplication, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="internshipId" value={internshipId} />
      <input type="hidden" name="internshipSlug" value={internshipSlug} />

      <div>
        <Label htmlFor="studentName">Full name</Label>
        <Input id="studentName" name="studentName" required />
      </div>
      <div>
        <Label htmlFor="studentEmail">Email</Label>
        <Input id="studentEmail" name="studentEmail" type="email" required />
      </div>
      <div>
        <Label htmlFor="studentPhone">Phone</Label>
        <Input id="studentPhone" name="studentPhone" type="tel" required />
      </div>
      <div>
        <Label htmlFor="studentCourse">Your course</Label>
        <Select id="studentCourse" name="studentCourse" defaultValue="">
          <option value="">Prefer not to say</option>
          {COURSE_OPTIONS.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="message">Question or message (optional)</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Ask anything about this internship, or leave blank to just apply."
        />
      </div>

      {state?.error && <p className="text-sm text-error">{state.error}</p>}

      <Button
        type="submit"
        variant="accent"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
