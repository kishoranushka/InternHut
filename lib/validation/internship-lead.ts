import { z } from "zod";
import { GENDER } from "@/lib/enums";
import { INDIA_STATES } from "@/lib/india-states";

const MIN_AGE = 15;

/** Accepts "98765 43210", "+91-9876543210", "09876543210"; stores the bare 10 digits. */
const indianMobile = (label: string) =>
  z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, ""))
    .refine((value) => /^[6-9]\d{9}$/.test(value), `Enter a valid 10-digit ${label}`);

function yearsSince(date: Date) {
  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();
  const beforeBirthday =
    now.getMonth() < date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());
  if (beforeBirthday) years -= 1;
  return years;
}

export const internshipLeadSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  mobile: indianMobile("mobile number"),
  whatsapp: indianMobile("WhatsApp number"),
  gender: z.enum(GENDER, { message: "Select your gender" }),
  dateOfBirth: z.coerce
    .date({ message: "Enter your date of birth" })
    .refine((date) => date < new Date(), "Date of birth must be in the past")
    .refine((date) => yearsSince(date) >= MIN_AGE, `You must be at least ${MIN_AGE} years old`),
  state: z.enum(INDIA_STATES, { message: "Select your state" }),
  college: z.string().trim().min(2, "Enter your college or university name").max(200),
  course: z.string().trim().min(2, "Enter your course or degree").max(120),
  stream: z.string().trim().min(2, "Enter your stream or specialization").max(120),
});

export type InternshipLeadValues = z.infer<typeof internshipLeadSchema>;

export function parseInternshipLeadFormData(formData: FormData) {
  const whatsappSameAsMobile = formData.get("whatsappSame") === "on";

  return {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    whatsapp: whatsappSameAsMobile ? formData.get("mobile") : formData.get("whatsapp"),
    gender: formData.get("gender") || undefined,
    dateOfBirth: formData.get("dateOfBirth") || undefined,
    state: formData.get("state") || undefined,
    college: formData.get("college"),
    course: formData.get("course"),
    stream: formData.get("stream"),
  };
}
