-- CreateEnum
CREATE TYPE "InternshipMode" AS ENUM ('REMOTE', 'HYBRID', 'ON_CAMPUS');

-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "mode" "InternshipMode" NOT NULL DEFAULT 'REMOTE',
ADD COLUMN     "partnerCompany" TEXT;
