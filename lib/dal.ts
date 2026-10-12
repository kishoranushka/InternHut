import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  decryptAdminSession,
  readAdminSessionToken,
  decryptStudentSession,
  readStudentSessionToken,
} from "@/lib/session";

/**
 * Data Access Layer: the single place that decides whether the current
 * request is coming from a logged-in admin. Every admin page/action/route
 * should go through one of the functions below instead of reading the
 * session cookie directly.
 */

/** Returns the current admin session, or null if not logged in. */
export const getAdminSession = cache(async () => {
  const sessionToken = await readAdminSessionToken();
  const session = await decryptAdminSession(sessionToken);
  return session?.adminId ? session : null;
});

/** Returns the current admin session, redirecting to /admin/login if absent. */
export const requireAdminSession = cache(async () => {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
});

/** Loads the logged-in admin's profile, redirecting to login if not authenticated. */
export const getCurrentAdmin = cache(async () => {
  const session = await requireAdminSession();
  const admin = await prisma.adminUser.findUnique({
    where: { id: session.adminId },
    select: { id: true, name: true, email: true },
  });
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
});

/**
 * Same contract as the admin session helpers above, for the student-facing
 * dashboard: /login, /register, /dashboard.
 */

/** Returns the current student session, or null if not logged in. */
export const getStudentSession = cache(async () => {
  const sessionToken = await readStudentSessionToken();
  const session = await decryptStudentSession(sessionToken);
  return session?.studentId ? session : null;
});

/** Returns the current student session, redirecting to /login if absent. */
export const requireStudentSession = cache(async () => {
  const session = await getStudentSession();
  if (!session) {
    redirect("/login");
  }
  return session;
});

/** Loads the logged-in student's profile, redirecting to /login if not authenticated. */
export const getCurrentStudent = cache(async () => {
  const session = await requireStudentSession();
  const student = await prisma.student.findUnique({
    where: { id: session.studentId },
    select: { id: true, name: true, email: true, phone: true },
  });
  if (!student) {
    redirect("/login");
  }
  return student;
});
