-- CreateEnum
CREATE TYPE "InternshipLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE');

-- CreateEnum
CREATE TYPE "ContactPath" AS ENUM ('STUDENT', 'INSTITUTION', 'COMPANY', 'GENERAL');

-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "deliverables" JSONB,
ADD COLUMN     "eligibility" JSONB,
ADD COLUMN     "faqs" JSONB,
ADD COLUMN     "learningOutcomes" TEXT[],
ADD COLUMN     "level" "InternshipLevel" NOT NULL DEFAULT 'BEGINNER',
ADD COLUMN     "overview" TEXT[],
ADD COLUMN     "partnerCity" TEXT,
ADD COLUMN     "partnerDescription" TEXT,
ADD COLUMN     "partnerIndustry" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "weeklyEffortHours" TEXT,
ADD COLUMN     "weeklyPlan" JSONB;

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "path" "ContactPath" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organisation" TEXT,
    "role" TEXT,
    "phone" TEXT,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactMessage_path_createdAt_idx" ON "ContactMessage"("path", "createdAt");
