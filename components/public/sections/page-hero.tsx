import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type HeroAction = {
  label: string;
  href: string;
  variant: "primary" | "navy" | "outline" | "white" | "outline-navy";
};

/**
 * Opening block for the secondary pages, using the homepage's eyebrow +
 * display heading + lead rhythm. `tone="navy"` inverts it for the colleges page.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  tone = "light",
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  actions?: HeroAction[];
  tone?: "light" | "navy";
  children?: ReactNode;
}) {
  const isNavy = tone === "navy";

  return (
    <section
      className={cn(
        "px-section-x pt-hero-top pb-section-y",
        isNavy && "bg-inverse text-white",
      )}
    >
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-roomy">
        <div className="anim-rise flex min-w-0 flex-[7_1_520px] flex-col gap-7">
          <span className={isNavy ? "eyebrow-on-navy" : "eyebrow"}>{eyebrow}</span>
          <h1 className="m-0 text-balance text-h2 font-bold">{title}</h1>
          <p
            className={cn(
              "m-0 max-w-[580px] text-lead font-medium",
              isNavy ? "text-on-navy" : "text-body",
            )}
          >
            {lead}
          </p>

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={cn("btn btn-lg", `btn-${action.variant}`)}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {children && (
          <div className="flex min-w-0 flex-[5_1_360px] justify-center">{children}</div>
        )}
      </div>
    </section>
  );
}
