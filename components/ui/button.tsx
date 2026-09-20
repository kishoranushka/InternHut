import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-button font-semibold transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-accent hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110",
        accent:
          "bg-accent text-accent-foreground shadow-accent hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110",
        dark: "bg-foreground text-white shadow-accent hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110",
        outline:
          "border border-border bg-transparent text-foreground hover:border-accent/40 hover:bg-muted",
        "outline-white":
          "border border-white bg-transparent text-white hover:bg-white/10",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        danger: "bg-error text-white hover:opacity-90",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-5",
        lg: "h-14 px-7",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
