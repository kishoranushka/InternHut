import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value || undefined)
    .optional();

export const testimonialSchema = z.object({
  studentName: z.string().trim().min(2, "Enter the student's name").max(120),
  quote: z
    .string()
    .trim()
    .min(20, "The quote should be at least 20 characters")
    .max(600, "Keep the quote under 600 characters"),
  internship: optionalText(160),
  company: optionalText(160),
  college: optionalText(200),
  year: optionalText(20),
  isPublished: z.boolean(),
  hasPermission: z.literal(true, { message: "Confirm the student agreed to share this quote" }),
});

export function parseTestimonialFormData(formData: FormData) {
  const text = (key: string) => String(formData.get(key) ?? "");
  return {
    studentName: text("studentName"),
    quote: text("quote"),
    internship: text("internship"),
    company: text("company"),
    college: text("college"),
    year: text("year"),
    isPublished: formData.get("isPublished") === "on",
    hasPermission: formData.get("hasPermission") === "on",
  };
}
