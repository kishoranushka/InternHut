"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createAdminUser,
  type CreateAdminFormState,
} from "@/lib/actions/admin-user-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminUserForm() {
  const [state, formAction, isPending] = useActionState<CreateAdminFormState, FormData>(
    createAdminUser,
    undefined,
  );

  return (
    // Remount after a failed attempt so defaultValue refills name/email.
    <form key={state ? JSON.stringify(state.values) : "fresh"} action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" autoComplete="off" defaultValue={state?.values.name} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          defaultValue={state?.values.email}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">At least 8 characters.</p>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
      </div>

      {state?.error && <p className="text-sm text-error">{state.error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Add admin"}
        </Button>
        <Link href="/admin/admins" className={buttonVariants({ variant: "ghost" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
