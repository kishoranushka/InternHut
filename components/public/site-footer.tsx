import Link from "next/link";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Browse internships", href: "/internships" },
      { label: "Benefits", href: "/benefits" },
      { label: "Gallery", href: "/gallery" },
      { label: "About us", href: "/about" },
    ],
  },
  {
    heading: "For students",
    links: [
      { label: "Ask a question", href: "/internships" },
      { label: "Verify a certificate", href: "/verify" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                I
              </span>
              <span className="font-display text-xl font-bold text-foreground">InternCert</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Real internships for BBA, B.Com, BCA, BSc and other UG and PG
              students. Complete real work, get mentor feedback, and walk
              away with a certificate anyone can verify online.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} InternCert. Verified internship certificates.</span>
          <span>Made for students, built for trust.</span>
        </div>
      </div>
    </footer>
  );
}
