import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { formatRupees } from "@/lib/money";
import { INTERNSHIP_MODE_LABEL } from "@/lib/enums";
import type { StartingSoonItem } from "@/components/public/header/nav-data";

/** Published internships, soonest start first. */
export const getPublishedInternships = cache(async () =>
  prisma.internship.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ startDate: { sort: "asc", nulls: "last" } }, { createdAt: "asc" }],
  }),
);

/** The shape the homepage and catalogue components render. */
export type PublishedInternship = Awaited<
  ReturnType<typeof getPublishedInternships>
>[number];

/** The three soonest internships, formatted for the header's menu column. */
export const getStartingSoonInternships = cache(
  async (): Promise<StartingSoonItem[]> => {
    const internships = await prisma.internship.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ startDate: { sort: "asc", nulls: "last" } }, { createdAt: "asc" }],
      take: 3,
      select: {
        slug: true,
        title: true,
        durationWeeks: true,
        mode: true,
        priceInPaise: true,
      },
    });

    return internships.map((internship) => ({
      slug: internship.slug,
      title: internship.title,
      meta: [
        `${internship.durationWeeks} weeks`,
        INTERNSHIP_MODE_LABEL[internship.mode],
        formatRupees(internship.priceInPaise),
      ].join(" · "),
    }));
  },
);
