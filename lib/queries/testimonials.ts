import "server-only";
import { prisma } from "@/lib/prisma";

/** Published testimonials for the homepage, newest first. */
export function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      studentName: true,
      quote: true,
      internship: true,
      company: true,
      college: true,
      year: true,
    },
  });
}

export type PublishedTestimonial = Awaited<ReturnType<typeof getPublishedTestimonials>>[number];
