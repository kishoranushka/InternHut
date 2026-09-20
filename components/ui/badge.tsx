import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        accent: "bg-[var(--badge-tint)] text-accent-secondary",
        success: "bg-success/10 text-success",
        error: "bg-error/10 text-error",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

/**
 * Pill Badge pattern: pebble-tinted background, deep cobalt caption text,
 * full pill radius, optional pulsing dot. Used to open every major section.
 */
export function SectionLabel({
  children,
  pulse = false,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]",
        dark ? "bg-white/10 text-white/80" : "bg-[var(--badge-tint)] text-accent-secondary",
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dark ? "bg-white" : "bg-accent",
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dark ? "bg-white" : "bg-accent",
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}
