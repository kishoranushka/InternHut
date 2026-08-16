"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  applicationFormSchema,
  parseApplicationFormData,
} from "@/lib/validation/application";

export type ApplicationFormState = { error: string } | undefined;

export async function submitApplication(
  _previousState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  const parsedFields = applicationFormSchema.safeParse(
    parseApplicationFormData(formData),
  );
  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message };
  }

  const { internshipId, internshipSlug, message, ...studentDetails } =
    parsedFields.data;

  await prisma.application.create({
    data: {
      internshipId,
      message,
      source: message ? "query_form" : "direct_apply",
      ...studentDetails,
    },
  });

  redirect(`/apply/${internshipSlug}/success`);
}
