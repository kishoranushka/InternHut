import { z } from "zod";
import { COURSE_ELIGIBILITY, INTERNSHIP_STATUS } from "@/lib/enums";

export const internshipFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Add a short one-line description"),
  description: z.string().trim().min(20, "Add a fuller description"),
  courseEligibility: z
    .array(z.enum(COURSE_ELIGIBILITY))
    .min(1, "Select at least one eligible course"),
  category: z.string().trim().min(2, "Category is required"),
  durationWeeks: z.coerce
    .number()
    .int()
    .positive("Duration must be a positive number of weeks"),
  priceInRupees: z.coerce.number().nonnegative("Price cannot be negative"),
  seatsTotal: z.coerce.number().int().positive("Seats must be at least 1"),
  status: z.enum(INTERNSHIP_STATUS),
  perks: z.array(z.string().trim()).default([]),
});

export type InternshipFormValues = z.infer<typeof internshipFormSchema>;

/** Reads the raw internship form fields out of a FormData submission. */
export function parseInternshipFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    courseEligibility: formData.getAll("courseEligibility"),
    category: formData.get("category"),
    durationWeeks: formData.get("durationWeeks"),
    priceInRupees: formData.get("priceInRupees"),
    seatsTotal: formData.get("seatsTotal"),
    status: formData.get("status"),
    perks: (formData.get("perks") as string | null)
      ?.split("\n")
      .map((perk) => perk.trim())
      .filter(Boolean),
  };
}
