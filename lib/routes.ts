/**
 * Single source of truth for the public routes the header, footer and
 * homepage link to. The design mockup referenced page files
 * (Catalogue.dc.html, Detail.dc.html, ...); those map onto these routes.
 */
export const ROUTES = {
  home: "/",
  internships: "/internships",
  internship: (slug: string) => `/internships/${slug}`,
  apply: (slug: string) => `/apply/${slug}`,
  learning: "/learning",
  studio: "/studio",
  colleges: "/colleges",
  partners: "/partners",
  about: "/about",
  contact: "/contact",
  verify: "/verify",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
} as const;

export const INTERNSHIP_CATEGORIES = [
  { label: "Software development", blurb: "Web, backend, mobile, cloud" },
  { label: "Data & AI", blurb: "Analytics, machine learning" },
  { label: "Design", blurb: "UI/UX, research, prototyping" },
  { label: "Business & product", blurb: "Product, marketing analytics" },
] as const;

/** Links to a filtered catalogue view for one field of work. */
export function categoryHref(category: string) {
  return `${ROUTES.internships}?category=${encodeURIComponent(category)}`;
}
