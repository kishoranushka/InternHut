"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/dal";
import { generateCertificateCode } from "@/lib/certificate-code";
import { issueCertificateSchema, revokeCertificateSchema } from "@/lib/validation/certificate";

export type IssueCertificateFormState =
  | { error: string; values: { applicationId: string; studentName: string; issueDate: string } }
  | undefined;

const MAX_CODE_ATTEMPTS = 5;

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

function refreshCertificatePages() {
  revalidatePath("/admin/certificates");
  revalidatePath("/dashboard");
}

export async function issueCertificate(
  _previousState: IssueCertificateFormState,
  formData: FormData,
): Promise<IssueCertificateFormState> {
  await requireAdminSession();

  const values = {
    applicationId: String(formData.get("applicationId") ?? ""),
    studentName: String(formData.get("studentName") ?? ""),
    issueDate: String(formData.get("issueDate") ?? ""),
  };
  const parsed = issueCertificateSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, values };
  }
  const { applicationId, studentName, issueDate } = parsed.data;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      internship: { select: { id: true, title: true } },
      certificate: { select: { verificationCode: true } },
      payments: { where: { status: "CAPTURED" }, orderBy: { createdAt: "desc" }, take: 1, select: { id: true } },
    },
  });
  if (!application) {
    return { error: "That application no longer exists.", values };
  }
  if (application.certificate) {
    return { error: `This application already has certificate ${application.certificate.verificationCode}.`, values };
  }
  if (application.status === "CANCELLED") {
    return { error: "This application was cancelled, so it can't be certified.", values };
  }

  // A fresh random code almost never collides; if it does, the unique index
  // rejects it and we simply try another one.
  let verificationCode = "";
  for (let attempt = 1; attempt <= MAX_CODE_ATTEMPTS; attempt++) {
    verificationCode = generateCertificateCode(issueDate);
    try {
      await prisma.$transaction([
        prisma.certificate.create({
          data: {
            verificationCode,
            applicationId: application.id,
            internshipId: application.internship.id,
            paymentId: application.payments[0]?.id,
            studentNameSnapshot: studentName,
            internshipTitleSnapshot: application.internship.title,
            issueDate,
          },
        }),
        prisma.application.update({
          where: { id: application.id },
          data: { status: "COMPLETED" },
        }),
      ]);
      break;
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      // The other unique fields (one certificate per application/payment) mean
      // someone issued it at the same moment, not a code clash.
      const existing = await prisma.certificate.findUnique({ where: { applicationId: application.id } });
      if (existing) {
        return { error: `This application already has certificate ${existing.verificationCode}.`, values };
      }
      if (attempt === MAX_CODE_ATTEMPTS) {
        return { error: "Couldn't generate a unique code. Please try again.", values };
      }
    }
  }

  refreshCertificatePages();
  redirect(`/admin/certificates?issued=${encodeURIComponent(verificationCode)}`);
}

/** Marks a certificate invalid. It stays on record and /verify shows it as revoked. */
export async function revokeCertificate(id: string, reason: string) {
  await requireAdminSession();
  const parsed = revokeCertificateSchema.safeParse({ reason });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.certificate.update({
    where: { id },
    data: { revoked: true, revokedReason: parsed.data.reason },
  });
  refreshCertificatePages();
  return { success: true as const };
}

/** Undoes a revocation made by mistake. */
export async function restoreCertificate(id: string) {
  await requireAdminSession();
  await prisma.certificate.update({
    where: { id },
    data: { revoked: false, revokedReason: null },
  });
  refreshCertificatePages();
}
