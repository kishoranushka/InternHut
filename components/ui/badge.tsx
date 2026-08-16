import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        accent: "bg-accent/10 text-accent",
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
 * Recurring section-label pattern: pill badge, dot, uppercase mono text.
 * Used to open every major homepage section.
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
        "inline-flex items-center gap-3 rounded-full border px-5 py-2",
        dark
          ? "border-white/20 bg-white/5"
          : "border-accent/30 bg-accent/5",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-75" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
        {children}
      </span>
    </div>
  );
}
