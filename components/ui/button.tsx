import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Thin wrapper over the `.btn` component classes in globals.css so the same
 * button definition serves markup (className) and React call sites.
 */
export const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      accent: "btn-primary",
      navy: "btn-navy",
      dark: "btn-navy",
      outline: "btn-outline",
      white: "btn-white",
      "outline-navy": "btn-outline-navy",
      "outline-white": "btn-outline-navy",
      ghost: "btn-ghost",
      danger: "btn-danger",
    },
    size: {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

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
