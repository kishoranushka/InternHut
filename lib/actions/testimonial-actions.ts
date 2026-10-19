"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/dal";
import { parseTestimonialFormData, testimonialSchema } from "@/lib/validation/testimonial";

export type TestimonialFormState =
  | { error: string; values: Record<string, string | boolean> }
  | undefined;

function refreshTestimonialPages() {
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonial(
  _previousState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdminSession();

  const values = parseTestimonialFormData(formData);
  const parsedFields = testimonialSchema.safeParse(values);
  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message, values };
  }

  // Consent is required to submit but isn't stored.
  const { studentName, quote, internship, company, college, year, isPublished } = parsedFields.data;
  await prisma.testimonial.create({
    data: { studentName, quote, internship, company, college, year, isPublished },
  });

  refreshTestimonialPages();
  redirect("/admin/testimonials?added=1");
}

/** Shows or hides a testimonial on the homepage. */
export async function setTestimonialPublished(id: string, isPublished: boolean) {
  await requireAdminSession();
  await prisma.testimonial.update({ where: { id }, data: { isPublished } });
  refreshTestimonialPages();
}

export async function deleteTestimonial(id: string) {
  await requireAdminSession();
  await prisma.testimonial.delete({ where: { id } });
  refreshTestimonialPages();
}
