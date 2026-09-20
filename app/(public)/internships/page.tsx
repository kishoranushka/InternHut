import { prisma } from "@/lib/prisma";
import { CourseEligibility } from "@/app/generated/prisma/client";
import { InternshipCard } from "@/components/public/internship-card";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/badge";
import { FadeInUp, Stagger, StaggerItem } from "@/components/public/motion";

const COURSE_OPTIONS = Object.values(CourseEligibility);

export default async function BrowseInternshipsPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; category?: string }>;
}) {
  const { course, category } = await searchParams;

  const [internships, categoryRows] = await Promise.all([
    prisma.internship.findMany({
      where: {
        status: "PUBLISHED",
        ...(course ? { courseEligibility: { has: course as (typeof COURSE_OPTIONS)[number] } } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.internship.findMany({
      where: { status: "PUBLISHED" },
      distinct: ["category"],
      select: { category: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <FadeInUp>
        <SectionLabel>Internships</SectionLabel>
        <h1 className="mt-5 text-heading-sm font-bold text-foreground sm:text-heading">
          Find your internship
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Filter by your course or the domain you want to work in.
        </p>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <form className="mt-8 flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm" method="GET">
          <div>
            <Label htmlFor="course">Course</Label>
            <Select id="course" name="course" defaultValue={course ?? ""} className="w-48">
              <option value="">All courses</option>
              {COURSE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select id="category" name="category" defaultValue={category ?? ""} className="w-48">
              <option value="">All categories</option>
              {categoryRows.map(({ category: categoryName }) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit" variant="outline">
            Apply filters
          </Button>
        </form>
      </FadeInUp>

      {internships.length === 0 ? (
        <FadeInUp>
          <p className="mt-10 text-sm text-muted-foreground">
            No internships match these filters right now.
          </p>
        </FadeInUp>
      ) : (
        <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <StaggerItem key={internship.id}>
              <InternshipCard internship={internship} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
