-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "internship" TEXT,
    "company" TEXT,
    "college" TEXT,
    "year" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Testimonial_isPublished_createdAt_idx" ON "Testimonial"("isPublished", "createdAt");
