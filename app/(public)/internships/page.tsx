import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { getPublishedInternships } from "@/lib/queries/internships";
import { CatalogueExplorer } from "@/components/public/catalogue/catalogue-explorer";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Guided internships with our partner companies, each built around one real project brief, with mentor reviews and a verifiable certificate on completion.",
};

export default async function CataloguePage() {
  const internships = await getPublishedInternships();

  return (
    <main>
      <section className="border-b border-border px-section-x pt-[clamp(40px,6vw,72px)] pb-0">
        <div className="mx-auto max-w-content">
          <nav aria-label="Breadcrumb" className="mb-7 flex gap-2 text-meta font-semibold text-muted-foreground">
            <Link href={ROUTES.home} className="text-muted-foreground no-underline">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-navy">Internships</span>
          </nav>
        </div>
      </section>

      <section className="px-section-x py-[clamp(32px,4vw,48px)] pb-[clamp(80px,9vw,120px)]">
        <div className="mx-auto max-w-content">
          <CatalogueExplorer internships={internships} />
        </div>
      </section>
    </main>
  );
}
