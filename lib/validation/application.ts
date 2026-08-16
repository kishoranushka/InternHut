import { z } from "zod";
import { COURSE_ELIGIBILITY } from "@/lib/enums";

export const applicationFormSchema = z.object({
  internshipId: z.string().min(1),
  internshipSlug: z.string().min(1),
  studentName: z.string().trim().min(2, "Enter your full name"),
  studentEmail: z.string().trim().email("Enter a valid email address"),
  studentPhone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number"),
  studentCourse: z.enum(COURSE_ELIGIBILITY).optional(),
  message: z.string().trim().max(2000).optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export function parseApplicationFormData(formData: FormData) {
  const studentCourse = formData.get("studentCourse");
  const message = formData.get("message");

  return {
    internshipId: formData.get("internshipId"),
    internshipSlug: formData.get("internshipSlug"),
    studentName: formData.get("studentName"),
    studentEmail: formData.get("studentEmail"),
    studentPhone: formData.get("studentPhone"),
    studentCourse: studentCourse ? studentCourse : undefined,
    message: message ? message : undefined,
  };
}
