import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared shell for the three desktop mega menus. */
export function MegaPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="anim-menu absolute inset-x-0 top-full hidden border-b border-border bg-card shadow-menu nav:block">
      <div
        className={cn(
          "mx-auto box-border grid max-w-header gap-12 px-gutter pt-10 pb-12",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function MegaColumn({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="eyebrow-muted mb-2">{heading}</span>
      {children}
    </div>
  );
}
