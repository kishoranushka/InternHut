import { ROUTES, categoryHref, INTERNSHIP_CATEGORIES } from "@/lib/routes";

/** One internship summary as the "Starting soon" menu column renders it. */
export type StartingSoonItem = {
  slug: string;
  title: string;
  meta: string;
};

export type MenuId = "internships" | "colleges" | "how";

/** Routes that light up each top-level nav item. */
export const NAV_ACTIVE_PATHS: Record<string, string[]> = {
  internships: [ROUTES.internships],
  colleges: [ROUTES.colleges],
  how: [ROUTES.learning, ROUTES.studio, ROUTES.verify, ROUTES.contact],
  partners: [ROUTES.partners],
  about: [ROUTES.about],
};

export const BROWSE_BY_FIELD = INTERNSHIP_CATEGORIES.map((category) => ({
  label: category.label,
  blurb: category.blurb,
  href: categoryHref(category.label),
}));

export const BEFORE_YOU_APPLY = [
  { label: "Partner companies", href: ROUTES.partners },
  { label: "How internships work", href: ROUTES.learning },
  { label: "Eligibility & fees", href: ROUTES.internships },
  { label: "Ask a question", href: ROUTES.contact },
];

export const COLLEGE_PARTNERSHIP_LINKS = [
  { label: "Institutional benefits", href: ROUTES.colleges },
  { label: "Batch programmes", href: ROUTES.colleges },
  { label: "Implementation process", href: ROUTES.colleges },
];

export const COLLEGE_EVALUATE_LINKS = [
  { label: "Partner companies", href: ROUTES.partners },
  { label: "How students are assessed", href: ROUTES.learning },
  { label: "Certificate verification", href: ROUTES.verify },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Learning Experience",
    blurb: "Milestones, mentor guidance and completion criteria.",
    href: ROUTES.learning,
  },
  {
    number: "02",
    title: "Project Studio",
    blurb: "Illustrative briefs with deliverables and evaluation.",
    href: ROUTES.studio,
  },
  {
    number: "03",
    title: "Certificate Verification",
    blurb: "Check any certificate by its unique ID.",
    href: ROUTES.verify,
  },
  {
    number: "04",
    title: "Help & contact",
    blurb: "Questions from students, colleges and others.",
    href: ROUTES.contact,
  },
];

/** Accordion groups in the mobile sheet. */
export const MOBILE_GROUPS = [
  {
    id: "internships",
    label: "Internships",
    links: [
      { label: "All internships", href: ROUTES.internships },
      ...INTERNSHIP_CATEGORIES.map((category) => ({
        label: category.label,
        href: categoryHref(category.label),
      })),
    ],
  },
  {
    id: "colleges",
    label: "For Colleges",
    links: [
      { label: "Partnership overview", href: ROUTES.colleges },
      { label: "Batch programmes", href: ROUTES.colleges },
      { label: "Start an enquiry", href: ROUTES.colleges },
    ],
  },
  {
    id: "partners",
    label: "Partner companies",
    links: [
      { label: "All partner companies", href: ROUTES.partners },
      { label: "Become a partner company", href: ROUTES.contact },
    ],
  },
  {
    id: "how",
    label: "How it works",
    links: [
      { label: "Learning Experience", href: ROUTES.learning },
      { label: "Project Studio", href: ROUTES.studio },
      { label: "Help & contact", href: ROUTES.contact },
    ],
  },
] as const;
