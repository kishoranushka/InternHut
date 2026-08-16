"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminSession, deleteAdminSession } from "@/lib/session";
import { adminLoginSchema } from "@/lib/validation/auth";

export type AdminLoginFormState = { error: string } | undefined;

export async function loginAdmin(
  _previousState: AdminLoginFormState,
  formData: FormData,
): Promise<AdminLoginFormState> {
  const parsedFields = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedFields.success) {
    return { error: "Enter a valid email and password." };
  }

  const { email, password } = parsedFields.data;

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  const passwordMatches = admin
    ? await bcrypt.compare(password, admin.passwordHash)
    : false;

  if (!admin || !passwordMatches) {
    return { error: "Incorrect email or password." };
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  await createAdminSession(admin.id, admin.email);
  redirect("/admin");
}

export async function logoutAdmin() {
  await deleteAdminSession();
  redirect("/admin/login");
}
