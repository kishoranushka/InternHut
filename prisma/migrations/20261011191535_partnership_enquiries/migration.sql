-- CreateTable
CREATE TABLE "PartnershipEnquiry" (
    "id" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "contactName" TEXT NOT NULL,
    "role" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "departments" TEXT[],
    "studentCountRange" TEXT,
    "preferredStart" TEXT,
    "message" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnershipEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PartnershipEnquiry_createdAt_idx" ON "PartnershipEnquiry"("createdAt");
