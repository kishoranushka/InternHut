// Plain-TS mirrors of the Prisma enums in prisma/schema.prisma, kept in sync by hand.
// Client components must import these instead of the generated Prisma client — importing
// @/app/generated/prisma/client into a "use client" file drags Prisma's Node-only internals
// (node:module, the query engine loader, etc.) into the browser bundle and breaks the build.

export const COURSE_ELIGIBILITY = [
  "BBA",
  "BCOM",
  "BCA",
  "BSC",
  "MBA",
  "MCOM",
  "OTHER",
] as const;
export type CourseEligibility = (typeof COURSE_ELIGIBILITY)[number];

export const INTERNSHIP_STATUS = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type InternshipStatus = (typeof INTERNSHIP_STATUS)[number];
