"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  createAdminSession,
  deleteAdminSession,
  createStudentSession,
  deleteStudentSession,
} from "@/lib/session";
import {
  adminLoginSchema,
  studentRegisterSchema,
  studentLoginSchema,
} from "@/lib/validation/auth";

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

export type StudentAuthFormState = { error: string } | undefined;

export async function registerStudent(
  _previousState: StudentAuthFormState,
  formData: FormData,
): Promise<StudentAuthFormState> {
  const parsedFields = studentRegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  if (!parsedFields.success) {
    return { error: parsedFields.error.issues[0].message };
  }

  const { name, email, phone, password } = parsedFields.data;

  const existing = await prisma.student.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists. Try signing in instead." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const student = await prisma.student.create({
    data: { name, email, phone, passwordHash },
  });

  // Claim any past guest applications made with this email before an account existed.
  await prisma.application.updateMany({
    where: { studentEmail: email, studentId: null },
    data: { studentId: student.id },
  });

  await createStudentSession(student.id, student.email);
  redirect("/dashboard");
}

export async function loginStudent(
  _previousState: StudentAuthFormState,
  formData: FormData,
): Promise<StudentAuthFormState> {
  const parsedFields = studentLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedFields.success) {
    return { error: "Enter a valid email and password." };
  }

  const { email, password } = parsedFields.data;

  const student = await prisma.student.findUnique({ where: { email } });
  const passwordMatches = student
    ? await bcrypt.compare(password, student.passwordHash)
    : false;

  if (!student || !passwordMatches) {
    return { error: "Incorrect email or password." };
  }

  await prisma.student.update({
    where: { id: student.id },
    data: { lastLoginAt: new Date() },
  });

  await createStudentSession(student.id, student.email);
  redirect("/dashboard");
}

export async function logoutStudent() {
  await deleteStudentSession();
  redirect("/login");
}
