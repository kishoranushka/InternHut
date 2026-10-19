import { z } from "zod";

export const issueCertificateSchema = z.object({
  applicationId: z.string().min(1, "Choose the application to certify"),
  studentName: z
    .string()
    .trim()
    .min(2, "Enter the name exactly as it should appear on the certificate")
    .max(120),
  issueDate: z.coerce
    .date({ message: "Choose the completion date" })
    .refine((date) => date <= new Date(), "The completion date can't be in the future"),
});

export const revokeCertificateSchema = z.object({
  reason: z.string().trim().min(3, "Give a short reason for revoking").max(300),
});
