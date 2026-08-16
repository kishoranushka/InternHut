"use client";

import { useActionState } from "react";
import { COURSE_ELIGIBILITY, INTERNSHIP_STATUS } from "@/lib/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { InternshipFormState } from "@/lib/actions/internship-actions";

const COURSE_OPTIONS = COURSE_ELIGIBILITY;
const STATUS_OPTIONS = INTERNSHIP_STATUS;

export type InternshipFormInitialValues = {
  title: string;
  shortDescription: string;
  description: string;
  courseEligibility: string[];
  category: string;
  durationWeeks: number;
  priceInRupees: number;
  seatsTotal: number;
  status: string;
  perks: string[];
};

export function InternshipForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (
    state: InternshipFormState,
    formData: FormData,
  ) => Promise<InternshipFormState>;
  initialValues?: InternshipFormInitialValues;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState<
    InternshipFormState,
    FormData
  >(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={initialValues?.title} required />
      </div>

      <div>
        <Label htmlFor="shortDescription">Short description</Label>
        <Input
          id="shortDescription"
          name="shortDescription"
          defaultValue={initialValues?.shortDescription}
          placeholder="One line shown on the internship card"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Full description</Label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={initialValues?.description}
          required
        />
      </div>

      <div>
        <Label>Eligible courses</Label>
        <div className="flex flex-wrap gap-3">
          {COURSE_OPTIONS.map((course) => (
            <label key={course} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="courseEligibility"
                value={course}
                defaultChecked={initialValues?.courseEligibility.includes(course)}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
              />
              {course}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="e.g. Marketing, Web Development"
            defaultValue={initialValues?.category}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            defaultValue={initialValues?.status ?? "DRAFT"}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="durationWeeks">Duration (weeks)</Label>
          <Input
            id="durationWeeks"
            name="durationWeeks"
            type="number"
            min={1}
            defaultValue={initialValues?.durationWeeks}
            required
          />
        </div>
        <div>
          <Label htmlFor="seatsTotal">Total seats</Label>
          <Input
            id="seatsTotal"
            name="seatsTotal"
            type="number"
            min={1}
            defaultValue={initialValues?.seatsTotal}
            required
          />
        </div>
        <div>
          <Label htmlFor="priceInRupees">Price (INR)</Label>
          <Input
            id="priceInRupees"
            name="priceInRupees"
            type="number"
            min={0}
            defaultValue={initialValues?.priceInRupees}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="perks">Perks (one per line)</Label>
        <Textarea
          id="perks"
          name="perks"
          rows={4}
          defaultValue={initialValues?.perks.join("\n")}
          placeholder={"Certificate\nLetter of recommendation"}
        />
      </div>

      {state?.error && <p className="text-sm text-error">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
