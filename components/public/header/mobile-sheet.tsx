"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { MOBILE_GROUPS } from "./nav-data";
import { ShieldCheckIcon } from "./header-icons";

export function MobileSheet({
  isLoggedIn,
  onNavigate,
}: {
  isLoggedIn: boolean;
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>("internships");

  return (
    <div className="anim-menu absolute inset-x-0 top-full box-border flex h-[calc(100vh-80px)] flex-col overflow-y-auto bg-card px-5 pt-2 pb-6 nav:hidden">
      {MOBILE_GROUPS.map((group) => {
        const isOpen = openGroup === group.id;

        return (
          <div key={group.id} className="border-b border-border">
            <button
              type="button"
              className="accordion-btn !py-5 !text-[17px]"
              aria-expanded={isOpen}
              onClick={() => setOpenGroup(isOpen ? null : group.id)}
            >
              {group.label}
              <span className="text-xl font-medium text-accent">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="flex flex-col pb-4">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onNavigate}
                    className="flex min-h-11 items-center text-ui font-semibold text-body no-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <Link
        href={ROUTES.about}
        onClick={onNavigate}
        className="flex min-h-[60px] items-center border-b border-border text-[17px] font-bold text-navy no-underline"
      >
        About
      </Link>
      <Link
        href={ROUTES.verify}
        onClick={onNavigate}
        className="flex min-h-[60px] items-center gap-2.5 border-b border-border text-[17px] font-bold text-navy no-underline"
      >
        <ShieldCheckIcon size={18} />
        Verify a certificate
      </Link>

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <Link
          href={ROUTES.internships}
          onClick={onNavigate}
          className="btn btn-primary btn-lg"
        >
          Get started
        </Link>
        <Link
          href={isLoggedIn ? ROUTES.dashboard : ROUTES.login}
          onClick={onNavigate}
          className="btn btn-outline btn-lg"
        >
          {isLoggedIn ? "Dashboard" : "Log in"}
        </Link>
      </div>
    </div>
  );
}
