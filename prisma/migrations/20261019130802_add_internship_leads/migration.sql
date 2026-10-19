-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateTable
CREATE TABLE "InternshipLead" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "state" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InternshipLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InternshipLead_createdAt_idx" ON "InternshipLead"("createdAt");

-- CreateIndex
CREATE INDEX "InternshipLead_email_idx" ON "InternshipLead"("email");
