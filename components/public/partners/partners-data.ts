/**
 * Placeholder partner profiles. No real partner company names exist yet —
 * every card shows "[Company name]" honestly, consistent with the rule of
 * never implying a partnership that hasn't been agreed in writing.
 */
export const PARTNER_INDUSTRIES = [
  "Software & IT",
  "Data & analytics",
  "Design & media",
  "Business & consulting",
] as const;

export type PartnerProfile = {
  industry: (typeof PARTNER_INDUSTRIES)[number];
  programmes: string[];
};

export const PARTNER_PROFILES: PartnerProfile[] = [
  { industry: "Software & IT", programmes: ["Frontend Development", "Cloud & DevOps"] },
  { industry: "Data & analytics", programmes: ["Data Analytics", "Machine Learning"] },
  { industry: "Design & media", programmes: ["UI/UX Design"] },
  { industry: "Software & IT", programmes: ["Backend APIs", "Android Apps"] },
  { industry: "Business & consulting", programmes: ["Product Management"] },
  { industry: "Data & analytics", programmes: ["Data Analytics"] },
  { industry: "Business & consulting", programmes: ["Digital Marketing Analytics"] },
  { industry: "Software & IT", programmes: ["Frontend Development"] },
  { industry: "Design & media", programmes: ["UI/UX Design", "Product Management"] },
];
