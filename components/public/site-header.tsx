"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/internships", label: "Internships" },
  { href: "/benefits", label: "Benefits" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/verify", label: "Verify" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent text-sm font-semibold text-accent-foreground">
            I
          </span>
          <span className="font-display text-xl text-foreground">InternCert</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-accent",
                pathname === link.href && "text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/internships"
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            Browse internships
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted",
                  pathname === link.href && "bg-accent/5 text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/internships"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "primary", size: "sm", className: "mt-2" })}
            >
              Browse internships
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
