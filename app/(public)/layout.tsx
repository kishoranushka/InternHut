import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { getStudentSession } from "@/lib/dal";
import { getStartingSoonInternships } from "@/lib/queries/internships";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const [session, startingSoon] = await Promise.all([
    getStudentSession(),
    getStartingSoonInternships(),
  ]);

  return (
    <>
      <SiteHeader isLoggedIn={Boolean(session)} startingSoon={startingSoon} />
      <div className="flex-1">{children}</div>
      <SiteFooter isLoggedIn={Boolean(session)} />
    </>
  );
}
