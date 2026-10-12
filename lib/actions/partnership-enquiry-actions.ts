"use server";

import { prisma } from "@/lib/prisma";
import {
  partnershipEnquirySchema,
  parsePartnershipEnquiryFormData,
} from "@/lib/validation/partnership-enquiry";

export type PartnershipEnquiryFormState =
  | { error: string }
  | { success: true }
  | undefined;

export async function submitPartnershipEnquiry(
  _previousState: PartnershipEnquiryFormState,
  formData: FormData,
): Promise<PartnershipEnquiryFormState> {
  const parsedFields = partnershipEnquirySchema.safeParse(
    parsePartnershipEnquiryFormData(formData),
  );
  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message };
  }

  await prisma.partnershipEnquiry.create({ data: parsedFields.data });

  return { success: true };
}
