import Link from "next/link";
import { ROUTES, visibleLinks } from "@/lib/routes";

const NAV_COLUMNS: {
  heading: string;
  ariaLabel: string;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: "Students",
    ariaLabel: "Students",
    links: [
      { label: "Internships", href: ROUTES.internships },
      { label: "Learning Experience", href: ROUTES.learning },
      { label: "Project Studio", href: ROUTES.studio },
      { label: "Eligibility & fees", href: ROUTES.internships },
      { label: "Log in", href: ROUTES.login },
    ],
  },
  {
    heading: "Colleges",
    ariaLabel: "Colleges",
    links: [
      { label: "Partnership overview", href: ROUTES.colleges },
      { label: "Batch programmes", href: ROUTES.colleges },
      { label: "Implementation", href: ROUTES.colleges },
      { label: "Partnership enquiry", href: ROUTES.colleges },
    ],
  },
  {
    heading: "Graditute",
    ariaLabel: "Company",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Partner companies", href: ROUTES.partners },
      { label: "Become a partner company", href: ROUTES.contact },
      { label: "Certificate verification", href: ROUTES.verify },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
];

const LEGAL_LINKS = [
  "Terms of use",
  "Privacy policy",
  "Refund policy",
  "Grievance officer",
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep px-section-x pt-section-y pb-10 text-white">
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap gap-x-6 gap-y-12 border-b border-border-on-navy pb-14">
          <div className="flex min-w-0 flex-[4_1_320px] flex-col gap-6 pr-6">
            <Link
              href={ROUTES.home}
              className="text-heading-sm font-bold tracking-[-0.025em] text-white no-underline"
            >
              Graditute
            </Link>
            <p className="m-0 max-w-[340px] text-ui leading-[1.65] text-on-navy">
              Connecting college students with partner companies for guided,
              project-based internships — and certificates anyone can verify.
            </p>
            <div className="flex max-w-[360px] flex-col gap-2.5">
              <label htmlFor="footer-certificate-id" className="footer-heading">
                Verify a certificate
              </label>
              <form action={ROUTES.verify} method="GET" className="flex gap-2">
                <input
                  id="footer-certificate-id"
                  name="code"
                  type="text"
                  placeholder="Certificate ID"
                  className="box-border h-11 min-w-0 flex-1 rounded-md border border-border-on-navy bg-inverse px-3.5 text-ui text-white placeholder:text-on-navy-muted focus:border-accent focus:outline-none"
                />
                <button type="submit" className="btn btn-white btn-sm h-11">
                  Verify
                </button>
              </form>
            </div>
          </div>

          {NAV_COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.ariaLabel}
              className="flex flex-[2_1_150px] flex-col gap-3.5"
            >
              <span className="footer-heading mb-1">{column.heading}</span>
              {visibleLinks(column.links).map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-[2_1_180px] flex-col gap-3.5">
            <span className="footer-heading mb-1">Get in touch</span>
            <span className="text-sm leading-[1.4] text-on-navy">[support email]</span>
            <span className="text-sm leading-[1.4] text-on-navy">[phone number]</span>
            <span className="text-sm leading-[1.55] text-on-navy">[City], India</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-8 gap-y-4 pt-7 text-meta text-on-navy-muted">
          <span>© {new Date().getFullYear()} Graditute · [Registered entity name]</span>
          <div className="flex flex-wrap gap-6">
            {LEGAL_LINKS.map((label) => (
              <span key={label} className="text-meta text-on-navy-muted">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
