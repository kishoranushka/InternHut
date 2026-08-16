"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Inbox,
  PhoneCall,
  CreditCard,
  Award,
  Users,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/internships", label: "Internships", icon: GraduationCap },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/calls", label: "Calls", icon: PhoneCall },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/visitors", label: "Visitors", icon: Users },
  { href: "/admin/alerts", label: "Alerts", icon: Bell },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-60 shrink-0 flex-col gap-1 border-r border-border bg-card p-4">
      <div className="mb-4 px-2 font-display text-lg text-foreground">
        Admin
      </div>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/admin" ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted",
              isActive && "bg-gradient-accent text-white hover:brightness-105",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
