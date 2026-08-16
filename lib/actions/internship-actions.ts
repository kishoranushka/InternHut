"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/dal";
import { rupeesToPaise } from "@/lib/money";
import { slugify } from "@/lib/slug";
import {
  internshipFormSchema,
  parseInternshipFormData,
} from "@/lib/validation/internship";

export type InternshipFormState = { error: string } | undefined;

/** Turns a title into a URL-safe slug, appending a numeric suffix on collision. */
async function generateUniqueInternshipSlug(title: string) {
  const baseSlug = slugify(title);
  let candidateSlug = baseSlug;
  let suffix = 1;

  while (
    await prisma.internship.findUnique({ where: { slug: candidateSlug } })
  ) {
    suffix += 1;
    candidateSlug = `${baseSlug}-${suffix}`;
  }

  return candidateSlug;
}

export async function createInternship(
  _previousState: InternshipFormState,
  formData: FormData,
): Promise<InternshipFormState> {
  await requireAdminSession();

  const parsedFields = internshipFormSchema.safeParse(
    parseInternshipFormData(formData),
  );
  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message };
  }

  const { priceInRupees, ...internshipValues } = parsedFields.data;
  const slug = await generateUniqueInternshipSlug(internshipValues.title);

  const internship = await prisma.internship.create({
    data: {
      ...internshipValues,
      slug,
      priceInPaise: rupeesToPaise(priceInRupees),
    },
  });

  revalidatePath("/admin/internships");
  revalidatePath("/internships");
  redirect(`/admin/internships/${internship.id}`);
}

export async function updateInternship(
  internshipId: string,
  _previousState: InternshipFormState,
  formData: FormData,
): Promise<InternshipFormState> {
  await requireAdminSession();

  const parsedFields = internshipFormSchema.safeParse(
    parseInternshipFormData(formData),
  );
  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message };
  }

  const { priceInRupees, ...internshipValues } = parsedFields.data;

  await prisma.internship.update({
    where: { id: internshipId },
    data: {
      ...internshipValues,
      priceInPaise: rupeesToPaise(priceInRupees),
    },
  });

  revalidatePath("/admin/internships");
  revalidatePath(`/admin/internships/${internshipId}`);
  revalidatePath("/internships");
  redirect("/admin/internships");
}

export async function deleteInternship(internshipId: string) {
  await requireAdminSession();
  await prisma.internship.delete({ where: { id: internshipId } });
  revalidatePath("/admin/internships");
  revalidatePath("/internships");
  redirect("/admin/internships");
}
