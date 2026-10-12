import { z } from "zod";

export const partnershipEnquirySchema = z.object({
  institutionName: z.string().trim().min(2, "Enter your institution's name"),
  city: z.string().trim().max(120).optional(),
  state: z.string().trim().max(120).optional(),
  contactName: z.string().trim().min(2, "Enter your name"),
  role: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(30).optional(),
  departments: z.array(z.string()).default([]),
  studentCountRange: z.string().trim().max(60).optional(),
  preferredStart: z.string().trim().max(60).optional(),
  message: z.string().trim().max(1000).optional(),
});

export type PartnershipEnquiryValues = z.infer<typeof partnershipEnquirySchema>;

export function parsePartnershipEnquiryFormData(formData: FormData) {
  const optional = (key: string) => {
    const value = formData.get(key);
    return value ? value : undefined;
  };

  return {
    institutionName: formData.get("institutionName"),
    city: optional("city"),
    state: optional("state"),
    contactName: formData.get("contactName"),
    role: optional("role"),
    email: formData.get("email"),
    phone: optional("phone"),
    departments: formData.getAll("departments"),
    studentCountRange: optional("studentCountRange"),
    preferredStart: optional("preferredStart"),
    message: optional("message"),
  };
}
