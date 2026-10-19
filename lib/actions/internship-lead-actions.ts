"use server";

import { prisma } from "@/lib/prisma";
import {
  internshipLeadSchema,
  parseInternshipLeadFormData,
} from "@/lib/validation/internship-lead";

export type InternshipLeadFormState =
  | {
      error: string;
      field?: string;
      /** Echoed back so the form can refill itself — React resets fields after an action. */
      values: Record<string, string>;
    }
  | { success: true; firstName: string }
  | undefined;

export async function submitInternshipLead(
  _previousState: InternshipLeadFormState,
  formData: FormData,
): Promise<InternshipLeadFormState> {
  const parsedFields = internshipLeadSchema.safeParse(parseInternshipLeadFormData(formData));
  if (!parsedFields.success) {
    const issue = parsedFields.error.issues[0];
    const values: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") values[key] = value;
    });
    return { error: issue.message, field: issue.path[0]?.toString(), values };
  }

  await prisma.internshipLead.create({ data: parsedFields.data });

  return { success: true, firstName: parsedFields.data.fullName.split(" ")[0] };
}
