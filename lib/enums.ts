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

export const INTERNSHIP_MODE = ["REMOTE", "HYBRID", "ON_CAMPUS"] as const;
export type InternshipMode = (typeof INTERNSHIP_MODE)[number];

export const INTERNSHIP_MODE_LABEL: Record<InternshipMode, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ON_CAMPUS: "On-campus",
};

export const INTERNSHIP_LEVEL = ["BEGINNER", "INTERMEDIATE"] as const;
export type InternshipLevel = (typeof INTERNSHIP_LEVEL)[number];

export const INTERNSHIP_LEVEL_LABEL: Record<InternshipLevel, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
};

export const GENDER = ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"] as const;
export type Gender = (typeof GENDER)[number];

export const GENDER_LABEL: Record<Gender, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
  PREFER_NOT_TO_SAY: "Prefer not to say",
};

export const CONTACT_PATH =["STUDENT", "INSTITUTION", "COMPANY", "GENERAL"] as const;
export type ContactPath = (typeof CONTACT_PATH)[number];
