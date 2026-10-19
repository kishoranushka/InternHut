"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/dal";
import { createAdminSchema } from "@/lib/validation/auth";

export type CreateAdminFormState =
  | { error: string; values: { name: string; email: string } }
  | undefined;

/** Only a signed-in admin can add another admin. */
export async function createAdminUser(
  _previousState: CreateAdminFormState,
  formData: FormData,
): Promise<CreateAdminFormState> {
  await requireAdminSession();

  // Passwords are never echoed back to the browser.
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };

  const parsedFields = createAdminSchema.safeParse({
    ...values,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message, values };
  }

  const { name, email, password } = parsedFields.data;

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return { error: "An admin with this email already exists.", values };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({ data: { name, email, passwordHash } });

  revalidatePath("/admin/admins");
  redirect("/admin/admins?added=1");
}
