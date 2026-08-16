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
    <footer className="relative overflow-hidden border-t border-white/10 bg-foreground text-white/70">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent text-sm font-semibold text-white">
                I
              </span>
              <span className="font-display text-xl text-white">InternCert</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Real internships for BBA, BCom, BCA, BSc and other undergraduate
              students — completed work, a booked call, and a certificate anyone
              can verify online.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} InternCert. Verified internship certificates.</span>
          <span className="font-mono">Made for students, built for trust.</span>
        </div>
      </div>
    </footer>
  );
}
