import { z } from "zod";

/**
 * Shapes for the JSON columns on Internship (deliverables, weeklyPlan,
 * eligibility, faqs). Prisma types these columns as `unknown`, so every read
 * goes through the matching `parse*` helper below rather than being cast.
 */

export const deliverableSchema = z.object({
  title: z.string(),
  due: z.string(),
  format: z.string(),
});
export type Deliverable = z.infer<typeof deliverableSchema>;

export const weeklyPlanItemSchema = z.object({
  week: z.string(),
  title: z.string(),
  body: z.string(),
  milestone: z.boolean().optional(),
});
export type WeeklyPlanItem = z.infer<typeof weeklyPlanItemSchema>;

export const eligibilityItemSchema = z.object({
  label: z.string(),
  body: z.string(),
});
export type EligibilityItem = z.infer<typeof eligibilityItemSchema>;

export const faqItemSchema = z.object({
  q: z.string(),
  a: z.string(),
});
export type FaqItem = z.infer<typeof faqItemSchema>;

function parseArray<T>(schema: z.ZodType<T>, value: unknown): T[] {
  const result = z.array(schema).safeParse(value);
  return result.success ? result.data : [];
}

export const parseDeliverables = (value: unknown) => parseArray(deliverableSchema, value);
export const parseWeeklyPlan = (value: unknown) => parseArray(weeklyPlanItemSchema, value);
export const parseEligibility = (value: unknown) => parseArray(eligibilityItemSchema, value);
export const parseFaqs = (value: unknown) => parseArray(faqItemSchema, value);
