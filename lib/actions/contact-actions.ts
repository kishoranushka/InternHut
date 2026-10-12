"use server";

import { prisma } from "@/lib/prisma";
import { contactMessageSchema, parseContactFormData } from "@/lib/validation/contact";

export type ContactFormState = { error: string } | { success: true } | undefined;

export async function submitContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsedFields = contactMessageSchema.safeParse(parseContactFormData(formData));
  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message };
  }

  await prisma.contactMessage.create({ data: parsedFields.data });

  return { success: true };
}
