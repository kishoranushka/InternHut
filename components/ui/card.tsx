import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-card p-6 shadow-panel",
        className,
      )}
      {...props}
    />
  );
}
