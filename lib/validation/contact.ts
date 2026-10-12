import { z } from "zod";
import { CONTACT_PATH } from "@/lib/enums";

export const contactMessageSchema = z.object({
  path: z.enum(CONTACT_PATH),
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  organisation: z.string().trim().max(200).optional(),
  role: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(30).optional(),
  topic: z.string().trim().min(1, "Choose a topic"),
  message: z.string().trim().min(10, "Say a little more — at least 10 characters").max(1000),
});

export type ContactMessageValues = z.infer<typeof contactMessageSchema>;

export function parseContactFormData(formData: FormData) {
  const optional = (key: string) => {
    const value = formData.get(key);
    return value ? value : undefined;
  };

  return {
    path: formData.get("path"),
    name: formData.get("name"),
    email: formData.get("email"),
    organisation: optional("organisation"),
    role: optional("role"),
    phone: optional("phone"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  };
}
